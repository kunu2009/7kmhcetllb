import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Clock, AlertCircle, ChevronRight, CheckCircle2, Circle, Activity, BookOpen, Target, Zap, Trophy, BrainCircuit, Plus, Scale, FileText, Layers, Building2, Flame, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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
  const { stats, todos, toggleTodo, addTodo } = useProgress();
  const [newGoal, setNewGoal] = useState('');
  
  // Get maxim of the day based on date
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const todaysMaxim = DAILY_MAXIMS[dayOfYear % DAILY_MAXIMS.length];

  // Days until MH CET Law 2026 (assuming May 2026)
  const examDate = new Date('2026-05-15');
  const daysUntilExam = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Mock data for consistency chart
  const activityData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.8 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 4.2 },
    { day: 'Fri', hours: 3.0 },
    { day: 'Sat', hours: 5.5 },
    { day: 'Sun', hours: stats.studyHours > 5 ? stats.studyHours : 2.0 }, // Dynamic based on total for demo
  ];

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      addTodo(newGoal.trim());
      setNewGoal('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-900 dark:to-gray-900 text-white shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Trophy className="w-64 h-64 transform rotate-12" />
        </div>
        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Mission Rank 1 🚀</h2>
            <p className="text-indigo-100 max-w-lg text-lg">
              "Consistency is what transforms average into excellence." <br/> Keep pushing, you are closer to your goal than yesterday.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Link 
              to="/practice" 
              className="bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-3.5 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <Zap className="w-5 h-5 group-hover:text-yellow-500 transition-colors" />
              Quick Mock Test
            </Link>
            <Link 
              to="/study" 
              className="bg-indigo-700/50 hover:bg-indigo-700/70 backdrop-blur-sm text-white px-6 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-indigo-400/30"
            >
              <BookOpen className="w-5 h-5" />
              Continue Studying
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Accuracy', value: `${stats.accuracy}%`, icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
          { label: 'Topics Mastered', value: stats.topicsMastered, icon: Award, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
          { label: 'Study Hours', value: `${stats.studyHours}h`, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
          { label: 'Days to Exam', value: daysUntilExam, icon: Calendar, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-900/30' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1 group-hover:scale-105 transition-transform origin-left">{item.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/pyq" className="bg-gradient-to-br from-purple-500 to-indigo-600 p-5 rounded-2xl text-white hover:shadow-xl transition-all hover:scale-[1.02] group">
          <FileText className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold">PYQ Papers</h3>
          <p className="text-xs text-purple-200">2023-2025 Papers</p>
        </Link>
        <Link to="/flashcards" className="bg-gradient-to-br from-amber-500 to-orange-600 p-5 rounded-2xl text-white hover:shadow-xl transition-all hover:scale-[1.02] group">
          <Layers className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold">Flashcards</h3>
          <p className="text-xs text-amber-200">30+ Legal Cards</p>
        </Link>
        <Link to="/colleges" className="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-2xl text-white hover:shadow-xl transition-all hover:scale-[1.02] group">
          <Building2 className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold">Colleges</h3>
          <p className="text-xs text-emerald-200">Cutoff Predictor</p>
        </Link>
        <Link to="/mentor" className="bg-gradient-to-br from-rose-500 to-pink-600 p-5 rounded-2xl text-white hover:shadow-xl transition-all hover:scale-[1.02] group">
          <BrainCircuit className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold">AI Mentor</h3>
          <p className="text-xs text-rose-200">Ask Doubts</p>
        </Link>
      </div>

      {/* Maxim of the Day */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Scale className="w-32 h-32 transform rotate-12" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Legal Maxim of the Day</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold italic mb-2">"{todaysMaxim.latin}"</h3>
          <p className="text-slate-300 mb-2">{todaysMaxim.meaning}</p>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <BookOpen className="w-3 h-3" /> {todaysMaxim.usage}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                    <Link to="/practice" className="inline-block bg-white text-rose-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-rose-50 transition-colors">
                        Practice {stats.weakArea}
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