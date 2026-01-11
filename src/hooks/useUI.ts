import { useState, useCallback } from 'react';
import { UIState } from '@/types/index';

interface UIActions {
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  openLibrary: () => void;
  closeLibrary: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  setActiveSession: (sessionId: string | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

const initialUIState: UIState = {
  isSidebarOpen: true,
  isLibraryOpen: false,
  isSettingsOpen: false,
  isLoading: false,
  activeSessionId: null,
};

export function useUI(initialState: Partial<UIState> = {}): UIState & UIActions {
  const [state, setState] = useState<UIState>({
    ...initialUIState,
    ...initialState,
  });

  const toggleSidebar = useCallback(() => {
    setState((prev) => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }));
  }, []);

  const openSidebar = useCallback(() => {
    setState((prev) => ({ ...prev, isSidebarOpen: true }));
  }, []);

  const closeSidebar = useCallback(() => {
    setState((prev) => ({ ...prev, isSidebarOpen: false }));
  }, []);

  const openLibrary = useCallback(() => {
    setState((prev) => ({ ...prev, isLibraryOpen: true }));
  }, []);

  const closeLibrary = useCallback(() => {
    setState((prev) => ({ ...prev, isLibraryOpen: false }));
  }, []);

  const openSettings = useCallback(() => {
    setState((prev) => ({ ...prev, isSettingsOpen: true }));
  }, []);

  const closeSettings = useCallback(() => {
    setState((prev) => ({ ...prev, isSettingsOpen: false }));
  }, []);

  const setActiveSession = useCallback((sessionId: string | null) => {
    setState((prev) => ({ ...prev, activeSessionId: sessionId }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading }));
  }, []);

  const reset = useCallback(() => {
    setState(initialUIState);
  }, []);

  return {
    ...state,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    openLibrary,
    closeLibrary,
    openSettings,
    closeSettings,
    setActiveSession,
    setLoading,
    reset,
  };
}
