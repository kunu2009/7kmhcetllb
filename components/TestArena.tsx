import React, { useState, useEffect, useRef } from 'react';
import { Subject, Question } from '../types';
import { generateQuestion } from '../services/geminiService';
import { Timer, CheckCircle2, XCircle, RefreshCw, ArrowRight, BarChart2, Gauge } from 'lucide-react';

const TestArena: React.FC = () => {
  const [activeSubject, setActiveSubject] = useState<Subject>(Subject.LegalAptitude);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const timerRef = useRef<number | null>(null);

  const loadNewQuestion = async () => {
    setLoading(true);
    setSelectedOption(null);
    setShowExplanation(false);
    setTimeSpent(0);
    
    // Start Timer
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    const jsonStr = await generateQuestion(activeSubject, difficulty);
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed.question) throw new Error("Invalid question format");

      setCurrentQuestion({
        id: Date.now().toString(),
        text: parsed.question,
        options: parsed.options,
        correctAnswer: parsed.correctIndex,
        explanation: parsed.explanation,
        subject: activeSubject
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
    };
  }, []);

  // Load initial question
  useEffect(() => {
    loadNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSubject, difficulty]);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; 
    
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

  const getDifficultyColor = (d: string) => {
    switch(d) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Test Arena</h2>
          <p className="text-gray-500">Adaptive practice to build exam temperament.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
           <div className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg font-bold text-sm flex items-center gap-2 border border-orange-100">
             🔥 Streak: {streak}
           </div>
           <div className="bg-indigo-50 px-3 py-1.5 rounded-lg text-sm font-bold text-indigo-600 flex items-center gap-2 border border-indigo-100">
             <Timer className="w-4 h-4" /> {timeSpent}s
           </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar flex-1">
          {Object.values(Subject).map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSubject(sub)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSubject === sub
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
           <Gauge className="w-4 h-4 text-gray-400 ml-2" />
           {(['Easy', 'Medium', 'Hard'] as const).map(d => (
             <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  difficulty === d ? getDifficultyColor(d) : 'text-gray-400 hover:text-gray-600'
                }`}
             >
               {d}
             </button>
           ))}
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 relative overflow-hidden flex flex-col">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4 flex-1">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="text-indigo-600 font-medium animate-pulse">Generating {difficulty} {activeSubject} Question...</p>
          </div>
        ) : currentQuestion ? (
          <div className="space-y-6 flex-1 flex flex-col">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold tracking-wider text-indigo-500 uppercase bg-indigo-50 px-2 py-1 rounded">Question</span>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${getDifficultyColor(difficulty)}`}>{difficulty}</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-relaxed">
                {currentQuestion.text}
              </h3>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                let stateStyles = "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50";
                let icon = null;

                if (selectedOption !== null) {
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
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${stateStyles}`}
                  >
                    <span className="font-medium text-sm md:text-base pr-4">{option}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
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
            <div className="mt-6 flex justify-end pt-6 border-t border-gray-100">
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