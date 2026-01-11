import { useState, useEffect, useCallback, useRef } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface AsyncActions {
  execute: (...args: any[]) => Promise<unknown>;
  reset: () => void;
}

export function useAsync(
  asyncFunction: (...args: any[]) => Promise<unknown>,
  immediate = false
): AsyncState<unknown> & AsyncActions {
  const [state, setState] = useState<AsyncState<unknown>>({
    data: null,
    loading: false,
    error: null,
  });

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args: any[]) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const data = await asyncFunction(...args);
        if (mountedRef.current) {
          setState({ data, loading: false, error: null });
        }
        return data; // Return the result directly
      } catch (error) {
        if (mountedRef.current) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error(String(error)),
          });
        }
        throw error; // Re-throw the error so it can be caught by the caller
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute, reset };
}

// Hook for sequential async operations
export function useAsyncSequence() {
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);
  const [operations, setOperations] = useState<
    Array<{
      id: string;
      status: 'pending' | 'running' | 'completed' | 'error';
      error?: Error;
    }>
  >([]);

  const addOperation = useCallback((id: string) => {
    setOperations((prev) => [...prev.filter((op) => op.id !== id), { id, status: 'pending' }]);
  }, []);

  const startOperation = useCallback((id: string) => {
    setCurrentOperation(id);
    setOperations((prev) => prev.map((op) => (op.id === id ? { ...op, status: 'running' } : op)));
  }, []);

  const completeOperation = useCallback((id: string) => {
    setCurrentOperation(null);
    setOperations((prev) => prev.map((op) => (op.id === id ? { ...op, status: 'completed' } : op)));
  }, []);

  const failOperation = useCallback((id: string, error: Error) => {
    setCurrentOperation(null);
    setOperations((prev) =>
      prev.map((op) => (op.id === id ? { ...op, status: 'error', error } : op))
    );
  }, []);

  return {
    currentOperation,
    operations,
    addOperation,
    startOperation,
    completeOperation,
    failOperation,
  };
}
