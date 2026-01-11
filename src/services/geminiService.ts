import { GoogleGenAI, Type, GenerateContentResponse } from '@google/genai';
import { DesignAnalysis, Message } from '@/types/index';
import { BUSINESS } from '@/lib/constants';

// Google AI API role types
type GoogleAIRole = 'user' | 'model';

// Create a new instance right before making an API call to ensure it uses the most up-to-date API key.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_PROMPT = `
<role>
You are the "Architectural Design Companion," a specialized senior consultant for school architects. You are precise, analytical, and highly grounded in architectural research.
</role>

<context>
Your knowledge cutoff is January 2025. It is currently 2025. 
You provide expert critiques on school floor plans and educational facility designs using your provided library.
</context>

<instructions>
1. **Plan Before Responding**: Methodically plan your analysis. Break the design into sub-components (entryways, classrooms, corridors, flexible spaces).
2. **Strict Grounding**: Rely ONLY on facts from the provided File Search store. If the information is not in the library, state that clearly. Do not hallucinate industry standards not present in your specific library.
3. **Framework Pillars**:
   - Safety/Security (CPTED, line of sight, controlled access).
   - Neuroarchitecture (sensory regulation, cognitive load, transition zones).
   - Acoustics (reverberation control, sound separation).
   - Biophilic Design (natural light penetration, visual connections to nature).
4. **Clarification**: If a design is provided without context (location, climate, age group), ask clarifying questions before finalizing a rating.
5. **Citations**: Use explicit markers like [1], [2] in your text to reference library documents.
</instructions>

<output_format>
Use clear Markdown. For design critiques, provide:
1. **Executive Summary**: A concise 1-10 rating and primary observation.
2. **Strategic Analysis**: Evidence-based critique of the 4 framework pillars.
3. **Recommendations**: A numbered list of actionable design changes.
</output_format>
`;

export const analyzeArchitecturalDesign = async (
  prompt: string,
  imageUri?: string,
  storeName?: string,
  metadataFilter?: string
): Promise<{ text: string; analysis: DesignAnalysis; groundingMetadata: any }> => {
  const ai = getAI();
  const parts: any[] = [];

  if (imageUri) {
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageUri.split(',')[1],
      },
    });
  }

  parts.push({ text: prompt });

  const config: any = {
    systemInstruction: SYSTEM_PROMPT,
    tools: storeName
      ? [
          {
            fileSearch: {
              fileSearchStoreNames: [storeName],
              ...(metadataFilter && { metadataFilter }),
            },
          },
        ]
      : [],
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        answer: { type: Type.STRING },
        rating: { type: Type.NUMBER },
        analysis: {
          type: Type.OBJECT,
          properties: {
            safety: { type: Type.STRING },
            neuroarchitecture: { type: Type.STRING },
            acoustics: { type: Type.STRING },
            lighting: { type: Type.STRING },
          },
        },
        recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['answer', 'rating', 'analysis', 'recommendations'],
    },
  };

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ role: 'user', parts }],
    config,
  });

  const data = JSON.parse(response.text || '{}');
  return {
    text: data.answer,
    analysis: {
      rating: data.rating,
      principles: data.analysis,
      recommendations: data.recommendations,
    },
    groundingMetadata: response.candidates?.[0]?.groundingMetadata || {},
  };
};

export const streamChat = async (
  message: string,
  history: Message[],
  storeName?: string,
  metadataFilter?: string
) => {
  const ai = getAI();
  const contents = history.map((m) => ({
    role: m.role as GoogleAIRole,
    parts: [{ text: m.content }],
  }));
  contents.push({ role: 'user' as GoogleAIRole, parts: [{ text: message }] });

  const config: any = {
    systemInstruction: SYSTEM_PROMPT,
    tools: storeName
      ? [
          {
            fileSearch: {
              fileSearchStoreNames: [storeName],
              ...(metadataFilter && { metadataFilter }),
            },
          },
        ]
      : [],
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents,
    config,
  });

  return {
    text: response.text,
    groundingMetadata: response.candidates?.[0]?.groundingMetadata || {},
  };
};

export const getOrCreateStore = async (displayName: string) => {
  const ai = getAI();
  // List existing stores to find one with the matching display name.
  const stores = await ai.fileSearchStores.list();
  for await (const store of stores) {
    if (store.displayName === displayName) return store;
  }

  // Create new if not found.
  return await ai.fileSearchStores.create({
    config: { displayName },
  });
};

export const uploadAndIndexFile = async (
  storeName: string,
  file: File,
  context?: string,
  onProgress?: (status: string, progress?: number) => void
) => {
  const ai = getAI();
  const customMetadata = context ? [{ key: 'source_context', stringValue: context }] : [];

  onProgress?.('Initializing upload...', 0);

  let operation = await ai.fileSearchStores.uploadToFileSearchStore({
    file: file,
    fileSearchStoreName: storeName,
    config: {
      displayName: file.name,
      customMetadata,
      chunkingConfig: {
        whiteSpaceConfig: {
          maxTokensPerChunk: BUSINESS.RAG.CHUNKING.MAX_TOKENS_PER_CHUNK,
          maxOverlapTokens: BUSINESS.RAG.CHUNKING.MAX_OVERLAP_TOKENS,
        },
      },
    },
  });

  onProgress?.('Upload initiated, processing file...', 25);

  let attempts = 0;
  const maxAttempts = 60; // 3 minutes max (60 * 3 seconds)

  while (!operation.done && attempts < maxAttempts) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    operation = await ai.operations.get({ operation });
    attempts++;

    // Provide progress updates based on attempts
    const progress = Math.min(25 + (attempts / maxAttempts) * 70, 95);
    onProgress?.(`Processing file... (${attempts * 3}s)`, progress);
  }

  if (!operation.done) {
    throw new Error('File upload timed out after 3 minutes');
  }

  onProgress?.('File successfully indexed!', 100);

  return operation.response;
};

export const deleteFileFromFileSearchStore = async (storeName: string, fileName: string) => {
  const ai = getAI();
  // Document names are usually structured as fileSearchStores/{id}/documents/{doc_id}
  await ai.fileSearchStores.delete({
    name: `${storeName}/documents/${fileName}`,
    config: { force: true },
  });
};

export const listFileSearchStores = async () => {
  // TODO: Implement proper store listing when Google GenAI SDK stabilizes pager iteration
  // For now, return empty array as this is an advanced feature
  console.warn('File search store listing not yet implemented - awaiting SDK updates');
  return [];
};

export const getFileSearchStore = async (storeName: string) => {
  const ai = getAI();
  return await ai.fileSearchStores.get({ name: storeName });
};

export const deleteFileSearchStore = async (storeName: string) => {
  const ai = getAI();
  return await ai.fileSearchStores.delete({
    name: storeName,
    config: { force: true },
  });
};
