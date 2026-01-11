import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSessions } from '@/hooks/useSessions';
import { useLibrary } from '@/hooks/useLibrary';
import { useUI } from '@/hooks/useUI';
import { useAsync } from '@/hooks/useAsync';
import { analyzeArchitecturalDesign, streamChat } from '@/services/geminiService';
import { Message, MessageRole } from '@/types/index';
import { getUserFriendlyErrorMessage } from '@/lib/error-messages';
import { logger } from '@/lib/logger';

// Combined state interface
interface AppState {
  // Auth state
  auth: ReturnType<typeof useAuth>;
  // Sessions state
  sessions: ReturnType<typeof useSessions>;
  // Library state
  library: ReturnType<typeof useLibrary>;
  // UI state
  ui: ReturnType<typeof useUI>;
  // Async operations
  analyzeAsync: ReturnType<typeof useAsync>;
  chatAsync: ReturnType<typeof useAsync>;
}

// Actions interface
interface AppActions {
  // Auth actions
  selectRole: (role: any) => void;

  // Session actions
  createNewSession: () => Promise<string>;
  sendMessage: (content: string, image?: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;

  // Library actions
  uploadDocument: (file: File, context?: string) => Promise<void>;
  removeDocument: (fileName: string) => Promise<void>;

  // UI actions
  toggleSidebar: () => void;
  openLibrary: () => void;
  closeLibrary: () => void;

  // Utility actions
  handleError: (error: any) => void;
  clearErrors: () => void;
}

interface AppContextType extends AppState, AppActions {}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Initialize all hooks
  const auth = useAuth();
  const sessions = useSessions();
  const library = useLibrary();
  const ui = useUI();

  // Async operations
  const analyzeAsync = useAsync(analyzeArchitecturalDesign);
  const chatAsync = useAsync(streamChat);

  // Handle API key selection

  // Create new session
  const createNewSession = async (): Promise<string> => {
    const sessionId = await sessions.createSession();
    ui.setActiveSession(sessionId);
    ui.closeSidebar(); // Close sidebar on mobile after creation
    return sessionId;
  };

  // Send message
  const sendMessage = async (content: string, image?: string) => {
    if (!ui.activeSessionId || ui.isLoading) return;

    const userMessage: Omit<Message, 'id' | 'timestamp'> = {
      role: MessageRole.USER,
      content: content || 'Please analyze this architectural design',
      ...(image && { image }),
    };

    await sessions.addMessage(ui.activeSessionId, userMessage);
    ui.setLoading(true);

    try {
      let result: any;
      if (image) {
        result = await analyzeAsync.execute(content, image, library.storeName);
      } else {
        result = await chatAsync.execute(
          content,
          sessions.activeSession?.messages || [],
          library.storeName
        );
      }

      // Use the direct result from execute instead of async state
      if (!result) {
        throw new Error('Failed to get response from AI service');
      }

      const assistantMessage: Omit<Message, 'id' | 'timestamp'> = {
        role: MessageRole.MODEL,
        content: (result as any)?.text || 'I apologize, but I was unable to generate a response.',
        citations: (result as any)?.groundingMetadata?.groundingChunks || [],
        analysis: (result as any)?.analysis,
      };

      await sessions.addMessage(ui.activeSessionId, assistantMessage);
    } catch (error) {
      handleError(error);
      await sessions.addMessage(ui.activeSessionId, {
        role: MessageRole.MODEL,
        content:
          'I encountered an error while processing your request. Please check your API configuration and try again.',
        isError: true,
      });
    } finally {
      ui.setLoading(false);
    }
  };

  // Delete session
  const deleteSession = async (sessionId: string): Promise<void> => {
    await sessions.deleteSession(sessionId);
    if (ui.activeSessionId === sessionId) {
      ui.setActiveSession(null);
    }
  };

  // Upload document
  const uploadDocument = async (file: File, context?: string) => {
    await library.uploadFile(file, context);
  };

  // Remove document
  const removeDocument = async (fileName: string) => {
    await library.deleteFile(fileName);
  };

  // Select role (for landing page)
  const selectRole = (role: any) => {
    auth.login(role);
  };

  // Error handling
  const handleError = (error: unknown) => {
    logger.error('App Error', error instanceof Error ? error : new Error(String(error)));
    const userFriendlyMessage = getUserFriendlyErrorMessage(error);

    // Set error in appropriate hook
    if (userFriendlyMessage.includes('API') || userFriendlyMessage.includes('key')) {
      auth.error = userFriendlyMessage;
    } else if (userFriendlyMessage.includes('session')) {
      sessions.error = userFriendlyMessage;
    } else if (userFriendlyMessage.includes('file') || userFriendlyMessage.includes('document')) {
      library.error = userFriendlyMessage;
    }
  };

  const clearErrors = () => {
    auth.clearError();
    sessions.clearError();
    library.clearError();
  };

  const contextValue: AppContextType = {
    // State
    auth,
    sessions,
    library,
    ui,
    analyzeAsync,
    chatAsync,

    // Actions
    selectRole,
    createNewSession,
    sendMessage,
    deleteSession,
    uploadDocument,
    removeDocument,
    toggleSidebar: ui.toggleSidebar,
    openLibrary: ui.openLibrary,
    closeLibrary: ui.closeLibrary,
    handleError,
    clearErrors,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
