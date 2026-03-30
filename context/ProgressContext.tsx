import React, { createContext, useContext, useState, useEffect } from 'react';
import { CourseTrack, LearnerProfile, Subject } from '../types';
import { getDefaultExamIdByTrack } from '../data/cetExamData';

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

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'study' | 'test' | 'streak' | 'mastery' | 'special';
  requirement: number;
  progress: number;
  unlocked: boolean;
  unlockedAt?: number;
}

interface ProgressState {
  stats: {
    accuracy: number;
    topicsMastered: number;
    studyHours: number;
    weakArea: string;
    dailyStreak: number;
    bestStreak: number;
    totalTestsTaken: number;
    perfectScores: number;
  };
  todos: TodoItem[];
  testHistory: TestResult[];
  subjectMastery: Record<Subject, number>;
  achievements: Achievement[];
  lastActiveDate: string;
  learnerProfile: LearnerProfile;
}

interface ProgressContextType extends ProgressState {
  toggleTodo: (id: string) => void;
  addTodo: (task: string) => void;
  addTestResult: (result: TestResult) => void;
  incrementStudyHours: (hours: number) => void;
  markTopicMastered: () => void;
  checkAndUpdateStreak: () => void;
  getUnlockedAchievements: () => Achievement[];
  getLockedAchievements: () => Achievement[];
  updateLearnerProfile: (updates: Partial<LearnerProfile>) => void;
  completeOnboarding: () => void;
  applyStarterGoalsByTrack: (track: CourseTrack) => void;
}

const DEFAULT_LEARNER_PROFILE: LearnerProfile = {
  name: '',
  targetCourse: CourseTrack.LLB3,
  selectedExamId: getDefaultExamIdByTrack(CourseTrack.LLB3),
  examYear: '2026',
  dailyStudyHoursGoal: 2,
  onboardingCompleted: false
};

const ACHIEVEMENTS_TEMPLATE: Omit<Achievement, 'progress' | 'unlocked' | 'unlockedAt'>[] = [
  // Study Achievements
  { id: 'first-steps', title: 'First Steps', description: 'Complete your first study session', icon: '🌱', category: 'study', requirement: 1 },
  { id: 'dedicated-learner', title: 'Dedicated Learner', description: 'Study for 10 hours total', icon: '📚', category: 'study', requirement: 10 },
  { id: 'study-master', title: 'Study Master', description: 'Study for 50 hours total', icon: '🎓', category: 'study', requirement: 50 },
  { id: 'marathon-scholar', title: 'Marathon Scholar', description: 'Study for 100 hours total', icon: '🏅', category: 'study', requirement: 100 },
  
  // Test Achievements  
  { id: 'test-taker', title: 'Test Taker', description: 'Complete your first mock test', icon: '✍️', category: 'test', requirement: 1 },
  { id: 'test-warrior', title: 'Test Warrior', description: 'Complete 10 mock tests', icon: '⚔️', category: 'test', requirement: 10 },
  { id: 'test-champion', title: 'Test Champion', description: 'Complete 25 mock tests', icon: '🏆', category: 'test', requirement: 25 },
  { id: 'perfectionist', title: 'Perfectionist', description: 'Score 100% on any test', icon: '💯', category: 'test', requirement: 1 },
  { id: 'accuracy-ace', title: 'Accuracy Ace', description: 'Maintain 80%+ accuracy overall', icon: '🎯', category: 'test', requirement: 80 },
  
  // Streak Achievements
  { id: 'on-fire', title: 'On Fire', description: 'Maintain a 3-day study streak', icon: '🔥', category: 'streak', requirement: 3 },
  { id: 'week-warrior', title: 'Week Warrior', description: 'Maintain a 7-day study streak', icon: '💪', category: 'streak', requirement: 7 },
  { id: 'consistency-king', title: 'Consistency King', description: 'Maintain a 14-day study streak', icon: '👑', category: 'streak', requirement: 14 },
  { id: 'unstoppable', title: 'Unstoppable', description: 'Maintain a 30-day study streak', icon: '🚀', category: 'streak', requirement: 30 },
  
  // Mastery Achievements
  { id: 'topic-explorer', title: 'Topic Explorer', description: 'Master 5 topics', icon: '🗺️', category: 'mastery', requirement: 5 },
  { id: 'knowledge-seeker', title: 'Knowledge Seeker', description: 'Master 15 topics', icon: '🔍', category: 'mastery', requirement: 15 },
  { id: 'legal-eagle', title: 'Legal Eagle', description: 'Score 90% in Legal Aptitude', icon: '⚖️', category: 'mastery', requirement: 90 },
  { id: 'gk-guru', title: 'GK Guru', description: 'Score 90% in General Knowledge', icon: '🌍', category: 'mastery', requirement: 90 },
  
  // Special Achievements
  { id: 'early-bird', title: 'Early Bird', description: 'Complete a study session before 8 AM', icon: '🌅', category: 'special', requirement: 1 },
  { id: 'night-owl', title: 'Night Owl', description: 'Complete a study session after 10 PM', icon: '🦉', category: 'special', requirement: 1 },
  { id: 'comeback-kid', title: 'Comeback Kid', description: 'Improve test score by 20% from previous test', icon: '📈', category: 'special', requirement: 1 },
  { id: 'glc-ready', title: 'GLC Ready', description: 'Score 140+ in a full mock test', icon: '🏛️', category: 'special', requirement: 140 },
];

