import React, { useState, useEffect, useRef } from 'react';
import { Subject, Question } from '../types';
import { generateQuestion } from '../services/geminiService';
import { Timer, CheckCircle2, XCircle, RefreshCw, ArrowRight, BarChart2, Gauge, Layers, Shuffle, Target, Save, Play, Trash2, FileText, AlertTriangle, Award, X, Clock, CheckSquare } from 'lucide-react';

type PracticeMode = 'classic' | 'topic' | 'mixed' | 'exam';

const TOPICS: Record<Subject, string[]> = {
  [Subject.LegalAptitude]: ["Indian Constitution", "Law of Torts", "Contract Law", "Criminal Law (IPC)", "Family Law", "Legal Maxims"],
  [Subject.GK]: ["Current Affairs", "History", "Geography", "Economics", "General Science", "Static GK"],
  [Subject.LogicalReasoning]: ["Syllogisms", "Blood Relations", "Coding-Decoding", "Critical Reasoning", "Puzzles", "Direction Sense"],
  [Subject.English]: ["Reading Comprehension", "Grammar Spotting Errors", "Vocabulary", "Sentence Correction", "Idioms & Phrases"],
  [Subject.Math]: ["Arithmetic", "Commercial Maths", "Data Interpretation", "Modern Maths"]
};

