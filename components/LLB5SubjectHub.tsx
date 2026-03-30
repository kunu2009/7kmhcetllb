import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, CheckCircle2, Target, Zap } from 'lucide-react';
import { CourseTrack, Subject } from '../types';
import { useProgress } from '../context/ProgressContext';
import { getLlb5SubjectBlueprint, LLB5_SUBJECT_BLUEPRINTS } from '../data/llb5SubjectBlueprint';

const LLB5SubjectHub: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { learnerProfile } = useProgress();

  const selectedSubject = useMemo(() => {
    const subjectParam = searchParams.get('subject');
    if (subjectParam && (Object.values(Subject) as string[]).includes(subjectParam)) {
      return subjectParam as Subject;
    }
    return Subject.LegalAptitude;
  }, [searchParams]);

  const blueprint = getLlb5SubjectBlueprint(selectedSubject);

  if (learnerProfile.targetCourse !== CourseTrack.LLB5) {
    return (
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2">LLB 5-Year Subject Hub</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          This detailed hub is optimized for MH CET LLB 5-Year prep. Switch your track to LLB 5-Year to unlock personalized study flow.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5 md:space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-5 md:p-7 rounded-2xl shadow-lg">
        <h2 className="text-xl md:text-3xl font-bold mb-2">LLB 5-Year Subject Hub</h2>
        <p className="text-indigo-100 text-sm md:text-base max-w-3xl">
          Subject-wise complete guidance: concept roadmap, module-level explanation, tips/tricks, and direct MCQ drills.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
        <div className="flex flex-wrap gap-2">
          {LLB5_SUBJECT_BLUEPRINTS.map((lane) => {
            const isSelected = lane.subject === selectedSubject;
            return (
              <Link
                key={lane.subject}
                to={`/llb5-subjects?subject=${encodeURIComponent(lane.subject)}`}
                className={`px-3 py-2 rounded-lg text-xs md:text-sm font-semibold border transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-300'
                }`}
              >
                {lane.subject}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white">{blueprint.subject}</h3>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">{blueprint.overview}</p>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 uppercase tracking-wider font-bold">
            {blueprint.weightHint}
          </span>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2">Core Concepts to Master</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{blueprint.concepts.join(' • ')}</p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2">Top Tips & Tricks</p>
          <ul className="space-y-1">
            {blueprint.tips.map((tip) => (
              <li key={tip} className="text-sm text-gray-600 dark:text-gray-300">• {tip}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        {blueprint.modules.map((module) => (
          <div key={module.title} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 md:p-5 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h4 className="text-base md:text-lg font-bold text-gray-800 dark:text-white">{module.title}</h4>
              <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                Target MCQs: {module.targetMcqs}
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300">{module.explanation}</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2">Concept Scope</p>
                <ul className="space-y-1">
                  {module.concepts.map((concept) => (
                    <li key={concept} className="text-xs text-gray-600 dark:text-gray-300">• {concept}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2">MCQ Types</p>
                <ul className="space-y-1">
                  {module.mcqFocus.map((mcq) => (
                    <li key={mcq} className="text-xs text-gray-600 dark:text-gray-300">• {mcq}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2">Execution Tips</p>
                <ul className="space-y-1">
                  {module.tips.map((tip) => (
                    <li key={tip} className="text-xs text-gray-600 dark:text-gray-300">• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                to={`/study?tab=library&subject=${encodeURIComponent(blueprint.subject)}&q=${encodeURIComponent(module.practiceTopic)}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
              >
                <BookOpen className="w-3.5 h-3.5" /> Learn Concepts
              </Link>

              <Link
                to={`/practice?mode=topic&subject=${encodeURIComponent(blueprint.subject)}&topic=${encodeURIComponent(module.practiceTopic)}&difficulty=Medium`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
              >
                <Target className="w-3.5 h-3.5" /> Solve MCQs
              </Link>

              <Link
                to={`/weak-point?subject=${encodeURIComponent(blueprint.subject)}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Weak Point Drill
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-4 md:p-5">
        <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider mb-2">Suggested Daily Study Pattern</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="text-sm text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
            <Zap className="w-4 h-4" /> 45 min concept learning
          </div>
          <div className="text-sm text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
            <Target className="w-4 h-4" /> 30 min topic MCQs
          </div>
          <div className="text-sm text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> 15 min mistake review
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLB5SubjectHub;
