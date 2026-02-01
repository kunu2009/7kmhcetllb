import React, { useState } from 'react';
import { 
  BookOpen, ChevronRight, ChevronDown, CheckCircle, 
  Scale, FileText, Gavel, AlertTriangle, Globe, 
  Clock, Target, Award, List
} from 'lucide-react';
import { QUICK_REVISION_NOTES, EXAM_PATTERN } from '../data/studyNotes';

type SubjectKey = keyof typeof QUICK_REVISION_NOTES;

const SUBJECT_CONFIG: Record<SubjectKey, { icon: React.ElementType; color: string; label: string }> = {
  constitutionalLaw: { icon: Scale, color: 'text-blue-500', label: 'Constitutional Law' },
  contractLaw: { icon: FileText, color: 'text-green-500', label: 'Contract Law' },
  tortLaw: { icon: AlertTriangle, color: 'text-orange-500', label: 'Law of Torts' },
  criminalLaw: { icon: Gavel, color: 'text-red-500', label: 'Criminal Law (IPC/BNS)' },
  importantCases: { icon: BookOpen, color: 'text-purple-500', label: 'Landmark Cases' },
  gkCurrent: { icon: Globe, color: 'text-teal-500', label: 'GK & Current Affairs' },
};

export default function QuickRevision() {
  const [activeSubject, setActiveSubject] = useState<SubjectKey>('constitutionalLaw');
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [completedPoints, setCompletedPoints] = useState<Set<string>>(new Set());
  const [showExamPattern, setShowExamPattern] = useState(false);

  const toggleTopic = (topicTitle: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicTitle]: !prev[topicTitle]
    }));
  };

  const togglePoint = (pointId: string) => {
    setCompletedPoints(prev => {
      const newSet = new Set(prev);
      if (newSet.has(pointId)) {
        newSet.delete(pointId);
      } else {
        newSet.add(pointId);
      }
      return newSet;
    });
  };

  const currentSubject = QUICK_REVISION_NOTES[activeSubject];
  const totalPoints = currentSubject.topics.reduce((sum, t) => sum + t.points.length, 0);
  const completedCount = currentSubject.topics.reduce((sum, t, ti) => 
    sum + t.points.filter((_, pi) => completedPoints.has(`${activeSubject}-${ti}-${pi}`)).length, 0
  );

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <BookOpen className="text-yellow-400" />
              Quick Revision Notes
            </h1>
            <p className="text-gray-400 mt-1">Point-wise notes for last-minute revision</p>
          </div>
          <button
            onClick={() => setShowExamPattern(!showExamPattern)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 
                     text-white rounded-lg transition-colors"
          >
            <Target size={18} />
            Exam Pattern
          </button>
        </div>
      </div>

      {/* Exam Pattern Modal */}
      {showExamPattern && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{EXAM_PATTERN.name}</h2>
                <button
                  onClick={() => setShowExamPattern(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <List size={18} />
                    <span className="font-medium">Total Questions</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{EXAM_PATTERN.totalQuestions}</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <Clock size={18} />
                    <span className="font-medium">Duration</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{EXAM_PATTERN.duration} mins</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Subject Distribution</h3>
                <div className="space-y-2">
                  {EXAM_PATTERN.subjects.map((sub, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-700/30 p-3 rounded-lg">
                      <span className="text-gray-300">{sub.name}</span>
                      <span className="text-white font-medium">{sub.questions} Q</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">GLC Mumbai Eligibility</h3>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong className="text-yellow-400">Expected Cutoff:</strong> {EXAM_PATTERN.eligibilityForGLC.cutoff}</li>
                    <li>• <strong className="text-yellow-400">Min. Graduation %:</strong> {EXAM_PATTERN.eligibilityForGLC.percentage}</li>
                    <li>• <strong className="text-yellow-400">Qualification:</strong> {EXAM_PATTERN.eligibilityForGLC.qualification}</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Marking Scheme</h3>
                <p className="text-gray-300">
                  +{EXAM_PATTERN.marking.correct} for correct answer, 
                  {EXAM_PATTERN.marking.noNegative ? ' No negative marking' : ' Negative marking applies'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Subject Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-4 sticky top-4">
              <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase">Subjects</h3>
              <nav className="space-y-2">
                {(Object.keys(SUBJECT_CONFIG) as SubjectKey[]).map(key => {
                  const config = SUBJECT_CONFIG[key];
                  const Icon = config.icon;
                  const subjectData = QUICK_REVISION_NOTES[key];
                  const subjectTotalPoints = subjectData.topics.reduce((sum, t) => sum + t.points.length, 0);
                  const subjectCompletedPoints = subjectData.topics.reduce((sum, t, ti) => 
                    sum + t.points.filter((_, pi) => completedPoints.has(`${key}-${ti}-${pi}`)).length, 0
                  );
                  
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveSubject(key)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left
                        ${activeSubject === key 
                          ? 'bg-gray-700 text-white' 
                          : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'}`}
                    >
                      <Icon size={20} className={config.color} />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium">{config.label}</p>
                        <p className="text-xs text-gray-500">
                          {subjectCompletedPoints}/{subjectTotalPoints} points
                        </p>
                      </div>
                      {subjectCompletedPoints === subjectTotalPoints && subjectTotalPoints > 0 && (
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Progress Bar */}
            <div className="bg-gray-800 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{currentSubject.title}</span>
                <span className="text-gray-400 text-sm">
                  {completedCount}/{totalPoints} points completed
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-300"
                  style={{ width: `${(completedCount / totalPoints) * 100}%` }}
                />
              </div>
            </div>

            {/* Topics Accordion */}
            <div className="space-y-4">
              {currentSubject.topics.map((topic, topicIndex) => {
                const isExpanded = expandedTopics[`${activeSubject}-${topicIndex}`] ?? topicIndex === 0;
                const topicCompletedCount = topic.points.filter((_, pi) => 
                  completedPoints.has(`${activeSubject}-${topicIndex}-${pi}`)
                ).length;
                
                return (
                  <div key={topicIndex} className="bg-gray-800 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleTopic(`${activeSubject}-${topicIndex}`)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-750"
                    >
                      <div className="flex items-center gap-3">
                        {isExpanded ? (
                          <ChevronDown size={20} className="text-yellow-400" />
                        ) : (
                          <ChevronRight size={20} className="text-gray-400" />
                        )}
                        <h3 className="text-white font-semibold">{topic.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">
                          {topicCompletedCount}/{topic.points.length}
                        </span>
                        {topicCompletedCount === topic.points.length && (
                          <CheckCircle size={16} className="text-green-500" />
                        )}
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className="px-4 pb-4">
                        <div className="border-l-2 border-gray-700 pl-4 ml-2 space-y-3">
                          {topic.points.map((point, pointIndex) => {
                            const pointId = `${activeSubject}-${topicIndex}-${pointIndex}`;
                            const isCompleted = completedPoints.has(pointId);
                            
                            return (
                              <div 
                                key={pointIndex}
                                onClick={() => togglePoint(pointId)}
                                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all
                                  ${isCompleted 
                                    ? 'bg-green-500/10 border border-green-500/30' 
                                    : 'bg-gray-700/50 hover:bg-gray-700'}`}
                              >
                                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5
                                  ${isCompleted 
                                    ? 'border-green-500 bg-green-500' 
                                    : 'border-gray-500'}`}
                                >
                                  {isCompleted && <CheckCircle size={12} className="text-white" />}
                                </div>
                                <p className={`text-sm leading-relaxed ${isCompleted ? 'text-gray-300' : 'text-gray-300'}`}>
                                  {point}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Completion Message */}
            {completedCount === totalPoints && (
              <div className="mt-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 
                            border border-green-500/30 rounded-xl p-6 text-center">
                <Award className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {currentSubject.title} Completed! 🎉
                </h3>
                <p className="text-gray-300">
                  Great job! You've reviewed all {totalPoints} points. Move to the next subject or take a test.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
