import React, { useState } from 'react';
import { BookOpen, Target, CheckCircle2, ArrowRight, GraduationCap, Lightbulb, CalendarDays, ExternalLink, Timer } from 'lucide-react';
import { CourseTrack } from '../types';
import { useProgress } from '../context/ProgressContext';
import { CET_EXAMS, getDefaultExamIdByTrack, getExamById } from '../data/cetExamData';

const TRACK_TUTORIAL_CONTENT: Record<CourseTrack, {
  steps: { title: string; description: string }[];
  starterGoals: string[];
}> = {
  [CourseTrack.LLB3]: {
    steps: [
      { title: 'Law Foundation', description: 'Start from Constitution, Torts, Contracts and core legal maxims.' },
      { title: 'Weak Point Mode', description: 'Use targeted sessions to fix Legal Aptitude or reasoning weak areas quickly.' },
      { title: 'Daily + PYQ', description: 'Build consistency with daily practice and previous-year law questions.' }
    ],
    starterGoals: [
      'Complete Constitution basics topic',
      'Solve one legal aptitude focused session',
      'Attempt one daily challenge + review mistakes'
    ]
  },
  [CourseTrack.LLB5]: {
    steps: [
      { title: 'Integrated Aptitude Base', description: 'Balance legal aptitude, English and reasoning from day one.' },
      { title: 'Track Weak Areas', description: 'Use analytics + weak-point drills to improve section balance.' },
      { title: 'Timed Practice', description: 'Move into mixed timed sets to improve exam control.' }
    ],
    starterGoals: [
      'Finish one legal + one English starter topic',
      'Take one mixed reasoning mini session',
      'Review weak sections in analytics'
    ]
  },
  [CourseTrack.BBA_BMS]: {
    steps: [
      { title: 'Quant + LR Core', description: 'Prioritize mathematics and logical reasoning to build exam speed.' },
      { title: 'English Improvement', description: 'Add daily vocabulary and comprehension practice.' },
      { title: 'Business-Aware GK', description: 'Track current affairs with business/economy focus.' }
    ],
    starterGoals: [
      'Solve one quant fundamentals session',
      'Attempt one LR focused weak-point set',
      'Read and revise one GK/business current affairs set'
    ]
  },
  [CourseTrack.HOTEL_MGMT]: {
    steps: [
      { title: 'Communication First', description: 'Start with English comprehension and communication strength.' },
      { title: 'Aptitude + Reasoning', description: 'Practice logical and numeric sections with short timed drills.' },
      { title: 'Hospitality GK', description: 'Build awareness around travel, services and current affairs.' }
    ],
    starterGoals: [
      'Complete one English communication topic',
      'Solve one reasoning + one numerical drill',
      'Practice a GK set focused on hospitality context'
    ]
  },
  [CourseTrack.OTHER]: {
    steps: [
      { title: 'General Aptitude Setup', description: 'Start with broad aptitude baseline across English, LR, Quant and GK.' },
      { title: 'Weak Point Focus', description: 'Use weak-point mode to quickly close low-score areas.' },
      { title: 'Personalized Expansion', description: 'Adapt study path based on analytics and score trends.' }
    ],
    starterGoals: [
      'Take one mixed aptitude session',
      'Run one weak-point targeted retry cycle',
      'Set and complete your first daily goals'
    ]
  }
};

