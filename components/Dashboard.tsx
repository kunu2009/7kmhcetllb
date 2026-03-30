import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Clock, AlertCircle, ChevronRight, CheckCircle2, Circle, Activity, BookOpen, Target, Zap, Trophy, BrainCircuit, Plus, Scale, FileText, Layers, Building2, Flame, Calendar, Star, Lock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import OnboardingWizard from './OnboardingWizard';
import { CourseTrack } from '../types';
import { getDefaultExamIdByTrack, getExamById } from '../data/cetExamData';

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

const Dashboard: React.FC = () => {
  const { stats, todos, toggleTodo, addTodo, achievements, checkAndUpdateStreak, getUnlockedAchievements, learnerProfile, updateLearnerProfile, applyStarterGoalsByTrack } = useProgress();
  const [newGoal, setNewGoal] = useState('');
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<CourseTrack>(learnerProfile.targetCourse);
  
  // Update streak on component mount
  useEffect(() => {
    checkAndUpdateStreak();
  }, []);

  useEffect(() => {
    setSelectedTrack(learnerProfile.targetCourse);
  }, [learnerProfile.targetCourse]);
  
  // Get maxim of the day based on date
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const todaysMaxim = DAILY_MAXIMS[dayOfYear % DAILY_MAXIMS.length];

  const selectedExam = getExamById(learnerProfile.selectedExamId || getDefaultExamIdByTrack(learnerProfile.targetCourse));
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

  const unlockedAchievements = getUnlockedAchievements();
  const recentAchievements = achievements
    .filter(a => a.unlocked)
    .sort((a, b) => (b.unlockedAt || 0) - (a.unlockedAt || 0))
    .slice(0, 3);

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
              to="/practice" 
              className="flex-1 md:flex-none bg-white text-indigo-700 hover:bg-indigo-50 px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 group text-sm md:text-base"
            >
              <Zap className="w-4 h-4 md:w-5 md:h-5 group-hover:text-yellow-500 transition-colors" />
              <span className="hidden sm:inline">Quick</span> Mock Test
            </Link>
            <Link 
              to="/study" 
              className="flex-1 md:flex-none bg-indigo-700/50 hover:bg-indigo-700/70 backdrop-blur-sm text-white px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-indigo-400/30 text-sm md:text-base"
            >
              <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
              Study
            </Link>
          </div>
        </div>
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