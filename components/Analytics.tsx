import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
  LineChart, Line, ScatterChart, Scatter, ZAxis, Label
} from 'recharts';
import { Target, TrendingUp, Clock, BarChart3 } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { Subject } from '../types';

const Analytics: React.FC = () => {
  const { testHistory, subjectMastery } = useProgress();

  const subjectData = Object.keys(subjectMastery).map(key => ({
    name: key,
    score: subjectMastery[key as Subject] || 0,
    fullMark: 100,
  }));

  const scoreHistoryData = testHistory.map((test, idx) => ({
    test: `T${idx + 1}`,
    score: test.total > 0 ? Math.round((test.score / test.total) * 100) : 0,
    target: 90 + (idx * 0.5), 
  }));

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Analytics HQ</h2>
          <p className="text-gray-500 dark:text-gray-400">Real-time breakdown of your progress.</p>
        </div>
      </header>

      {testHistory.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-12 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
          <BarChart3 className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">No Data Available</h3>
          <p className="text-gray-500 dark:text-gray-500 mb-6">Complete a test in the Test Arena to generate analytics.</p>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
             <div className="flex items-center gap-2 mb-6">
                <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-bold text-gray-700 dark:text-gray-200">Rank 1 Trajectory (Test Scores %)</h3>
             </div>
             <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={scoreHistoryData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                   <XAxis dataKey="test" stroke="#9ca3af" fontSize={12} />
                   <YAxis domain={[0, 100]} stroke="#9ca3af" fontSize={12} />
                   <Tooltip contentStyle={{ borderRadius: '8px' }} />
                   <Legend />
                   <Line type="monotone" dataKey="score" name="Your Score %" stroke="#4f46e5" strokeWidth={3} activeDot={{ r: 6 }} />
                   <Line type="monotone" dataKey="target" name="Topper Path" stroke="#fbbf24" strokeDasharray="5 5" strokeWidth={2} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-80">
              <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" /> Subject Mastery
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={subjectData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Proficiency"
                    dataKey="score"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    fill="#4f46e5"
                    fillOpacity={0.4}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-80 flex flex-col items-center justify-center text-center">
               <Clock className="w-12 h-12 text-orange-200 dark:text-orange-900/50 mb-3" />
               <p className="text-gray-500 dark:text-gray-400 text-sm">Time Analysis will appear here after more tests.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;