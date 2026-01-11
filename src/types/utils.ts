import { LucideIcon } from '@/lib/icons';

// Utility Types
export interface Timestamped {
  createdAt?: number;
  updatedAt?: number;
}

export interface Identifiable {
  id: string;
}

export interface Named {
  name: string;
  displayName?: string;
}

// Form Types
export interface FileUploadForm {
  file: File | null;
  context: string;
}

export interface MessageForm {
  content: string;
  image?: string;
}

// Event Handler Types
export type EventHandler<T = Event> = (event: T) => void;
export type ClickHandler = () => void;
export type ChangeHandler<T = string> = (value: T) => void;
export type SubmitHandler<T = any> = (data: T) => void | Promise<void>;

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
}

// Theme Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  subtle: string;
  success: string;
  warning: string;
  danger: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

export interface ThemeBorderRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// Format utility types
export interface DateFormatOptions {
  locale?: string;
  format?: 'short' | 'long' | 'relative';
}

export interface FileSizeOptions {
  unit?: 'B' | 'KB' | 'MB' | 'GB';
  precision?: number;
}
