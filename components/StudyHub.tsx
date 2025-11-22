import React, { useState, useEffect } from 'react';
import { Subject } from '../types';
import { Book, Scale, Globe, Brain, PenTool, Calculator, PlayCircle, Calendar, Sparkles, RefreshCw, Layers, RotateCw, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { generateStudyPlan } from '../services/geminiService';

const subjects = [
  { id: Subject.LegalAptitude, icon: Scale, color: 'text-red-500', bg: 'bg-red-100', desc: 'Constitution, Torts, Contracts, Crimes' },
  { id: Subject.GK, icon: Globe, color: 'text-blue-500', bg: 'bg-blue-100', desc: 'History, Geography, Current Affairs' },
  { id: Subject.LogicalReasoning, icon: Brain, color: 'text-purple-500', bg: 'bg-purple-100', desc: 'Analogies, Coding, Blood Relations' },
  { id: Subject.English, icon: PenTool, color: 'text-green-500', bg: 'bg-green-100', desc: 'Vocabulary, Grammar, Comprehension' },
  { id: Subject.Math, icon: Calculator, color: 'text-orange-500', bg: 'bg-orange-100', desc: 'Basic Arithmetic, Percentages, Profit & Loss' },
];

const topicData: Record<string, string[]> = {
  [Subject.LegalAptitude]: [
    "Indian Constitution: Preamble & Fundamental Rights",
    "Law of Torts: Negligence & Nuisance",
    "Indian Contract Act: Essentials of Valid Contract",
    "Indian Penal Code: General Exceptions",
    "Legal Maxims & Terms",
    "Family Law: Hindu Marriage Act Basics",
    "Landmark Supreme Court Judgments"
  ],
  [Subject.GK]: [
    "Important Awards & Honours 2024",
    "International Organizations (UN, WHO)",
    "Indian Geography: Rivers & Dams",
    "Modern Indian History: Freedom Struggle",
    "Recent Supreme Court Judgments",
    "Economic Terms & Budget 2024",
    "Sports & Books Authors"
  ],
  [Subject.LogicalReasoning]: [
    "Syllogisms",
    "Blood Relations",
    "Coding-Decoding",
    "Direction Sense Test",
    "Critical Reasoning: Assumptions",
    "Seating Arrangements (Linear & Circular)",
    "Puzzles"
  ],
  [Subject.English]: [
    "Reading Comprehension Strategies",
    "Common Errors in Grammar",
    "Synonyms & Antonyms",
    "Idioms & Phrases",
    "Sentence Rearrangement",
    "Cloze Test",
    "One Word Substitution"
  ],
  [Subject.Math]: [
    "Percentages",
    "Profit, Loss & Discount",
    "Time, Speed & Distance",
    "Average",
    "Ratio & Proportion",
    "Simple & Compound Interest"
  ]
};

const flashcardsData = [
  { id: 1, type: 'Maxim', front: 'Volenti non fit injuria', back: 'To a willing person, injury is not done. (Key defense in Torts, e.g., Sports spectators)' },
  { id: 2, type: 'Maxim', front: 'Audi alteram partem', back: 'No one should be condemned unheard. (A core principle of Natural Justice)' },
  { id: 3, type: 'Case', front: 'Kesavananda Bharati v. State of Kerala (1973)', back: 'Established the "Basic Structure Doctrine". Parliament cannot alter basic features of the Constitution.' },
  { id: 4, type: 'Maxim', front: 'Res ipsa loquitur', back: 'The thing speaks for itself. (Used in Negligence cases where accident implies negligence)' },
  { id: 5, type: 'Case', front: 'Maneka Gandhi v. Union of India (1978)', back: 'Expanded Art. 21. Right to Life includes right to live with dignity & right to travel abroad.' },
  { id: 6, type: 'Maxim', front: 'Ubi jus ibi remedium', back: 'Where there is a right, there is a remedy.' },
  { id: 7, type: 'Case', front: 'M.C. Mehta v. Union of India', back: 'Established "Absolute Liability" for hazardous industries. (Oleum Gas Leak case)' },
  { id: 8, type: 'Maxim', front: 'Actus non facit reum nisi mens sit rea', back: 'The act itself does not constitute guilt unless done with a guilty mind.' },
  { id: 9, type: 'Case', front: 'Vishaka v. State of Rajasthan', back: 'Laid down guidelines against sexual harassment at workplace.' },
  { id: 10, type: 'Maxim', front: 'Nemo judex in causa sua', back: 'No one should be a judge in their own cause. (Rule against Bias)' },
  { id: 11, type: 'Case', front: 'S.R. Bommai v. Union of India', back: 'Discussed provisions of Article 356 (President\'s Rule) and Federalism.' },
  { id: 12, type: 'Maxim', front: 'De minimis non curat lex', back: 'The law does not concern itself with trifles.' },
];

const StudyHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'materials' | 'plan' | 'flashcards'>('materials');
  const [selectedSubject, setSelectedSubject] = useState<Subject>(Subject.LegalAptitude);
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState(false);

  // Flashcard State
  const [cardFilter, setCardFilter] = useState<'All' | 'Maxim' | 'Case'>('All');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredCards = flashcardsData.filter(c => cardFilter === 'All' || c.type === cardFilter);
  const currentCard = filteredCards[currentCardIndex];

  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [cardFilter]);

  const handleGeneratePlan = async () => {
    setLoadingPlan(true);
    const plan = await generateStudyPlan();
    setStudyPlan(plan);
    setLoadingPlan(false);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length);
    }, 200);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    }, 200);
  };

  return (
    <div className="h-full flex flex-col">
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Study Hub</h2>
          <p className="text-gray-500">Your arsenal for Rank 1 preparation.</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'materials' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Subject Materials
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'flashcards' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Layers className="w-4 h-4" /> Flashcards
          </button>
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'plan' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Rank 1 Strategy
          </button>
        </div>
      </header>

      {activeTab === 'materials' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
          {/* Subject List */}
          <div className="lg:col-span-1 space-y-3">
            {subjects.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                  selectedSubject === sub.id
                    ? 'bg-white shadow-md border-l-4 border-indigo-600'
                    : 'bg-gray-50 hover:bg-white hover:shadow-sm'
                }`}
              >
                <div className={`p-2 rounded-lg ${sub.bg} ${sub.color}`}>
                  <sub.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{sub.id}</h4>
                  <p className="text-xs text-gray-500 truncate w-32">{sub.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
               <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                 <Book className="w-5 h-5 text-indigo-600" />
                 {selectedSubject} Modules
               </h3>
               <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                 {topicData[selectedSubject]?.length || 0} Topics
               </span>
            </div>

            <div className="grid gap-4">
              {topicData[selectedSubject]?.map((topic, index) => (
                <div key={index} className="group border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer bg-white">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold text-sm group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">{topic}</h4>
                        <p className="text-sm text-gray-500 mt-1">Estimated read: 10-15 mins</p>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                 <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-blue-800 mb-1 text-sm">AI Concept Summarizer</h4>
                <p className="text-sm text-blue-600">Select any topic above to get a concise, exam-oriented summary generated by AI.</p>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'flashcards' ? (
        <div className="flex-1 bg-gray-50 rounded-xl p-4 md:p-8 flex flex-col items-center justify-center min-h-[600px]">
          <div className="max-w-2xl w-full flex flex-col gap-6">
            {/* Filters */}
            <div className="flex justify-center gap-2 bg-white p-1.5 rounded-lg shadow-sm border border-gray-200 mx-auto">
              {['All', 'Maxim', 'Case'].map((type) => (
                <button
                  key={type}
                  onClick={() => setCardFilter(type as any)}
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                    cardFilter === type 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {type === 'All' ? 'All Cards' : type === 'Maxim' ? 'Legal Maxims' : 'Landmark Cases'}
                </button>
              ))}
            </div>

            {/* Card Container */}
            {filteredCards.length > 0 ? (
              <div className="relative perspective-1000 w-full h-80 cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
                <div className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                  
                  {/* Front */}
                  <div className="absolute w-full h-full backface-hidden bg-white border-2 border-indigo-100 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8">
                    <span className="absolute top-4 right-4 bg-indigo-50 text-indigo-600 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                      {currentCard.type}
                    </span>
                    <span className="absolute top-4 left-4 text-gray-300 font-bold text-4xl opacity-20">?</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                      {currentCard.front}
                    </h3>
                    <p className="text-sm text-gray-400 mt-4 font-medium flex items-center gap-2">
                      <RotateCw className="w-3 h-3" /> Click to flip
                    </p>
                  </div>

                  {/* Back */}
                  <div className="absolute w-full h-full backface-hidden bg-indigo-900 text-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-8" style={{ transform: 'rotateY(180deg)' }}>
                    <span className="absolute top-4 right-4 bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                      Answer
                    </span>
                    <div className="bg-white/10 p-3 rounded-full mb-4">
                      <Lightbulb className="w-6 h-6 text-yellow-400" />
                    </div>
                    <p className="text-lg md:text-xl font-medium leading-relaxed">
                      {currentCard.back}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">No flashcards found for this category.</div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between text-gray-600 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
               <button onClick={handlePrevCard} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                 <ChevronLeft className="w-6 h-6" />
               </button>
               
               <div className="flex flex-col items-center">
                 <span className="font-bold text-gray-800">Card {currentCardIndex + 1} of {filteredCards.length}</span>
                 <span className="text-xs text-gray-400">Press Space to Flip</span>
               </div>

               <button onClick={handleNextCard} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                 <ChevronRight className="w-6 h-6" />
               </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8 overflow-hidden flex flex-col">
           {!studyPlan && !loadingPlan ? (
             <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto">
               <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                 <Calendar className="w-10 h-10 text-indigo-600" />
               </div>
               <h3 className="text-2xl font-bold text-gray-800 mb-3">Personalized 12-Week Blueprint</h3>
               <p className="text-gray-500 mb-8">
                 Get a tailored schedule that adapts to MHCET patterns. Covers daily goals, revision cycles, and mock test strategy to ensure you hit that AIR 1 target.
               </p>
               <button 
                 onClick={handleGeneratePlan}
                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
               >
                 <Sparkles className="w-5 h-5" /> Generate My Plan
               </button>
             </div>
           ) : loadingPlan ? (
             <div className="flex flex-col items-center justify-center h-full">
               <RefreshCw className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
               <p className="text-gray-600 font-medium">Crafting your roadmap to success...</p>
             </div>
           ) : (
             <div className="h-full flex flex-col">
               <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                 <h3 className="text-xl font-bold text-gray-800">Your 12-Week Success Roadmap</h3>
                 <button 
                   onClick={handleGeneratePlan}
                   className="text-sm text-indigo-600 font-medium hover:text-indigo-800 flex items-center gap-1"
                 >
                   <RefreshCw className="w-3 h-3" /> Regenerate
                 </button>
               </div>
               <div className="prose prose-indigo max-w-none overflow-y-auto pr-4 flex-1 text-gray-700 leading-relaxed whitespace-pre-wrap">
                 {studyPlan}
               </div>
             </div>
           )}
        </div>
      )}
    </div>
  );
};

export default StudyHub;