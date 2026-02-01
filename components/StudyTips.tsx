import React, { useState } from 'react';
import { 
  Lightbulb, 
  Clock, 
  CheckCircle, 
  XCircle, 
  BookOpen, 
  Target,
  Calendar,
  ChevronDown,
  ChevronUp,
  Star
} from 'lucide-react';
import SUBJECT_STRATEGIES, { 
  EXAM_DAY_TIPS, 
  LAST_WEEK_STRATEGY,
  SubjectStrategy 
} from '../data/studyTipsData';

const StudyTips: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'subjects' | 'exam' | 'lastweek'>('subjects');
  const [selectedSubject, setSelectedSubject] = useState<string>(SUBJECT_STRATEGIES[0].id);
  const [expandedTips, setExpandedTips] = useState<Set<string>>(new Set());

  const currentSubject = SUBJECT_STRATEGIES.find(s => s.id === selectedSubject);

  const toggleTip = (tipId: string) => {
    const newExpanded = new Set(expandedTips);
    if (newExpanded.has(tipId)) {
      newExpanded.delete(tipId);
    } else {
      newExpanded.add(tipId);
    }
    setExpandedTips(newExpanded);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; light: string; border: string }> = {
      purple: { bg: 'bg-purple-600', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-200' },
      blue: { bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200' },
      cyan: { bg: 'bg-cyan-600', text: 'text-cyan-600', light: 'bg-cyan-50', border: 'border-cyan-200' },
      amber: { bg: 'bg-amber-600', text: 'text-amber-600', light: 'bg-amber-50', border: 'border-amber-200' },
      green: { bg: 'bg-green-600', text: 'text-green-600', light: 'bg-green-50', border: 'border-green-200' },
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Lightbulb className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Study Tips & Strategies</h1>
        </div>
        <p className="text-emerald-100">
          Expert guidance for each subject, exam day tips, and last-minute revision strategy
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm">
        <button
          onClick={() => setActiveTab('subjects')}
          className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === 'subjects'
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="hidden sm:inline">Subject Strategies</span>
          <span className="sm:hidden">Subjects</span>
        </button>
        <button
          onClick={() => setActiveTab('exam')}
          className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === 'exam'
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span className="hidden sm:inline">Exam Day Tips</span>
          <span className="sm:hidden">Exam Day</span>
        </button>
        <button
          onClick={() => setActiveTab('lastweek')}
          className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === 'lastweek'
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="hidden sm:inline">Last Week Plan</span>
          <span className="sm:hidden">Last Week</span>
        </button>
      </div>

      {/* Subject Strategies Tab */}
      {activeTab === 'subjects' && (
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Subject Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
              <h3 className="font-semibold text-gray-800 mb-3">Select Subject</h3>
              <div className="space-y-2">
                {SUBJECT_STRATEGIES.map(subject => {
                  const colors = getColorClasses(subject.color);
                  return (
                    <button
                      key={subject.id}
                      onClick={() => {
                        setSelectedSubject(subject.id);
                        setExpandedTips(new Set());
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        selectedSubject === subject.id
                          ? `${colors.light} ${colors.text} font-medium ${colors.border} border`
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{subject.icon}</span>
                        <div>
                          <p className="text-sm font-medium">{subject.subject.split(' ')[0]}</p>
                          <p className="text-xs text-gray-500">{subject.weightage}% | {subject.totalQuestions} Qs</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Subject Content */}
          <div className="lg:col-span-3">
            {currentSubject && (
              <SubjectContent 
                subject={currentSubject} 
                expandedTips={expandedTips}
                onToggleTip={toggleTip}
                colorClasses={getColorClasses(currentSubject.color)}
              />
            )}
          </div>
        </div>
      )}

      {/* Exam Day Tips Tab */}
      {activeTab === 'exam' && (
        <div className="space-y-4">
          {EXAM_DAY_TIPS.map((tip, index) => (
            <div
              key={tip.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
                  <p className="text-gray-600 bg-emerald-50 p-3 rounded-lg">
                    {tip.content}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Quick Time Chart */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
            <h3 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Quick Time Allocation Chart (120 minutes)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { name: 'Legal', time: 35, color: 'bg-purple-500' },
                { name: 'Logical', time: 20, color: 'bg-blue-500' },
                { name: 'English', time: 25, color: 'bg-cyan-500' },
                { name: 'Math', time: 12, color: 'bg-amber-500' },
                { name: 'GK', time: 8, color: 'bg-green-500' },
              ].map(section => (
                <div key={section.name} className="text-center">
                  <div className={`${section.color} text-white rounded-lg py-3 mb-2`}>
                    <p className="text-2xl font-bold">{section.time}</p>
                    <p className="text-xs">minutes</p>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{section.name}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-emerald-700 mt-4 text-center">
              + Keep 20 minutes buffer for revision and review
            </p>
          </div>
        </div>
      )}

      {/* Last Week Strategy Tab */}
      {activeTab === 'lastweek' && (
        <div className="space-y-4">
          {LAST_WEEK_STRATEGY.map((day, index) => (
            <div
              key={day.day}
              className={`bg-white rounded-xl p-5 shadow-sm border ${
                index === LAST_WEEK_STRATEGY.length - 1 
                  ? 'border-emerald-300 bg-emerald-50' 
                  : 'border-gray-100'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 ${
                  index === LAST_WEEK_STRATEGY.length - 1
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {7 - index}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold mb-3 ${
                    index === LAST_WEEK_STRATEGY.length - 1 ? 'text-emerald-800' : 'text-gray-800'
                  }`}>
                    {day.day}
                    {index === LAST_WEEK_STRATEGY.length - 1 && (
                      <span className="ml-2 text-xs bg-emerald-600 text-white px-2 py-1 rounded-full">
                        🎯 THE BIG DAY
                      </span>
                    )}
                  </h3>
                  <ul className="space-y-2">
                    {day.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start gap-2">
                        <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${
                          index === LAST_WEEK_STRATEGY.length - 1
                            ? 'text-emerald-600'
                            : 'text-gray-400'
                        }`} />
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface SubjectContentProps {
  subject: SubjectStrategy;
  expandedTips: Set<string>;
  onToggleTip: (id: string) => void;
  colorClasses: { bg: string; text: string; light: string; border: string };
}

const SubjectContent: React.FC<SubjectContentProps> = ({ 
  subject, 
  expandedTips, 
  onToggleTip,
  colorClasses 
}) => {
  return (
    <div className="space-y-5">
      {/* Subject Header */}
      <div className={`${colorClasses.bg} rounded-xl p-5 text-white`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{subject.icon}</span>
          <div>
            <h2 className="text-xl font-bold">{subject.subject}</h2>
            <div className="flex gap-4 text-sm opacity-90">
              <span>📊 {subject.weightage}% weightage</span>
              <span>📝 {subject.totalQuestions} questions</span>
              <span>⏱️ {subject.timeAllocation} min</span>
            </div>
          </div>
        </div>
        <p className="text-white/90">{subject.description}</p>
      </div>

      {/* Key Topics */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h3 className={`font-semibold ${colorClasses.text} mb-3 flex items-center gap-2`}>
          <Target className="w-5 h-5" />
          Key Topics to Cover
        </h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {subject.keyTopics.map((topic, index) => (
            <div key={index} className={`${colorClasses.light} px-3 py-2 rounded-lg text-sm`}>
              • {topic}
            </div>
          ))}
        </div>
      </div>

      {/* Study Tips */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h3 className={`font-semibold ${colorClasses.text} mb-3 flex items-center gap-2`}>
          <Lightbulb className="w-5 h-5" />
          Study Tips
        </h3>
        <div className="space-y-3">
          {subject.tips.map(tip => (
            <div 
              key={tip.id}
              className={`border rounded-lg overflow-hidden ${
                tip.priority === 'high' ? colorClasses.border : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => onToggleTip(tip.id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {tip.priority === 'high' && (
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  )}
                  <span className="font-medium text-gray-800">{tip.title}</span>
                </div>
                {expandedTips.has(tip.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {expandedTips.has(tip.id) && (
                <div className={`px-4 pb-4 ${colorClasses.light} border-t ${colorClasses.border}`}>
                  <p className="text-gray-700 pt-3">{tip.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-green-500">
          <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Do's
          </h3>
          <ul className="space-y-2">
            {subject.dosDonts.dos.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-red-500">
          <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Don'ts
          </h3>
          <ul className="space-y-2">
            {subject.dosDonts.donts.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-red-500 shrink-0">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h3 className={`font-semibold ${colorClasses.text} mb-3 flex items-center gap-2`}>
          <BookOpen className="w-5 h-5" />
          Recommended Resources
        </h3>
        <ul className="space-y-2">
          {subject.resources.map((resource, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-700">
              <span className={`w-2 h-2 rounded-full ${colorClasses.bg}`}></span>
              {resource}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudyTips;
