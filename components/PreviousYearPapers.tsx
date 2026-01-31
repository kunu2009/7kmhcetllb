import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  Clock,
  Download,
  Play,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Award,
  Target,
  TrendingUp,
  Filter,
  Search,
  BookOpen,
  AlertCircle,
  RotateCcw,
  Timer,
  Zap
} from 'lucide-react';
import { Subject, Question } from '../types';
import { useProgress } from '../context/ProgressContext';

// Types
interface PreviousYearPaper {
  id: string;
  year: number;
  exam: 'MH CET Law 3-Year' | 'MH CET Law 5-Year';
  totalQuestions: number;
  duration: number; // minutes
  maxMarks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  attempted?: boolean;
  bestScore?: number;
  questions: PYQQuestion[];
}

interface PYQQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: Subject;
  topic: string;
  year: number;
}

// Previous Year Questions Data (Sample - In real app, this would be much larger)
const PYQ_DATA: PreviousYearPaper[] = [
  {
    id: 'pyq-2025-3yr',
    year: 2025,
    exam: 'MH CET Law 3-Year',
    totalQuestions: 150,
    duration: 120,
    maxMarks: 150,
    difficulty: 'Hard',
    questions: [
      {
        id: 'pyq-2025-1',
        text: 'The Preamble to the Constitution of India was amended by which Constitutional Amendment?',
        options: ['42nd Amendment', '44th Amendment', '52nd Amendment', '73rd Amendment'],
        correctAnswer: 0,
        explanation: 'The 42nd Amendment Act, 1976 added the words "Socialist", "Secular" and "Integrity" to the Preamble.',
        subject: Subject.LegalAptitude,
        topic: 'Constitution',
        year: 2025
      },
      {
        id: 'pyq-2025-2',
        text: 'Which of the following writs is known as "bulwark of personal freedom"?',
        options: ['Mandamus', 'Certiorari', 'Habeas Corpus', 'Quo Warranto'],
        correctAnswer: 2,
        explanation: 'Habeas Corpus literally means "you may have the body". It protects against illegal detention.',
        subject: Subject.LegalAptitude,
        topic: 'Writs',
        year: 2025
      },
      {
        id: 'pyq-2025-3',
        text: 'Under Section 10 of the Indian Contract Act, the agreement must be made by:',
        options: ['Only majors', 'Persons competent to contract', 'Only citizens', 'Registered persons'],
        correctAnswer: 1,
        explanation: 'Section 10 requires agreement by parties competent to contract (sound mind, major age, not disqualified by law).',
        subject: Subject.LegalAptitude,
        topic: 'Contract Law',
        year: 2025
      },
      {
        id: 'pyq-2025-4',
        text: 'The doctrine of "Res Ipsa Loquitur" means:',
        options: ['The thing speaks for itself', 'Let the buyer beware', 'Ignorance of law is no excuse', 'No one can be judge in their own case'],
        correctAnswer: 0,
        explanation: 'Res Ipsa Loquitur is a Latin maxim meaning "the thing speaks for itself" - used in negligence cases.',
        subject: Subject.LegalAptitude,
        topic: 'Torts',
        year: 2025
      },
      {
        id: 'pyq-2025-5',
        text: 'Which Article of the Constitution provides for the Right to Education?',
        options: ['Article 19', 'Article 21', 'Article 21A', 'Article 32'],
        correctAnswer: 2,
        explanation: 'Article 21A was inserted by 86th Amendment providing free and compulsory education for children aged 6-14.',
        subject: Subject.LegalAptitude,
        topic: 'Fundamental Rights',
        year: 2025
      },
      {
        id: 'pyq-2025-6',
        text: 'The headquarters of International Court of Justice is located at:',
        options: ['New York', 'Geneva', 'The Hague', 'Vienna'],
        correctAnswer: 2,
        explanation: 'ICJ is the only principal UN organ not located in New York. It is in The Hague, Netherlands.',
        subject: Subject.GK,
        topic: 'International Organizations',
        year: 2025
      },
      {
        id: 'pyq-2025-7',
        text: 'Who among the following is the current Chief Justice of India (as of 2025)?',
        options: ['Justice D.Y. Chandrachud', 'Justice Sanjiv Khanna', 'Justice N.V. Ramana', 'Justice U.U. Lalit'],
        correctAnswer: 1,
        explanation: 'Justice Sanjiv Khanna became the CJI in November 2024 after Justice Chandrachud.',
        subject: Subject.GK,
        topic: 'Current Affairs',
        year: 2025
      },
      {
        id: 'pyq-2025-8',
        text: 'Find the odd one out: Nephew, Cousin, Mother, Brother',
        options: ['Nephew', 'Cousin', 'Mother', 'Brother'],
        correctAnswer: 2,
        explanation: 'Mother is the only female relation. All others (Nephew, Cousin, Brother) can be male.',
        subject: Subject.LogicalReasoning,
        topic: 'Classification',
        year: 2025
      },
      {
        id: 'pyq-2025-9',
        text: 'If CLOUD is coded as DMQVE, then RAIN is coded as:',
        options: ['SBJO', 'SCKP', 'QZHM', 'UCKO'],
        correctAnswer: 0,
        explanation: 'Each letter is replaced by next letter. R→S, A→B, I→J, N→O. So RAIN = SBJO.',
        subject: Subject.LogicalReasoning,
        topic: 'Coding-Decoding',
        year: 2025
      },
      {
        id: 'pyq-2025-10',
        text: 'Choose the correct meaning of the idiom "To burn the midnight oil":',
        options: ['To waste money', 'To work late at night', 'To destroy evidence', 'To start a fire'],
        correctAnswer: 1,
        explanation: '"To burn the midnight oil" means to work or study late into the night.',
        subject: Subject.English,
        topic: 'Idioms',
        year: 2025
      },
    ]
  },
  {
    id: 'pyq-2024-3yr',
    year: 2024,
    exam: 'MH CET Law 3-Year',
    totalQuestions: 150,
    duration: 120,
    maxMarks: 150,
    difficulty: 'Medium',
    questions: [
      {
        id: 'pyq-2024-1',
        text: 'The Anti-Defection Law was added to the Constitution by which Amendment?',
        options: ['42nd Amendment', '44th Amendment', '52nd Amendment', '61st Amendment'],
        correctAnswer: 2,
        explanation: 'The 52nd Amendment Act, 1985 added the Tenth Schedule containing anti-defection provisions.',
        subject: Subject.LegalAptitude,
        topic: 'Constitution',
        year: 2024
      },
      {
        id: 'pyq-2024-2',
        text: 'Under the Indian Evidence Act, a confession made to a police officer is:',
        options: ['Admissible', 'Inadmissible', 'Partially admissible', 'Admissible with corroboration'],
        correctAnswer: 1,
        explanation: 'Section 25 of the Indian Evidence Act makes confession to police officer inadmissible.',
        subject: Subject.LegalAptitude,
        topic: 'Evidence',
        year: 2024
      },
      {
        id: 'pyq-2024-3',
        text: 'Which amendment reduced the voting age from 21 to 18 years?',
        options: ['42nd Amendment', '44th Amendment', '61st Amendment', '73rd Amendment'],
        correctAnswer: 2,
        explanation: 'The 61st Amendment Act, 1988 reduced the voting age from 21 to 18 years.',
        subject: Subject.LegalAptitude,
        topic: 'Constitution',
        year: 2024
      },
      {
        id: 'pyq-2024-4',
        text: 'What is the tenure of a Judge of the Supreme Court?',
        options: ['5 years', '6 years', 'Until 65 years of age', 'Until 62 years of age'],
        correctAnswer: 2,
        explanation: 'Supreme Court judges hold office until 65 years of age. High Court judges retire at 62.',
        subject: Subject.LegalAptitude,
        topic: 'Judiciary',
        year: 2024
      },
      {
        id: 'pyq-2024-5',
        text: '"GST" stands for:',
        options: ['General Sales Tax', 'Goods and Services Tax', 'Government Service Tax', 'Gross Sales Tax'],
        correctAnswer: 1,
        explanation: 'GST stands for Goods and Services Tax, introduced by 101st Amendment.',
        subject: Subject.GK,
        topic: 'Economy',
        year: 2024
      },
    ]
  },
  {
    id: 'pyq-2023-3yr',
    year: 2023,
    exam: 'MH CET Law 3-Year',
    totalQuestions: 150,
    duration: 120,
    maxMarks: 150,
    difficulty: 'Medium',
    questions: [
      {
        id: 'pyq-2023-1',
        text: 'Which part of the Constitution deals with Fundamental Rights?',
        options: ['Part II', 'Part III', 'Part IV', 'Part IVA'],
        correctAnswer: 1,
        explanation: 'Part III (Articles 12-35) contains Fundamental Rights.',
        subject: Subject.LegalAptitude,
        topic: 'Constitution',
        year: 2023
      },
      {
        id: 'pyq-2023-2',
        text: 'Principle of "Volenti non fit injuria" is related to:',
        options: ['Contract Law', 'Law of Torts', 'Criminal Law', 'Family Law'],
        correctAnswer: 1,
        explanation: 'Volenti non fit injuria (to one who consents, no injury is done) is a defense in Law of Torts.',
        subject: Subject.LegalAptitude,
        topic: 'Torts',
        year: 2023
      },
    ]
  },
  {
    id: 'pyq-2025-5yr',
    year: 2025,
    exam: 'MH CET Law 5-Year',
    totalQuestions: 150,
    duration: 120,
    maxMarks: 150,
    difficulty: 'Medium',
    questions: [
      {
        id: 'pyq-2025-5yr-1',
        text: 'The concept of "Basic Structure" of Constitution was propounded in:',
        options: ['Golaknath Case', 'Kesavananda Bharati Case', 'Minerva Mills Case', 'Maneka Gandhi Case'],
        correctAnswer: 1,
        explanation: 'Basic Structure doctrine was first propounded in Kesavananda Bharati v. State of Kerala (1973).',
        subject: Subject.LegalAptitude,
        topic: 'Constitution',
        year: 2025
      },
      {
        id: 'pyq-2025-5yr-2',
        text: 'Which schedule contains the list of states and union territories?',
        options: ['First Schedule', 'Second Schedule', 'Seventh Schedule', 'Eighth Schedule'],
        correctAnswer: 0,
        explanation: 'First Schedule contains names of States and UTs with their territorial extent.',
        subject: Subject.LegalAptitude,
        topic: 'Constitution',
        year: 2025
      },
    ]
  }
];

