import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { Subject } from '../types';
import { MCQQuestion, MOCK_TEST_QUESTIONS } from '../data/mockTestQuestions';
import { Target, ShieldAlert, ArrowRight, CheckCircle, XCircle, RefreshCw, Brain } from 'lucide-react';

const WeakPointDestroyer: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { subjectMastery, addTestResult } = useProgress();
  const [weakestSubject, setWeakestSubject] = useState<Subject | null>(null);
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [sessionStreak, setSessionStreak] = useState(() => Number(localStorage.getItem('weakPointStreak') || '0'));
  const [bestSessionStreak, setBestSessionStreak] = useState(() => Number(localStorage.getItem('weakPointBestStreak') || '0'));

  const parseSubjectFromQuery = (): Subject | null => {
    const subjectParam = searchParams.get('subject');
    if (!subjectParam) return null;

    const subjects = Object.values(Subject);
    return subjects.includes(subjectParam as Subject) ? (subjectParam as Subject) : null;
  };

  useEffect(() => {
    const preferredSubject = parseSubjectFromQuery();

    // Find weakest subject
    let minScore = 100;
    let weakest: Subject | null = null;

    Object.entries(subjectMastery).forEach(([subject, score]) => {
      if (score < minScore) {
        minScore = score;
        weakest = subject as Subject;
      }
    });

    // If all scores are 0 or no data, default to Legal Aptitude
    if (!weakest || minScore === 100) {
      weakest = Subject.LegalAptitude;
    }

    if (preferredSubject) {
      weakest = preferredSubject;
    }

    setWeakestSubject(weakest);

    // Get 10 random questions for the weakest subject
    const subjectQuestions = MOCK_TEST_QUESTIONS.filter(q => q.subject === weakest);
    const shuffled = [...subjectQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    
    setQuestions(selected);
    setAnswers(new Array(selected.length).fill(null));
  }, [subjectMastery, searchParams]);

  const handleAnswer = (optionIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(optionIndex);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
    
    if (optionIndex === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      finishSession();
    }
  };

  const finishSession = () => {
    setIsFinished(true);

    const today = new Date().toDateString();
    const lastCompletedDate = localStorage.getItem('weakPointLastDate') || '';
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    if (lastCompletedDate !== today) {
      const updatedStreak = lastCompletedDate === yesterdayString ? sessionStreak + 1 : 1;
      const updatedBest = Math.max(updatedStreak, bestSessionStreak);

      setSessionStreak(updatedStreak);
      setBestSessionStreak(updatedBest);
      localStorage.setItem('weakPointStreak', updatedStreak.toString());
      localStorage.setItem('weakPointBestStreak', updatedBest.toString());
      localStorage.setItem('weakPointLastDate', today);
    }
    
    if (weakestSubject) {
      addTestResult({
        id: `wpd-${Date.now()}`,
        date: Date.now(),
        score: score,
        total: questions.length,
        subjectBreakdown: {
          [weakestSubject]: { correct: score, total: questions.length }
        }
      });
    }
  };

  const resetSession = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
    
    // Get new questions
    if (weakestSubject) {
      const subjectQuestions = MOCK_TEST_QUESTIONS.filter(q => q.subject === weakestSubject);
      const shuffled = [...subjectQuestions].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10);
      setQuestions(selected);
      setAnswers(new Array(selected.length).fill(null));
    }
  };

  if (!weakestSubject || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/50 mb-6">
            <Target className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Session Complete!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">You've tackled your weak point: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{weakestSubject}</span></p>
          
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Score</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{score}/{questions.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Accuracy</p>
              <p className={`text-3xl font-bold ${percentage >= 80 ? 'text-green-500' : percentage >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                {percentage}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Streak</p>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{sessionStreak}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Best: {bestSessionStreak}</p>
            </div>
          </div>

          <button
            onClick={resetSession}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Destroy Another Weak Point
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Weak Point Destroyer</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400">Targeted practice for your lowest scoring subject: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{weakestSubject}</span></p>
        </div>
        <div className="flex items-center gap-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Question</p>
            <p className="font-bold text-gray-800 dark:text-white">{currentIndex + 1}/{questions.length}</p>
          </div>
          <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Score</p>
            <p className="font-bold text-indigo-600 dark:text-indigo-400">{score}</p>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-full mb-4">
            TARGET: {currentQuestion.topic || weakestSubject}
          </span>
          <h3 className="text-lg md:text-xl font-medium text-gray-800 dark:text-white leading-relaxed">
            {currentQuestion.question}
          </h3>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option: string, idx: number) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === currentQuestion.correctAnswer;
            const showCorrect = showExplanation && isCorrect;
            const showWrong = showExplanation && isSelected && !isCorrect;

            let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ";
            
            if (!showExplanation) {
              buttonClass += isSelected 
                ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300" 
                : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300";
            } else {
              if (showCorrect) {
                buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
              } else if (showWrong) {
                buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
              } else {
                buttonClass += "border-gray-200 dark:border-gray-700 opacity-50 text-gray-500 dark:text-gray-400";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showExplanation}
                className={buttonClass}
              >
                <span className="font-medium">{option}</span>
                {showExplanation && (
                  <span>
                    {showCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {showWrong && <XCircle className="w-5 h-5 text-red-500" />}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className={`p-4 rounded-xl ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
              <div className="flex items-start gap-3">
                <Brain className={`w-5 h-5 mt-0.5 ${selectedAnswer === currentQuestion.correctAnswer ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                <div>
                  <h4 className={`font-bold mb-1 ${selectedAnswer === currentQuestion.correctAnswer ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                    {selectedAnswer === currentQuestion.correctAnswer ? 'Excellent!' : 'Not quite right.'}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Session'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeakPointDestroyer;
