import React, { useState, useEffect, useRef } from 'react';
import { CourseTrack, Subject, Question } from '../types';
import { generateQuestion } from '../services/geminiService';
import { Timer, CheckCircle2, XCircle, RefreshCw, ArrowRight, BarChart2, Gauge, Layers, Shuffle, Target, Save, Play, Trash2, FileText, AlertTriangle, Award, X, Clock, CheckSquare, BookOpen, Library, Database } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { MOCK_TEST_QUESTIONS, FULL_MOCK_TESTS, PREVIOUS_YEAR_PAPERS, MCQQuestion } from '../data/mockTestQuestions';

type PracticeMode = 'classic' | 'topic' | 'mixed' | 'exam' | 'bank' | 'fullMock';

const TOPICS: Record<Subject, string[]> = {
  [Subject.LegalAptitude]: ["Indian Constitution", "Law of Torts", "Contract Law", "Criminal Law (IPC)", "Family Law", "Legal Maxims"],
  [Subject.GK]: ["Current Affairs", "History", "Geography", "Economics", "General Science", "Static GK"],
  [Subject.LogicalReasoning]: ["Syllogisms", "Blood Relations", "Coding-Decoding", "Critical Reasoning", "Puzzles", "Direction Sense"],
  [Subject.English]: ["Reading Comprehension", "Grammar Spotting Errors", "Vocabulary", "Sentence Correction", "Idioms & Phrases"],
  [Subject.Math]: ["Arithmetic", "Commercial Maths", "Data Interpretation", "Modern Maths"]
};

const TRACK_SUBJECTS: Record<CourseTrack, Subject[]> = {
  [CourseTrack.LLB3]: [Subject.LegalAptitude, Subject.GK, Subject.LogicalReasoning, Subject.English, Subject.Math],
  [CourseTrack.LLB5]: [Subject.LegalAptitude, Subject.GK, Subject.LogicalReasoning, Subject.English],
  [CourseTrack.BBA_BMS]: [Subject.Math, Subject.LogicalReasoning, Subject.English, Subject.GK],
  [CourseTrack.HOTEL_MGMT]: [Subject.English, Subject.GK, Subject.LogicalReasoning, Subject.Math],
  [CourseTrack.OTHER]: [Subject.GK, Subject.LogicalReasoning, Subject.English, Subject.Math]
};

const TRACK_HINT: Record<CourseTrack, string> = {
  [CourseTrack.LLB3]: 'Legal-first pattern enabled.',
  [CourseTrack.LLB5]: 'Legal + aptitude mix enabled.',
  [CourseTrack.BBA_BMS]: 'Quant, LR, English, GK focused flow enabled.',
  [CourseTrack.HOTEL_MGMT]: 'Service aptitude starter flow enabled.',
  [CourseTrack.OTHER]: 'General aptitude starter flow enabled.'
};

const getFallbackQuestion = (
  querySubject: Subject,
  queryDifficulty: 'Easy' | 'Medium' | 'Hard',
  queryTopic?: string
): Question => {
  const normalizedDifficulty = queryDifficulty.toLowerCase();

  let candidates = MOCK_TEST_QUESTIONS.filter((question) => {
    const matchesSubject = question.subject === querySubject;
    const matchesDifficulty = question.difficulty === normalizedDifficulty;
    const matchesTopic = queryTopic
      ? question.topic.toLowerCase().includes(queryTopic.toLowerCase())
      : true;
    return matchesSubject && matchesDifficulty && matchesTopic;
  });

  if (candidates.length === 0) {
    candidates = MOCK_TEST_QUESTIONS.filter((question) => question.subject === querySubject);
  }

  if (candidates.length === 0) {
    candidates = [...MOCK_TEST_QUESTIONS];
  }

  const picked = candidates[Math.floor(Math.random() * candidates.length)];

  return {
    id: `${picked.id}-${Date.now()}`,
    text: picked.question,
    options: picked.options,
    correctAnswer: picked.correctAnswer,
    explanation: picked.explanation,
    subject: picked.subject,
    topic: picked.topic
  };
};