const PreviousYearPapers: React.FC = () => {
  const { addTestResult } = useProgress();
  const [selectedPaper, setSelectedPaper] = useState<PreviousYearPaper | null>(null);
  const [examMode, setExamMode] = useState<'browse' | 'test' | 'review'>('browse');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterExam, setFilterExam] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Timer effect
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examMode === 'test' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examMode, timeLeft]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTest = (paper: PreviousYearPaper) => {
    setSelectedPaper(paper);
    setExamMode('test');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResult(false);
    setTimeLeft(paper.duration * 60);
  };

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    setExamMode('review');
    setShowResult(true);
  };

  const calculateScore = () => {
    if (!selectedPaper) return { correct: 0, wrong: 0, unattempted: 0, score: 0 };
    
    let correct = 0, wrong = 0, unattempted = 0;
    
    selectedPaper.questions.forEach(q => {
      if (userAnswers[q.id] === undefined) {
        unattempted++;
      } else if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    return {
      correct,
      wrong,
      unattempted,
      score: correct, // 1 mark per correct, no negative
      percentage: Math.round((correct / selectedPaper.questions.length) * 100)
    };
  };

  const filteredPapers = PYQ_DATA.filter(paper => {
    const matchesYear = filterYear === 'all' || paper.year.toString() === filterYear;
    const matchesExam = filterExam === 'all' || paper.exam === filterExam;
    return matchesYear && matchesExam;
  });

  // Test/Review Mode
  if (selectedPaper && (examMode === 'test' || examMode === 'review')) {
    const currentQuestion = selectedPaper.questions[currentQuestionIndex];
    const result = calculateScore();

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 sticky top-0 z-10 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (examMode === 'test' && !confirm('Are you sure? Your progress will be lost.')) return;
                  setExamMode('browse');
                  setSelectedPaper(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ← Exit
              </button>
              <div>
                <h2 className="font-bold text-gray-800 dark:text-white">{selectedPaper.exam} {selectedPaper.year}</h2>
                <p className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {selectedPaper.questions.length}</p>
              </div>
            </div>
            
            {examMode === 'test' && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold ${
                timeLeft < 300 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 animate-pulse' : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
              }`}>
                <Timer className="w-5 h-5" />
                {formatTime(timeLeft)}
              </div>
            )}

            {examMode === 'test' && (
              <button
                onClick={handleSubmit}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl font-bold transition-colors"
              >
                Submit Test
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 flex gap-1">
            {selectedPaper.questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  idx === currentQuestionIndex
                    ? 'bg-indigo-600'
                    : userAnswers[q.id] !== undefined
                    ? examMode === 'review'
                      ? userAnswers[q.id] === q.correctAnswer
                        ? 'bg-emerald-500'
                        : 'bg-red-500'
                      : 'bg-emerald-400'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Result Summary (Review Mode) */}
        {showResult && (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Test Completed!</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold">{result.score}</p>
                <p className="text-sm text-indigo-200">Score</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-emerald-300">{result.correct}</p>
                <p className="text-sm text-indigo-200">Correct</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-red-300">{result.wrong}</p>
                <p className="text-sm text-indigo-200">Wrong</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-gray-300">{result.unattempted}</p>
                <p className="text-sm text-indigo-200">Skipped</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold">{result.percentage}%</p>
                <p className="text-sm text-indigo-200">Accuracy</p>
              </div>
            </div>
          </div>
        )}

        {/* Question Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              currentQuestion.subject === Subject.LegalAptitude ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
              currentQuestion.subject === Subject.GK ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
              currentQuestion.subject === Subject.LogicalReasoning ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
              'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
            }`}>
              {currentQuestion.subject}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">• {currentQuestion.topic}</span>
          </div>

          <p className="text-lg font-medium text-gray-800 dark:text-white mb-6 leading-relaxed">
            {currentQuestion.text}
          </p>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = userAnswers[currentQuestion.id] === idx;
              const isCorrect = idx === currentQuestion.correctAnswer;
              const showCorrectness = examMode === 'review';

              return (
                <button
                  key={idx}
                  onClick={() => examMode === 'test' && handleAnswer(currentQuestion.id, idx)}
                  disabled={examMode === 'review'}
                  className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-3 ${
                    showCorrectness
                      ? isCorrect
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-500'
                        : isSelected
                        ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500'
                        : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600'
                      : isSelected
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-500'
                      : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    showCorrectness
                      ? isCorrect
                        ? 'bg-emerald-500 text-white'
                        : isSelected
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      : isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 text-gray-700 dark:text-gray-200">{option}</span>
                  {showCorrectness && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  {showCorrectness && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                </button>
              );
            })}
          </div>

          {/* Explanation (Review Mode) */}
          {examMode === 'review' && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Explanation
              </h4>
              <p className="text-blue-600 dark:text-blue-300">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 rounded-xl font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.min(selectedPaper.questions.length - 1, prev + 1))}
            disabled={currentQuestionIndex === selectedPaper.questions.length - 1}
            className="px-6 py-3 rounded-xl font-medium bg-indigo-600 text-white disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    );
  }

  // Browse Mode
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Previous Year Papers</h1>
          <p className="text-gray-500 dark:text-gray-400">Practice with actual MH CET Law questions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="all">All Years</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
        <select
          value={filterExam}
          onChange={(e) => setFilterExam(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="all">All Exams</option>
          <option value="MH CET Law 3-Year">3-Year LLB</option>
          <option value="MH CET Law 5-Year">5-Year BA-LLB</option>
        </select>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPapers.map(paper => (
          <div
            key={paper.id}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all"
          >
            <div className={`p-6 ${
              paper.exam.includes('5-Year') 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                : 'bg-gradient-to-r from-indigo-500 to-blue-500'
            } text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded">{paper.exam}</span>
                  <h3 className="text-2xl font-bold mt-2">{paper.year}</h3>
                </div>
                <FileText className="w-12 h-12 opacity-50" />
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{paper.totalQuestions}</p>
                  <p className="text-xs text-gray-500">Questions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{paper.duration}</p>
                  <p className="text-xs text-gray-500">Minutes</p>
                </div>
                <div className="text-center">
                  <p className={`text-sm font-bold px-2 py-1 rounded ${
                    paper.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
                    paper.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>{paper.difficulty}</p>
                  <p className="text-xs text-gray-500 mt-1">Difficulty</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => startTest(paper)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" /> Start Test
                </button>
                <button
                  onClick={() => {
                    setSelectedPaper(paper);
                    setExamMode('review');
                    setShowResult(false);
                    setUserAnswers({});
                  }}
                  className="px-4 py-3 rounded-xl font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <Zap className="w-12 h-12" />
          <div>
            <h3 className="font-bold text-xl">More Papers Coming Soon!</h3>
            <p className="text-amber-100">We're adding papers from 2015-2022 with detailed solutions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousYearPapers;
