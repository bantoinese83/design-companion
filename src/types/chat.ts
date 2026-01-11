import { Role } from './enums';

// Message and Chat Types
export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  image?: string;
  citations?: import('./api').GroundingChunk[];
  analysis?: DesignAnalysis;
  isError?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
  createdAt?: number;
}

// Design Analysis Types
export interface DesignAnalysis {
  rating: number; // 1-10 scale
  principles: {
    safety: string;
    neuroarchitecture: string;
    acoustics: string;
    lighting: string;
  };
  recommendations: string[];
  timestamp?: number;
}
