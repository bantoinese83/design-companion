import { useState, useEffect, useCallback } from 'react';
import { UserRole } from '@/types/index';
import { logger } from '../lib/logger';

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (role: UserRole) => void;
  logout: () => void;
  clearError: () => void;
}

export function useAuth(): AuthState & AuthActions {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    role: UserRole.ARCHITECT,
    isLoading: true,
    error: null,
  });

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedAuth = localStorage.getItem('dc_auth');
        if (savedAuth) {
          const parsed = JSON.parse(savedAuth);
          setState({
            isAuthenticated: true,
            role: parsed.role || UserRole.ARCHITECT,
            isLoading: false,
            error: null,
          });
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        logger.warn('Error loading auth state', { error });
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Failed to load authentication state',
        }));
      }
    };

    checkAuth();
  }, []);

  const login = useCallback((role: UserRole) => {
    try {
      const authData = { role, timestamp: Date.now() };
      localStorage.setItem('dc_auth', JSON.stringify(authData));
      setState({
        isAuthenticated: true,
        role,
        isLoading: false,
        error: null,
      });
      logger.logAuthEvent('login', 'user123'); // Example structured log
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to save authentication state',
      }));
      logger.error(
        'Failed to save authentication state',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('dc_auth');
      setState({
        isAuthenticated: false,
        role: UserRole.ARCHITECT,
        isLoading: false,
        error: null,
      });
      logger.logAuthEvent('logout', 'user123'); // Example structured log
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to clear authentication state',
      }));
      logger.error(
        'Failed to clear authentication state',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    login,
    logout,
    clearError,
  };
}
