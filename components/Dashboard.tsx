import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Clock, AlertCircle, ChevronRight, CheckCircle2, Circle, Activity, BookOpen, Target, Zap, Trophy, BrainCircuit, Plus, Scale, FileText, Layers, Building2, Flame, Calendar, Star, Lock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import OnboardingWizard from './OnboardingWizard';
import { CourseTrack } from '../types';
import { getDefaultExamIdByTrack, getExamById } from '../data/cetExamData';
import { getTrackSubjectBlueprints } from '../data/trackSubjectBlueprints';

// Legal Maxims for "Maxim of the Day"
const DAILY_MAXIMS = [
  { latin: 'Actus non facit reum nisi mens sit rea', meaning: 'An act does not make one guilty unless the mind is also guilty', usage: 'Criminal Law - Both actus reus and mens rea needed' },
  { latin: 'Ignorantia juris non excusat', meaning: 'Ignorance of law is no excuse', usage: 'Everyone is presumed to know the law' },
  { latin: 'Ubi jus ibi remedium', meaning: 'Where there is a right, there is a remedy', usage: 'Foundation of legal remedies' },
  { latin: 'Audi alteram partem', meaning: 'Hear the other side', usage: 'Natural Justice - No one condemned unheard' },
  { latin: 'Volenti non fit injuria', meaning: 'To one who consents, no injury is done', usage: 'Defense in Law of Torts' },
  { latin: 'Res ipsa loquitur', meaning: 'The thing speaks for itself', usage: 'Negligence - when accident itself proves negligence' },
  { latin: 'Nemo judex in causa sua', meaning: 'No one can be judge in their own cause', usage: 'Principle of Natural Justice' },
];

interface FreshnessChecklistItem {
  id: string;
  title: string;
  dataset: string;
  completed: boolean;
  lastCheckedAt?: number;
}

