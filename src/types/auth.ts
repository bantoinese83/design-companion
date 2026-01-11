import { UserRole } from './enums';

// Auth Types
export interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  storeName: string | null;
  error: string | null;
}
