import { UserRole } from './enums';
import { UseAuthReturn, UseSessionsReturn, UseLibraryReturn, UseUIReturn } from './hooks';

// Context Types
export interface AppContextType {
  // State
  auth: UseAuthReturn;
  sessions: UseSessionsReturn;
  library: UseLibraryReturn;
  ui: UseUIReturn;

  // Actions
  selectRole: (role: UserRole) => void;
  createNewSession: () => Promise<string>;
  sendMessage: (content: string, image?: string) => Promise<void>;
  deleteSession: (sessionId: string) => void;
  uploadDocument: (file: File, context?: string) => Promise<void>;
  removeDocument: (fileName: string) => Promise<void>;
  toggleSidebar: () => void;
  openLibrary: () => void;
  closeLibrary: () => void;
  handleError: (error: any) => void;
  clearErrors: () => void;
}
