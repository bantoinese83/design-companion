// API-related types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface GeminiResponse {
  text: string;
  groundingMetadata?: {
    groundingChunks: GroundingChunk[];
  };
  analysis?: import('./chat').DesignAnalysis;
}

export interface GroundingChunk {
  retrievedContext?: {
    title: string;
    text: string;
  };
  fileSearchStore?: {
    displayName: string;
  };
  text?: string; // Fallback for direct text
}