const initializeAchievements = (): Achievement[] => {
  return ACHIEVEMENTS_TEMPLATE.map(a => ({
    ...a,
    progress: 0,
    unlocked: false
  }));
};

const INITIAL_TODOS: TodoItem[] = [
  { id: '1', task: "Law of Torts: Vicarious Liability", subject: Subject.LegalAptitude, completed: false },
  { id: '2', task: "Current Affairs: Oct 2023 Highlights", subject: Subject.GK, completed: false },
  { id: '3', task: "Syllogisms Practice Set 2", subject: Subject.LogicalReasoning, completed: false },
  { id: '4', task: "Reading Comprehension: Tone Analysis", subject: Subject.English, completed: false },
];

const getStarterTodosByTrack = (track: CourseTrack): TodoItem[] => {
  const starterMap: Record<CourseTrack, Omit<TodoItem, 'id' | 'completed'>[]> = {
    [CourseTrack.LLB3]: [
      { task: 'Constitution Basics: Preamble + Fundamental Rights', subject: Subject.LegalAptitude },
      { task: 'Legal Maxims Practice Set 1', subject: Subject.LegalAptitude },
      { task: 'Daily Current Affairs: Legal + Polity', subject: Subject.GK },
      { task: 'Syllogisms + Critical Reasoning Drill', subject: Subject.LogicalReasoning }
    ],
    [CourseTrack.LLB5]: [
      { task: 'Legal Aptitude Foundation Set', subject: Subject.LegalAptitude },
      { task: 'English Comprehension Starter', subject: Subject.English },
      { task: 'Logical Reasoning Mixed Drill', subject: Subject.LogicalReasoning },
      { task: 'Static GK + Current Affairs Round', subject: Subject.GK },
      { task: 'Basic Mathematics Quick Drill (Percentages + Ratio)', subject: Subject.Math }
    ],
    [CourseTrack.BBA_BMS]: [
      { task: 'Quant Foundation: Percentage + Ratio', subject: Subject.Math },
      { task: 'Business Aptitude Reasoning Set', subject: Subject.LogicalReasoning },
      { task: 'English Vocabulary + RC Starter', subject: Subject.English },
      { task: 'GK: Economy + Business News', subject: Subject.GK }
    ],
    [CourseTrack.HOTEL_MGMT]: [
      { task: 'Service Aptitude Communication Practice', subject: Subject.English },
      { task: 'Reasoning Set: Arrangement + Puzzles', subject: Subject.LogicalReasoning },
      { task: 'Basic Numerical Ability Drill', subject: Subject.Math },
      { task: 'Hospitality GK: Tourism + Current Affairs', subject: Subject.GK }
    ],
    [CourseTrack.OTHER]: [
      { task: 'General Aptitude Baseline Test', subject: Subject.LogicalReasoning },
      { task: 'English Comprehension Starter', subject: Subject.English },
      { task: 'Quant Basics Drill', subject: Subject.Math },
      { task: 'Current Affairs Snapshot', subject: Subject.GK }
    ]
  };

  return starterMap[track].map((todo, index) => ({
    ...todo,
    id: `${Date.now()}-${index}`,
    completed: false
  }));
};

