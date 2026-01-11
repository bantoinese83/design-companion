// Centralized error message mapping for user-friendly messages
export const getUserFriendlyErrorMessage = (error: unknown): string => {
  const errorMessage =
    typeof error === 'string'
      ? error
      : error instanceof Error
        ? error.message
        : 'An unexpected error occurred';

  // Network and connectivity errors
  if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
    return 'Unable to connect to the service. Please check your internet connection and try again.';
  }

  // Authentication and authorization errors
  if (
    errorMessage.includes('403') ||
    errorMessage.includes('Forbidden') ||
    errorMessage.includes('unauthorized')
  ) {
    return 'Access blocked! Please check your permissions and try again.';
  }

  // Not found errors
  if (
    errorMessage.includes('404') ||
    errorMessage.includes('Not Found') ||
    errorMessage.includes('Requested entity was not found')
  ) {
    return 'The requested resource was not found. Please check your project configuration.';
  }

  // Rate limiting
  if (
    errorMessage.includes('429') ||
    errorMessage.includes('Too Many Requests') ||
    errorMessage.includes('rate limit')
  ) {
    return 'Too many requests. Please wait a moment and try again.';
  }

  // Server errors
  if (
    errorMessage.includes('500') ||
    errorMessage.includes('Internal Server Error') ||
    errorMessage.includes('server error')
  ) {
    return 'Server temporarily unavailable. Please try again in a few moments.';
  }

  // File upload errors
  if (
    errorMessage.includes('file') ||
    errorMessage.includes('upload') ||
    errorMessage.includes('document')
  ) {
    return 'Failed to process the file. Please check the file format and size, then try again.';
  }

  // Session/Chat errors
  if (
    errorMessage.includes('session') ||
    errorMessage.includes('chat') ||
    errorMessage.includes('message')
  ) {
    return 'Unable to process your request. Please try again.';
  }

  // API key/project errors
  if (
    errorMessage.includes('API key') ||
    errorMessage.includes('project') ||
    errorMessage.includes('billing')
  ) {
    return 'Setup hiccup! Please check your configuration and try again.';
  }

  // Timeout errors
  if (errorMessage.includes('timeout') || errorMessage.includes('TimeoutError')) {
    return 'Request timed out. Please check your connection and try again.';
  }

  // Validation errors
  if (errorMessage.includes('validation') || errorMessage.includes('invalid')) {
    return 'Invalid input provided. Please check your data and try again.';
  }

  // Storage/quota errors
  if (
    errorMessage.includes('storage') ||
    errorMessage.includes('quota') ||
    errorMessage.includes('limit')
  ) {
    return 'Storage limit reached. Please free up space or upgrade your plan.';
  }

  // Default fallback
  return 'Something went wrong. Please try again, or contact support if the issue persists.';
};

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// Get error severity based on error type
export const getErrorSeverity = (error: unknown): ErrorSeverity => {
  const errorMessage =
    typeof error === 'string' ? error : error instanceof Error ? error.message : '';

  if (
    errorMessage.includes('403') ||
    errorMessage.includes('unauthorized') ||
    errorMessage.includes('billing')
  ) {
    return ErrorSeverity.HIGH;
  }

  if (
    errorMessage.includes('500') ||
    errorMessage.includes('server error') ||
    errorMessage.includes('Failed to fetch')
  ) {
    return ErrorSeverity.MEDIUM;
  }

  return ErrorSeverity.LOW;
};

// Error recovery suggestions
export const getErrorRecoverySuggestion = (error: unknown): string => {
  const errorMessage =
    typeof error === 'string' ? error : error instanceof Error ? error.message : '';

  if (errorMessage.includes('403') || errorMessage.includes('API key')) {
    return 'Try tweaking your settings or call in the design cavalry!';
  }

  if (errorMessage.includes('file') || errorMessage.includes('upload')) {
    return 'Check that your file is not corrupted and is in a supported format.';
  }

  if (errorMessage.includes('network') || errorMessage.includes('Failed to fetch')) {
    return 'Check your internet connection and try again.';
  }

  return 'Try refreshing the page or contact support if the issue continues.';
};