const TestArena: React.FC = () => {
  const { addTestResult, learnerProfile } = useProgress();
  const availableSubjects = TRACK_SUBJECTS[learnerProfile.targetCourse] || TRACK_SUBJECTS[CourseTrack.LLB3];
  const [mode, setMode] = useState<PracticeMode>('classic');
  const [activeSubject, setActiveSubject] = useState<Subject>(Subject.LegalAptitude);
  const [selectedTopic, setSelectedTopic] = useState<string>(TOPICS[Subject.LegalAptitude][0]);
  const [mixedSubjects, setMixedSubjects] = useState<Subject[]>([Subject.LegalAptitude, Subject.GK, Subject.LogicalReasoning]);
  
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const ignoreNextFetch = useRef(false);
  const timerRef = useRef<number | null>(null);

  const [examStage, setExamStage] = useState<'intro' | 'active' | 'summary'>('intro');
  const [timeLeft, setTimeLeft] = useState(120 * 60); 
  const [examAnswers, setExamAnswers] = useState<{question: Question, selected: number, isCorrect: boolean}[]>([]);
  const examTimerRef = useRef<number | null>(null);
  
  // Question Bank Mode state
  const [bankQuestions, setBankQuestions] = useState<MCQQuestion[]>([]);
  const [bankIndex, setBankIndex] = useState(0);
  const [bankFilterSubject, setBankFilterSubject] = useState<Subject | 'all'>('all');
  const [bankFilterDifficulty, setBankFilterDifficulty] = useState<string>('all');
  const [bankAnswers, setBankAnswers] = useState<Map<string, number>>(new Map());
  const [showBankResults, setShowBankResults] = useState(false);
  
  // Full Mock Test state
  const [selectedMockTest, setSelectedMockTest] = useState<string | null>(null);
  const [mockTestQuestions, setMockTestQuestions] = useState<MCQQuestion[]>([]);
  const [mockTestIndex, setMockTestIndex] = useState(0);
  const [mockTestAnswers, setMockTestAnswers] = useState<Map<string, number>>(new Map());
  const [mockTestStage, setMockTestStage] = useState<'select' | 'active' | 'review'>('select');

  useEffect(() => {
    const presetSubjects = TRACK_SUBJECTS[learnerProfile.targetCourse] || TRACK_SUBJECTS[CourseTrack.LLB3];
    setActiveSubject(presetSubjects[0]);
    setSelectedTopic(TOPICS[presetSubjects[0]][0]);
    setMixedSubjects(presetSubjects.slice(0, 3));
    if (bankFilterSubject !== 'all' && !presetSubjects.includes(bankFilterSubject)) {
      setBankFilterSubject('all');
    }
  }, [learnerProfile.targetCourse]);

  useEffect(() => {
    const saved = localStorage.getItem('lawranker_test_progress');
    if (saved) setShowResumePrompt(true);
  }, []);

  useEffect(() => {
    if (mode === 'topic' && !ignoreNextFetch.current) {
      setSelectedTopic(TOPICS[activeSubject][0]);
    }
  }, [activeSubject, mode]);

  useEffect(() => {
    if (mode === 'exam' && examStage === 'active') {
      examTimerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (examTimerRef.current) window.clearInterval(examTimerRef.current);
    }
    return () => {
      if (examTimerRef.current) window.clearInterval(examTimerRef.current);
    };
  }, [mode, examStage]);
  
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (examTimerRef.current) window.clearInterval(examTimerRef.current);
    };
  }, []);

  // Initialize question bank when mode changes to 'bank'
  useEffect(() => {
    if (mode === 'bank') {
      const filtered = MOCK_TEST_QUESTIONS.filter(q => {
        const matchSubject = bankFilterSubject === 'all' || q.subject === bankFilterSubject;
        const matchDifficulty = bankFilterDifficulty === 'all' || q.difficulty === bankFilterDifficulty;
        return matchSubject && matchDifficulty;
      });
      setBankQuestions(filtered);
      setBankIndex(0);
      setBankAnswers(new Map());
      setShowBankResults(false);
    }
  }, [mode, bankFilterSubject, bankFilterDifficulty]);

  // Start mock test
  const startMockTest = (testId: string) => {
    const test = FULL_MOCK_TESTS.find(t => t.id === testId);
    if (!test) return;
    
    // Select questions based on test configuration
    const selectedQuestions: MCQQuestion[] = [];
    Object.entries(test.subjectDistribution).forEach(([subject, count]) => {
      const subjectQuestions = MOCK_TEST_QUESTIONS
        .filter(q => q.subject === subject)
        .sort(() => Math.random() - 0.5)
        .slice(0, count as number);
      selectedQuestions.push(...subjectQuestions);
    });
    
    // Shuffle all questions
    setMockTestQuestions(selectedQuestions.sort(() => Math.random() - 0.5));
    setMockTestIndex(0);
    setMockTestAnswers(new Map());
    setTimeLeft(test.duration * 60);
    setSelectedMockTest(testId);
    setMockTestStage('active');
  };

  const submitMockTest = () => {
    if (examTimerRef.current) window.clearInterval(examTimerRef.current);
    
    let correct = 0;
    let attempted = 0;
    const subjectBreakdown: Record<string, { correct: number; total: number }> = {};
    
    mockTestQuestions.forEach(q => {
      const userAnswer = mockTestAnswers.get(q.id);
      if (userAnswer !== undefined) {
        attempted++;
        if (!subjectBreakdown[q.subject]) {
          subjectBreakdown[q.subject] = { correct: 0, total: 0 };
        }
        subjectBreakdown[q.subject].total++;
        if (userAnswer === q.correctAnswer) {
          correct++;
          subjectBreakdown[q.subject].correct++;
        }
      }
    });
    
    addTestResult({
      id: Date.now().toString(),
      date: Date.now(),
      score: correct,
      total: mockTestQuestions.length,
      subjectBreakdown
    });
    
    setMockTestStage('review');
  };

  const loadNewQuestion = async () => {
    setLoading(true);
    setSelectedOption(null);
    setShowExplanation(false);
    
    if (mode !== 'exam') {
      setTimeSpent(0);
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }

    let querySubject = activeSubject;
    let queryTopic = undefined;
    let queryDifficulty = difficulty;

    if (mode === 'mixed' || mode === 'exam') {
      const subjectsPool = mode === 'exam' ? availableSubjects : mixedSubjects;
      if (subjectsPool.length > 0) {
        querySubject = subjectsPool[Math.floor(Math.random() * subjectsPool.length)];
      }
      
      if (mode === 'exam') {
        queryDifficulty = Math.random() > 0.3 ? 'Medium' : 'Hard';
      }
    } else if (mode === 'topic') {
      queryTopic = selectedTopic;
    }

    const jsonStr = await generateQuestion(querySubject, queryDifficulty, queryTopic);
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed.question) throw new Error("Invalid question format");

      setCurrentQuestion({
        id: Date.now().toString(),
        text: parsed.question,
        options: parsed.options,
        correctAnswer: parsed.correctIndex,
        explanation: parsed.explanation,
        subject: querySubject,
        topic: parsed.topic
      });
    } catch (e) {
      console.error("Parsing error", e);
      setCurrentQuestion(getFallbackQuestion(querySubject, queryDifficulty, queryTopic));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ignoreNextFetch.current) {
      ignoreNextFetch.current = false;
      return;
    }
    if (mode === 'exam') {
       if (examStage === 'intro') setCurrentQuestion(null);
       return;
    }
    if (mode === 'mixed') {
      if (!currentQuestion) loadNewQuestion();
    } else if (mode === 'topic') {
      if (TOPICS[activeSubject].includes(selectedTopic)) loadNewQuestion();
    } else {
      loadNewQuestion();
    }
  }, [activeSubject, difficulty, mode, selectedTopic]); 

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null && mode !== 'exam') return;
    if (mode === 'exam') {
      setSelectedOption(index);
      return;
    }
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setSelectedOption(index);
    setShowExplanation(true);
    if (currentQuestion && index === currentQuestion.correctAnswer) {
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleExamNext = () => {
    if (!currentQuestion || selectedOption === null) return;
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    setExamAnswers(prev => [...prev, {
      question: currentQuestion,
      selected: selectedOption,
      isCorrect
    }]);
    loadNewQuestion();
  };

  const startExam = () => {
    setExamStage('active');
    setExamAnswers([]);
    setTimeLeft(120 * 60);
    loadNewQuestion();
  };

  const toggleMixedSubject = (sub: Subject) => {
    setMixedSubjects(prev => {
      if (prev.includes(sub)) {
        if (prev.length === 1) return prev; 
        return prev.filter(s => s !== sub);
      } else {
        return [...prev, sub];
      }
    });
  };

  const finishExam = () => {
    if (examTimerRef.current) window.clearInterval(examTimerRef.current);
    
    const subjectBreakdown: Record<string, {correct: number, total: number}> = {};
    let totalCorrect = 0;
    
    examAnswers.forEach(ans => {
      if (!subjectBreakdown[ans.question.subject]) {
        subjectBreakdown[ans.question.subject] = { correct: 0, total: 0 };
      }
      subjectBreakdown[ans.question.subject].total++;
      if (ans.isCorrect) {
        subjectBreakdown[ans.question.subject].correct++;
        totalCorrect++;
      }
    });

    if (currentQuestion && selectedOption !== null) {
       const isCorrect = selectedOption === currentQuestion.correctAnswer;
       if (!subjectBreakdown[currentQuestion.subject]) subjectBreakdown[currentQuestion.subject] = { correct: 0, total: 0 };
       subjectBreakdown[currentQuestion.subject].total++;
       if (isCorrect) {
          subjectBreakdown[currentQuestion.subject].correct++;
          totalCorrect++;
       }
       setExamAnswers(prev => [...prev, { question: currentQuestion, selected: selectedOption, isCorrect }]);
    }

    addTestResult({
      id: Date.now().toString(),
      date: Date.now(),
      score: totalCorrect,
      total: examAnswers.length + (currentQuestion && selectedOption !== null ? 1 : 0),
      subjectBreakdown
    });

    setExamStage('summary');
    setLoading(false);
  };

  const handleSaveProgress = () => {
    if (mode === 'exam') return; 
    const sessionData = {
      mode, activeSubject, selectedTopic, mixedSubjects, difficulty, currentQuestion, selectedOption, showExplanation, streak, timeSpent, timestamp: Date.now()
    };
    localStorage.setItem('lawranker_test_progress', JSON.stringify(sessionData));
    alert("Progress saved! You can resume this session later.");
  };

  const handleResume = () => {
    try {
      const saved = localStorage.getItem('lawranker_test_progress');
      if (saved) {
        const data = JSON.parse(saved);
        ignoreNextFetch.current = true;
        setMode(data.mode);
        setActiveSubject(data.activeSubject);
        if (data.selectedTopic) setSelectedTopic(data.selectedTopic);
        if (data.mixedSubjects) setMixedSubjects(data.mixedSubjects);
        setDifficulty(data.difficulty);
        setCurrentQuestion(data.currentQuestion);
        setSelectedOption(data.selectedOption);
        setShowExplanation(data.showExplanation);
        setStreak(data.streak);
        setTimeSpent(data.timeSpent);
        if (data.currentQuestion && data.selectedOption === null && data.mode !== 'exam') {
           if (timerRef.current) window.clearInterval(timerRef.current);
           timerRef.current = window.setInterval(() => {
             setTimeSpent(prev => prev + 1);
           }, 1000);
        }
        setShowResumePrompt(false);
      }
    } catch (e) {
      console.error("Failed to resume", e);
      setShowResumePrompt(false);
      loadNewQuestion();
    }
  };

  const handleDiscardSaved = () => {
    localStorage.removeItem('lawranker_test_progress');
    setShowResumePrompt(false);
    if (mode !== 'exam' && !currentQuestion) loadNewQuestion();
  };

  const getDifficultyColor = (d: string) => {
    switch(d) {
      case 'Easy': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'Hard': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default: return 'bg-gray-100';
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const exitExamMode = () => {
    setMode('classic');
    setExamStage('intro');
    setExamAnswers([]);
    loadNewQuestion();
  };

  if (mode === 'exam' && examStage === 'summary') {
    const totalQs = examAnswers.length;
    const correctQs = examAnswers.filter(a => a.isCorrect).length;
    const score = correctQs;
    const accuracy = totalQs > 0 ? Math.round((correctQs / totalQs) * 100) : 0;
    const timeTaken = 120 * 60 - timeLeft;
    const subjectStats: Record<string, { attempted: number, correct: number }> = {};
    examAnswers.forEach(ans => {
      if (!subjectStats[ans.question.subject]) subjectStats[ans.question.subject] = { attempted: 0, correct: 0 };
      subjectStats[ans.question.subject].attempted += 1;
      if (ans.isCorrect) subjectStats[ans.question.subject].correct += 1;
    });

    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 md:p-8 text-center animate-in zoom-in-95 my-4 md:my-8">
        <div className="w-14 h-14 md:w-20 md:h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
          <Award className="w-7 h-7 md:w-10 md:h-10 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">Exam Completed!</h2>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-4 md:mb-8">Detailed Analysis of your Performance</p>
        
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-8">
          <div className="p-2 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
            <p className="text-[10px] md:text-sm text-gray-500 dark:text-gray-300 mb-1">Score</p>
            <p className="text-xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">{score}/{totalQs}</p>
          </div>
          <div className="p-2 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
            <p className="text-[10px] md:text-sm text-gray-500 dark:text-gray-300 mb-1">Accuracy</p>
            <p className={`text-xl md:text-3xl font-bold ${accuracy > 80 ? 'text-green-600 dark:text-green-400' : accuracy > 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>{accuracy}%</p>
          </div>
          <div className="p-2 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
            <p className="text-[10px] md:text-sm text-gray-500 dark:text-gray-300 mb-1">Time</p>
            <p className="text-xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">{Math.floor(timeTaken/60)}m</p>
          </div>
        </div>

         <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
           <table className="w-full text-sm text-left">
             <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-medium border-b border-gray-200 dark:border-gray-600">
               <tr>
                 <th className="p-4">Subject</th>
                 <th className="p-4 text-center">Attempted</th>
                 <th className="p-4 text-center">Correct</th>
                 <th className="p-4 text-center">Incorrect</th>
                 <th className="p-4 text-right">Accuracy</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
               {Object.entries(subjectStats).map(([subject, stats]) => (
                 <tr key={subject} className="bg-white dark:bg-gray-800">
                    <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{subject}</td>
                    <td className="p-4 text-center text-gray-600 dark:text-gray-400">{stats.attempted}</td>
                    <td className="p-4 text-center text-green-600 dark:text-green-400 font-bold">{stats.correct}</td>
                    <td className="p-4 text-center text-red-500 dark:text-red-400">{stats.attempted - stats.correct}</td>
                    <td className="p-4 text-right font-medium">
                      <span className={`px-2 py-1 rounded ${
                        (stats.correct/stats.attempted) > 0.8 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 
                        (stats.correct/stats.attempted) > 0.5 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {Math.round((stats.correct/stats.attempted)*100)}%
                      </span>
                    </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>

        <button 
          onClick={exitExamMode}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-colors shadow-lg"
        >
          Return to Arena
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col relative">
       {showResumePrompt && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 rounded-2xl">
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-700">
             <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">Resume Practice?</h3>
             <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-4 md:mb-6">We found an unfinished practice session.</p>
             <div className="flex gap-2 md:gap-3">
               <button onClick={handleResume} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 md:py-2.5 rounded-lg font-bold text-sm md:text-base">Resume</button>
               <button onClick={handleDiscardSaved} className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 py-2 md:py-2.5 rounded-lg font-bold text-sm md:text-base">Start New</button>
             </div>
          </div>
        </div>
      )}
      
       <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2 md:gap-3">
            {mode === 'exam' ? <><FileText className="w-6 h-6 md:w-8 md:h-8 text-red-600" /> <span>Exam Mode</span></> : "Test Arena"}
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">{mode === 'exam' ? "Strict conditions." : "Adaptive practice."}</p>
        </div>
        {mode === 'exam' && examStage === 'active' ? (
           <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 md:px-4 py-2 rounded-xl font-mono font-bold text-base md:text-lg border border-red-100 dark:border-red-900 animate-pulse self-start">
             <Clock className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" /> {formatTime(timeLeft)}
           </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {mode !== 'exam' && <button onClick={handleSaveProgress} className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-bold text-xs md:text-sm border border-indigo-100 dark:border-gray-700"><Save className="w-3 h-3 md:w-4 md:h-4 inline mr-1" /> Save</button>}
             <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-bold text-xs md:text-sm border border-orange-100 dark:border-orange-900">🔥 {streak}</div>
          </div>
        )}
      </div>

      <div className="mb-4 md:mb-6 rounded-xl border border-indigo-100 dark:border-indigo-900 bg-indigo-50/70 dark:bg-indigo-900/20 px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm text-indigo-700 dark:text-indigo-300">
        <span className="font-semibold">Track:</span> {learnerProfile.targetCourse} • {TRACK_HINT[learnerProfile.targetCourse]}
      </div>

      {!(mode === 'exam' && examStage === 'active') && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 dark:border-gray-700 mb-4 md:mb-6 space-y-3 md:space-y-4">
          <div className="flex flex-wrap gap-1 md:gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
            <button onClick={() => setMode('classic')} className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2 ${mode === 'classic' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400'}`}><Layers className="w-3 h-3 md:w-4 md:h-4" /> Subject</button>
            <button onClick={() => setMode('topic')} className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2 ${mode === 'topic' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400'}`}><Target className="w-3 h-3 md:w-4 md:h-4" /> Topic</button>
            <button onClick={() => setMode('bank')} className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2 ${mode === 'bank' ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' : 'text-gray-500 dark:text-gray-400'}`}><Database className="w-3 h-3 md:w-4 md:h-4" /> Q-Bank</button>
            <button onClick={() => { setMode('fullMock'); setMockTestStage('select'); }} className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2 ${mode === 'fullMock' ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300' : 'text-gray-500 dark:text-gray-400'}`}><Library className="w-3 h-3 md:w-4 md:h-4" /> Full Mock</button>
            <button onClick={() => setMode('mixed')} className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2 ${mode === 'mixed' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400'}`}><Shuffle className="w-3 h-3 md:w-4 md:h-4" /> Mixed</button>
            <button onClick={() => { setMode('exam'); setExamStage('intro'); }} className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2 ${mode === 'exam' ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 ring-1 ring-red-200 dark:ring-red-800' : 'text-gray-500 dark:text-gray-400'}`}><AlertTriangle className="w-3 h-3 md:w-4 md:h-4" /> Exam</button>
          </div>
          {mode !== 'exam' && mode !== 'bank' && mode !== 'fullMock' && (
             <div className="space-y-3">
                 {mode !== 'mixed' && (
                    <div className="flex overflow-x-auto gap-1 md:gap-2 pb-1 no-scrollbar -mx-1 px-1">
                        {availableSubjects.map((sub) => (
                          <button key={sub} onClick={() => setActiveSubject(sub)} className={`whitespace-nowrap px-2 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium ${activeSubject === sub ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}>{sub}</button>
                        ))}
                    </div>
                 )}
             </div>
          )}
        </div>
      )}

      <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-4 md:p-8 relative overflow-hidden flex flex-col">
        {/* Exam Mode Intro */}
        {mode === 'exam' && examStage === 'intro' ? (
           <div className="text-center py-6 md:py-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">Exam Day Rules</h3>
              <button onClick={startExam} className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold shadow-lg text-sm md:text-base">Start Exam Now</button>
           </div>
        ) : mode === 'bank' ? (
          /* Question Bank Mode */
          <div className="space-y-4 md:space-y-6 flex-1 flex flex-col">
            {/* Bank Filters */}
            <div className="flex flex-wrap gap-2 md:gap-3 pb-3 border-b border-gray-100 dark:border-gray-700">
              <select
                value={bankFilterSubject}
                onChange={(e) => setBankFilterSubject(e.target.value as Subject | 'all')}
                className="px-2 md:px-3 py-1.5 md:py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-xs md:text-sm"
              >
                <option value="all">All Subjects</option>
                {availableSubjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
              <select
                value={bankFilterDifficulty}
                onChange={(e) => setBankFilterDifficulty(e.target.value)}
                className="px-2 md:px-3 py-1.5 md:py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-xs md:text-sm"
              >
                <option value="all">All Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 ml-auto self-center">
                {bankQuestions.length} questions available
              </span>
            </div>
            
            {bankQuestions.length > 0 ? (
              <>
                <div className="flex items-center justify-between text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  <span>Question {bankIndex + 1} of {bankQuestions.length}</span>
                  <span className={`px-2 py-0.5 rounded capitalize ${
                    bankQuestions[bankIndex].difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                    bankQuestions[bankIndex].difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>{bankQuestions[bankIndex].difficulty}</span>
                </div>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white">{bankQuestions[bankIndex].question}</h3>
                
                <div className="space-y-2 md:space-y-3">
                  {bankQuestions[bankIndex].options.map((option, idx) => {
                    const selected = bankAnswers.get(bankQuestions[bankIndex].id);
                    const isSelected = selected === idx;
                    const showAnswer = selected !== undefined;
                    const isCorrect = idx === bankQuestions[bankIndex].correctAnswer;
                    
                    let style = "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700";
                    if (showAnswer) {
                      if (isCorrect) style = "bg-green-50 dark:bg-green-900/30 border-green-500 dark:border-green-400";
                      else if (isSelected) style = "bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-400";
                    } else if (isSelected) {
                      style = "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 dark:border-indigo-400";
                    }
                    
                    return (
                      <button 
                        key={idx} 
                        onClick={() => {
                          if (!bankAnswers.has(bankQuestions[bankIndex].id)) {
                            setBankAnswers(new Map(bankAnswers.set(bankQuestions[bankIndex].id, idx)));
                          }
                        }}
                        className={`w-full text-left p-3 md:p-4 rounded-xl border-2 flex items-center justify-between text-gray-800 dark:text-gray-200 text-sm md:text-base ${style}`}
                      >
                        {option}
                        {showAnswer && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        {showAnswer && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                      </button>
                    );
                  })}
                </div>
                
                {bankAnswers.has(bankQuestions[bankIndex].id) && (
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 md:p-4 rounded-lg text-blue-800 dark:text-blue-200 text-xs md:text-sm">
                    <strong>Explanation:</strong> {bankQuestions[bankIndex].explanation}
                    {bankQuestions[bankIndex].year && <span className="block mt-1 text-blue-600 dark:text-blue-400">Asked in: MH CET Law {bankQuestions[bankIndex].year}</span>}
                  </div>
                )}
                
                <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-700">
                  <button 
                    onClick={() => setBankIndex(prev => Math.max(0, prev - 1))}
                    disabled={bankIndex === 0}
                    className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 text-sm md:text-base"
                  >
                    ← Previous
                  </button>
                  <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    {bankAnswers.size} answered
                  </span>
                  <button 
                    onClick={() => setBankIndex(prev => Math.min(bankQuestions.length - 1, prev + 1))}
                    disabled={bankIndex === bankQuestions.length - 1}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 text-sm md:text-base"
                  >
                    Next →
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No questions match your filters. Try different criteria.
              </div>
            )}
          </div>
        ) : mode === 'fullMock' && mockTestStage === 'select' ? (
          /* Full Mock Test Selection */
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white">Select a Mock Test</h3>
            <div className="grid gap-3 md:gap-4">
              {FULL_MOCK_TESTS.map(test => (
                <div key={test.id} className="p-4 md:p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-white text-sm md:text-base">{test.title}</h4>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{test.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded">{test.totalQuestions} Qs</span>
                        <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded">{test.duration} min</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          test.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                          test.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                          'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }`}>{test.difficulty}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => startMockTest(test.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-bold text-sm md:text-base"
                    >
                      Start Test
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="font-bold text-gray-800 dark:text-white mb-3 text-sm md:text-base">Previous Year Papers</h4>
              <div className="grid gap-2 md:gap-3">
                {PREVIOUS_YEAR_PAPERS.map(paper => (
                  <div key={paper.id} className="p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-800 dark:text-white text-sm md:text-base">{paper.title}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{paper.totalQuestions} Qs</span>
                    </div>
                    <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-1 rounded">Coming Soon</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : mode === 'fullMock' && mockTestStage === 'active' ? (
          /* Full Mock Test Active */
          <div className="space-y-4 md:space-y-6 flex-1 flex flex-col">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                Question {mockTestIndex + 1} of {mockTestQuestions.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded">
                  {mockTestAnswers.size} answered
                </span>
                <span className="font-mono text-sm md:text-base bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-lg">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
            
            {mockTestQuestions[mockTestIndex] && (
              <>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded">{mockTestQuestions[mockTestIndex].subject}</span>
                  <span className={`px-2 py-0.5 rounded ${
                    mockTestQuestions[mockTestIndex].difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                    mockTestQuestions[mockTestIndex].difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>{mockTestQuestions[mockTestIndex].difficulty}</span>
                </div>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white">{mockTestQuestions[mockTestIndex].question}</h3>
                
                <div className="space-y-2 md:space-y-3">
                  {mockTestQuestions[mockTestIndex].options.map((option, idx) => {
                    const selected = mockTestAnswers.get(mockTestQuestions[mockTestIndex].id);
                    const isSelected = selected === idx;
                    
                    return (
                      <button 
                        key={idx} 
                        onClick={() => {
                          setMockTestAnswers(new Map(mockTestAnswers.set(mockTestQuestions[mockTestIndex].id, idx)));
                        }}
                        className={`w-full text-left p-3 md:p-4 rounded-xl border-2 text-gray-800 dark:text-gray-200 text-sm md:text-base ${
                          isSelected ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 dark:border-indigo-400' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-700">
                  <button 
                    onClick={() => setMockTestIndex(prev => Math.max(0, prev - 1))}
                    disabled={mockTestIndex === 0}
                    className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 text-sm"
                  >
                    ← Prev
                  </button>
                  <button 
                    onClick={submitMockTest}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm"
                  >
                    Submit Test
                  </button>
                  <button 
                    onClick={() => setMockTestIndex(prev => Math.min(mockTestQuestions.length - 1, prev + 1))}
                    disabled={mockTestIndex === mockTestQuestions.length - 1}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 text-sm"
                  >
                    Next →
                  </button>
                </div>
              </>
            )}
          </div>
        ) : mode === 'fullMock' && mockTestStage === 'review' ? (
          /* Full Mock Test Review */
          <div className="text-center py-6 md:py-8 space-y-6">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto">
              <Award className="w-7 h-7 md:w-10 md:h-10 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Mock Test Completed!</h2>
            
            <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-md mx-auto">
              <div className="p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <p className="text-xs text-gray-500 dark:text-gray-400">Score</p>
                <p className="text-lg md:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {Array.from(mockTestAnswers.entries()).filter(([id, ans]) => {
                    const q = mockTestQuestions.find(q => q.id === id);
                    return q && ans === q.correctAnswer;
                  }).length}/{mockTestQuestions.length}
                </p>
              </div>
              <div className="p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <p className="text-xs text-gray-500 dark:text-gray-400">Attempted</p>
                <p className="text-lg md:text-2xl font-bold text-green-600 dark:text-green-400">{mockTestAnswers.size}</p>
              </div>
              <div className="p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <p className="text-xs text-gray-500 dark:text-gray-400">Skipped</p>
                <p className="text-lg md:text-2xl font-bold text-orange-600 dark:text-orange-400">{mockTestQuestions.length - mockTestAnswers.size}</p>
              </div>
            </div>
            
            <button 
              onClick={() => { setMockTestStage('select'); setMode('classic'); }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold"
            >
              Return to Arena
            </button>
          </div>
        ) : loading ? (
          <div className="flex-1 flex items-center justify-center">
             <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
          </div>
        ) : currentQuestion ? (
          <div className="space-y-4 md:space-y-6 flex-1 flex flex-col">
             <h3 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white">{currentQuestion.text}</h3>
             <div className="space-y-2 md:space-y-3">
                {currentQuestion.options.map((option, idx) => {
                    let style = "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700";
                    if (selectedOption === idx) style = mode === 'exam' ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 dark:border-indigo-400" : (idx === currentQuestion.correctAnswer ? "bg-green-50 dark:bg-green-900/30 border-green-500 dark:border-green-400" : "bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-400");
                    return <button key={idx} onClick={() => handleOptionSelect(idx)} className={`w-full text-left p-3 md:p-4 rounded-xl border-2 flex items-center justify-between text-gray-800 dark:text-gray-200 text-sm md:text-base ${style}`}>{option}</button>
                })}
             </div>
             {showExplanation && mode !== 'exam' && <div className="bg-blue-50 dark:bg-blue-900/30 p-3 md:p-4 rounded-lg text-blue-800 dark:text-blue-200 text-xs md:text-sm">{currentQuestion.explanation}</div>}
             <div className="mt-4 md:mt-6 flex justify-end pt-4 md:pt-6 border-t border-gray-100 dark:border-gray-700">
                {mode === 'exam' ? 
                   <button onClick={handleExamNext} disabled={selectedOption===null} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-bold text-sm md:text-base">Save & Next</button> : 
                   <button onClick={loadNewQuestion} disabled={loading || selectedOption===null} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-bold text-sm md:text-base">Next Question</button>
                }
             </div>
          </div>
        ) : (
            <div className="text-center py-12 md:py-20">
            <p className="text-gray-500 dark:text-gray-400">Connection failed.</p>
            <button onClick={loadNewQuestion} className="text-indigo-600 dark:text-indigo-400 font-bold mt-2 underline">Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestArena;