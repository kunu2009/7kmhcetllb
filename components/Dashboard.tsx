import React from 'react';
import { TrendingUp, Award, Clock, AlertCircle, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';

const Dashboard: React.FC = () => {
  const { stats, todos, toggleTodo } = useProgress();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome back, Aspirant!</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">"Success is the sum of small efforts, repeated day in and day out."</p>
        </div>
        <Link to="/practice" className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all font-medium flex items-center gap-2">
          Take Quick Mock <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Live Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Overall Accuracy</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.accuracy}%</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Topics Mastered</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.topicsMastered}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Study Hours</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.studyHours}h</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Weak Area</p>
            <p className="text-lg font-bold text-gray-800 dark:text-white truncate w-24">{stats.weakArea}</p>
          </div>
        </div>
      </div>

      {/* Todo Checklist & Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Today's Goals</h3>
          <div className="space-y-4">
            {todos.map((item) => (
              <div 
                key={item.id} 
                onClick={() => toggleTodo(item.id)}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {item.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400 fill-green-100 dark:fill-green-900/20" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300 dark:text-gray-500 group-hover:text-indigo-400" />
                  )}
                  <div>
                    <p className={`font-medium ${item.completed ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-gray-200'}`}>
                      {item.task}
                    </p>
                    <span className="text-xs text-indigo-500 dark:text-indigo-300 font-medium bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                      {item.subject}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-900 dark:bg-indigo-950 text-white p-6 rounded-xl shadow-lg flex flex-col justify-between relative overflow-hidden border border-indigo-800 dark:border-gray-800">
          <div className="relative z-10">
            <h3 className="font-bold text-lg mb-2">Rank 1 Tip</h3>
            <p className="text-indigo-200 text-sm mb-4">
              "For Legal Aptitude, stick strictly to the principle provided in the question. Do not apply your external knowledge of law unless asked."
            </p>
            <Link to="/study" className="text-yellow-400 text-sm font-bold hover:text-yellow-300 flex items-center gap-1">
              Study Materials <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="absolute -bottom-4 -right-4 opacity-10">
            <Award className="w-32 h-32 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;