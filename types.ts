export enum Subject {
  LegalAptitude = 'Legal Aptitude',
  GK = 'General Knowledge',
  LogicalReasoning = 'Logical Reasoning',
  English = 'English',
  Math = 'Mathematics'
}

export interface Topic {
  id: string;
  title: string;
  subject: Subject;
  content: string;
  isCompleted: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  subject: Subject;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Stat {
  subject: Subject;
  score: number; // Percentage
  testsTaken: number;
}