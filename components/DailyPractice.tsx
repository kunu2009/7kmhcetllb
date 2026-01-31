import React, { useState, useEffect } from 'react';
import { Subject } from '../types';
import { useProgress } from '../context/ProgressContext';
import { Calendar, Clock, Trophy, Target, Flame, CheckCircle, XCircle, ArrowRight, RefreshCw, Zap } from 'lucide-react';

interface DailyQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: Subject;
  explanation: string;
}

// Daily questions pool - rotates based on day
const QUESTION_POOL: DailyQuestion[] = [
  // Legal Aptitude
  {
    id: 'dp-1',
    question: 'Which Article of the Constitution deals with "Right to Equality"?',
    options: ['Article 12', 'Article 14', 'Article 19', 'Article 21'],
    correctAnswer: 1,
    subject: Subject.LegalAptitude,
    explanation: 'Article 14 guarantees "Equality before law" and "Equal protection of laws" to all persons within the territory of India.'
  },
  {
    id: 'dp-2',
    question: 'The maxim "Ignorantia juris non excusat" means:',
    options: ['Justice delayed is justice denied', 'Ignorance of law is no excuse', 'Let the buyer beware', 'The thing speaks for itself'],
    correctAnswer: 1,
    subject: Subject.LegalAptitude,
    explanation: '"Ignorantia juris non excusat" is a Latin maxim meaning ignorance of law is no excuse. Every person is presumed to know the law.'
  },
  {
    id: 'dp-3',
    question: 'Right to Education (Article 21A) was added by which Constitutional Amendment?',
    options: ['42nd Amendment', '73rd Amendment', '86th Amendment', '91st Amendment'],
    correctAnswer: 2,
    subject: Subject.LegalAptitude,
    explanation: 'The 86th Constitutional Amendment Act, 2002 inserted Article 21A making education a Fundamental Right for children aged 6-14 years.'
  },
  {
    id: 'dp-4',
    question: 'Which section of IPC (now BNS) deals with Murder?',
    options: ['Section 299/100', 'Section 300/101', 'Section 304/105', 'Section 307/109'],
    correctAnswer: 1,
    subject: Subject.LegalAptitude,
    explanation: 'Section 300 of IPC (now Section 101 of BNS) defines Murder as culpable homicide amounting to murder.'
  },
  {
    id: 'dp-5',
    question: 'A contract made without free consent is:',
    options: ['Void', 'Voidable', 'Valid', 'Illegal'],
    correctAnswer: 1,
    subject: Subject.LegalAptitude,
    explanation: 'Under Section 19 of Indian Contract Act, a contract made without free consent (due to coercion, undue influence, fraud, misrepresentation, or mistake) is voidable at the option of the party whose consent was so obtained.'
  },
  
  // GK Questions
  {
    id: 'dp-6',
    question: 'Who was the first Chief Justice of Independent India?',
    options: ['H.J. Kania', 'M. Patanjali Sastri', 'B.K. Mukherjee', 'S.R. Das'],
    correctAnswer: 0,
    subject: Subject.GK,
    explanation: 'Justice Harilal Jekisundas Kania was the first Chief Justice of India, serving from 26 January 1950 to 6 November 1951.'
  },
  {
    id: 'dp-7',
    question: 'The Constituent Assembly of India was set up under:',
    options: ['Government of India Act 1935', 'Cabinet Mission Plan 1946', 'Indian Independence Act 1947', 'Mountbatten Plan'],
    correctAnswer: 1,
    subject: Subject.GK,
    explanation: 'The Constituent Assembly was formed as per the Cabinet Mission Plan of 1946. Elections were held in July-August 1946.'
  },
  {
    id: 'dp-8',
    question: 'Which river is known as "Dakshin Ganga"?',
    options: ['Krishna', 'Godavari', 'Kaveri', 'Narmada'],
    correctAnswer: 1,
    subject: Subject.GK,
    explanation: 'Godavari is known as "Dakshin Ganga" (Ganges of the South) as it is the largest river in South India.'
  },
  {
    id: 'dp-9',
    question: 'The Chipko Movement was started in which state?',
    options: ['Rajasthan', 'Madhya Pradesh', 'Uttarakhand', 'Himachal Pradesh'],
    correctAnswer: 2,
    subject: Subject.GK,
    explanation: 'The Chipko Movement started in 1973 in Chamoli district of Uttarakhand (then Uttar Pradesh), led by Sunderlal Bahuguna and others.'
  },
  {
    id: 'dp-10',
    question: 'Who founded the Indian National Congress?',
    options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'A.O. Hume', 'Dadabhai Naoroji'],
    correctAnswer: 2,
    subject: Subject.GK,
    explanation: 'Allan Octavian Hume, a British civil servant, founded the Indian National Congress in 1885. W.C. Bonnerjee was its first President.'
  },
  
  // Logical Reasoning
  {
    id: 'dp-11',
    question: 'If PENCIL is coded as RGPENK, how is MOTHER coded?',
    options: ['OQVJGT', 'ORVIGT', 'OQVHGT', 'OQVIGU'],
    correctAnswer: 0,
    subject: Subject.LogicalReasoning,
    explanation: 'Pattern: Each letter is replaced by the letter 2 positions ahead (P→R, E→G, N→P, C→E, I→N, L→K). So M→O, O→Q, T→V, H→J, E→G, R→T.'
  },
  {
    id: 'dp-12',
    question: 'Rahul is taller than Mohan. Mohan is shorter than Suresh. Suresh is taller than Rahul. Who is the tallest?',
    options: ['Rahul', 'Mohan', 'Suresh', 'Cannot be determined'],
    correctAnswer: 2,
    subject: Subject.LogicalReasoning,
    explanation: 'From the statements: Rahul > Mohan, Suresh > Mohan, Suresh > Rahul. Therefore, Suresh > Rahul > Mohan. Suresh is the tallest.'
  },
  {
    id: 'dp-13',
    question: 'Find the missing number: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '46'],
    correctAnswer: 1,
    subject: Subject.LogicalReasoning,
    explanation: 'The pattern is n×(n+1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.'
  },
  {
    id: 'dp-14',
    question: 'Pointing to a man, a woman said, "His mother is the only daughter of my mother." How is the woman related to the man?',
    options: ['Mother', 'Grandmother', 'Sister', 'Aunt'],
    correctAnswer: 0,
    subject: Subject.LogicalReasoning,
    explanation: '"Only daughter of my mother" means the woman herself. So the man\'s mother is the woman. Therefore, the woman is the man\'s mother.'
  },
  {
    id: 'dp-15',
    question: 'All cats are dogs. All dogs are birds. Conclusion: All cats are birds.',
    options: ['True', 'False', 'Uncertain', 'Invalid'],
    correctAnswer: 0,
    subject: Subject.LogicalReasoning,
    explanation: 'This is a valid syllogism. If A⊂B and B⊂C, then A⊂C. All cats are dogs (A⊂B), all dogs are birds (B⊂C), therefore all cats are birds (A⊂C).'
  },
  
  // English
  {
    id: 'dp-16',
    question: 'Choose the correctly spelled word:',
    options: ['Accomodation', 'Accommodation', 'Acommodation', 'Acomodation'],
    correctAnswer: 1,
    subject: Subject.English,
    explanation: 'The correct spelling is "Accommodation" with double "c" and double "m".'
  },
  {
    id: 'dp-17',
    question: 'Select the synonym of "BENEVOLENT":',
    options: ['Cruel', 'Kind', 'Angry', 'Strict'],
    correctAnswer: 1,
    subject: Subject.English,
    explanation: 'Benevolent means well-meaning and kindly. Its synonym is "Kind".'
  },
  {
    id: 'dp-18',
    question: '"To let the cat out of the bag" means:',
    options: ['To release a cat', 'To reveal a secret', 'To be careless', 'To make a mistake'],
    correctAnswer: 1,
    subject: Subject.English,
    explanation: 'The idiom "to let the cat out of the bag" means to reveal a secret, especially accidentally.'
  },
  {
    id: 'dp-19',
    question: 'The antonym of "PLETHORA" is:',
    options: ['Abundance', 'Scarcity', 'Excess', 'Surplus'],
    correctAnswer: 1,
    subject: Subject.English,
    explanation: 'Plethora means excess or abundance. Its antonym is "Scarcity" meaning shortage or lack.'
  },
  {
    id: 'dp-20',
    question: 'Choose the correct sentence:',
    options: [
      'Neither the teacher nor the students was present.',
      'Neither the teacher nor the students were present.',
      'Neither the teacher nor the students is present.',
      'Neither the teacher nor the students are presents.'
    ],
    correctAnswer: 1,
    subject: Subject.English,
    explanation: 'With "neither...nor", the verb agrees with the nearer subject. "Students" is plural, so "were" is correct.'
  },
  
  // Mathematics
  {
    id: 'dp-21',
    question: 'If a shopkeeper sells an article at 20% profit, and the cost price is ₹500, what is the selling price?',
    options: ['₹550', '₹580', '₹600', '₹620'],
    correctAnswer: 2,
    subject: Subject.Math,
    explanation: 'SP = CP × (100 + Profit%)/100 = 500 × 120/100 = ₹600'
  },
  {
    id: 'dp-22',
    question: 'The HCF and LCM of two numbers are 12 and 180 respectively. If one number is 36, find the other.',
    options: ['48', '54', '60', '72'],
    correctAnswer: 2,
    subject: Subject.Math,
    explanation: 'HCF × LCM = Product of numbers. So 12 × 180 = 36 × x. Therefore, x = (12 × 180)/36 = 60.'
  },
  {
    id: 'dp-23',
    question: 'A train 150m long passes a pole in 15 seconds. What is its speed in km/hr?',
    options: ['32 km/hr', '36 km/hr', '40 km/hr', '45 km/hr'],
    correctAnswer: 1,
    subject: Subject.Math,
    explanation: 'Speed = Distance/Time = 150/15 = 10 m/s. Converting to km/hr: 10 × 18/5 = 36 km/hr.'
  },
  {
    id: 'dp-24',
    question: 'A and B together can complete a work in 12 days. A alone can complete it in 20 days. How many days will B take alone?',
    options: ['25 days', '28 days', '30 days', '35 days'],
    correctAnswer: 2,
    subject: Subject.Math,
    explanation: 'A+B = 1/12, A = 1/20. B = 1/12 - 1/20 = (5-3)/60 = 2/60 = 1/30. So B takes 30 days.'
  },
  {
    id: 'dp-25',
    question: 'Find the compound interest on ₹8000 at 10% for 2 years.',
    options: ['₹1600', '₹1680', '₹1720', '₹1760'],
    correctAnswer: 1,
    subject: Subject.Math,
    explanation: 'CI = P[(1+R/100)^T - 1] = 8000[(1.1)² - 1] = 8000[1.21 - 1] = 8000 × 0.21 = ₹1680.'
  }
];

