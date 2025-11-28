import React, { useState } from 'react';
import { 
  BookOpen, 
  Zap, 
  CheckCircle2, 
  Search, 
  FileText, 
  Newspaper,
  ChevronRight,
  ArrowLeft,
  Clock,
  Play
} from 'lucide-react';
import { Subject } from '../types';
import { 
  explainConcept, 
  generateStudyPlan, 
  generateTopicQuiz, 
  fetchCurrentAffairs, 
  SearchResult 
} from '../services/geminiService';
import { useProgress } from '../context/ProgressContext';

interface StaticQuiz {
  id: string;
  subject: Subject;
  title: string;
  questions: {
    q: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
}

interface ReadTopicState {
  id: string;
  title: string;
  subject: Subject;
  content: string;
  quiz?: any[];
}

const StudyHub: React.FC = () => {
  const { markTopicMastered } = useProgress();
  const [activeTab, setActiveTab] = useState<'plan' | 'library' | 'quiz' | 'news'>('library');
  const [loading, setLoading] = useState(false);
  
  // Study Plan
  const [studyPlan, setStudyPlan] = useState<string | null>(null);

  // Library/Topic
  const [selectedSubject, setSelectedSubject] = useState<Subject>(Subject.LegalAptitude);
  const [topicInput, setTopicInput] = useState('');
  const [readTopic, setReadTopic] = useState<ReadTopicState | null>(null);

  // News
  const [newsQuery, setNewsQuery] = useState({ year: '2024', topic: 'Legal Reforms' });
  const [newsResult, setNewsResult] = useState<SearchResult | null>(null);

  // Quiz
  const [activeQuiz, setActiveQuiz] = useState<StaticQuiz | null>(null);
  const [quizState, setQuizState] = useState<{idx: number, score: number, finished: boolean, selected: number | null}>({
    idx: 0, score: 0, finished: false, selected: null
  });

  const handleGeneratePlan = async () => {
    setLoading(true);
    const plan = await generateStudyPlan();
    setStudyPlan(plan);
    setLoading(false);
  };

  const handleExplainTopic = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!topicInput.trim()) return;
    setLoading(true);
    const content = await explainConcept(topicInput, selectedSubject);
    const quiz = await generateTopicQuiz(topicInput, selectedSubject);
    setReadTopic({
      id: Date.now().toString(),
      title: topicInput,
      subject: selectedSubject,
      content,
      quiz
    });
    setLoading(false);
  };

  const handleNewsSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    const res = await fetchCurrentAffairs(newsQuery.year, newsQuery.topic);
    setNewsResult(res);
    setLoading(false);
  };

  const handleQuizOption = (optIdx: number) => {
    if (quizState.selected !== null || quizState.finished) return;
    const isCorrect = optIdx === activeQuiz?.questions[quizState.idx].correct;
    setQuizState(prev => ({
        ...prev,
        selected: optIdx,
        score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const nextQuestion = () => {
    if (!activeQuiz) return;
    if (quizState.idx + 1 < activeQuiz.questions.length) {
        setQuizState({
            idx: quizState.idx + 1,
            score: quizState.score,
            finished: false,
            selected: null
        });
    } else {
        setQuizState(prev => ({ ...prev, finished: true }));
        markTopicMastered();
    }
  };

  const closeQuiz = () => {
    setActiveQuiz(null);
    setQuizState({ idx: 0, score: 0, finished: false, selected: null });
    setActiveTab('library');
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-600" /> Study Hub
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Your AI-powered library and newsroom.</p>
        </div>
        <div className="flex bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
           {(['library', 'plan', 'news'] as const).map((tab) => (
             <button
               key={tab}
               onClick={() => { setActiveTab(tab); setReadTopic(null); setActiveQuiz(null); }}
               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                 activeTab === tab 
                   ? 'bg-indigo-600 text-white shadow-sm' 
                   : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </header>

      {/* --- CONTENT AREA --- */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 min-h-[500px] p-6 md:p-8 relative">
        
        {loading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 z-20 flex items-center justify-center backdrop-blur-sm rounded-2xl">
                <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    <p className="text-indigo-600 font-medium animate-pulse">Consulting AI...</p>
                </div>
            </div>
        )}

        {/* VIEW: QUIZ */}
        {activeTab === 'quiz' && activeQuiz && (
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{activeQuiz.title}</h3>
                    <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        Q{quizState.idx + 1}/{activeQuiz.questions.length}
                    </span>
                </div>
                
                {!quizState.finished ? (
                    <div className="space-y-6">
                        <p className="text-lg text-gray-800 dark:text-gray-200 font-medium">{activeQuiz.questions[quizState.idx].q}</p>
                        <div className="space-y-3">
                            {activeQuiz.questions[quizState.idx].options.map((opt, i) => {
                                let style = "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700";
                                if (quizState.selected !== null) {
                                    if (i === activeQuiz.questions[quizState.idx].correct) style = "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300";
                                    else if (i === quizState.selected) style = "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300";
                                    else style = "opacity-50";
                                }
                                return (
                                    <button 
                                        key={i} 
                                        onClick={() => handleQuizOption(i)}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${style}`}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                        {quizState.selected !== null && (
                            <div className="animate-in fade-in slide-in-from-bottom-4">
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200 rounded-xl text-sm mb-4">
                                    <span className="font-bold">Explanation:</span> {activeQuiz.questions[quizState.idx].explanation}
                                </div>
                                <button onClick={nextQuestion} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">
                                    {quizState.idx + 1 === activeQuiz.questions.length ? "Finish Quiz" : "Next Question"}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                             <Zap className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Quiz Complete!</h3>
                        <p className="text-gray-500 mb-8">You scored {quizState.score} out of {activeQuiz.questions.length}</p>
                        <button onClick={closeQuiz} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700">
                            Back to Library
                        </button>
                    </div>
                )}
            </div>
        )}

        {/* VIEW: READ TOPIC */}
        {readTopic ? (
             <div className="animate-in fade-in slide-in-from-bottom-8">
                 <button onClick={() => setReadTopic(null)} className="mb-6 flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                     <ArrowLeft className="w-4 h-4 mr-1" /> Back to Search
                 </button>
                 <div className="prose dark:prose-invert max-w-none">
                     <h1 className="text-3xl font-bold text-indigo-900 dark:text-indigo-300 mb-2">{readTopic.title}</h1>
                     <span className="inline-block bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-bold mb-6">
                         {readTopic.subject}
                     </span>
                     <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                         {readTopic.content}
                     </div>
                 </div>

                 <div className="mt-12 flex justify-center gap-3">
                 <button 
                    onClick={() => { 
                        if (readTopic.quiz && readTopic.quiz.length > 0) {
                            // Construct a quiz object from the topic's preloaded questions
                            const topicQuiz: StaticQuiz = {
                                id: `quiz-${readTopic.id}`,
                                subject: readTopic.subject,
                                title: `Quiz: ${readTopic.title}`,
                                questions: readTopic.quiz.map((q: any) => ({
                                    q: q.question,
                                    options: q.options,
                                    correct: q.correctIndex,
                                    explanation: q.explanation
                                }))
                            };
                            setActiveQuiz(topicQuiz);
                            setQuizState({idx: 0, score: 0, finished: false, selected: null});
                            setReadTopic(null);
                            setActiveTab('quiz');
                        } else {
                            // Fallback to quiz list
                            setReadTopic(null);
                            setActiveTab('quiz');
                        }
                    }} 
                    className="flex items-center gap-2 bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-gray-600 px-6 py-3 rounded-full font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
                 >
                    <Zap className="w-5 h-5" /> Take Quiz
                 </button>
                 <button onClick={() => setReadTopic(null)} className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-transform active:scale-95">
                   <CheckCircle2 className="w-5 h-5" /> Done
                 </button>
               </div>
             </div>
        ) : (
            <>
            {/* VIEW: LIBRARY SEARCH */}
            {activeTab === 'library' && (
                <div className="max-w-xl mx-auto text-center py-10">
                    <div className="mb-8">
                        <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Concept Explainer</h3>
                        <p className="text-gray-500 dark:text-gray-400">Ask the AI to explain any legal concept, case law, or theory.</p>
                    </div>

                    <form onSubmit={handleExplainTopic} className="space-y-4">
                        <div className="flex justify-center gap-2 flex-wrap">
                            {Object.values(Subject).map(sub => (
                                <button
                                    key={sub}
                                    type="button"
                                    onClick={() => setSelectedSubject(sub)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                                        selectedSubject === sub 
                                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-200 dark:ring-indigo-800' 
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                value={topicInput}
                                onChange={(e) => setTopicInput(e.target.value)}
                                placeholder={`e.g., "Doctrine of Basic Structure" in ${selectedSubject}`}
                                className="w-full p-4 pl-5 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                            <button 
                                type="submit"
                                disabled={!topicInput.trim()}
                                className="absolute right-2 top-2 bottom-2 bg-indigo-600 disabled:opacity-50 text-white px-4 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                            >
                                Explain
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* VIEW: STUDY PLAN */}
            {activeTab === 'plan' && (
                <div className="max-w-3xl mx-auto">
                    {!studyPlan ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Clock className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">AI Study Planner</h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">Generate a personalized 12-week schedule based on your weak areas and exam date.</p>
                            <button 
                                onClick={handleGeneratePlan} 
                                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-indigo-700 flex items-center gap-2 mx-auto"
                            >
                                <Play className="w-5 h-5" /> Generate My Rank 1 Plan
                            </button>
                        </div>
                    ) : (
                        <div className="prose dark:prose-invert max-w-none">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold m-0">Your Personalized Plan</h2>
                                <button onClick={() => setStudyPlan(null)} className="text-sm text-indigo-600 hover:underline">Regenerate</button>
                            </div>
                            <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 text-sm md:text-base bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-600">
                                {studyPlan}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* VIEW: NEWS */}
            {activeTab === 'news' && (
                <div className="max-w-3xl mx-auto">
                     <div className="flex flex-col md:flex-row gap-4 mb-8 items-end">
                        <div className="flex-1 w-full">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Year</label>
                            <select 
                                value={newsQuery.year} 
                                onChange={(e) => setNewsQuery(prev => ({...prev, year: e.target.value}))}
                                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option>2023</option>
                                <option>2024</option>
                                <option>2025</option>
                            </select>
                        </div>
                        <div className="flex-[2] w-full">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Topic</label>
                            <input 
                                type="text"
                                value={newsQuery.topic}
                                onChange={(e) => setNewsQuery(prev => ({...prev, topic: e.target.value}))}
                                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="e.g. Legal Appointments"
                            />
                        </div>
                        <button 
                            onClick={handleNewsSearch}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 w-full md:w-auto"
                        >
                            Search
                        </button>
                     </div>

                     {newsResult && (
                         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                     <Newspaper className="w-5 h-5 text-indigo-600" /> Summary
                                 </h3>
                                 <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                                     {newsResult.text}
                                 </div>
                             </div>

                             {newsResult.sources && newsResult.sources.length > 0 && (
                                 <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                                     <h4 className="text-sm font-bold text-gray-500 uppercase mb-3">Sources (Google Search)</h4>
                                     <div className="grid gap-2">
                                         {newsResult.sources.map((source, idx) => (
                                             <a 
                                                 key={idx} 
                                                 href={source.uri} 
                                                 target="_blank" 
                                                 rel="noopener noreferrer"
                                                 className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 transition-colors group"
                                             >
                                                 <div className="bg-indigo-50 dark:bg-indigo-900/50 p-2 rounded text-indigo-600">
                                                     <FileText className="w-4 h-4" />
                                                 </div>
                                                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 truncate">
                                                     {source.title}
                                                 </span>
                                             </a>
                                         ))}
                                     </div>
                                 </div>
                             )}
                         </div>
                     )}
                </div>
            )}
            </>
        )}
      </div>
    </div>
  );
};

export default StudyHub;