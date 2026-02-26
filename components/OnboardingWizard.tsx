import React, { useState } from 'react';
import { BookOpen, Target, CheckCircle2, ArrowRight, GraduationCap, Lightbulb } from 'lucide-react';
import { CourseTrack } from '../types';
import { useProgress } from '../context/ProgressContext';

const COURSE_OPTIONS: { value: CourseTrack; status: 'active' | 'starting'; note: string }[] = [
  {
    value: CourseTrack.LLB3,
    status: 'active',
    note: 'Fully active now with strongest content depth.'
  },
  {
    value: CourseTrack.LLB5,
    status: 'starting',
    note: 'Support started. More dedicated modules coming.'
  },
  {
    value: CourseTrack.BBA_BMS,
    status: 'starting',
    note: 'Support started. Foundation prep will expand first.'
  },
  {
    value: CourseTrack.HOTEL_MGMT,
    status: 'starting',
    note: 'Support started. Course-specific content is planned next.'
  },
  {
    value: CourseTrack.OTHER,
    status: 'starting',
    note: 'Choose this for custom MHCET track setup.'
  }
];

const OnboardingWizard: React.FC = () => {
  const { learnerProfile, updateLearnerProfile, completeOnboarding } = useProgress();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(learnerProfile.name || '');
  const [targetCourse, setTargetCourse] = useState<CourseTrack>(learnerProfile.targetCourse || CourseTrack.LLB3);
  const [examYear, setExamYear] = useState(learnerProfile.examYear || '2026');
  const [dailyGoal, setDailyGoal] = useState(learnerProfile.dailyStudyHoursGoal || 2);

  const handleProfileNext = (e: React.FormEvent) => {
    e.preventDefault();
    updateLearnerProfile({
      name: name.trim(),
      targetCourse,
      examYear,
      dailyStudyHoursGoal: dailyGoal
    });
    setStep(2);
  };

  const handleFinish = () => {
    completeOnboarding();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-6 md:p-8 rounded-2xl shadow-lg">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Welcome to LawRanker MHCET Setup</h2>
            <p className="text-indigo-100 mt-1 text-sm md:text-base">
              First, let’s personalize your preparation path and give you a quick tutorial.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-green-500 text-white'}`}>1</span>
          <span className={`h-1 flex-1 rounded ${step === 1 ? 'bg-gray-200 dark:bg-gray-700' : 'bg-green-500'}`} />
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>2</span>
        </div>

        {step === 1 && (
          <form onSubmit={handleProfileNext} className="space-y-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Step 1: Your Profile</h3>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Your Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Choose MHCET Course Track</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {COURSE_OPTIONS.map((course) => (
                  <button
                    key={course.value}
                    type="button"
                    onClick={() => setTargetCourse(course.value)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      targetCourse === course.value
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm text-gray-800 dark:text-white">{course.value}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${course.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`}>
                        {course.status === 'active' ? 'Active' : 'Starting'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{course.note}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Exam Year</label>
                <input
                  value={examYear}
                  onChange={(e) => setExamYear(e.target.value)}
                  placeholder="2026"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Daily Study Goal (hours)</label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
              >
                Continue Tutorial
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Step 2: Quick Tutorial</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your track is set to <span className="font-semibold text-indigo-600 dark:text-indigo-400">{targetCourse}</span>. Start with this simple flow:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40">
                <BookOpen className="w-5 h-5 text-indigo-500 mb-2" />
                <p className="font-semibold text-sm text-gray-800 dark:text-white">1) Study Hub</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Build concept foundation for your track.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40">
                <Target className="w-5 h-5 text-rose-500 mb-2" />
                <p className="font-semibold text-sm text-gray-800 dark:text-white">2) Weak Point Mode</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Fix low-score topics with focused practice.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40">
                <Lightbulb className="w-5 h-5 text-amber-500 mb-2" />
                <p className="font-semibold text-sm text-gray-800 dark:text-white">3) Daily + Analytics</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Practice daily and monitor trend improvements.</p>
              </div>
            </div>

            {targetCourse !== CourseTrack.LLB3 && (
              <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 text-sm">
                We’ve started onboarding for this track. You can begin with daily practice + weak-point mode now while we expand full dedicated content modules.
              </div>
            )}

            <button
              onClick={handleFinish}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              <CheckCircle2 className="w-4 h-4" />
              Finish Setup & Start
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingWizard;
