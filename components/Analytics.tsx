import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
  LineChart, Line, ScatterChart, Scatter, ZAxis, Label, AreaChart, Area
} from 'recharts';
import { Target, TrendingUp, Clock, BarChart3, Award, AlertTriangle, Brain, Zap } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { Subject } from '../types';

const Analytics: React.FC = () => {
  const navigate = useNavigate();
  const { testHistory, subjectMastery, stats } = useProgress();

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

  const sectionSpeedAccuracyData = useMemo(() => {
    const recentTimedTests = testHistory
      .filter(test => test.sectionTimeSpent && Object.keys(test.sectionTimeSpent).length > 0)
      .slice(-5);

    const aggregate: Record<string, { correct: number; total: number; timeSeconds: number }> = {};

    recentTimedTests.forEach((test) => {
      Object.entries(test.subjectBreakdown).forEach(([subject, breakdown]) => {
        if (!aggregate[subject]) {
          aggregate[subject] = { correct: 0, total: 0, timeSeconds: 0 };
        }

        aggregate[subject].correct += breakdown.correct;
        aggregate[subject].total += breakdown.total;
        aggregate[subject].timeSeconds += test.sectionTimeSpent?.[subject] || 0;
      });
    });

    return Object.entries(aggregate)
      .map(([subject, values]) => {
        const accuracy = values.total > 0 ? Math.round((values.correct / values.total) * 100) : 0;
        const qpm = values.timeSeconds > 0 ? +(values.total / (values.timeSeconds / 60)).toFixed(2) : 0;
        const secPerQuestion = values.total > 0 && values.timeSeconds > 0
          ? Math.round(values.timeSeconds / values.total)
          : 0;

        return {
          subject,
          accuracy,
          qpm,
          secPerQuestion,
          attempts: values.total,
          timeMinutes: Math.round(values.timeSeconds / 60)
        };
      })
      .sort((a, b) => a.accuracy - b.accuracy);
  }, [testHistory]);

  // Calculate insights
  const insights = useMemo(() => {
    if (testHistory.length === 0) return null;

    let totalQuestions = 0;
    let totalCorrect = 0;
    
    testHistory.forEach(test => {
      totalQuestions += test.total;
      totalCorrect += test.score;
    });

    const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    let strongestSubject = '';
    let weakestSubject = '';
    let maxScore = -1;
    let minScore = 101;

    Object.entries(subjectMastery).forEach(([subject, score]) => {
      if (score > maxScore) {
        maxScore = score;
        strongestSubject = subject;
      }
      if (score < minScore) {
        minScore = score;
        weakestSubject = subject;
      }
    });

    // Recent trend (last 3 tests)
    let trend = 'neutral';
    if (testHistory.length >= 3) {
      const recent = testHistory.slice(-3);
      const scores = recent.map(t => t.total > 0 ? (t.score / t.total) * 100 : 0);
      if (scores[2] > scores[0] && scores[2] > scores[1]) trend = 'up';
      else if (scores[2] < scores[0] && scores[2] < scores[1]) trend = 'down';
    }

    return {
      totalQuestions,
      overallAccuracy,
      strongestSubject,
      weakestSubject,
      trend
    };
  }, [testHistory, subjectMastery]);

  return (
    <div className="space-y-4 md:space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white">Analytics HQ</h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Real-time breakdown of your progress.</p>
        </div>
      </header>

      {testHistory.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
          <BarChart3 className="w-12 h-12 md:w-16 md:h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3 md:mb-4" />
          <h3 className="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-300">No Data Available</h3>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-500 mb-4 md:mb-6">Complete a test in the Test Arena to generate analytics.</p>
        </div>
      ) : (
        <>
          {/* Insights Cards */}
          {insights && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-indigo-500" />
                  <h4 className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Questions Solved</h4>
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{insights.totalQuestions}</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-green-500" />
                  <h4 className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Overall Accuracy</h4>
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{insights.overallAccuracy}%</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <h4 className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Strongest Area</h4>
                </div>
                <p className="text-sm md:text-base font-bold text-gray-800 dark:text-white truncate" title={insights.strongestSubject}>
                  {insights.strongestSubject || 'N/A'}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <h4 className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Needs Work</h4>
                </div>
                <p className="text-sm md:text-base font-bold text-gray-800 dark:text-white truncate" title={insights.weakestSubject}>
                  {insights.weakestSubject || 'N/A'}
                </p>
                {insights.weakestSubject && (
                  <button
                    onClick={() => navigate(`/weak-point?subject=${encodeURIComponent(insights.weakestSubject)}`)}
                    className="mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Attack Weak Point
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
             <div className="flex items-center justify-between mb-4 md:mb-6">
               <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-bold text-sm md:text-base text-gray-700 dark:text-gray-200">Rank 1 Trajectory (Test Scores %)</h3>
               </div>
               {insights?.trend === 'up' && <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">Trending Up 🚀</span>}
               {insights?.trend === 'down' && <span className="text-xs font-medium text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">Needs Focus ⚠️</span>}
             </div>
             <div className="h-48 md:h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={scoreHistoryData}>
                   <defs>
                     <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                   <XAxis dataKey="test" stroke="#9ca3af" fontSize={10} />
                   <YAxis domain={[0, 100]} stroke="#9ca3af" fontSize={10} />
                   <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                   <Legend wrapperStyle={{ fontSize: '12px' }} />
                   <Area type="monotone" dataKey="score" name="Your Score %" stroke="#4f46e5" fillOpacity={1} fill="url(#colorScore)" strokeWidth={2} activeDot={{ r: 4 }} />
                   <Line type="monotone" dataKey="target" name="Topper Path" stroke="#fbbf24" strokeDasharray="5 5" strokeWidth={2} />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-64 md:h-80">
              <h3 className="font-bold text-sm md:text-base text-gray-700 dark:text-gray-200 mb-3 md:mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" /> Subject Mastery
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={subjectData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 9 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Proficiency"
                    dataKey="score"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    fill="#4f46e5"
                    fillOpacity={0.4}
                  />
                  <Tooltip contentStyle={{ fontSize: '12px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-64 md:h-80 overflow-hidden">
              <h3 className="font-bold text-sm md:text-base text-gray-700 dark:text-gray-200 mb-3 md:mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" /> Speed vs Accuracy by Section
              </h3>

              {sectionSpeedAccuracyData.length === 0 ? (
                <div className="h-[calc(100%-2rem)] flex flex-col items-center justify-center text-center">
                  <Clock className="w-10 h-10 md:w-12 md:h-12 text-orange-200 dark:text-orange-900/50 mb-2 md:mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm px-4">Complete timed tests to unlock section speed analysis.</p>
                </div>
              ) : (
                <div className="space-y-3 h-[calc(100%-2rem)]">
                  <div className="h-32 md:h-36">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis type="number" dataKey="qpm" name="Speed" unit=" q/min" tick={{ fontSize: 10 }} />
                        <YAxis type="number" dataKey="accuracy" name="Accuracy" unit="%" domain={[0, 100]} tick={{ fontSize: 10 }} />
                        <ZAxis type="number" dataKey="attempts" range={[60, 320]} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value: number, name) => {
                          if (name === 'Speed') return [`${value} q/min`, 'Speed'];
                          if (name === 'Accuracy') return [`${value}%`, 'Accuracy'];
                          return [value, name];
                        }} />
                        <Scatter name="Sections" data={sectionSpeedAccuracyData} fill="#f97316" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                    {sectionSpeedAccuracyData.map((section) => (
                      <div key={section.subject} className="text-xs rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 px-2.5 py-2 flex items-center justify-between gap-2">
                        <span className="text-gray-700 dark:text-gray-200 font-medium truncate">{section.subject}</span>
                        <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">{section.qpm} q/min</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-semibold whitespace-nowrap">{section.accuracy}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;