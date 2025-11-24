import React, { createContext, useContext, useState, useEffect } from 'react';
import { Subject } from '../types';

export interface TodoItem {
  id: string;
  task: string;
  subject: Subject;
  completed: boolean;
}

export interface TestResult {
  id: string;
  date: number;
  score: number;
  total: number;
  subjectBreakdown: Record<string, { correct: number, total: number }>;
}

interface ProgressState {
  stats: {
    accuracy: number;
    topicsMastered: number;
    studyHours: number;
    weakArea: string;
  };
  todos: TodoItem[];
  testHistory: TestResult[];
  subjectMastery: Record<Subject, number>;
}

interface ProgressContextType extends ProgressState {
  toggleTodo: (id: string) => void;
  addTodo: (task: string) => void;
  addTestResult: (result: TestResult) => void;
  incrementStudyHours: (hours: number) => void;
  markTopicMastered: () => void;
}

const INITIAL_TODOS: TodoItem[] = [
  { id: '1', task: "Law of Torts: Vicarious Liability", subject: Subject.LegalAptitude, completed: false },
  { id: '2', task: "Current Affairs: Oct 2023 Highlights", subject: Subject.GK, completed: false },
  { id: '3', task: "Syllogisms Practice Set 2", subject: Subject.LogicalReasoning, completed: false },
  { id: '4', task: "Reading Comprehension: Tone Analysis", subject: Subject.English, completed: false },
];

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProgressState>(() => {
    const saved = localStorage.getItem('lawranker_progress');
    try {
        return saved ? JSON.parse(saved) : {
            stats: { accuracy: 0, topicsMastered: 0, studyHours: 0, weakArea: 'None yet' },
            todos: INITIAL_TODOS,
            testHistory: [],
            subjectMastery: {
              [Subject.LegalAptitude]: 0,
              [Subject.GK]: 0,
              [Subject.LogicalReasoning]: 0,
              [Subject.English]: 0,
              [Subject.Math]: 0
            }
          };
    } catch {
        return {
            stats: { accuracy: 0, topicsMastered: 0, studyHours: 0, weakArea: 'None yet' },
            todos: INITIAL_TODOS,
            testHistory: [],
            subjectMastery: {
              [Subject.LegalAptitude]: 0,
              [Subject.GK]: 0,
              [Subject.LogicalReasoning]: 0,
              [Subject.English]: 0,
              [Subject.Math]: 0
            }
          };
    }
  });

  useEffect(() => {
    localStorage.setItem('lawranker_progress', JSON.stringify(state));
  }, [state]);

  const toggleTodo = (id: string) => {
    setState(prev => ({
      ...prev,
      todos: prev.todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    }));
  };

  const addTodo = (task: string) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      task,
      subject: Subject.LegalAptitude, // Default subject
      completed: false
    };
    setState(prev => ({
      ...prev,
      todos: [newTodo, ...prev.todos]
    }));
  };

  const incrementStudyHours = (hours: number) => {
    setState(prev => ({
      ...prev,
      stats: { ...prev.stats, studyHours: +(prev.stats.studyHours + hours).toFixed(1) }
    }));
  };

  const markTopicMastered = () => {
    setState(prev => ({
      ...prev,
      stats: { ...prev.stats, topicsMastered: prev.stats.topicsMastered + 1 }
    }));
  };

  const addTestResult = (result: TestResult) => {
    setState(prev => {
      const newHistory = [...prev.testHistory, result];
      
      const totalQuestions = newHistory.reduce((acc, curr) => acc + curr.total, 0);
      const totalCorrect = newHistory.reduce((acc, curr) => acc + curr.score, 0);
      const newAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

      const newSubjectMastery = { ...prev.subjectMastery };
      const subjectTotals: Record<string, {correct: number, total: number}> = {};

      newHistory.forEach(test => {
        Object.entries(test.subjectBreakdown).forEach(([sub, data]: [string, { correct: number, total: number }]) => {
          if (!subjectTotals[sub]) subjectTotals[sub] = { correct: 0, total: 0 };
          subjectTotals[sub].correct += data.correct;
          subjectTotals[sub].total += data.total;
        });
      });

      Object.keys(newSubjectMastery).forEach(key => {
        const subData = subjectTotals[key];
        if (subData && subData.total > 0) {
          // @ts-ignore
          newSubjectMastery[key] = Math.round((subData.correct / subData.total) * 100);
        }
      });

      let weakest = 'None yet';
      let minScore = 101;
      Object.entries(newSubjectMastery).forEach(([sub, score]: [string, number]) => {
        if (score < minScore && score >= 0 && subjectTotals[sub]?.total > 0) {
          minScore = score;
          weakest = sub;
        }
      });

      return {
        ...prev,
        testHistory: newHistory,
        subjectMastery: newSubjectMastery,
        stats: {
          ...prev.stats,
          accuracy: newAccuracy,
          weakArea: weakest
        }
      };
    });
  };

  return (
    <ProgressContext.Provider value={{ ...state, toggleTodo, addTodo, addTestResult, incrementStudyHours, markTopicMastered }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
