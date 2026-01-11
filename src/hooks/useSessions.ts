import { useState, useCallback, useMemo } from 'react';
import { ChatSession, Message } from '@/types/index';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { generateId } from '@/lib/utils';
import { logger } from '@/lib/logger';
import { BUSINESS } from '@/lib/constants';

interface SessionsState {
  sessions: ChatSession[];
  activeSession: ChatSession | null;
  isLoading: boolean;
  error: string | null;
}

interface SessionsActions {
  createSession: (title?: string) => Promise<string>;
  deleteSession: (sessionId: string) => Promise<void>;
  updateSession: (sessionId: string, updates: Partial<ChatSession>) => Promise<void>;
  addMessage: (sessionId: string, message: Omit<Message, 'id' | 'timestamp'>) => Promise<void>;
  clearError: () => void;
}

// Helper function for consistent error handling
const handleAsyncOperation = async <T>(
  operation: () => Promise<T>,
  errorMessage: string,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
): Promise<T> => {
  try {
    setLoading(true);
    setError(null);
    const result = await operation();
    return result;
  } catch (err) {
    const message = errorMessage;
    setError(message);
    logger.error(message, err instanceof Error ? err : new Error(String(err)));
    throw new Error(message);
  } finally {
    setLoading(false);
  }
};

export function useSessions(): SessionsState & SessionsActions {
  const [sessions, setSessions] = useLocalStorage<ChatSession[]>('dc_v2_sessions', []);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get active session (first session in the list, or most recent)
  const activeSession = useMemo((): ChatSession | null => {
    return sessions.length > 0 ? sessions[0]! : null;
  }, [sessions]);

  const createSession = useCallback(
    async (title = 'New Consultation'): Promise<string> => {
      return handleAsyncOperation(
        async () => {
          const sessionId = generateId();
          const newSession: ChatSession = {
            id: sessionId,
            title,
            messages: [],
            updatedAt: Date.now(),
          };

          setSessions((prev) => [newSession, ...prev]);
          return sessionId;
        },
        'Failed to create new session',
        setIsLoading,
        setError
      );
    },
    [setSessions]
  );

  const deleteSession = useCallback(
    async (sessionId: string): Promise<void> => {
      return handleAsyncOperation(
        async () => {
          setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        },
        'Failed to delete session',
        setIsLoading,
        setError
      );
    },
    [setSessions]
  );

  const updateSession = useCallback(
    async (sessionId: string, updates: Partial<ChatSession>): Promise<void> => {
      return handleAsyncOperation(
        async () => {
          setSessions((prev) =>
            prev.map((s) => (s.id === sessionId ? { ...s, ...updates, updatedAt: Date.now() } : s))
          );
        },
        'Failed to update session',
        setIsLoading,
        setError
      );
    },
    [setSessions]
  );

  const addMessage = useCallback(
    async (sessionId: string, messageData: Omit<Message, 'id' | 'timestamp'>): Promise<void> => {
      return handleAsyncOperation(
        async () => {
          const message: Message = {
            ...messageData,
            id: generateId(),
            timestamp: Date.now(),
          };

          setSessions((prev) =>
            prev.map((s) =>
              s.id === sessionId
                ? {
                    ...s,
                    messages: [...s.messages, message],
                    updatedAt: Date.now(),
                    // Auto-generate title from first user message if not set
                    title:
                      s.messages.length === 0 && message.role === 'user'
                        ? message.content.slice(0, BUSINESS.SESSIONS.TITLE_MAX_LENGTH) +
                          (message.content.length > BUSINESS.SESSIONS.TITLE_MAX_LENGTH
                            ? BUSINESS.SESSIONS.TITLE_TRUNCATE_SUFFIX
                            : '')
                        : s.title,
                  }
                : s
            )
          );
        },
        'Failed to add message',
        setIsLoading,
        setError
      );
    },
    [setSessions]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    sessions,
    activeSession,
    isLoading,
    error,
    createSession,
    deleteSession,
    updateSession,
    addMessage,
    clearError,
  };
}
