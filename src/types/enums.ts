// Enum definitions
export enum UserRole {
  ARCHITECT = 'ARCHITECT',
  ADMIN = 'ADMIN',
}

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum FileStatus {
  INDEXED = 'indexed',
  PROCESSING = 'processing',
  ERROR = 'error',
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

// Type aliases for enums
export type Role = MessageRole;
export type FileProcessingStatus = FileStatus;