// Get questions for today based on date
const getTodaysQuestions = (): DailyQuestion[] => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const shuffled = [...QUESTION_POOL].sort(() => {
    // Use day of year as seed for consistent daily shuffle
    return Math.sin(dayOfYear * QUESTION_POOL.length) - 0.5;
  });
  return shuffled.slice(0, 10); // 10 questions per day
};

const DailyPractice: React.FC = () => {
  const { incrementStudyHours } = useProgress();
  const [questions] = useState<DailyQuestion[]>(getTodaysQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('dailyStreak');
    return saved ? parseInt(saved) : 0;
  });
  const [lastPracticeDate, setLastPracticeDate] = useState(() => {
    return localStorage.getItem('lastDailyPractice') || '';
  });

  const today = new Date().toDateString();
  const alreadyCompleted = lastPracticeDate === today;

  // Timer
  useEffect(() => {
    if (!started || completed || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, completed, timeLeft]);

  const handleStart = () => {
    if (alreadyCompleted) return;
    setStarted(true);
  };

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
      finishPractice();
    }
  };

  const finishPractice = () => {
    setCompleted(true);
    
    // Update streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastPracticeDate === yesterday.toDateString()) {
      setStreak(prev => {
        const newStreak = prev + 1;
        localStorage.setItem('dailyStreak', newStreak.toString());
        return newStreak;
      });
    } else if (lastPracticeDate !== today) {
      setStreak(1);
      localStorage.setItem('dailyStreak', '1');
    }
    
    localStorage.setItem('lastDailyPractice', today);
    setLastPracticeDate(today);
    
    // Add study time for completing daily practice
    incrementStudyHours(0.2); // 12 minutes equivalent
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSubjectColor = (subject: Subject) => {
    switch (subject) {
      case Subject.LegalAptitude: return 'bg-purple-500/20 text-purple-400';
      case Subject.GK: return 'bg-blue-500/20 text-blue-400';
      case Subject.LogicalReasoning: return 'bg-green-500/20 text-green-400';
      case Subject.English: return 'bg-yellow-500/20 text-yellow-400';
      case Subject.Math: return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Not Started Screen
  if (!started) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">Daily Practice Challenge</h1>
          <p className="text-gray-400 mb-6">10 mixed questions • 10 minutes • Build your streak!</p>
          
          {/* Streak Display */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Flame className={`w-6 h-6 ${streak > 0 ? 'text-orange-500' : 'text-gray-500'}`} />
            <span className="text-xl font-bold text-white">{streak} Day Streak</span>
          </div>
          
          {alreadyCompleted ? (
            <div className="space-y-4">
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-green-400 font-medium">Today's practice completed!</p>
                <p className="text-gray-400 text-sm mt-1">Come back tomorrow to continue your streak</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="text-white font-medium">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Time Limit</p>
                  <p className="text-white font-medium">10 Minutes</p>
                </div>
              </div>
              
              <button
                onClick={handleStart}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Start Today's Challenge
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}
          
          {/* Info */}
          <div className="mt-6 text-left bg-gray-700/30 rounded-lg p-4">
            <h3 className="font-medium text-white mb-2">📌 Challenge Rules:</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• 10 questions covering all subjects</li>
              <li>• Each correct answer = 10 points</li>
              <li>• Complete daily to maintain streak</li>
              <li>• Questions refresh every day at midnight</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Completed Screen
  if (completed) {
    const percentage = (score / questions.length) * 100;
    
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 text-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
            percentage >= 70 ? 'bg-green-500/20' : percentage >= 40 ? 'bg-yellow-500/20' : 'bg-red-500/20'
          }`}>
            {percentage >= 70 ? (
              <Trophy className="w-12 h-12 text-green-400" />
            ) : percentage >= 40 ? (
              <Target className="w-12 h-12 text-yellow-400" />
            ) : (
              <RefreshCw className="w-12 h-12 text-red-400" />
            )}
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">
            {percentage >= 70 ? 'Excellent!' : percentage >= 40 ? 'Good Effort!' : 'Keep Practicing!'}
          </h2>
          
          <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-4">
            {score}/{questions.length}
          </div>
          
          <p className="text-gray-400 mb-6">You earned {score * 10} points!</p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-700/50 rounded-lg p-3">
              <p className="text-2xl font-bold text-green-400">{score}</p>
              <p className="text-xs text-gray-400">Correct</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <p className="text-2xl font-bold text-red-400">{questions.length - score}</p>
              <p className="text-xs text-gray-400">Wrong</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <p className="text-2xl font-bold text-amber-400">{percentage.toFixed(0)}%</p>
              <p className="text-xs text-gray-400">Accuracy</p>
            </div>
          </div>
          
          {/* Streak Update */}
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" />
              <span className="text-xl font-bold text-white">{streak} Day Streak!</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Keep it going tomorrow!</p>
          </div>
          
          {/* Review Answers */}
          <div className="text-left bg-gray-700/30 rounded-lg p-4 mb-6 max-h-60 overflow-y-auto">
            <h3 className="font-medium text-white mb-3">📋 Review Answers:</h3>
            {questions.map((q, idx) => (
              <div key={q.id} className={`flex items-start gap-2 py-2 border-b border-gray-600/30 last:border-0`}>
                <span className="flex-shrink-0">
                  {answers[idx] === q.correctAnswer ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 truncate">{idx + 1}. {q.question}</p>
                  <p className="text-xs text-green-400">Ans: {q.options[q.correctAnswer]}</p>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-gray-400 text-sm">Come back tomorrow for new questions!</p>
        </div>
      </div>
    );
  }

  // Active Quiz
  const currentQuestion = questions[currentIndex];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold text-white">
            Q{currentIndex + 1}/{questions.length}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSubjectColor(currentQuestion.subject)}`}>
            {currentQuestion.subject}
          </span>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${timeLeft < 60 ? 'bg-red-500/20 text-red-400' : 'bg-gray-700/50 text-white'}`}>
          <Clock className="w-4 h-4" />
          <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-700 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-6">
        <h3 className="text-xl font-medium text-white mb-6">
          {currentQuestion.question}
        </h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                selectedAnswer === null
                  ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600 text-white'
                  : idx === currentQuestion.correctAnswer
                    ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
                    : idx === selectedAnswer
                      ? 'bg-red-500/20 border-2 border-red-500 text-red-400'
                      : 'bg-gray-700/30 border border-gray-600 text-gray-500'
              }`}
            >
              <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-300">
              <span className="font-bold">💡 Explanation:</span> {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Next Button */}
      {selectedAnswer !== null && (
        <button
          onClick={handleNext}
          className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2"
        >
          {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Practice'}
          <ArrowRight className="w-5 h-5" />
        </button>
      )}

      {/* Score indicator */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <span className="text-green-400 text-sm">✓ {score} correct</span>
        <span className="text-red-400 text-sm">✗ {currentIndex - score + (selectedAnswer !== null ? 1 : 0) - (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)} wrong</span>
      </div>
    </div>
  );
};

export default DailyPractice;