const TestArena: React.FC = () => {
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
  
  // Resume/Save State
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const ignoreNextFetch = useRef(false);
  const timerRef = useRef<number | null>(null);

  // Exam Mode State
  const [examStage, setExamStage] = useState<'intro' | 'active' | 'summary'>('intro');
  const [timeLeft, setTimeLeft] = useState(120 * 60); // 120 Minutes
  const [examAnswers, setExamAnswers] = useState<{question: Question, selected: number, isCorrect: boolean}[]>([]);
  const examTimerRef = useRef<number | null>(null);

  // Check for saved session on mount
  useEffect(() => {
    const saved = localStorage.getItem('lawranker_test_progress');
    if (saved) {
      setShowResumePrompt(true);
    }
  }, []);

  // Handle Topic Default Selection
  useEffect(() => {
    if (mode === 'topic' && !ignoreNextFetch.current) {
      setSelectedTopic(TOPICS[activeSubject][0]);
    }
  }, [activeSubject, mode]);

  // Exam Timer Logic
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, examStage]);

  const loadNewQuestion = async () => {
    setLoading(true);
    setSelectedOption(null);
    setShowExplanation(false);
    
    // Reset practice timer if not in exam mode
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
      // For Exam Mode: Rotate through subjects or pick random to simulate variety
      const subjectsPool = mode === 'exam' ? Object.values(Subject) : mixedSubjects;
      if (subjectsPool.length > 0) {
        querySubject = subjectsPool[Math.floor(Math.random() * subjectsPool.length)];
      }
      
      // For Exam Mode: Randomize difficulty (Mostly Medium/Hard)
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
        subject: querySubject
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
        subject: Subject.LegalAptitude
      });
    } finally {
      setLoading(false);
    }
  };

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (examTimerRef.current) window.clearInterval(examTimerRef.current);
    };
  }, []);

  // Auto load on mode/config change (with debounce/logic checks)
  useEffect(() => {
    if (ignoreNextFetch.current) {
      ignoreNextFetch.current = false;
      return;
    }

    // Don't auto load for exam mode until started
    if (mode === 'exam') {
       if (examStage === 'intro') {
         setCurrentQuestion(null); // Clear question if any
       }
       return;
    }

    if (mode === 'mixed') {
      if (!currentQuestion) loadNewQuestion();
    } else if (mode === 'topic') {
      if (TOPICS[activeSubject].includes(selectedTopic)) {
        loadNewQuestion();
      }
    } else {
      loadNewQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSubject, difficulty, mode, selectedTopic]); 

  const handleOptionSelect = (index: number) => {
    // If already selected, do nothing
    if (selectedOption !== null && mode !== 'exam') return;
    
    // In Exam Mode, we allow changing selection before submitting
    if (mode === 'exam') {
      setSelectedOption(index);
      return;
    }
    
    // Classic Modes
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

    // Save Answer
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    setExamAnswers(prev => [...prev, {
      question: currentQuestion,
      selected: selectedOption,
      isCorrect
    }]);

    // Load Next
    loadNewQuestion();
  };

  const startExam = () => {
    setExamStage('active');
    setExamAnswers([]);
    setTimeLeft(120 * 60);
    loadNewQuestion();
  };

  const finishExam = () => {
    setExamStage('summary');
    setLoading(false);
    if (examTimerRef.current) window.clearInterval(examTimerRef.current);
  };

  const exitExamMode = () => {
    setMode('classic');
    setExamStage('intro');
    setExamAnswers([]);
    loadNewQuestion();
  };

  const toggleMixedSubject = (sub: Subject) => {
    setMixedSubjects(prev => {
      if (prev.includes(sub)) {
        if (prev.length === 1) return prev; // Prevent deselecting all
        return prev.filter(s => s !== sub);
      } else {
        return [...prev, sub];
      }
    });
  };

  const handleSaveProgress = () => {
    if (mode === 'exam') return; // No saving in exam mode
    const sessionData = {
      mode,
      activeSubject,
      selectedTopic,
      mixedSubjects,
      difficulty,
      currentQuestion,
      selectedOption,
      showExplanation,
      streak,
      timeSpent,
      timestamp: Date.now()
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
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100';
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // --- RENDER EXAM SUMMARY ---
  if (mode === 'exam' && examStage === 'summary') {
    const totalQs = examAnswers.length;
    const correctQs = examAnswers.filter(a => a.isCorrect).length;
    const score = correctQs; // +1 for correct, 0 for wrong
    const accuracy = totalQs > 0 ? Math.round((correctQs / totalQs) * 100) : 0;
    const timeTaken = 120 * 60 - timeLeft;

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center animate-in zoom-in-95">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Award className="w-10 h-10 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Exam Completed!</h2>
        <p className="text-gray-500 mb-8">Here is how you performed under pressure.</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Total Score</p>
            <p className="text-3xl font-bold text-indigo-600">{score}/{totalQs}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Accuracy</p>
            <p className="text-3xl font-bold text-green-600">{accuracy}%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Time Taken</p>
            <p className="text-3xl font-bold text-orange-600">{Math.floor(timeTaken/60)}m</p>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl mb-8 text-left">
          <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <Target className="w-5 h-5" /> Rank 1 Verdict
          </h3>
          <p className="text-indigo-800 text-sm leading-relaxed">
            {accuracy > 80 
              ? "Excellent Work! Your accuracy is on par with top rankers. Focus on maintaining this speed."
              : accuracy > 50 
              ? "Good Attempt. To reach Rank 1, you need to improve your accuracy in Legal Aptitude and Logic. Review your mistakes carefully."
              : "Needs Improvement. Don't worry, focus on concept clarity first before attempting speed drills."
            }
          </p>
        </div>

        <button 
          onClick={exitExamMode}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-colors"
        >
          Return to Arena
        </button>
      </div>
    );
  }

  // --- RENDER MAIN UI ---
  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col relative">
      
      {/* Resume Modal */}
      {showResumePrompt && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 rounded-2xl">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200">
             <h3 className="text-xl font-bold text-gray-900 mb-2">Resume Practice?</h3>
             <p className="text-gray-500 mb-6">We found an unfinished practice session. Would you like to continue where you left off?</p>
             <div className="flex gap-3">
               <button 
                 onClick={handleResume}
                 className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-bold flex items-center justify-center gap-2"
               >
                 <Play className="w-4 h-4" /> Resume
               </button>
               <button 
                 onClick={handleDiscardSaved}
                 className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2"
               >
                 <Trash2 className="w-4 h-4" /> Start New
               </button>
             </div>
          </div>
        </div>
      )}

      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            {mode === 'exam' ? (
              <>
                <FileText className="w-8 h-8 text-red-600" /> 
                <span>Exam Simulator</span>
              </>
            ) : (
              "Test Arena"
            )}
          </h2>
          <p className="text-gray-500">
            {mode === 'exam' 
              ? "Simulating actual MHCET Environment. Strict conditions." 
              : "Adaptive practice to build exam temperament."}
          </p>
        </div>
        
        {mode === 'exam' && examStage === 'active' ? (
           <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-mono font-bold text-lg flex items-center gap-2 border border-red-100 shadow-sm animate-pulse">
             <Clock className="w-5 h-5" /> {formatTime(timeLeft)}
           </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            {mode !== 'exam' && (
               <button 
               onClick={handleSaveProgress}
               className="bg-white text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg font-bold text-sm flex items-center gap-2 border border-indigo-100 transition-colors shadow-sm"
             >
               <Save className="w-4 h-4" /> Save
             </button>
            )}
             <div className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg font-bold text-sm flex items-center gap-2 border border-orange-100">
               🔥 Streak: {streak}
             </div>
             {mode !== 'exam' && (
               <div className="bg-indigo-50 px-3 py-1.5 rounded-lg text-sm font-bold text-indigo-600 flex items-center gap-2 border border-indigo-100">
                 <Timer className="w-4 h-4" /> {timeSpent}s
               </div>
             )}
          </div>
        )}
      </div>

      {/* Mode Switcher (Hidden during active exam) */}
      {!(mode === 'exam' && examStage === 'active') && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6 space-y-4">
          <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-100">
            <button onClick={() => setMode('classic')} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${mode === 'classic' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}><Layers className="w-4 h-4" /> Subject Wise</button>
            <button onClick={() => setMode('topic')} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${mode === 'topic' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}><Target className="w-4 h-4" /> Topic Wise</button>
            <button onClick={() => setMode('mixed')} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${mode === 'mixed' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}><Shuffle className="w-4 h-4" /> Mixed Bag</button>
            <button onClick={() => { setMode('exam'); setExamStage('intro'); }} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${mode === 'exam' ? 'bg-red-100 text-red-700 ring-1 ring-red-200' : 'text-gray-500 hover:bg-gray-50'}`}><AlertTriangle className="w-4 h-4" /> Exam Simulator</button>
          </div>

          {mode !== 'exam' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
               {/* Subject/Topic/Difficulty Controls for non-exam modes */}
               <div className="space-y-3">
                  {mode === 'mixed' ? (
                     <div className="flex flex-wrap gap-2">
                        {Object.values(Subject).map(sub => (
                          <button key={sub} onClick={() => toggleMixedSubject(sub)} className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${mixedSubjects.includes(sub) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}>{sub}</button>
                        ))}
                     </div>
                  ) : (
                    <>
                      <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar">
                        {Object.values(Subject).map((sub) => (
                          <button key={sub} onClick={() => setActiveSubject(sub)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeSubject === sub ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>{sub}</button>
                        ))}
                      </div>
                      {mode === 'topic' && (
                        <div className="flex overflow-x-auto gap-2 pb-1 pt-2 border-t border-dashed border-gray-200 no-scrollbar">
                           {TOPICS[activeSubject].map(topic => (
                             <button key={topic} onClick={() => setSelectedTopic(topic)} className={`whitespace-nowrap px-3 py-1 rounded-md text-xs font-semibold transition-colors ${selectedTopic === topic ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>{topic}</button>
                           ))}
                        </div>
                      )}
                    </>
                  )}
               </div>
               <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-gray-400" />
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                      {(['Easy', 'Medium', 'Hard'] as const).map(d => (
                        <button key={d} onClick={() => setDifficulty(d)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${difficulty === d ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>{d}</button>
                      ))}
                    </div>
                  </div>
                  {mode === 'mixed' && <button onClick={loadNewQuestion} className="text-xs font-bold text-indigo-600 hover:text-indigo-800">Refresh Mix</button>}
               </div>
            </div>
          )}
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 relative overflow-hidden flex flex-col">
        {mode === 'exam' && examStage === 'intro' ? (
           <div className="text-center py-8">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Exam Day Rules</h3>
              <div className="max-w-md mx-auto text-left space-y-3 bg-gray-50 p-6 rounded-xl mb-8 border border-gray-100">
                <div className="flex items-center gap-3 text-gray-700"><CheckSquare className="w-4 h-4 text-indigo-600" /> <span>120 Minutes Duration</span></div>
                <div className="flex items-center gap-3 text-gray-700"><CheckSquare className="w-4 h-4 text-indigo-600" /> <span>Questions cover all 5 subjects randomly</span></div>
                <div className="flex items-center gap-3 text-gray-700"><X className="w-4 h-4 text-red-500" /> <span>No "Check Answer" feedback</span></div>
                <div className="flex items-center gap-3 text-gray-700"><X className="w-4 h-4 text-red-500" /> <span>No Pausing allowed</span></div>
                <div className="flex items-center gap-3 text-gray-700"><CheckSquare className="w-4 h-4 text-indigo-600" /> <span>Detailed analysis at the end</span></div>
              </div>
              <button onClick={startExam} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-red-200 transition-all transform hover:scale-105">
                Start Exam Now
              </button>
           </div>
        ) : loading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4 flex-1">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <div className="text-center">
              <p className="text-indigo-600 font-medium animate-pulse">
                {mode === 'exam' ? 'Fetching Next Question...' : `Generating ${difficulty} Question...`}
              </p>
              {mode === 'exam' && <p className="text-xs text-gray-400 mt-1">Stay focused. Do not refresh.</p>}
            </div>
          </div>
        ) : currentQuestion ? (
          <div className="space-y-6 flex-1 flex flex-col">
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex gap-2">
                  <span className="text-xs font-bold tracking-wider text-indigo-500 uppercase bg-indigo-50 px-2 py-1 rounded">{currentQuestion.subject}</span>
                  {mode === 'topic' && <span className="text-[10px] font-bold text-gray-500 uppercase bg-gray-100 px-2 py-1 rounded max-w-[150px] truncate">{selectedTopic}</span>}
                </div>
                {mode !== 'exam' && <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${getDifficultyColor(difficulty)}`}>{difficulty}</span>}
                {mode === 'exam' && <span className="text-xs font-bold text-gray-400">Q.{examAnswers.length + 1}</span>}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-relaxed">
                {currentQuestion.text}
              </h3>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                let stateStyles = "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50";
                let icon = null;

                if (mode === 'exam') {
                  // Exam Mode: Just highlight selection
                   if (selectedOption === idx) {
                      stateStyles = "bg-indigo-50 border-indigo-500 text-indigo-900";
                      icon = <CheckCircle2 className="w-5 h-5 text-indigo-600" />;
                   }
                } else if (selectedOption !== null) {
                  // Practice Mode: Show correct/incorrect
                  if (idx === currentQuestion.correctAnswer) {
                    stateStyles = "bg-green-50 border-green-500 text-green-900";
                    icon = <CheckCircle2 className="w-5 h-5 text-green-600" />;
                  } else if (idx === selectedOption) {
                    stateStyles = "bg-red-50 border-red-500 text-red-900";
                    icon = <XCircle className="w-5 h-5 text-red-600" />;
                  } else {
                    stateStyles = "opacity-50 border-gray-200";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={selectedOption !== null && mode !== 'exam'}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${stateStyles}`}
                  >
                    <span className="font-medium text-sm md:text-base pr-4">{option}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {/* Explanation - Only in Practice Mode */}
            {showExplanation && mode !== 'exam' && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart2 className="w-4 h-4 text-blue-700" />
                  <h4 className="font-bold text-blue-900 text-sm">Rank 1 Insight</h4>
                </div>
                <p className="text-blue-800 text-sm leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
            
            <div className="flex-1"></div>

            {/* Actions Footer */}
            <div className="mt-6 flex justify-between items-center pt-6 border-t border-gray-100">
              {mode === 'exam' ? (
                 <>
                   <button onClick={finishExam} className="text-red-500 font-medium hover:text-red-700 text-sm">End Exam</button>
                   <button 
                    onClick={handleExamNext}
                    disabled={selectedOption === null}
                    className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${
                      selectedOption === null 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg'
                    }`}
                   >
                     Save & Next <ArrowRight className="w-4 h-4" />
                   </button>
                 </>
              ) : (
                <div className="ml-auto">
                  <button
                    onClick={loadNewQuestion}
                    disabled={loading || selectedOption === null}
                    className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${
                      selectedOption === null 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200'
                    }`}
                  >
                    {selectedOption === null ? 'Select an Answer' : 'Next Question'}
                    {selectedOption !== null && (loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />)}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">Connection failed. Please check your API key.</p>
            <button onClick={loadNewQuestion} className="text-indigo-600 font-bold mt-2 underline">Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestArena;