import { UserRole } from './enums';
import { AuthState, UIState, ChatSession, LibraryFile, GroundingChunk } from './index';

// Hook Return Types
export interface UseAuthReturn {
  auth: AuthState;
  hasApiKey: boolean | null;
  storeLoading: boolean;
  handleSelectRole: (role: UserRole) => void;
  handleLogout: () => void;
  handleOpenKeySelection: () => Promise<void>;
}

export interface UseSessionsReturn {
  sessions: ChatSession[];
  activeSession: ChatSession | null;
  createSession: () => void;
  deleteSession: (sessionId: string) => void;
  input: string;
  setInput: (value: string) => void;
  attachedImage: string | null;
  setAttachedImage: (image: string | null) => void;
  handleSend: () => Promise<void>;
  isSending: boolean;
  sendError: string | null;
  confirmDelete: { type: 'session' | 'file'; id: string; name: string } | null;
  setConfirmDelete: (value: { type: 'session' | 'file'; id: string; name: string } | null) => void;
  handleConfirmDelete: () => void;
  selectedCitation: GroundingChunk | null;
  setSelectedCitation: (citation: GroundingChunk | null) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export interface UseLibraryReturn {
  libraryFiles: LibraryFile[];
  pendingFile: File | null;
  setPendingFile: (file: File | null) => void;
  uploadContext: string;
  setUploadContext: (context: string) => void;
  handleUploadFile: () => Promise<void>;
  handleDeleteDocument: (fileName: string) => Promise<void>;
  isUploading: boolean;
  uploadError: string | null;
  isDeleting: boolean;
  deleteError: string | null;
  confirmDelete: { type: 'session' | 'file'; id: string; name: string } | null;
  setConfirmDelete: (value: { type: 'session' | 'file'; id: string; name: string } | null) => void;
  handleConfirmDelete: () => void;
}

export interface UseUIReturn {
  ui: UIState;
  toggleSidebar: () => void;
  openLibrary: () => void;
  closeLibrary: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  setLoading: (isLoading: boolean) => void;
  setActiveSession: (sessionId: string | null) => void;
}

// Generic Async State
export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
