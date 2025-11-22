import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
  LineChart, Line, ScatterChart, Scatter, ZAxis, Label
} from 'recharts';
import { Target, TrendingUp, Clock } from 'lucide-react';

const Analytics: React.FC = () => {
  // Mock Data
  const subjectData = [
    { name: 'Legal', score: 85, fullMark: 100, color: '#4f46e5' },
    { name: 'GK', score: 60, fullMark: 100, color: '#ef4444' },
    { name: 'Logic', score: 75, fullMark: 100, color: '#8b5cf6' },
    { name: 'English', score: 90, fullMark: 100, color: '#22c55e' },
    { name: 'Math', score: 50, fullMark: 100, color: '#f97316' },
  ];

  const scoreHistory = [
    { test: 'M1', score: 65, target: 100 },
    { test: 'M2', score: 72, target: 105 },
    { test: 'M3', score: 68, target: 110 },
    { test: 'M4', score: 85, target: 115 },
    { test: 'M5', score: 88, target: 120 },
    { test: 'M6', score: 95, target: 125 },
  ];

  const timeVsAccuracy = [
    { subject: 'Legal', time: 45, accuracy: 85 }, // 45 seconds avg, 85% acc
    { subject: 'GK', time: 15, accuracy: 60 },
    { subject: 'Logic', time: 60, accuracy: 75 },
    { subject: 'English', time: 30, accuracy: 90 },
    { subject: 'Math', time: 75, accuracy: 50 },
  ];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Analytics HQ</h2>
          <p className="text-gray-500">Detailed breakdown of your path to AIR 1.</p>
        </div>
        <div className="text-right hidden md:block">
           <p className="text-xs text-gray-400 uppercase tracking-wider">Projected Rank</p>
           <p className="text-2xl font-bold text-indigo-600">AIR 245</p>
        </div>
      </header>

      {/* Rank 1 Trajectory */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
         <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-gray-700">Rank 1 Trajectory</h3>
         </div>
         <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={scoreHistory}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
               <XAxis dataKey="test" stroke="#9ca3af" fontSize={12} />
               <YAxis domain={[0, 150]} stroke="#9ca3af" fontSize={12} />
               <Tooltip contentStyle={{ borderRadius: '8px' }} />
               <Legend />
               <Line type="monotone" dataKey="score" name="Your Score" stroke="#4f46e5" strokeWidth={3} activeDot={{ r: 6 }} />
               <Line type="monotone" dataKey="target" name="Topper Benchmark" stroke="#fbbf24" strokeDasharray="5 5" strokeWidth={2} />
             </LineChart>
           </ResponsiveContainer>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Strength */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
          <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" /> Subject Mastery
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={subjectData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
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

        {/* Time vs Accuracy (Critical for Rank 1) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
           <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
             <Clock className="w-4 h-4 text-orange-500" /> Time Management Matrix
           </h3>
           <ResponsiveContainer width="100%" height="100%">
             <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
               <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
               <XAxis type="number" dataKey="time" name="Time (sec)" unit="s" stroke="#9ca3af" fontSize={12}>
                 <Label value="Avg Time" offset={0} position="insideBottom" />
               </XAxis>
               <YAxis type="number" dataKey="accuracy" name="Accuracy" unit="%" stroke="#9ca3af" fontSize={12}>
                 <Label value="Accuracy" offset={10} position="insideLeft" angle={-90} />
               </YAxis>
               <ZAxis type="category" dataKey="subject" name="Subject" />
               <Tooltip cursor={{ strokeDasharray: '3 3' }} />
               <Scatter name="Subjects" data={timeVsAccuracy} fill="#8884d8">
                 {timeVsAccuracy.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={
                     entry.accuracy > 80 && entry.time < 40 ? '#22c55e' : // Good
                     entry.accuracy < 60 || entry.time > 60 ? '#ef4444' : // Bad
                     '#f59e0b' // Average
                   } />
                 ))}
               </Scatter>
             </ScatterChart>
           </ResponsiveContainer>
           <div className="flex justify-center gap-4 text-[10px] mt-[-10px]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Ideal Zone</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Needs Work</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;