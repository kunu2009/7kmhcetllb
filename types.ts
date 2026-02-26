export enum Subject {
  LegalAptitude = 'Legal Aptitude',
  GK = 'General Knowledge',
  LogicalReasoning = 'Logical Reasoning',
  English = 'English',
  Math = 'Mathematics'
}

export enum CourseTrack {
  LLB3 = 'MH CET Law 3-Year LLB',
  LLB5 = 'MH CET Law 5-Year (BA/BBA LLB)',
  BBA_BMS = 'MH CET BBA/BMS',
  HOTEL_MGMT = 'MH CET Hotel Management',
  OTHER = 'Other MHCET Track'
}

export interface LearnerProfile {
  name: string;
  targetCourse: CourseTrack;
  examYear: string;
  dailyStudyHoursGoal: number;
  onboardingCompleted: boolean;
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
  topic?: string;
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