import React, { useState, useCallback } from 'react';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { logger } from '@/lib/logger';
import { Icons } from '@/lib/icons';

// Error categorization utility
const categorizeError = (
  error: Error
): {
  type: 'network' | 'auth' | 'validation' | 'runtime' | 'unknown';
  severity: 'low' | 'medium' | 'high' | 'critical';
  userMessage: string;
  action: string;
} => {
  const message = error.message.toLowerCase();

  // Network errors
  if (message.includes('fetch') || message.includes('network') || message.includes('connection')) {
    return {
      type: 'network',
      severity: 'medium',
      userMessage: 'Connection issue detected. Please check your internet connection.',
      action: 'Retry Connection',
    };
  }

  // Authentication errors
  if (
    message.includes('auth') ||
    message.includes('unauthorized') ||
    message.includes('forbidden')
  ) {
    return {
      type: 'auth',
      severity: 'high',
      userMessage: 'Authentication required. Please sign in again.',
      action: 'Sign In',
    };
  }

  // Validation errors
  if (
    message.includes('validation') ||
    message.includes('invalid') ||
    message.includes('required')
  ) {
    return {
      type: 'validation',
      severity: 'low',
      userMessage: 'Some information needs to be corrected. Please review your input.',
      action: 'Review Input',
    };
  }

  // Runtime errors (default)
  return {
    type: 'runtime',
    severity: 'medium',
    userMessage: 'An unexpected error occurred. Our team has been notified.',
    action: 'Try Again',
  };
};

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isDevelopment = process.env.NODE_ENV === 'development';

  const errorInfo = React.useMemo(() => categorizeError(error), [error]);

  const handleRetry = useCallback(() => {
    logger.info('User attempted to retry after error', { errorType: errorInfo.type });
    resetErrorBoundary();
  }, [resetErrorBoundary, errorInfo.type]);

  const handleReport = useCallback(() => {
    // In a real app, this would send error details to a service
    logger.error('User reported error', error, {
      errorType: errorInfo.type,
      severity: errorInfo.severity,
      userAgent: navigator.userAgent,
      url: window.location.href,
    });
    alert('Error reported. Thank you for helping us improve!');
  }, [error, errorInfo]);

  const getErrorIcon = () => {
    switch (errorInfo.severity) {
      case 'critical':
        return <Icons.alert className="h-8 w-8 text-red-700" />;
      case 'high':
        return <Icons.alert className="h-8 w-8 text-orange-600" />;
      case 'medium':
        return <Icons.alert className="h-8 w-8 text-yellow-600" />;
      default:
        return <Icons.alert className="h-8 w-8 text-blue-600" />;
    }
  };

  const getErrorColor = () => {
    switch (errorInfo.severity) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'high':
        return 'bg-orange-50 border-orange-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className={`max-w-lg w-full ${getErrorColor()}`}>
        <div className="p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-white p-4 shadow-sm">{getErrorIcon()}</div>
          </div>

          <h2 className="mb-3 text-xl font-bold text-slate-900">
            {errorInfo.severity === 'critical'
              ? 'Critical Error'
              : errorInfo.severity === 'high'
                ? 'Service Unavailable'
                : 'Something went wrong'}
          </h2>

          <p className="mb-6 text-sm text-slate-600 leading-relaxed">{errorInfo.userMessage}</p>

          {isDevelopment && (
            <div className="mb-6 p-4 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">Error Type</span>
                <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">
                  {errorInfo.type} ({errorInfo.severity})
                </span>
              </div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-slate-500 hover:text-slate-700 underline"
              >
                {showDetails ? 'Hide' : 'Show'} Technical Details
              </button>
              {showDetails && (
                <pre className="mt-2 text-xs text-red-800 bg-red-50 p-2 rounded overflow-auto max-h-24">
                  {error.message}
                </pre>
              )}
            </div>
          )}

          <div className="space-y-3">
            <Button onClick={handleRetry} className="w-full">
              <Icons.refresh className="mr-2 h-4 w-4" />
              {errorInfo.action}
            </Button>

            {isDevelopment && (
              <Button onClick={handleReport} variant="secondary" className="w-full">
                Report Error
              </Button>
            )}

            <Button
              onClick={() => window.location.reload()}
              variant="ghost"
              className="w-full text-slate-500"
            >
              Reload Page
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  name?: string; // For identifying which boundary caught the error
  level?: 'page' | 'section' | 'component'; // Error boundary level
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback: Fallback = ErrorFallback,
  onError,
  name = 'Unknown',
  level = 'component',
}) => {
  const handleError = React.useCallback(
    (error: Error, errorInfo: React.ErrorInfo) => {
      // Enhanced error logging with context
      logger.error('Error caught by boundary', error, {
        boundaryName: name,
        boundaryLevel: level,
        componentStack: errorInfo.componentStack,
        errorBoundary: 'react-error-boundary',
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      });

      // Call custom error handler if provided
      if (onError) {
        onError(error, errorInfo);
      }

      // In production, you might want to send this to an error reporting service
      if (process.env.NODE_ENV === 'production') {
        // Example: sendErrorToService(error, errorInfo);
      }
    },
    [onError, name, level]
  );

  const handleReset = React.useCallback(() => {
    logger.info('Error boundary reset triggered', { boundaryName: name, boundaryLevel: level });

    // Clear any cached error state
    // You could clear localStorage, reset global state, etc.
    try {
      // Clear any error-related localStorage keys
      const keysToRemove = Object.keys(localStorage).filter(
        (key) => key.includes('error') || key.includes('Error')
      );
      keysToRemove.forEach((key) => localStorage.removeItem(key));
    } catch (e) {
      // Ignore localStorage errors during reset
    }
  }, [name, level]);

  return (
    <ReactErrorBoundary
      FallbackComponent={Fallback}
      onError={handleError}
      onReset={handleReset}
      resetKeys={[]} // Add keys that should trigger a reset when changed
    >
      {children}
    </ReactErrorBoundary>
  );
};

export { ErrorBoundary, ErrorFallback };
