import React, { useState, useEffect, useRef } from 'react';
import { Subject, Question } from '../types';
import { generateQuestion } from '../services/geminiService';
import { Timer, CheckCircle2, XCircle, RefreshCw, ArrowRight, BarChart2, Gauge, Layers, Shuffle, Target, Save, Play, Trash2, FileText, AlertTriangle, Award, X, Clock, CheckSquare } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

type PracticeMode = 'classic' | 'topic' | 'mixed' | 'exam';

const TOPICS: Record<Subject, string[]> = {
  [Subject.LegalAptitude]: ["Indian Constitution", "Law of Torts", "Contract Law", "Criminal Law (IPC)", "Family Law", "Legal Maxims"],
  [Subject.GK]: ["Current Affairs", "History", "Geography", "Economics", "General Science", "Static GK"],
  [Subject.LogicalReasoning]: ["Syllogisms", "Blood Relations", "Coding-Decoding", "Critical Reasoning", "Puzzles", "Direction Sense"],
  [Subject.English]: ["Reading Comprehension", "Grammar Spotting Errors", "Vocabulary", "Sentence Correction", "Idioms & Phrases"],
  [Subject.Math]: ["Arithmetic", "Commercial Maths", "Data Interpretation", "Modern Maths"]
};

const TestArena: React.FC = () => {
  const { addTestResult } = useProgress();
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
      const subjectsPool = mode === 'exam' ? Object.values(Subject) : mixedSubjects;
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
      // Fallback
      setCurrentQuestion({
        id: 'mock-1',
        text: 'Principle: Volenti non fit injuria implies that a person who consents to a risk cannot complain. \nFacts: A spectator at a cricket match is hit by a ball.',
        options: [
          'The stadium is liable for negligence',
          'The batsman is liable for assault',
          'The spectator cannot claim damages as he consented to implied risk',
          'The cricket board must pay compensation'
        ],
        correctAnswer: 2,
        explanation: 'By entering the stadium, the spectator impliedly consents to the ordinary risks of the game (Volenti non fit injuria).',
        subject: Subject.LegalAptitude,
        topic: 'Law of Torts'
      });
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
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 text-center animate-in zoom-in-95 my-8">
        <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Award className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Exam Completed!</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Detailed Analysis of your Performance</p>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">Total Score</p>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{score}/{totalQs}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">Accuracy</p>
            <p className={`text-3xl font-bold ${accuracy > 80 ? 'text-green-600 dark:text-green-400' : accuracy > 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>{accuracy}%</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">Time Taken</p>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{Math.floor(timeTaken/60)}m</p>
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
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-700">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Resume Practice?</h3>
             <p className="text-gray-500 dark:text-gray-400 mb-6">We found an unfinished practice session.</p>
             <div className="flex gap-3">
               <button onClick={handleResume} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-bold">Resume</button>
               <button onClick={handleDiscardSaved} className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 py-2.5 rounded-lg font-bold">Start New</button>
             </div>
          </div>
        </div>
      )}
      
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            {mode === 'exam' ? <><FileText className="w-8 h-8 text-red-600" /> <span>Exam Simulator</span></> : "Test Arena"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{mode === 'exam' ? "Strict conditions." : "Adaptive practice."}</p>
        </div>
        {mode === 'exam' && examStage === 'active' ? (
           <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl font-mono font-bold text-lg border border-red-100 dark:border-red-900 animate-pulse">
             <Clock className="w-5 h-5 inline mr-2" /> {formatTime(timeLeft)}
           </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            {mode !== 'exam' && <button onClick={handleSaveProgress} className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-lg font-bold text-sm border border-indigo-100 dark:border-gray-700"><Save className="w-4 h-4 inline mr-1" /> Save</button>}
             <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-lg font-bold text-sm border border-orange-100 dark:border-orange-900">🔥 Streak: {streak}</div>
          </div>
        )}
      </div>

      {!(mode === 'exam' && examStage === 'active') && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 mb-6 space-y-4">
          <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
            <button onClick={() => setMode('classic')} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${mode === 'classic' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400'}`}><Layers className="w-4 h-4" /> Subject Wise</button>
            <button onClick={() => setMode('topic')} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${mode === 'topic' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400'}`}><Target className="w-4 h-4" /> Topic Wise</button>
            <button onClick={() => setMode('mixed')} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${mode === 'mixed' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400'}`}><Shuffle className="w-4 h-4" /> Mixed Bag</button>
            <button onClick={() => { setMode('exam'); setExamStage('intro'); }} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${mode === 'exam' ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 ring-1 ring-red-200 dark:ring-red-800' : 'text-gray-500 dark:text-gray-400'}`}><AlertTriangle className="w-4 h-4" /> Exam Simulator</button>
          </div>
          {mode !== 'exam' && (
             <div className="space-y-3">
                 {mode !== 'mixed' && (
                    <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar">
                        {Object.values(Subject).map((sub) => (
                          <button key={sub} onClick={() => setActiveSubject(sub)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${activeSubject === sub ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}>{sub}</button>
                        ))}
                    </div>
                 )}
             </div>
          )}
        </div>
      )}

      <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 md:p-8 relative overflow-hidden flex flex-col">
        {mode === 'exam' && examStage === 'intro' ? (
           <div className="text-center py-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Exam Day Rules</h3>
              <button onClick={startExam} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg">Start Exam Now</button>
           </div>
        ) : loading ? (
          <div className="flex-1 flex items-center justify-center">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
          </div>
        ) : currentQuestion ? (
          <div className="space-y-6 flex-1 flex flex-col">
             <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{currentQuestion.text}</h3>
             <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                    let style = "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700";
                    if (selectedOption === idx) style = mode === 'exam' ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 dark:border-indigo-400" : (idx === currentQuestion.correctAnswer ? "bg-green-50 dark:bg-green-900/30 border-green-500 dark:border-green-400" : "bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-400");
                    return <button key={idx} onClick={() => handleOptionSelect(idx)} className={`w-full text-left p-4 rounded-xl border-2 flex items-center justify-between text-gray-800 dark:text-gray-200 ${style}`}>{option}</button>
                })}
             </div>
             {showExplanation && mode !== 'exam' && <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-blue-800 dark:text-blue-200 text-sm">{currentQuestion.explanation}</div>}
             <div className="mt-6 flex justify-end pt-6 border-t border-gray-100 dark:border-gray-700">
                {mode === 'exam' ? 
                   <button onClick={handleExamNext} disabled={selectedOption===null} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold">Save & Next</button> : 
                   <button onClick={loadNewQuestion} disabled={loading || selectedOption===null} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold">Next Question</button>
                }
             </div>
          </div>
        ) : (
            <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">Connection failed.</p>
            <button onClick={loadNewQuestion} className="text-indigo-600 dark:text-indigo-400 font-bold mt-2 underline">Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestArena;