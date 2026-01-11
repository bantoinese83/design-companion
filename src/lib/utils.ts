import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DateFormatOptions } from '@/types/utils';
import { BUSINESS } from './constants';
import { logger } from './logger';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Debounce utility - commented out as unused
// export function debounce<T extends (...args: any[]) => any>(
//   func: T,
//   wait: number
// ): (...args: Parameters<T>) => void {
//   let timeout: NodeJS.Timeout;
//   return (...args: Parameters<T>) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// }

// Format file size - commented out as unused
// export function formatFileSize(bytes: number, options: FileSizeOptions = {}): string {
//   const { unit = 'auto', precision = 1 } = options;

//   if (unit !== 'auto') {
//     const divisor =
//       unit === 'KB' ? 1024 : unit === 'MB' ? 1024 * 1024 : unit === 'GB' ? 1024 * 1024 * 1024 : 1;
//     return `${(bytes / divisor).toFixed(precision)} ${unit}`;
//   }

//   if (bytes === 0) return '0 B';
//   const k = 1024;
//   const sizes = ['B', 'KB', 'MB', 'GB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return `${(bytes / Math.pow(k, i)).toFixed(precision)} ${sizes[i]}`;
// }

// Format timestamp
export function formatTimestamp(timestamp: number, options: DateFormatOptions = {}): string {
  const { locale = 'en-US', format = 'short' } = options;
  const date = new Date(timestamp);

  switch (format) {
    case 'relative':
      return formatRelativeTime(timestamp);
    case 'long':
      return date.toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    case 'short':
    default:
      return date.toLocaleDateString(locale, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
  }
}

function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return new Date(timestamp).toLocaleDateString();
}

// Safe JSON parse
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Check if value is empty
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

// Capitalize first letter
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sleep utility for async operations
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// File Validation Utilities
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  warnings?: string[];
}

/**
 * Validates a file for upload based on system requirements
 */
export function validateRagFile(file: File): FileValidationResult {
  const result: FileValidationResult = {
    isValid: true,
    warnings: [],
  };

  // Check file size
  if (file.size > BUSINESS.RAG.FILE_LIMITS.MAX_SIZE_BYTES) {
    result.isValid = false;
    result.error = `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds the maximum limit of ${BUSINESS.RAG.FILE_LIMITS.MAX_SIZE_MB}MB`;
    return result;
  }

  // Check file type
  const allSupportedTypes = [
    ...BUSINESS.RAG.SUPPORTED_FILE_TYPES.APPLICATION,
    ...BUSINESS.RAG.SUPPORTED_FILE_TYPES.TEXT,
  ] as readonly string[];

  // Get MIME type from file
  const mimeType = file.type.toLowerCase();

  // Check if the file type is supported
  if (!allSupportedTypes.includes(mimeType)) {
    result.isValid = false;
    result.error = `File type "${mimeType}" is not supported. Supported types include PDFs, text files, documents, and various programming files.`;
    return result;
  }

  // Warning for large files (over 20MB might affect performance)
  if (file.size > 20 * 1024 * 1024) {
    result.warnings?.push('Large file detected. Processing may take longer.');
  }

  // Log validation success
  logger.debug('File validation passed', {
    fileName: file.name,
    fileSize: file.size,
    mimeType,
  });

  return result;
}

/**
 * Gets user-friendly file size display
 */
export function formatRagFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

/**
 * Gets file type category for display
 */
export function getFileTypeCategory(mimeType: string): string {
  const applicationTypes = BUSINESS.RAG.SUPPORTED_FILE_TYPES.APPLICATION as readonly string[];
  const textTypes = BUSINESS.RAG.SUPPORTED_FILE_TYPES.TEXT as readonly string[];

  if (applicationTypes.includes(mimeType)) {
    return 'Document';
  }
  if (textTypes.includes(mimeType)) {
    return 'Text/Code';
  }
  return 'Unknown';
}