const getToday = () => new Date().toISOString().split('T')[0];

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProgressState>(() => {
    const saved = localStorage.getItem('lawranker_progress');
    try {
        const parsed = saved ? JSON.parse(saved) : null;
        if (parsed) {
          // Ensure achievements exist with all fields
          if (!parsed.achievements || parsed.achievements.length < ACHIEVEMENTS_TEMPLATE.length) {
            parsed.achievements = initializeAchievements();
          }
          // Ensure new stats fields exist
          if (!parsed.stats.dailyStreak) parsed.stats.dailyStreak = 0;
          if (!parsed.stats.bestStreak) parsed.stats.bestStreak = 0;
          if (!parsed.stats.totalTestsTaken) parsed.stats.totalTestsTaken = parsed.testHistory?.length || 0;
          if (!parsed.stats.perfectScores) parsed.stats.perfectScores = 0;
          if (!parsed.lastActiveDate) parsed.lastActiveDate = '';
          if (!parsed.learnerProfile) parsed.learnerProfile = DEFAULT_LEARNER_PROFILE;
          if (!parsed.learnerProfile.targetCourse) parsed.learnerProfile.targetCourse = CourseTrack.LLB3;
          if (!parsed.learnerProfile.selectedExamId) parsed.learnerProfile.selectedExamId = getDefaultExamIdByTrack(parsed.learnerProfile.targetCourse || CourseTrack.LLB3);
          if (!parsed.learnerProfile.examYear) parsed.learnerProfile.examYear = '2026';
          if (!parsed.learnerProfile.dailyStudyHoursGoal) parsed.learnerProfile.dailyStudyHoursGoal = 2;
          if (parsed.learnerProfile.onboardingCompleted === undefined) parsed.learnerProfile.onboardingCompleted = false;
          return parsed;
        }
        return {
            stats: { 
              accuracy: 0, 
              topicsMastered: 0, 
              studyHours: 0, 
              weakArea: 'None yet',
              dailyStreak: 0,
              bestStreak: 0,
              totalTestsTaken: 0,
              perfectScores: 0
            },
            todos: INITIAL_TODOS,
            testHistory: [],
            subjectMastery: {
              [Subject.LegalAptitude]: 0,
              [Subject.GK]: 0,
              [Subject.LogicalReasoning]: 0,
              [Subject.English]: 0,
              [Subject.Math]: 0
            },
            achievements: initializeAchievements(),
            lastActiveDate: '',
            learnerProfile: DEFAULT_LEARNER_PROFILE
          };
    } catch {
        return {
            stats: { 
              accuracy: 0, 
              topicsMastered: 0, 
              studyHours: 0, 
              weakArea: 'None yet',
              dailyStreak: 0,
              bestStreak: 0,
              totalTestsTaken: 0,
              perfectScores: 0
            },
            todos: INITIAL_TODOS,
            testHistory: [],
            subjectMastery: {
              [Subject.LegalAptitude]: 0,
              [Subject.GK]: 0,
              [Subject.LogicalReasoning]: 0,
              [Subject.English]: 0,
              [Subject.Math]: 0
            },
            achievements: initializeAchievements(),
            lastActiveDate: '',
            learnerProfile: DEFAULT_LEARNER_PROFILE
          };
    }
  });

  useEffect(() => {
    localStorage.setItem('lawranker_progress', JSON.stringify(state));
  }, [state]);

  const updateAchievements = (currentState: ProgressState): Achievement[] => {
    return currentState.achievements.map(achievement => {
      if (achievement.unlocked) return achievement;
      
      let newProgress = achievement.progress;
      let shouldUnlock = false;
      
      switch (achievement.id) {
        // Study achievements
        case 'first-steps':
          newProgress = currentState.stats.studyHours > 0 ? 1 : 0;
          shouldUnlock = newProgress >= achievement.requirement;
          break;
        case 'dedicated-learner':
        case 'study-master':
        case 'marathon-scholar':
          newProgress = currentState.stats.studyHours;
          shouldUnlock = newProgress >= achievement.requirement;
          break;
          
        // Test achievements
        case 'test-taker':
          newProgress = currentState.stats.totalTestsTaken > 0 ? 1 : 0;
          shouldUnlock = newProgress >= achievement.requirement;
          break;
        case 'test-warrior':
        case 'test-champion':
          newProgress = currentState.stats.totalTestsTaken;
          shouldUnlock = newProgress >= achievement.requirement;
          break;
        case 'perfectionist':
          newProgress = currentState.stats.perfectScores;
          shouldUnlock = newProgress >= achievement.requirement;
          break;
        case 'accuracy-ace':
          newProgress = currentState.stats.accuracy;
          shouldUnlock = currentState.stats.totalTestsTaken >= 3 && newProgress >= achievement.requirement;
          break;
          
        // Streak achievements
        case 'on-fire':
        case 'week-warrior':
        case 'consistency-king':
        case 'unstoppable':
          newProgress = currentState.stats.bestStreak;
          shouldUnlock = newProgress >= achievement.requirement;
          break;
          
        // Mastery achievements
        case 'topic-explorer':
        case 'knowledge-seeker':
          newProgress = currentState.stats.topicsMastered;
          shouldUnlock = newProgress >= achievement.requirement;
          break;
        case 'legal-eagle':
          newProgress = currentState.subjectMastery[Subject.LegalAptitude] || 0;
          shouldUnlock = newProgress >= achievement.requirement;
          break;
        case 'gk-guru':
          newProgress = currentState.subjectMastery[Subject.GK] || 0;
          shouldUnlock = newProgress >= achievement.requirement;
          break;
      }
      
      return {
        ...achievement,
        progress: Math.min(newProgress, achievement.requirement),
        unlocked: shouldUnlock,
        unlockedAt: shouldUnlock && !achievement.unlocked ? Date.now() : achievement.unlockedAt
      };
    });
  };

  const checkAndUpdateStreak = () => {
    const today = getToday();
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    setState(prev => {
      let newStreak = prev.stats.dailyStreak;
      let newBestStreak = prev.stats.bestStreak;
      
      if (prev.lastActiveDate === today) {
        // Already active today, no change
        return prev;
      } else if (prev.lastActiveDate === yesterday) {
        // Consecutive day, increment streak
        newStreak = prev.stats.dailyStreak + 1;
      } else if (prev.lastActiveDate !== today) {
        // Streak broken or first day
        newStreak = 1;
      }
      
      newBestStreak = Math.max(newBestStreak, newStreak);
      
      const newState = {
        ...prev,
        stats: {
          ...prev.stats,
          dailyStreak: newStreak,
          bestStreak: newBestStreak
        },
        lastActiveDate: today
      };
      
      return {
        ...newState,
        achievements: updateAchievements(newState)
      };
    });
  };

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
      subject: Subject.LegalAptitude,
      completed: false
    };
    setState(prev => ({
      ...prev,
      todos: [newTodo, ...prev.todos]
    }));
  };

  const incrementStudyHours = (hours: number) => {
    setState(prev => {
      const newState = {
        ...prev,
        stats: { ...prev.stats, studyHours: +(prev.stats.studyHours + hours).toFixed(1) }
      };
      return {
        ...newState,
        achievements: updateAchievements(newState)
      };
    });
  };

  const markTopicMastered = () => {
    setState(prev => {
      const newState = {
        ...prev,
        stats: { ...prev.stats, topicsMastered: prev.stats.topicsMastered + 1 }
      };
      return {
        ...newState,
        achievements: updateAchievements(newState)
      };
    });
  };

  const getUnlockedAchievements = () => state.achievements.filter(a => a.unlocked);
  const getLockedAchievements = () => state.achievements.filter(a => !a.unlocked);

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

      // Check for perfect score
      const isPerfect = result.score === result.total && result.total > 0;
      const newPerfectScores = isPerfect ? prev.stats.perfectScores + 1 : prev.stats.perfectScores;

      const newState: ProgressState = {
        ...prev,
        testHistory: newHistory,
        subjectMastery: newSubjectMastery,
        stats: {
          ...prev.stats,
          accuracy: newAccuracy,
          weakArea: weakest,
          totalTestsTaken: prev.stats.totalTestsTaken + 1,
          perfectScores: newPerfectScores
        }
      };

      return {
        ...newState,
        achievements: updateAchievements(newState)
      };
    });
  };

  const updateLearnerProfile = (updates: Partial<LearnerProfile>) => {
    setState(prev => ({
      ...prev,
      learnerProfile: {
        ...prev.learnerProfile,
        ...updates
      }
    }));
  };

  const completeOnboarding = () => {
    setState(prev => {
      if (prev.learnerProfile.onboardingCompleted) return prev;

      return {
        ...prev,
        todos: getStarterTodosByTrack(prev.learnerProfile.targetCourse),
        learnerProfile: {
          ...prev.learnerProfile,
          onboardingCompleted: true
        }
      };
    });
  };

  const applyStarterGoalsByTrack = (track: CourseTrack) => {
    setState(prev => ({
      ...prev,
      todos: getStarterTodosByTrack(track)
    }));
  };

  return (
    <ProgressContext.Provider value={{ 
      ...state, 
      toggleTodo, 
      addTodo, 
      addTestResult, 
      incrementStudyHours, 
      markTopicMastered,
      checkAndUpdateStreak,
      getUnlockedAchievements,
      getLockedAchievements,
      updateLearnerProfile,
      completeOnboarding,
      applyStarterGoalsByTrack
    }}>
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
