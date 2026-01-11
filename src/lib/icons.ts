/**
 * Centralized icon system for the Architectural Design Companion
 * Single source of truth for all icons used in the application
 */

import {
  // Navigation & UI
  Plus,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  Loader2,
  Send,

  // Content & Data
  MessageSquare,
  FileText,
  BookOpen,
  Quote,
  Key,
  Zap,
  Trash2,
  Upload,
  LogOut,
  Database,

  // Analysis & Design
  Activity,
  Shield,
  ShieldCheck,
  Sun,
  Volume2,
  Brain,
  Layers,
  Eye,
  Compass,

  // Status & Feedback
  AlertCircle,
  AlertTriangle,

  // Type for icon components
  type LucideIcon,
} from 'lucide-react';

// Export the LucideIcon type for TypeScript
export type { LucideIcon };

// Navigation & UI Icons
export const Icons = {
  // Basic UI
  plus: Plus,
  menu: Menu,
  close: X,
  check: CheckCircle2,
  loader: Loader2,
  refresh: RefreshCw,
  alert: AlertCircle,
  alertTriangle: AlertTriangle,
  send: Send,

  // Navigation
  arrowRight: ArrowRight,
  chevronRight: ChevronRight,
  externalLink: ExternalLink,

  // Content
  message: MessageSquare,
  file: FileText,
  book: BookOpen,
  quote: Quote,
  key: Key,
  sparkles: Zap,
  trash: Trash2,
  upload: Upload,
  logout: LogOut,
  database: Database,

  // Analysis & Design
  activity: Activity,
  shield: Shield,
  shieldCheck: ShieldCheck,
  sun: Sun,
  volume: Volume2,
  brain: Brain,
  layers: Layers,
  eye: Eye,
  compass: Compass,
} as const;

// Type for icon keys
export type IconKey = keyof typeof Icons;

// Helper function to get icon by key
export const getIcon = (key: IconKey): LucideIcon => {
  return Icons[key];
};

// Helper function to get all icon keys (useful for validation)
export const getIconKeys = (): IconKey[] => {
  return Object.keys(Icons) as IconKey[];
};

// Re-export commonly used icons with descriptive names for specific contexts
export const UIIcons = {
  add: Plus,
  menu: Menu,
  close: X,
  loading: Loader2,
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
} as const;

export const ContentIcons = {
  message: MessageSquare,
  document: FileText,
  library: BookOpen,
  citation: Quote,
  apiKey: Key,
  magic: Zap,
  delete: Trash2,
  upload: Upload,
  signOut: LogOut,
  database: Database,
} as const;

export const AnalysisIcons = {
  performance: Activity,
  security: Shield,
  safety: ShieldCheck,
  lighting: Sun,
  acoustics: Volume2,
  neuroscience: Brain,
  design: Layers,
  vision: Eye,
  navigation: Compass,
} as const;

// Export everything for backward compatibility during migration
export {
  Plus,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  Loader2,
  MessageSquare,
  FileText,
  BookOpen,
  Quote,
  Key,
  Zap,
  Trash2,
  Upload,
  LogOut,
  Database,
  Activity,
  Shield,
  ShieldCheck,
  Sun,
  Volume2,
  Brain,
  Layers,
  Eye,
  Compass,
  AlertCircle,
  AlertTriangle,
};
