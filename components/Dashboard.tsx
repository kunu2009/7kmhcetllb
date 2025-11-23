import React, { useState } from 'react';
import { TrendingUp, Award, Clock, AlertCircle, ChevronRight, CheckCircle2, Circle, Activity, BookOpen, Target, Zap, Trophy, BrainCircuit, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const { stats, todos, toggleTodo, addTodo } = useProgress();
  const [newGoal, setNewGoal] = useState('');

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
          { label: 'Focus Area', value: stats.weakArea, icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-900/30' },
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