const OnboardingWizard: React.FC = () => {
  const { learnerProfile, updateLearnerProfile, completeOnboarding } = useProgress();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(learnerProfile.name || '');
  const [targetCourse, setTargetCourse] = useState<CourseTrack>(learnerProfile.targetCourse || CourseTrack.LLB3);
  const [selectedExamId, setSelectedExamId] = useState(learnerProfile.selectedExamId || getDefaultExamIdByTrack(learnerProfile.targetCourse || CourseTrack.LLB3));
  const [examYear, setExamYear] = useState(learnerProfile.examYear || '2026');
  const [dailyGoal, setDailyGoal] = useState(learnerProfile.dailyStudyHoursGoal || 2);
  const tutorialContent = TRACK_TUTORIAL_CONTENT[targetCourse] || TRACK_TUTORIAL_CONTENT[CourseTrack.LLB3];
  const selectedExam = getExamById(selectedExamId);
  const selectedExamDate = examYear === '2026' ? new Date(selectedExam.examDate2026) : null;
  const today = new Date();
  const daysToExam = selectedExamDate ? Math.ceil((selectedExamDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : null;

  const handleProfileNext = (e: React.FormEvent) => {
    e.preventDefault();
    updateLearnerProfile({
      name: name.trim(),
      targetCourse,
      selectedExamId,
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
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Choose CET Exam (Official CET Cell options)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CET_EXAMS.map((exam) => (
                  <button
                    key={exam.id}
                    type="button"
                    onClick={() => {
                      setSelectedExamId(exam.id);
                      setTargetCourse(exam.mappedTrack);
                    }}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      selectedExamId === exam.id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm text-gray-800 dark:text-white">{exam.shortTitle}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                        {exam.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{exam.title}</p>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500">Track in app: {exam.mappedTrack}</p>
                  </button>
                ))}
              </div>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                <a href="https://cetcell.mahacet.org/" target="_blank" rel="noreferrer" className="hover:underline text-indigo-600 dark:text-indigo-400">
                  Official CET Cell portal (all exams)
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Exam Year</label>
                <select
                  value={examYear}
                  onChange={(e) => setExamYear(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
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

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-white">Selected Exam: {selectedExam.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Paper: {selectedExam.totalQuestions} Q • {selectedExam.totalMarks} marks • {selectedExam.durationMinutes} mins • {selectedExam.negativeMarking}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-gray-400">{examYear} Countdown</p>
                  <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{daysToExam !== null ? `${Math.max(daysToExam, 0)} days` : 'TBD'}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                  <CalendarDays className="w-3.5 h-3.5" /> Exam Date: {examYear === '2026' ? selectedExam.examDate2026 : 'To be announced'}
                </span>
                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                  <Timer className="w-3.5 h-3.5" /> Duration: {selectedExam.durationMinutes} mins
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-xs">
                {selectedExam.officialLinks.map((link) => (
                  <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1">
                    {link.label} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <p className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Section-wise Syllabus & Marks</p>
              <div className="space-y-2">
                {selectedExam.sections.map((section) => (
                  <div key={section.name} className="p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{section.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{section.questions} Q • {section.marks} marks</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{section.syllabus.join(' • ')}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                <p className="text-xs font-bold text-green-700 dark:text-green-300 mb-2">Already in App</p>
                <ul className="space-y-1">
                  {selectedExam.appCoverage.availableSections.map((item) => (
                    <li key={item} className="text-xs text-green-700/90 dark:text-green-300/90">• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                <p className="text-xs font-bold text-amber-700 dark:text-amber-300 mb-2">Not Fully Built Yet</p>
                <ul className="space-y-1">
                  {selectedExam.appCoverage.missingSections.map((item) => (
                    <li key={item} className="text-xs text-amber-700/90 dark:text-amber-300/90">• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20">
                <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-2">Next Planned</p>
                <ul className="space-y-1">
                  {selectedExam.appCoverage.nextUp.map((item) => (
                    <li key={item} className="text-xs text-indigo-700/90 dark:text-indigo-300/90">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40">
                <BookOpen className="w-5 h-5 text-indigo-500 mb-2" />
                <p className="font-semibold text-sm text-gray-800 dark:text-white">1) {tutorialContent.steps[0].title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{tutorialContent.steps[0].description}</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40">
                <Target className="w-5 h-5 text-rose-500 mb-2" />
                <p className="font-semibold text-sm text-gray-800 dark:text-white">2) {tutorialContent.steps[1].title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{tutorialContent.steps[1].description}</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40">
                <Lightbulb className="w-5 h-5 text-amber-500 mb-2" />
                <p className="font-semibold text-sm text-gray-800 dark:text-white">3) {tutorialContent.steps[2].title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{tutorialContent.steps[2].description}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20">
              <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Your Starter Goals will be auto-added:</p>
              <ul className="space-y-1.5">
                {tutorialContent.starterGoals.map((goal) => (
                  <li key={goal} className="text-xs text-indigo-700/90 dark:text-indigo-300/90 flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedExam.id === 'mah-llb-5y' && (
              <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 text-sm">
                LLB 5-Year update: You already have Legal Aptitude, Logical Reasoning, GK/CA, English and Math practice support in app. Missing part is a fully separate subject-by-subject LLB5-only roadmap lane, which is now marked and planned above.
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
