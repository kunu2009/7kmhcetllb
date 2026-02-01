import React, { useState } from 'react';
import { Calendar, Clock, Target, BookOpen, CheckCircle, AlertCircle, Download, RefreshCw, Zap, Brain, Trophy } from 'lucide-react';
import { Subject } from '../types';

interface StudyBlock {
  time: string;
  subject: Subject;
  topic: string;
  duration: number;
  type: 'study' | 'practice' | 'revision' | 'break';
}

interface WeekPlan {
  day: string;
  blocks: StudyBlock[];
}

const StudyPlanner: React.FC = () => {
  const [hoursPerDay, setHoursPerDay] = useState(4);
  const [examDate, setExamDate] = useState('2026-05-15');
  const [weakAreas, setWeakAreas] = useState<Subject[]>([]);
  const [generated, setGenerated] = useState(false);
  const [weekPlan, setWeekPlan] = useState<WeekPlan[]>([]);

  const daysUntilExam = Math.ceil((new Date(examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const weeksUntilExam = Math.ceil(daysUntilExam / 7);

  const toggleWeakArea = (subject: Subject) => {
    setWeakAreas(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const generatePlan = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const subjects = [
      Subject.LegalAptitude,
      Subject.GK,
      Subject.LogicalReasoning,
      Subject.English,
      Subject.Math
    ];

    // Study topics for each subject
    const topicsBySubject: Record<Subject, string[]> = {
      [Subject.LegalAptitude]: [
        'Constitution: Preamble & FR',
        'Constitution: DPSP & Duties',
        'Contract Act: Basics',
        'Law of Torts',
        'Criminal Law (IPC/BNS)',
        'Legal Maxims',
        'Family Law',
        'Constitutional Amendments'
      ],
      [Subject.GK]: [
        'Indian History: Freedom Struggle',
        'Indian Geography',
        'Current Affairs',
        'Indian Polity',
        'Economics Basics',
        'Science & Technology',
        'Important Dates & Events'
      ],
      [Subject.LogicalReasoning]: [
        'Syllogisms',
        'Blood Relations',
        'Coding-Decoding',
        'Direction Sense',
        'Critical Reasoning',
        'Series & Patterns',
        'Analogies'
      ],
      [Subject.English]: [
        'Reading Comprehension',
        'Grammar Rules',
        'Vocabulary',
        'Sentence Correction',
        'Idioms & Phrases',
        'One-Word Substitutions',
        'Para Jumbles'
      ],
      [Subject.Math]: [
        'Percentages & Profit-Loss',
        'Ratio & Proportion',
        'Time, Speed & Distance',
        'Time & Work',
        'Simple & Compound Interest',
        'Number System',
        'Data Interpretation'
      ]
    };

    const newPlan: WeekPlan[] = days.map((day, dayIndex) => {
      const blocks: StudyBlock[] = [];
      let remainingHours = hoursPerDay;
      
      // Morning study session
      const morningSubject = subjects[(dayIndex * 2) % subjects.length];
      const isWeak = weakAreas.includes(morningSubject);
      const morningDuration = isWeak ? 1.5 : 1;
      
      blocks.push({
        time: '6:00 AM',
        subject: morningSubject,
        topic: topicsBySubject[morningSubject][dayIndex % topicsBySubject[morningSubject].length],
        duration: morningDuration,
        type: 'study'
      });
      remainingHours -= morningDuration;

      // Morning break
      blocks.push({
        time: '7:30 AM',
        subject: Subject.GK,
        topic: 'Quick Breakfast + News',
        duration: 0.5,
        type: 'break'
      });
      remainingHours -= 0.5;

      // Late morning session
      const lateSubject = subjects[(dayIndex * 2 + 1) % subjects.length];
      blocks.push({
        time: '8:00 AM',
        subject: lateSubject,
        topic: topicsBySubject[lateSubject][(dayIndex + 1) % topicsBySubject[lateSubject].length],
        duration: 1,
        type: 'study'
      });
      remainingHours -= 1;

      // Practice session
      blocks.push({
        time: '9:00 AM',
        subject: morningSubject,
        topic: 'Practice Questions',
        duration: 0.5,
        type: 'practice'
      });
      remainingHours -= 0.5;

      // Evening session (if hours remain)
      if (remainingHours > 0) {
        const eveningSubject = weakAreas.length > 0 
          ? weakAreas[dayIndex % weakAreas.length]
          : subjects[(dayIndex + 2) % subjects.length];
        
        blocks.push({
          time: '6:00 PM',
          subject: eveningSubject,
          topic: topicsBySubject[eveningSubject][(dayIndex + 2) % topicsBySubject[eveningSubject].length],
          duration: Math.min(1.5, remainingHours),
          type: weakAreas.includes(eveningSubject) ? 'study' : 'revision'
        });
        remainingHours -= Math.min(1.5, remainingHours);
      }

      // Daily practice test
      if (day === 'Saturday' || day === 'Sunday') {
        blocks.push({
          time: '7:30 PM',
          subject: Subject.LegalAptitude,
          topic: 'Full Mock Test',
          duration: 2,
          type: 'practice'
        });
      } else {
        blocks.push({
          time: '8:00 PM',
          subject: Subject.LegalAptitude,
          topic: 'Daily Challenge',
          duration: 0.25,
          type: 'practice'
        });
      }

      return { day, blocks };
    });

    setWeekPlan(newPlan);
    setGenerated(true);
  };

  const getSubjectColor = (subject: Subject) => {
    switch (subject) {
      case Subject.LegalAptitude: return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case Subject.GK: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case Subject.LogicalReasoning: return 'bg-green-500/20 text-green-400 border-green-500/30';
      case Subject.English: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case Subject.Math: return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'study': return <BookOpen className="w-4 h-4" />;
      case 'practice': return <Target className="w-4 h-4" />;
      case 'revision': return <RefreshCw className="w-4 h-4" />;
      case 'break': return <Zap className="w-4 h-4 text-yellow-400" />;
      default: return null;
    }
  };

  return (
    <div className="p-3 md:p-6 max-w-6xl mx-auto space-y-4 md:space-y-6">
      {/* Header */}
      <div className="text-center mb-4 md:mb-8">
        <h1 className="text-xl md:text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2 md:gap-3">
          <Brain className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
          AI Study Planner
        </h1>
        <p className="text-sm md:text-base text-gray-400">Generate a personalized study schedule for MH CET Law 2026</p>
      </div>

      {!generated ? (
        <div className="bg-gray-800/50 rounded-xl p-4 md:p-8 border border-gray-700 max-w-2xl mx-auto">
          {/* Exam Info */}
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-400">Days Until MH CET Law 2026</p>
                <p className="text-2xl md:text-3xl font-bold text-white">{daysUntilExam} days</p>
                <p className="text-xs md:text-sm text-indigo-400">({weeksUntilExam} weeks)</p>
              </div>
              <Calendar className="w-8 h-8 md:w-12 md:h-12 text-indigo-400" />
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4 md:space-y-6">
            {/* Hours per day */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                Hours per day for study
              </label>
              <div className="grid grid-cols-6 gap-1 md:gap-2">
                {[2, 3, 4, 5, 6, 8].map(hours => (
                  <button
                    key={hours}
                    onClick={() => setHoursPerDay(hours)}
                    className={`px-2 md:px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                      hoursPerDay === hours
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {hours}h
                  </button>
                ))}
              </div>
            </div>

            {/* Exam Date */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                Expected Exam Date
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
              />
            </div>

            {/* Weak Areas */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                Select your weak areas (to focus more)
              </label>
              <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
                {Object.values(Subject).map(subject => (
                  <button
                    key={subject}
                    onClick={() => toggleWeakArea(subject)}
                    className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-all border text-xs md:text-sm ${
                      weakAreas.includes(subject)
                        ? getSubjectColor(subject)
                        : 'bg-gray-700 text-gray-400 border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    {weakAreas.includes(subject) && <CheckCircle className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />}
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generatePlan}
              className="w-full py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Zap className="w-4 h-4 md:w-5 md:h-5" />
              Generate My Study Plan
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            <div className="bg-gray-800/50 rounded-xl p-3 md:p-4 border border-gray-700 text-center">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mx-auto mb-1 md:mb-2" />
              <p className="text-xl md:text-2xl font-bold text-white">{hoursPerDay}h/day</p>
              <p className="text-[10px] md:text-xs text-gray-400">Study Time</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3 md:p-4 border border-gray-700 text-center">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-purple-400 mx-auto mb-1 md:mb-2" />
              <p className="text-xl md:text-2xl font-bold text-white">{daysUntilExam}</p>
              <p className="text-[10px] md:text-xs text-gray-400">Days Left</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3 md:p-4 border border-gray-700 text-center">
              <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-amber-400 mx-auto mb-1 md:mb-2" />
              <p className="text-xl md:text-2xl font-bold text-white">{weakAreas.length || 'None'}</p>
              <p className="text-[10px] md:text-xs text-gray-400">Weak Areas</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3 md:p-4 border border-gray-700 text-center">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-green-400 mx-auto mb-1 md:mb-2" />
              <p className="text-xl md:text-2xl font-bold text-white">{hoursPerDay * 7}h</p>
              <p className="text-[10px] md:text-xs text-gray-400">Weekly Total</p>
            </div>
          </div>

          {/* Week Plan */}
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-3 md:p-4 border-b border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-base md:text-xl font-bold text-white">📅 Weekly Study Schedule</h2>
              <button
                onClick={() => setGenerated(false)}
                className="px-3 md:px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <div className="min-w-[700px] md:min-w-[900px]">
                {/* Days Header */}
                <div className="grid grid-cols-7 border-b border-gray-700">
                  {weekPlan.map(day => (
                    <div key={day.day} className="p-2 md:p-3 text-center font-medium text-white text-xs md:text-sm border-r border-gray-700 last:border-r-0 bg-gray-900/50">
                      {day.day.slice(0, 3)}
                    </div>
                  ))}
                </div>
                
                {/* Schedule Grid */}
                <div className="grid grid-cols-7">
                  {weekPlan.map(day => (
                    <div key={day.day} className="border-r border-gray-700 last:border-r-0 p-1.5 md:p-2 space-y-1.5 md:space-y-2">
                      {day.blocks.map((block, idx) => (
                        <div
                          key={idx}
                          className={`p-1.5 md:p-2 rounded-lg border ${getSubjectColor(block.subject)} text-[10px] md:text-xs`}
                        >
                          <div className="flex items-center gap-1 mb-0.5 md:mb-1">
                            {getTypeIcon(block.type)}
                            <span className="font-medium">{block.time}</span>
                          </div>
                          <p className="font-medium truncate">{block.topic}</p>
                          <p className="text-[8px] md:text-[10px] opacity-70">{block.duration}h • {block.type}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-4 md:p-6">
            <h3 className="font-bold text-white mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              Pro Tips for MH CET Law Success
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400 flex-shrink-0 mt-0.5" />
                Start each day with your weakest subject when your mind is fresh
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400 flex-shrink-0 mt-0.5" />
                Take the Daily Challenge every day to build exam stamina
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400 flex-shrink-0 mt-0.5" />
                Review Flashcards before sleeping - spaced repetition works!
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400 flex-shrink-0 mt-0.5" />
                Do at least 2 full mock tests every weekend
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400 flex-shrink-0 mt-0.5" />
                GLC Mumbai cutoff is around 140/150 - aim for 145+
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanner;