const getMonthStamp = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${date.getFullYear()}-${month}`;
};

const createMonthlyFreshnessChecklist = (): FreshnessChecklistItem[] => [
  { id: 'legal-cases', title: 'Update landmark legal cases and amendments', dataset: 'Legal Notes + Quick Revision', completed: false },
  { id: 'gk-current', title: 'Refresh current affairs (appointments, awards, policy)', dataset: 'GK + Reels', completed: false },
  { id: 'gk-static', title: 'Audit static GK facts and remove stale entries', dataset: 'GK Master Notes', completed: false },
  { id: 'practice-bank', title: 'Validate question bank and fallback relevance', dataset: 'Mock + Fallback Banks', completed: false }
];

const getLaneIcon = (subject: string) => {
  const label = subject.toLowerCase();
  if (label.includes('legal') || label.includes('law')) return Scale;
  if (label.includes('logical') || label.includes('analytical') || label.includes('reasoning')) return BrainCircuit;
  if (label.includes('english') || label.includes('language') || label.includes('reading')) return FileText;
  if (label.includes('gk') || label.includes('current') || label.includes('awareness')) return Activity;
  if (label.includes('math') || label.includes('quant') || label.includes('aptitude') || label.includes('data')) return Target;
  if (label.includes('business') || label.includes('commerce') || label.includes('economy')) return Building2;
  return BookOpen;
};

const getDrillTemplate = (subject: string) => {
  const label = subject.toLowerCase();

  if (label.includes('legal') || label.includes('law')) {
    return {
      focus: 'Principle-Fact + Contract/Tort mixed set',
      action: '25 min principle-fact solve + 15 legal MCQs',
      route: `/study?tab=library&subject=${encodeURIComponent(subject)}`
    };
  }

  if (label.includes('logical') || label.includes('reasoning')) {
    return {
      focus: 'Syllogism + arrangements speed drill',
      action: '20 min puzzles + 20 reasoning MCQs',
      route: '/practice?mode=mixed'
    };
  }

  if (label.includes('english') || label.includes('reading')) {
    return {
      focus: 'RC precision + grammar error spotting',
      action: '1 RC passage + 15 grammar MCQs',
      route: '/study?tab=quick-revision'
    };
  }

  if (label.includes('general') || label.includes('gk') || label.includes('current')) {
    return {
      focus: 'Current affairs + static polity revision',
      action: '15 current affairs notes + 20 GK MCQs',
      route: `/study?tab=library&subject=${encodeURIComponent(subject)}`
    };
  }

  if (label.includes('math') || label.includes('quant')) {
    return {
      focus: 'Percentages-ratio-time speed worksheet',
      action: '20 quant drills + 10 DI questions',
      route: '/practice?mode=topic'
    };
  }

  return {
    focus: 'Concept recap + targeted question set',
    action: '15 min revision + 20 MCQs',
    route: '/practice'
  };
};

const Dashboard: React.FC = () => {
  const { stats, todos, toggleTodo, addTodo, achievements, checkAndUpdateStreak, getUnlockedAchievements, learnerProfile, updateLearnerProfile, applyStarterGoalsByTrack, testHistory } = useProgress();
  const [newGoal, setNewGoal] = useState('');
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<CourseTrack>(learnerProfile.targetCourse);
  const [collapsedSubjects, setCollapsedSubjects] = useState<Record<string, boolean>>({});
  const [autoDrillAddedCount, setAutoDrillAddedCount] = useState<number | null>(null);
  const [freshnessChecklist, setFreshnessChecklist] = useState<FreshnessChecklistItem[]>(createMonthlyFreshnessChecklist());
  const [freshnessTodoFeedback, setFreshnessTodoFeedback] = useState<string | null>(null);

  const LAST_SECTION_KEY = 'lawranker_last_section';
  const CONTINUE_FALLBACK = '/study';
  const CONTINUE_LABEL_FALLBACK = 'Continue Learning';

  const [continuePath, setContinuePath] = useState(CONTINUE_FALLBACK);
  const [continueLabel, setContinueLabel] = useState(CONTINUE_LABEL_FALLBACK);
  const freshnessStorageKey = `lawranker_content_freshness_${getMonthStamp(new Date())}`;
  
  // Update streak on component mount
  useEffect(() => {
    checkAndUpdateStreak();
  }, []);

  useEffect(() => {
    setSelectedTrack(learnerProfile.targetCourse);
  }, [learnerProfile.targetCourse]);

  useEffect(() => {
    const saved = localStorage.getItem(LAST_SECTION_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as { path?: string; label?: string };
      if (parsed.path) setContinuePath(parsed.path);
      if (parsed.label) setContinueLabel(parsed.label);
    } catch {
      setContinuePath(CONTINUE_FALLBACK);
      setContinueLabel(CONTINUE_LABEL_FALLBACK);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(freshnessStorageKey);
    if (!saved) {
      setFreshnessChecklist(createMonthlyFreshnessChecklist());
      return;
    }

    try {
      const parsed = JSON.parse(saved) as FreshnessChecklistItem[];
      if (!Array.isArray(parsed) || parsed.length === 0) {
        setFreshnessChecklist(createMonthlyFreshnessChecklist());
        return;
      }
      setFreshnessChecklist(parsed);
    } catch {
      setFreshnessChecklist(createMonthlyFreshnessChecklist());
    }
  }, [freshnessStorageKey]);

  useEffect(() => {
    localStorage.setItem(freshnessStorageKey, JSON.stringify(freshnessChecklist));
  }, [freshnessChecklist, freshnessStorageKey]);
  
  // Get maxim of the day based on date
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const todaysMaxim = DAILY_MAXIMS[dayOfYear % DAILY_MAXIMS.length];

  const selectedExam = getExamById(learnerProfile.selectedExamId || getDefaultExamIdByTrack(learnerProfile.targetCourse));
  const trackBlueprints = getTrackSubjectBlueprints(learnerProfile.targetCourse);
  const examDate = learnerProfile.examYear === '2026' ? new Date(selectedExam.examDate2026) : null;
  const daysUntilExam = examDate ? Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  // Mock data for consistency chart
  const activityData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.8 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 4.2 },
    { day: 'Fri', hours: 3.0 },
    { day: 'Sat', hours: 5.5 },
    { day: 'Sun', hours: stats.studyHours > 5 ? stats.studyHours : 2.0 },
  ];

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      addTodo(newGoal.trim());
      setNewGoal('');
    }
  };

  const saveLastSection = (path: string, label: string) => {
    setContinuePath(path);
    setContinueLabel(label);
    localStorage.setItem(LAST_SECTION_KEY, JSON.stringify({ path, label, at: Date.now() }));
  };

  const handleQuick20Plan = () => {
    const quickTasks = [
      `20-min Sprint: ${trackBlueprints[0]?.subject || 'Core Subject'} concepts`,
      `10 MCQs: ${trackBlueprints[0]?.defaultTopic || 'Mixed Topic'}`,
      'Review 3 mistakes and note one takeaway'
    ];

    quickTasks.forEach(task => {
      const exists = todos.some(todo => todo.task.toLowerCase() === task.toLowerCase());
      if (!exists) addTodo(task);
    });
  };

  const unlockedAchievements = getUnlockedAchievements();
  const recentAchievements = achievements
    .filter(a => a.unlocked)
    .sort((a, b) => (b.unlockedAt || 0) - (a.unlockedAt || 0))
    .slice(0, 3);

  const pendingTodos = todos.filter(todo => !todo.completed);
  const nextTodo = pendingTodos[0];
  const weakLane = trackBlueprints.find((lane) => lane.subject.toLowerCase().includes(stats.weakArea.toLowerCase()));
  const lastThreeMocks = [...testHistory].sort((a, b) => b.date - a.date).slice(0, 3);

  const recentWeakSubjectAggregate: Record<string, { correct: number; total: number }> = {};
  lastThreeMocks.forEach((mock) => {
    Object.entries(mock.subjectBreakdown).forEach(([subject, data]) => {
      if (!recentWeakSubjectAggregate[subject]) {
        recentWeakSubjectAggregate[subject] = { correct: 0, total: 0 };
      }
      recentWeakSubjectAggregate[subject].correct += data.correct;
      recentWeakSubjectAggregate[subject].total += data.total;
    });
  });

  const weakAreaDrills = Object.entries(recentWeakSubjectAggregate)
    .filter(([, data]) => data.total > 0)
    .map(([subject, data]) => {
      const accuracy = Math.round((data.correct / data.total) * 100);
      const template = getDrillTemplate(subject);
      const todoTask = `Auto Drill: ${subject} (${accuracy}%) - ${template.action}`;
      return {
        subject,
        accuracy,
        focus: template.focus,
        action: template.action,
        route: template.route,
        todoTask
      };
    })
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);

  const addWeakAreaDrills = () => {
    let added = 0;
    weakAreaDrills.forEach((drill) => {
      const exists = todos.some(todo => todo.task.toLowerCase() === drill.todoTask.toLowerCase());
      if (!exists) {
        addTodo(drill.todoTask);
        added += 1;
      }
    });
    setAutoDrillAddedCount(added);
  };

  const toggleFreshnessItem = (id: string) => {
    setFreshnessChecklist(prev => prev.map((item) => (
      item.id === id
        ? { ...item, completed: !item.completed, lastCheckedAt: !item.completed ? Date.now() : item.lastCheckedAt }
        : item
    )));
  };

  const addFreshnessTasksToGoals = () => {
    const pending = freshnessChecklist.filter(item => !item.completed);
    let added = 0;

    pending.forEach((item) => {
      const task = `Monthly Freshness: ${item.title}`;
      const exists = todos.some(todo => todo.task.toLowerCase() === task.toLowerCase());
      if (!exists) {
        addTodo(task);
        added += 1;
      }
    });

    setFreshnessTodoFeedback(
      added > 0
        ? `Added ${added} freshness task(s) to Today's Goals.`
        : 'Freshness tasks already exist in Today\'s Goals.'
    );
  };

  const freshnessCompletedCount = freshnessChecklist.filter(item => item.completed).length;

  const nextBestAction = nextTodo
    ? {
        title: `Next Goal: ${nextTodo.task}`,
        detail: `Continue your pending ${nextTodo.subject} goal now for highest momentum.`,
        route: `/study?tab=library&q=${encodeURIComponent(nextTodo.task)}&subject=${encodeURIComponent(nextTodo.subject)}`,
        cta: `Start ${nextTodo.subject}`
      }
    : weakAreaDrills[0]
      ? {
          title: `Auto Drill: ${weakAreaDrills[0].subject}`,
          detail: `From your last ${lastThreeMocks.length} mocks, this is your weakest trend at ${weakAreaDrills[0].accuracy}% accuracy.`,
          route: weakAreaDrills[0].route,
          cta: 'Start Weak Drill'
        }
    : weakLane
      ? {
          title: `Focus Lane: ${weakLane.subject}`,
          detail: `No pending goals. Improve your weaker lane with a targeted revision push.`,
          route: `/study?tab=library&subject=${encodeURIComponent(weakLane.subject)}`,
          cta: `Revise ${weakLane.subject}`
        }
      : {
          title: 'Quick Performance Push',
          detail: 'No pending goals or weak lane detected. Run a short practice sprint now.',
          route: '/practice',
          cta: 'Start Practice'
        };

  if (!learnerProfile.onboardingCompleted) {
    return <OnboardingWizard />;
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-900 dark:to-gray-900 text-white shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 hidden md:block">
          <Trophy className="w-64 h-64 transform rotate-12" />
        </div>
        <div className="relative z-10 p-5 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">Mission Rank 1 🚀</h2>
            <p className="text-indigo-100 max-w-lg text-sm md:text-lg">
              "Consistency is what transforms average into excellence."
            </p>
            <p className="text-indigo-200 text-xs md:text-sm">
              Track: {learnerProfile.targetCourse} • {selectedExam.shortTitle} • Exam {learnerProfile.examYear} • Goal {learnerProfile.dailyStudyHoursGoal}h/day
            </p>
          </div>
          <div className="flex gap-2 md:gap-3 w-full md:w-auto">
            <Link
              to={continuePath}
              onClick={() => saveLastSection(continuePath, continueLabel)}
              className="flex-1 md:flex-none bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 group text-sm md:text-base"
            >
              <Clock className="w-4 h-4 md:w-5 md:h-5" />
              {continueLabel}
            </Link>
            <Link 
              to="/practice" 
              onClick={() => saveLastSection('/practice', 'Continue Practice')}
              className="flex-1 md:flex-none bg-white text-indigo-700 hover:bg-indigo-50 px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 group text-sm md:text-base"
            >
              <Zap className="w-4 h-4 md:w-5 md:h-5 group-hover:text-yellow-500 transition-colors" />
              <span className="hidden sm:inline">Quick</span> Mock Test
            </Link>
            <Link 
              to="/study" 
              onClick={() => saveLastSection('/study', 'Continue Study')}
              className="flex-1 md:flex-none bg-indigo-700/50 hover:bg-indigo-700/70 backdrop-blur-sm text-white px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-indigo-400/30 text-sm md:text-base"
            >
              <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
              Study
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-white">One-click 20-minute plan</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Adds a compact concept + MCQ + review sprint to today's goals.</p>
        </div>
        <button
          onClick={handleQuick20Plan}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
        >
          <Zap className="w-4 h-4" /> Add 20-min Plan
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">Switch Track</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Change your MHCET stream anytime and optionally refresh starter goals.</p>
          </div>
          <div className="flex-1" />
          <select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value as CourseTrack)}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-800 dark:text-white"
          >
            {Object.values(CourseTrack).map(track => (
              <option key={track} value={track}>{track}</option>
            ))}
          </select>
          <button
            onClick={() => {
              updateLearnerProfile({ 
                targetCourse: selectedTrack,
                selectedExamId: getDefaultExamIdByTrack(selectedTrack)
              });
              applyStarterGoalsByTrack(selectedTrack);
            }}
            className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium"
          >
            Apply + Refresh Goals
          </button>
          <button
            onClick={() => updateLearnerProfile({ onboardingCompleted: false })}
            className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Reopen Setup
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 md:p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{selectedExam.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {selectedExam.totalQuestions} Questions • {selectedExam.totalMarks} Marks • {selectedExam.durationMinutes} mins • {selectedExam.negativeMarking}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs uppercase tracking-wider text-gray-400">{learnerProfile.examYear} Exam Countdown</p>
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{learnerProfile.examYear === '2026' ? `${Math.max(daysUntilExam, 0)} days` : 'TBD'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {selectedExam.sections.map((section) => (
            <div key={section.name} className="p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{section.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{section.questions} Q • {section.marks} Marks</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{section.syllabus.slice(0, 3).join(' • ')}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 text-xs">
          {selectedExam.officialLinks.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {trackBlueprints.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 md:p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">{selectedExam.shortTitle} Subject Mastery Lanes</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Simple daily plan with quick subject access.</p>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 uppercase tracking-wider font-bold">Daily</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
            {trackBlueprints.map((lane) => (
              <div key={lane.subject} className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const SubjectIcon = getLaneIcon(lane.subject);
                      return (
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 flex items-center justify-center">
                          <SubjectIcon className="w-4 h-4" />
                        </div>
                      );
                    })()}
                    <h3 className="text-sm font-bold text-gray-800 dark:text-white">{lane.subject}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">{lane.weightHint}</span>
                    <button
                      onClick={() => setCollapsedSubjects(prev => ({ ...prev, [lane.subject]: !prev[lane.subject] }))}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
                    >
                      {collapsedSubjects[lane.subject] ? 'Expand' : 'Collapse'}
                    </button>
                  </div>
                </div>

                {!collapsedSubjects[lane.subject] && (
                  <>
                    <div className="mb-3">
                      <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-1">Focus Topics</p>
                      <div className="flex flex-wrap gap-1.5">
                        {lane.concepts.slice(0, 3).map((concept) => (
                          <span key={concept} className="px-2 py-1 text-[11px] rounded-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                            {concept}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{lane.tips[0]}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/exam-subjects?subject=${encodeURIComponent(lane.subject)}`}
                        onClick={() => saveLastSection(`/exam-subjects?subject=${encodeURIComponent(lane.subject)}`, `Continue ${lane.subject}`)}
                        className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold"
                      >
                        Open Subject Hub
                      </Link>
                      <Link
                        to={`/study?tab=library&subject=${encodeURIComponent(lane.subject)}`}
                        onClick={() => saveLastSection(`/study?tab=library&subject=${encodeURIComponent(lane.subject)}`, `Continue ${lane.subject} Study`)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                      >
                        Study + MCQs
                      </Link>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Accuracy', value: `${stats.accuracy}%`, icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
          { label: 'Topics Mastered', value: stats.topicsMastered, icon: Award, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
          { label: 'Study Streak', value: `${stats.dailyStreak} 🔥`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
          { label: 'Days to Exam', value: learnerProfile.examYear === '2026' ? Math.max(daysUntilExam, 0) : 'TBD', icon: Calendar, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-900/30' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mt-1 group-hover:scale-105 transition-transform origin-left">{item.value}</h3>
              </div>
              <div className={`p-2 md:p-3 rounded-lg md:rounded-xl ${item.bg} ${item.color}`}>
                <item.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements Banner */}
      {unlockedAchievements.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-xl md:rounded-2xl p-4 md:p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-20 hidden md:block">
            <Trophy className="w-32 h-32 transform rotate-12" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold text-lg">Achievements ({unlockedAchievements.length}/{achievements.length})</h3>
              </div>
              <button 
                onClick={() => setShowAllAchievements(!showAllAchievements)}
                className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
              >
                {showAllAchievements ? 'Show Less' : 'View All'}
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-3">
              {(showAllAchievements ? achievements : achievements.slice(0, 8)).map(achievement => (
                <div 
                  key={achievement.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    achievement.unlocked 
                      ? 'bg-white/20 hover:bg-white/30' 
                      : 'bg-black/20 opacity-60'
                  }`}
                  title={`${achievement.title}: ${achievement.description}${!achievement.unlocked ? ` (${achievement.progress}/${achievement.requirement})` : ''}`}
                >
                  <span className="text-xl">{achievement.icon}</span>
                  <div className="hidden sm:block">
                    <p className="text-xs font-bold">{achievement.title}</p>
                    {!achievement.unlocked && (
                      <div className="w-16 h-1 bg-white/30 rounded-full mt-1">
                        <div 
                          className="h-full bg-white rounded-full" 
                          style={{ width: `${(achievement.progress / achievement.requirement) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                  {!achievement.unlocked && <Lock className="w-3 h-3 opacity-60" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Access Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        <Link to="/daily" className="bg-gradient-to-br from-yellow-500 to-amber-600 p-4 md:p-5 rounded-xl md:rounded-2xl text-white hover:shadow-xl transition-all hover:scale-[1.02] group">
          <Zap className="w-6 h-6 md:w-8 md:h-8 mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-sm md:text-base">Daily Challenge</h3>
          <p className="text-[10px] md:text-xs text-yellow-200 hidden sm:block">Build your streak!</p>
        </Link>
        <Link to="/pyq" className="bg-gradient-to-br from-purple-500 to-indigo-600 p-4 md:p-5 rounded-xl md:rounded-2xl text-white hover:shadow-xl transition-all hover:scale-[1.02] group">
          <FileText className="w-6 h-6 md:w-8 md:h-8 mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-sm md:text-base">PYQ Papers</h3>
          <p className="text-[10px] md:text-xs text-purple-200 hidden sm:block">2023-2025 Papers</p>
        </Link>
        <Link to="/flashcards" className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 md:p-5 rounded-xl md:rounded-2xl text-white hover:shadow-xl transition-all hover:scale-[1.02] group">
          <Layers className="w-6 h-6 md:w-8 md:h-8 mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-sm md:text-base">Flashcards</h3>
          <p className="text-[10px] md:text-xs text-amber-200 hidden sm:block">30+ Legal Cards</p>
        </Link>
        <Link to="/colleges" className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 md:p-5 rounded-xl md:rounded-2xl text-white hover:shadow-xl transition-all hover:scale-[1.02] group">
          <Building2 className="w-6 h-6 md:w-8 md:h-8 mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-sm md:text-base">Colleges</h3>
          <p className="text-[10px] md:text-xs text-emerald-200 hidden sm:block">Cutoff Predictor</p>
        </Link>
        <Link to={`/weak-point?subject=${encodeURIComponent(stats.weakArea)}`} className="bg-gradient-to-br from-red-500 to-rose-600 p-4 md:p-5 rounded-xl md:rounded-2xl text-white hover:shadow-xl transition-all hover:scale-[1.02] group">
          <AlertCircle className="w-6 h-6 md:w-8 md:h-8 mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-sm md:text-base">Weak Point</h3>
          <p className="text-[10px] md:text-xs text-rose-200 hidden sm:block">Focused fix mode</p>
        </Link>
        <Link to="/mentor" className="bg-gradient-to-br from-rose-500 to-pink-600 p-4 md:p-5 rounded-xl md:rounded-2xl text-white hover:shadow-xl transition-all hover:scale-[1.02] group col-span-2 sm:col-span-1">
          <BrainCircuit className="w-6 h-6 md:w-8 md:h-8 mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-sm md:text-base">AI Mentor</h3>
          <p className="text-[10px] md:text-xs text-rose-200 hidden sm:block">Ask Doubts</p>
        </Link>
      </div>

      {/* Maxim of the Day */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black rounded-xl md:rounded-2xl p-4 md:p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 hidden md:block">
          <Scale className="w-32 h-32 transform rotate-12" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <Flame className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
            <span className="text-[10px] md:text-xs font-bold text-amber-400 uppercase tracking-wider">Legal Maxim of the Day</span>
          </div>
          <h3 className="text-base md:text-2xl font-bold italic mb-1 md:mb-2">"{todaysMaxim.latin}"</h3>
          <p className="text-slate-300 text-sm md:text-base mb-1 md:mb-2">{todaysMaxim.meaning}</p>
          <p className="text-[10px] md:text-xs text-slate-400 flex items-center gap-1">
            <BookOpen className="w-3 h-3" /> {todaysMaxim.usage}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Study Consistency Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" /> Study Consistency
            </h3>
            <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Last 7 Days</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }} 
                  dy={10}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="hours" radius={[6, 6, 6, 6]} barSize={32}>
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.hours >= 4 ? '#4f46e5' : '#818cf8'} className="hover:opacity-80 transition-opacity" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                <Target className="w-5 h-5" /> Next Best Action
              </h3>
              <p className="text-indigo-100 text-sm font-semibold mb-1">{nextBestAction.title}</p>
              <p className="text-indigo-100/90 text-sm mb-4">
                {nextBestAction.detail}
              </p>
              <Link
                to={nextBestAction.route}
                onClick={() => saveLastSection(nextBestAction.route, nextBestAction.cta)}
                className="inline-flex items-center gap-2 bg-white text-indigo-700 text-xs font-bold px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                {nextBestAction.cta} <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-20">
              <Target className="w-24 h-24 text-white" />
            </div>
          </div>

            <div className="bg-gradient-to-br from-cyan-600 to-sky-700 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Weak-Area Auto Drill
                </h3>
                <p className="text-cyan-100 text-xs mb-3">
                  Based on your latest {Math.min(lastThreeMocks.length, 3)} mock tests.
                </p>

                {weakAreaDrills.length > 0 ? (
                  <div className="space-y-2 mb-4">
                    {weakAreaDrills.map((drill) => (
                      <div key={drill.subject} className="bg-white/15 rounded-lg p-2.5 border border-white/20">
                        <p className="text-sm font-semibold">{drill.subject} ({drill.accuracy}% accuracy)</p>
                        <p className="text-xs text-cyan-100">{drill.focus}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-cyan-100 text-sm mb-4">
                    Complete at least one mock to unlock auto-generated weak-area drills.
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {weakAreaDrills[0] && (
                    <Link
                      to={weakAreaDrills[0].route}
                      onClick={() => saveLastSection(weakAreaDrills[0].route, `Auto Drill: ${weakAreaDrills[0].subject}`)}
                      className="inline-flex items-center gap-2 bg-white text-cyan-700 text-xs font-bold px-3 py-2 rounded-lg hover:bg-cyan-50 transition-colors"
                    >
                      Start Drill <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  <button
                    onClick={addWeakAreaDrills}
                    disabled={weakAreaDrills.length === 0}
                    className="inline-flex items-center gap-2 bg-cyan-900/40 border border-cyan-200/30 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-cyan-900/60 transition-colors"
                  >
                    Add Drills to Goals
                  </button>
                </div>
                {autoDrillAddedCount !== null && (
                  <p className="text-[11px] text-cyan-100 mt-2">
                    {autoDrillAddedCount > 0 ? `Added ${autoDrillAddedCount} drill goal(s).` : 'Drill goals already exist in your list.'}
                  </p>
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 opacity-20">
                <BrainCircuit className="w-24 h-24 text-white" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                        <BrainCircuit className="w-5 h-5" /> Improve {stats.weakArea}
                    </h3>
                    <p className="text-rose-100 text-sm mb-4">
                        Your performance in {stats.weakArea} is slightly below target. Boost your score now.
                    </p>
                    <Link to={`/weak-point?subject=${encodeURIComponent(stats.weakArea)}`} className="inline-block bg-white text-rose-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-rose-50 transition-colors">
                      Attack {stats.weakArea}
                    </Link>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-20">
                    <AlertCircle className="w-24 h-24 text-white" />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">Monthly Content Freshness</h3>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {freshnessCompletedCount}/{freshnessChecklist.length} Done
                </span>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {getMonthStamp(today)} audit: keep legal and GK datasets current.
              </p>

              <div className="space-y-2.5">
                {freshnessChecklist.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleFreshnessItem(item.id)}
                    className="w-full text-left p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="min-w-0">
                        <p className={`text-sm font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-gray-800 dark:text-gray-100'}`}>
                          {item.title}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{item.dataset}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={addFreshnessTasksToGoals}
                  className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
                >
                  Add Pending to Goals
                </button>
                <Link
                  to="/study"
                  onClick={() => saveLastSection('/study', 'Content Freshness Review')}
                  className="px-3 py-2 rounded-lg border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                >
                  Open Study Hub
                </Link>
              </div>

              {freshnessTodoFeedback && (
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-2">{freshnessTodoFeedback}</p>
              )}
            </div>

            {/* Daily Checklist */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">Today's Goals</h3>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{todos.filter(t => t.completed).length}/{todos.length} Done</span>
                </div>
                
                {/* Add Goal Input */}
                <form onSubmit={handleAddGoal} className="mb-4 flex gap-2">
                  <input 
                    type="text" 
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder="Add a new goal..."
                    className="flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button 
                    type="submit"
                    disabled={!newGoal.trim()}
                    className="bg-indigo-600 disabled:opacity-50 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </form>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {todos.length === 0 ? (
                      <p className="text-center text-gray-400 text-sm py-4">No active goals. Add one above!</p>
                    ) : (
                      todos.map((item) => (
                      <div 
                          key={item.id} 
                          onClick={() => toggleTodo(item.id)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors group border border-transparent hover:border-gray-100 dark:hover:border-gray-600"
                      >
                          {item.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                          <Circle className="w-5 h-5 text-gray-300 dark:text-gray-500 group-hover:text-indigo-400 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                              <p className={`text-sm font-medium ${item.completed ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-200'}`}>
                                  {item.task}
                              </p>
                          </div>
                      </div>
                      ))
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;