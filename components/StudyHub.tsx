import React, { useState, useEffect } from 'react';
import { Subject } from '../types';
import { Book, Scale, Globe, Brain, PenTool, Calculator, PlayCircle, Calendar, Sparkles, RefreshCw, Layers, RotateCw, ChevronLeft, ChevronRight, Lightbulb, Clock, AlertCircle, ChevronDown, ChevronUp, Landmark, BookOpen, Target, Star, Gamepad2, Smartphone, Check, Save, PenLine } from 'lucide-react';
import { generateStudyPlan } from '../services/geminiService';
import { useProgress } from '../context/ProgressContext';

// --- Types & Data ---
interface DetailedTopic {
  title: string;
  readTime: string;
  summary: string;
  keyPoints: string[];
  casesOrExamples?: { title: string; desc: string }[];
  proTip?: string;
  quickBytes?: { text: string, color: string }[];
  matchPairs?: { id: string, left: string, right: string }[];
}

const QUICK_BYTES = [
  { text: "Tort is a civil wrong. Remedy: Unliquidated Damages.", color: "from-pink-500 to-rose-500" },
  { text: "Strict Liability: No need to prove negligence. (Rylands v Fletcher)", color: "from-purple-500 to-indigo-500" },
  { text: "Defamation needs Publication to a third party.", color: "from-blue-500 to-cyan-500" },
  { text: "Vicarious Liability: Master liable for Servant's acts.", color: "from-emerald-500 to-teal-500" }
];

const MATCH_PAIRS = [
    { id: '1', left: 'Damnum Sine Injuria', right: 'Damage without Legal Injury' },
    { id: '2', left: 'Injuria Sine Damno', right: 'Injury without Damage' },
    { id: '3', left: 'Volenti Non Fit Injuria', right: 'Defense of Consent' },
    { id: '4', left: 'Res Ipsa Loquitur', right: 'Things speak for themselves' }
];

