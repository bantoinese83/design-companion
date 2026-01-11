import { ErrorSeverity } from './enums';

// Error Types
export interface AppError {
  message: string;
  code?: string;
  severity: ErrorSeverity;
  timestamp: number;
  context?: string;
  recoverable?: boolean;
}
