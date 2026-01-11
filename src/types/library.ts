import { FileProcessingStatus } from './enums';

// Library Types
export interface LibraryFile {
  name: string;
  displayName: string;
  status: FileProcessingStatus;
  size?: number;
  uploadedAt?: number;
  error?: string;
}