const subjects = [
  { id: Subject.LegalAptitude, icon: Scale, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30', desc: 'Constitution, Torts, Contracts, Crimes' },
  { id: Subject.GK, icon: Globe, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', desc: 'History, Geography, Current Affairs' },
  { id: Subject.LogicalReasoning, icon: Brain, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30', desc: 'Analogies, Coding, Blood Relations' },
  { id: Subject.English, icon: PenTool, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30', desc: 'Vocabulary, Grammar, Comprehension' },
  { id: Subject.Math, icon: Calculator, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30', desc: 'Basic Arithmetic, Percentages, Profit & Loss' },
];

// Placeholder for content (In real app this is large)
const studyContentPlaceholder: Record<Subject, DetailedTopic[]> = {
  [Subject.LegalAptitude]: [{ title: "Law of Torts", readTime: "20m", summary: "Civil wrongs...", keyPoints: ["Damnum Sine Injuria", "Strict Liability"], casesOrExamples: [{title: 'Donoghue v Stevenson', desc: 'Neighbor Principle'}], proTip: 'Focus on legal injury.' }],
  [Subject.GK]: [{ title: "Current Affairs", readTime: "10m", summary: "Recent events", keyPoints: ["G20 Summit", "Nobel Prize"] }],
  [Subject.LogicalReasoning]: [{ title: "Syllogisms", readTime: "15m", summary: "Logic deduction", keyPoints: ["All A are B", "Some B are C"] }],
  [Subject.English]: [{ title: "Grammar", readTime: "20m", summary: "Rules", keyPoints: ["Subject Verb Agreement"] }],
  [Subject.Math]: [{ title: "Percentages", readTime: "25m", summary: "Basics", keyPoints: ["Fractions", "Conversion"] }],
};

const flashcardsData = [
  { id: 1, type: 'Maxim', front: 'Volenti non fit injuria', back: 'To a willing person, injury is not done.' },
  { id: 2, type: 'Case', front: 'Kesavananda Bharati', back: 'Basic Structure Doctrine.' },
];

// --- Sub-Component: Quick Bytes ---
const QuickBytesView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
      <button onClick={onClose} className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"><XIcon /></button>
      <div className="w-full max-w-sm h-[70vh] overflow-y-scroll snap-y snap-mandatory rounded-2xl no-scrollbar">
        {QUICK_BYTES.map((byte, i) => (
          <div key={i} className={`snap-center h-full w-full flex items-center justify-center p-8 bg-gradient-to-br ${byte.color} text-white text-center rounded-2xl mb-4 last:mb-0 shadow-2xl`}>
            <p className="text-2xl font-bold leading-relaxed drop-shadow-md">{byte.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Sub-Component: Match Game ---
const MatchGame: React.FC<{ pairs: typeof MATCH_PAIRS, onClose: () => void }> = ({ pairs, onClose }) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [shuffledRight, setShuffledRight] = useState([...pairs].sort(() => Math.random() - 0.5));

  const handleLeftClick = (id: string) => setSelectedLeft(id);
  
  const handleRightClick = (pairId: string) => {
    if (!selectedLeft) return;
    if (selectedLeft === pairId) {
      setMatchedIds(prev => [...prev, pairId]);
      setSelectedLeft(null);
    } else {
      setSelectedLeft(null);
    }
  };

  if (matchedIds.length === pairs.length) {
    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl text-center animate-in zoom-in shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">All Matched!</h3>
                <button onClick={onClose} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold mt-4 hover:bg-indigo-700">Close</button>
            </div>
        </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-indigo-900/95 flex flex-col items-center justify-center p-4 backdrop-blur-md">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between mb-6">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white">Match the Terms</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 font-bold">Exit</button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-8">
           <div className="space-y-3">
             {pairs.map(p => (
               <button 
                key={p.id}
                disabled={matchedIds.includes(p.id)}
                onClick={() => handleLeftClick(p.id)}
                className={`w-full p-4 rounded-xl text-left border-2 transition-all font-medium ${
                    matchedIds.includes(p.id) ? 'opacity-0' : 
                    selectedLeft === p.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-500'
                }`}
               >
                 {p.left}
               </button>
             ))}
           </div>
           <div className="space-y-3">
             {shuffledRight.map(p => (
               <button 
                key={p.id}
                disabled={matchedIds.includes(p.id)}
                onClick={() => handleRightClick(p.id)}
                className={`w-full p-4 rounded-xl text-left border-2 transition-all font-medium ${
                    matchedIds.includes(p.id) ? 'opacity-0' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-500'
                }`}
               >
                 {p.right}
               </button>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>;

const StudyHub: React.FC = () => {
  const { markTopicMastered, incrementStudyHours } = useProgress();
  const [activeTab, setActiveTab] = useState<'materials' | 'plan' | 'flashcards'>('materials');
  const [selectedSubject, setSelectedSubject] = useState<Subject>(Subject.LegalAptitude);
  const [expandedTopicIndex, setExpandedTopicIndex] = useState<number | null>(null);
  const [showQuickBytes, setShowQuickBytes] = useState(false);
  const [showMatchGame, setShowMatchGame] = useState(false);
  const [weakAreas, setWeakAreas] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('4');
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [cardFilter, setCardFilter] = useState<'All' | 'Maxim' | 'Case' | 'Difficult'>('All');
  const [difficultCardIds, setDifficultCardIds] = useState<number[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const topics = studyContentPlaceholder[selectedSubject] || [];

  useEffect(() => {
    const savedCards = localStorage.getItem('lawranker_flashcards_difficult');
    if (savedCards) setDifficultCardIds(JSON.parse(savedCards));
    const savedNotes = localStorage.getItem('lawranker_user_notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem('lawranker_flashcards_difficult', JSON.stringify(difficultCardIds));
  }, [difficultCardIds]);

  useEffect(() => {
    localStorage.setItem('lawranker_user_notes', JSON.stringify(notes));
  }, [notes]);

  const handleGeneratePlan = async () => {
    setLoadingPlan(true);
    const plan = await generateStudyPlan(weakAreas, hoursPerDay);
    setStudyPlan(plan);
    setLoadingPlan(false);
  };

  const toggleTopic = (index: number) => {
    if (expandedTopicIndex === index) {
      setExpandedTopicIndex(null);
    } else {
      setExpandedTopicIndex(index);
      incrementStudyHours(0.1); 
    }
  };

  const filteredCards = flashcardsData.filter(c => {
    if (cardFilter === 'Difficult') return difficultCardIds.includes(c.id);
    return cardFilter === 'All' || (c as any).type === cardFilter;
  });
  const currentCard = filteredCards[currentCardIndex];

  const toggleDifficult = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDifficultCardIds(prev => prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]);
  };

  const updateNote = (noteId: string, content: string) => {
    setNotes(prev => ({ ...prev, [noteId]: content }));
  };

  return (
    <div className="h-full flex flex-col relative">
      {showQuickBytes && <QuickBytesView onClose={() => setShowQuickBytes(false)} />}
      {showMatchGame && <MatchGame pairs={MATCH_PAIRS} onClose={() => setShowMatchGame(false)} />}

      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Study Hub</h2>
          <p className="text-gray-500 dark:text-gray-400">Integrated Learning Ecosystem.</p>
        </div>
        <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
          {['materials', 'flashcards', 'plan'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)} 
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize whitespace-nowrap ${activeTab === tab ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
              >
                  {tab === 'plan' ? 'Rank 1 Plan' : tab}
              </button>
          ))}
        </div>
      </header>

      {activeTab === 'materials' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 h-full overflow-hidden">
          <div className="lg:col-span-1 space-y-3 overflow-y-auto max-h-[200px] lg:max-h-full pr-2">
            {subjects.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id)}
                className={`w-full text-left p-4 rounded-xl transition-all flex items-center gap-3 ${selectedSubject === sub.id ? 'bg-white dark:bg-gray-800 shadow-md border-l-4 border-indigo-600 ring-1 ring-indigo-50 dark:ring-gray-700' : 'bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 border border-transparent dark:border-gray-800'}`}
              >
                <div className={`p-2 rounded-lg ${sub.bg} ${sub.color}`}><sub.icon className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm">{sub.id}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-500 truncate w-32">{sub.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 overflow-y-auto">
            <div className="space-y-4">
              {topics.map((topic: DetailedTopic, index: number) => {
                const noteId = `${selectedSubject}-${index}`;
                return (
                <div key={index} className={`border rounded-xl transition-all ${expandedTopicIndex === index ? 'border-indigo-200 dark:border-indigo-800 shadow-md bg-indigo-50/10 dark:bg-indigo-900/10' : 'border-gray-200 dark:border-gray-700'}`}>
                  <button onClick={() => toggleTopic(index)} className="w-full flex items-center justify-between p-4 text-left">
                    <div className="flex items-center gap-4">
                      <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${expandedTopicIndex === index ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>{index + 1}</span>
                      <div>
                        <h4 className={`font-bold text-lg ${expandedTopicIndex === index ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-800 dark:text-gray-200'}`}>{topic.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> {topic.readTime}</p>
                      </div>
                    </div>
                    {expandedTopicIndex === index ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>

                  {expandedTopicIndex === index && (
                    <div className="p-4 pt-0 pl-[4.5rem] animate-in fade-in slide-in-from-top-2">
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{topic.summary}</p>
                      
                      <div className="mb-6">
                         <h5 className="font-bold text-sm text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2"><Target className="w-4 h-4" /> Key Concepts</h5>
                         <ul className="space-y-2">
                            {topic.keyPoints?.map((kp: string, i: number) => (
                                <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5"></span>{kp}</li>
                            ))}
                         </ul>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-indigo-100 dark:border-gray-700 pt-4">
                         <button onClick={() => setShowQuickBytes(true)} className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-lg text-xs font-bold flex flex-col items-center gap-1 hover:scale-105 transition-transform">
                            <Smartphone className="w-5 h-5" /> Quick Bytes
                         </button>
                         <button onClick={() => setShowMatchGame(true)} className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-3 rounded-lg text-xs font-bold flex flex-col items-center gap-1 hover:scale-105 transition-transform">
                            <Gamepad2 className="w-5 h-5" /> Match Terms
                         </button>
                         <button onClick={() => markTopicMastered()} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900 dark:hover:text-green-300 p-3 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition-colors">
                            <Check className="w-5 h-5" /> Mark Done
                         </button>
                      </div>
                      
                      {/* Notes Section */}
                      <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-4">
                          <button 
                            onClick={() => setActiveNoteId(activeNoteId === noteId ? null : noteId)}
                            className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                          >
                            <PenLine className="w-4 h-4" />
                            {notes[noteId] ? 'Edit My Notes' : 'Add Personal Note'}
                          </button>
                          
                          {activeNoteId === noteId && (
                            <div className="mt-3 animate-in fade-in slide-in-from-top-2 relative">
                              <textarea
                                value={notes[noteId] || ''}
                                onChange={(e) => updateNote(noteId, e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 outline-none min-h-[100px] bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-sm"
                                placeholder="Jot down your understanding..."
                              />
                              <div className="absolute bottom-3 right-3 flex items-center gap-1 pointer-events-none transition-opacity opacity-50">
                                <Save className="w-3 h-3 text-gray-400" />
                                <span className="text-[10px] text-gray-400">Auto-saved</span>
                              </div>
                            </div>
                          )}
                        </div>
                    </div>
                  )}
                </div>
              );})}
            </div>
          </div>
        </div>
      ) : activeTab === 'plan' ? (
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
             {!studyPlan ? (
                 <div className="text-center max-w-md mx-auto mt-10">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Personalized Blueprint</h3>
                    <input value={weakAreas} onChange={(e) => setWeakAreas(e.target.value)} placeholder="Weak Areas (e.g. Torts)" className="w-full p-3 border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg mb-4" />
                    <select value={hoursPerDay} onChange={(e) => setHoursPerDay(e.target.value)} className="w-full p-3 border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg mb-4"><option value="4">4 Hours</option><option value="6">6 Hours</option></select>
                    <button onClick={handleGeneratePlan} disabled={loadingPlan} className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3 rounded-lg font-bold">{loadingPlan ? "Generating..." : "Generate Plan"}</button>
                 </div>
             ) : (
                 <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{studyPlan}</div>
             )}
        </div>
      ) : (
        // Flashcard UI 
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 md:p-8 flex flex-col items-center justify-center min-h-[600px]">
             {/* Implementation matches previous, just updating container styles */}
             <div className="max-w-2xl w-full flex flex-col gap-6">
                 {/* Filter */}
                 <div className="flex justify-center gap-2 bg-white dark:bg-gray-800 p-1.5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mx-auto flex-wrap">
                    {['All', 'Maxim', 'Case', 'Difficult'].map((type) => (
                        <button
                        key={type}
                        onClick={() => setCardFilter(type as any)}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${cardFilter === type ? 'bg-indigo-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                           {type === 'Difficult' && <Star className="w-3 h-3 fill-current" />}
                           {type}
                        </button>
                    ))}
                 </div>
                 {/* Card */}
                 {filteredCards.length > 0 ? (
                    <div className="relative perspective-1000 w-full h-80 cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
                         <div className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                             {/* Front */}
                             <div className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-800 border-2 border-indigo-100 dark:border-gray-700 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8">
                                 <button onClick={(e) => toggleDifficult(currentCard.id, e)} className="absolute top-4 left-4 z-10 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><Star className={`w-6 h-6 ${difficultCardIds.includes(currentCard.id) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} /></button>
                                 <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">{currentCard.front}</h3>
                                 <p className="text-sm text-gray-400 mt-4 flex items-center gap-2"><RotateCw className="w-3 h-3" /> Flip</p>
                             </div>
                             {/* Back */}
                             <div className="absolute w-full h-full backface-hidden bg-indigo-900 dark:bg-gray-950 text-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-8" style={{ transform: 'rotateY(180deg)' }}>
                                 <p className="text-lg md:text-xl font-medium">{currentCard.back}</p>
                             </div>
                         </div>
                    </div>
                 ) : (
                     <div className="text-center text-gray-500 dark:text-gray-400">No cards found.</div>
                 )}
                 {/* Controls */}
                 {filteredCards.length > 0 && (
                    <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <button onClick={() => {setIsFlipped(false); setTimeout(()=>setCurrentCardIndex(p=>(p-1+filteredCards.length)%filteredCards.length), 200)}} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><ChevronLeft className="w-6 h-6" /></button>
                        <span className="font-bold">Card {currentCardIndex+1}/{filteredCards.length}</span>
                        <button onClick={() => {setIsFlipped(false); setTimeout(()=>setCurrentCardIndex(p=>(p+1)%filteredCards.length), 200)}} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><ChevronRight className="w-6 h-6" /></button>
                    </div>
                 )}
             </div>
        </div>
      )}
    </div>
  );
};

export default StudyHub;