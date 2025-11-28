
import React, { useState, useEffect, useRef } from 'react';
import { Subject } from '../types';
import { 
  BookOpen, Layers, Zap, Brain, ChevronLeft, ChevronRight, 
  X, Star, Share2, Bookmark, CheckCircle2, RotateCw, 
  Trophy, ArrowRight, PlayCircle, Clock, Filter, Search,
  GraduationCap, Smartphone
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

// --- Types ---

type CourseType = '5-Year' | '3-Year';
type ViewMode = 'learn' | 'reels' | 'cards' | 'quiz';

interface StudyTopic {
  id: string;
  title: string;
  subject: Subject;
  readTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  summary: string;
  content: {
    intro: string;
    keyPoints: string[];
    caseLaws?: { name: string; ruling: string }[];
    statutes?: { section: string; desc: string }[];
    example?: string;
  };
}

interface Reel {
  id: string;
  type: 'Maxim' | 'Fact' | 'Tip' | 'Case';
  text: string;
  subText: string;
  color: string;
  icon?: any;
}

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

// --- MASSIVE STATIC DATA ---

const SUBJECTS_5YR = [Subject.LegalAptitude, Subject.GK, Subject.LogicalReasoning, Subject.English, Subject.Math];
const SUBJECTS_3YR = [Subject.LegalAptitude, Subject.GK, Subject.LogicalReasoning, Subject.English];

const STATIC_TOPICS: StudyTopic[] = [
  // LEGAL APTITUDE
  {
    id: 'la-1',
    title: 'Law of Torts: Basics',
    subject: Subject.LegalAptitude,
    readTime: '15m',
    difficulty: 'Easy',
    summary: 'Understanding civil wrongs, unliquidated damages, and basic principles like Injuria Sine Damno.',
    content: {
      intro: 'Tort is a civil wrong for which the remedy is a common law action for unliquidated damages, and which is not exclusively the breach of a contract or the breach of a trust.',
      keyPoints: [
        'Unliquidated Damages: Damages not pre-decided, determined by court.',
        'Tort vs Crime: Tort is against individual (compensation), Crime is against society (punishment).',
        'Injuria Sine Damno: Violation of legal right without damage (Actionable).',
        'Damnum Sine Injuria: Damage without violation of legal right (Not Actionable).'
      ],
      caseLaws: [
        { name: 'Ashby v White', ruling: 'Established Injuria Sine Damno. Plaintiff stopped from voting; no loss caused, but legal right violated. Held liable.' },
        { name: 'Gloucester Grammar School Case', ruling: 'Established Damnum Sine Injuria. Competitor opened school, fees dropped. No legal injury, so no compensation.' }
      ]
    }
  },
  {
    id: 'la-2',
    title: 'Vicarious Liability',
    subject: Subject.LegalAptitude,
    readTime: '12m',
    difficulty: 'Medium',
    summary: 'Liability of one person for the act of another (Master-Servant relationship).',
    content: {
      intro: 'Qui facit per alium facit per se - He who acts through another acts himself.',
      keyPoints: [
        'Master is liable for torts committed by servant during the course of employment.',
        'Reason: Deep Pocket Theory & Respondeat Superior.',
        'Not liable for acts of Independent Contractors (usually).'
      ],
      example: 'If a driver hits a pedestrian while delivering goods for his boss, the boss is liable. If the driver takes a detour to visit his girlfriend and hits someone, the boss is NOT liable (Frolic of his own).'
    }
  },
  {
    id: 'la-3',
    title: 'Constitutional Law: Preamble',
    subject: Subject.LegalAptitude,
    readTime: '10m',
    difficulty: 'Easy',
    summary: 'The soul of the Constitution. Keywords: Sovereign, Socialist, Secular, Democratic, Republic.',
    content: {
      intro: 'The Preamble is an introduction to the Constitution. It secures Justice, Liberty, Equality, and Fraternity.',
      keyPoints: [
        '42nd Amendment (1976): Added words "Socialist", "Secular", and "Integrity".',
        'Source of Authority: "We, the People of India".',
        'Date of Adoption: 26 Nov 1949.'
      ],
      caseLaws: [
        { name: 'Kesavananda Bharati v State of Kerala', ruling: 'Preamble IS a part of the Constitution and can be amended subject to Basic Structure.' },
        { name: 'Berubari Union Case', ruling: 'Earlier view: Preamble is NOT part of Constitution (Overruled).' }
      ]
    }
  },
  {
    id: 'la-4',
    title: 'Indian Contract Act: Essentials',
    subject: Subject.LegalAptitude,
    readTime: '20m',
    difficulty: 'Medium',
    summary: 'Offer, Acceptance, Consideration, and Free Consent.',
    content: {
      intro: 'Section 10: All agreements are contracts if they are made by the free consent of parties competent to contract, for a lawful consideration and with a lawful object.',
      keyPoints: [
        'Proposal + Acceptance = Promise.',
        'Promise + Consideration = Agreement.',
        'Agreement + Enforceability = Contract.',
        'Void Ab Initio: Void from the start (e.g., with a minor).'
      ],
      caseLaws: [
        { name: 'Carlill v Carbolic Smoke Ball Co', ruling: 'General Offer can be accepted by anyone performing the condition.' },
        { name: 'Mohori Bibee v Dharmodas Ghose', ruling: 'Contract with a minor is void ab initio.' }
      ]
    }
  },
  // GK
  {
    id: 'gk-1',
    title: 'Indian History: 1857 Revolt',
    subject: Subject.GK,
    readTime: '15m',
    difficulty: 'Medium',
    summary: 'The First War of Independence. Causes, Leaders, and Consequences.',
    content: {
      intro: 'Started on May 10, 1857, in Meerut. A result of accumulation of grievances against British Rule.',
      keyPoints: [
        'Immediate Cause: Greased Cartridges (Enfield Rifle).',
        'Symbols: Lotus and Bread.',
        'Ended the rule of East India Company; Crown took over (Govt of India Act 1858).'
      ],
      statutes: [
        { section: 'Mangal Pandey', desc: 'Barrackpore' },
        { section: 'Rani Laxmibai', desc: 'Jhansi' },
        { section: 'Bahadur Shah Zafar', desc: 'Delhi (Nominal Head)' }
      ]
    }
  },
  {
    id: 'gk-2',
    title: 'Geography: Rivers of India',
    subject: Subject.GK,
    readTime: '15m',
    difficulty: 'Medium',
    summary: 'Himalayan vs Peninsular Rivers. Origins and Tributaries.',
    content: {
      intro: 'India is the land of rivers. The drainage system is divided into Himalayan and Peninsular.',
      keyPoints: [
        'Ganga: Originates as Bhagirathi from Gangotri. Longest river in India.',
        'Indus: Originates near Mansarovar. Major tributaries: Jhelum, Chenab, Ravi, Beas, Sutlej.',
        'Godavari: Dakshin Ganga. Longest peninsular river.',
        'Narmada & Tapti: Flow West into Arabian Sea (Rift Valleys).'
      ]
    }
  },
  // LOGIC
  {
    id: 'lr-1',
    title: 'Syllogisms',
    subject: Subject.LogicalReasoning,
    readTime: '20m',
    difficulty: 'Hard',
    summary: 'Deductive logic using Venn Diagrams.',
    content: {
      intro: 'Syllogisms test your ability to draw conclusions from given statements, disregarding real-world facts.',
      keyPoints: [
        'All A are B: A is inside B.',
        'Some A are B: Intersection of A and B.',
        'No A is B: A and B are disjoint.',
        'Tip: Always draw the "Minimum Overlap" diagram first.'
      ],
      example: 'Statements: All Cats are Dogs. All Dogs are Birds.\nConclusion: All Cats are Birds (True).'
    }
  },
  // ENGLISH
  {
    id: 'eng-1',
    title: 'Common Legal Idioms',
    subject: Subject.English,
    readTime: '10m',
    difficulty: 'Easy',
    summary: 'Latin terms and English phrases frequently asked.',
    content: {
      intro: 'Legal English is a key component of the exam.',
      keyPoints: [
        'Bona Fide: In good faith.',
        'Mala Fide: In bad faith.',
        'Prima Facie: On the face of it.',
        'Sub Judice: Under judicial consideration.',
        'Ultra Vires: Beyond powers.'
      ]
    }
  }
];

const REELS_DATA: Reel[] = [
  { id: 'r1', type: 'Maxim', text: 'Volenti Non Fit Injuria', subText: 'To a willing person, injury is not done.', color: 'bg-gradient-to-br from-pink-500 to-rose-600' },
  { id: 'r2', type: 'Fact', text: 'Magna Carta', subText: 'Signed in 1215. The first document to put into writing the principle that the king and his government was not above the law.', color: 'bg-gradient-to-br from-purple-600 to-indigo-700' },
  { id: 'r3', type: 'Tip', text: 'Syllogism Hack', subText: 'If both premises are particular (Some/Some), NO conclusion follows.', color: 'bg-gradient-to-br from-yellow-500 to-orange-600' },
  { id: 'r4', type: 'Case', text: 'Donoghue v Stevenson', subText: 'The "Snail in the Bottle" case. Established the Neighbor Principle in Negligence.', color: 'bg-gradient-to-br from-blue-500 to-cyan-600' },
  { id: 'r5', type: 'Maxim', text: 'Audi Alteram Partem', subText: 'Listen to the other side. No one should be condemned unheard.', color: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
  { id: 'r6', type: 'Fact', text: 'Constitution Day', subText: 'Celebrated on 26th November. Adopted in 1949.', color: 'bg-gradient-to-br from-red-500 to-pink-600' },
  { id: 'r7', type: 'Tip', text: 'Math Speed', subText: 'To multiply by 5: Divide by 2 and move decimal/add zero. (e.g. 48 * 5 = 240)', color: 'bg-gradient-to-br from-gray-700 to-gray-900' },
  { id: 'r8', type: 'Maxim', text: 'Res Ipsa Loquitur', subText: 'The thing speaks for itself. Used in accidents where negligence is obvious.', color: 'bg-gradient-to-br from-indigo-500 to-blue-600' },
];

const QUIZZES: StaticQuiz[] = [
  {
    id: 'q1',
    subject: Subject.LegalAptitude,
    title: 'Torts Challenge',
    questions: [
      { q: 'Which of these is NOT a defense in Torts?', options: ['Volenti non fit injuria', 'Act of God', 'Mens Rea', 'Statutory Authority'], correct: 2, explanation: 'Mens Rea (Guilty Mind) is a concept in Criminal Law, generally irrelevant in Torts.' },
      { q: 'The case of Rylands v Fletcher laid down which rule?', options: ['Absolute Liability', 'Strict Liability', 'Vicarious Liability', 'Negligence'], correct: 1, explanation: 'It established Strict Liability. Absolute Liability (no exceptions) was established in MC Mehta case.' },
      { q: 'Defamation involves:', options: ['Only Libel', 'Only Slander', 'Both Libel and Slander', 'None'], correct: 2, explanation: 'Libel is permanent form, Slander is transient form.' }
    ]
  },
  {
    id: 'q2',
    subject: Subject.GK,
    title: 'Indian Polity Mix',
    questions: [
      { q: 'Who appoints the Governor of a State?', options: ['Chief Minister', 'President', 'Prime Minister', 'Chief Justice'], correct: 1, explanation: 'The President appoints the Governor under Article 155.' },
      { q: 'Financial Emergency is under which Article?', options: ['Article 352', 'Article 356', 'Article 360', 'Article 370'], correct: 2, explanation: 'Art 360 deals with Financial Emergency. It has never been imposed in India.' }
    ]
  }
];

// --- COMPONENTS ---

const StudyHub = () => {
  const [course, setCourse] = useState<CourseType>('5-Year');
  const [activeTab, setActiveTab] = useState<ViewMode>('learn');
  const [activeSubject, setActiveSubject] = useState<Subject>(Subject.LegalAptitude);
  const [readTopic, setReadTopic] = useState<StudyTopic | null>(null);
  
  // Reels State
  const reelsRef = useRef<HTMLDivElement>(null);
  
  // Quiz State
  const [activeQuiz, setActiveQuiz] = useState<StaticQuiz | null>(null);
  const [quizState, setQuizState] = useState<{idx: number, score: number, finished: boolean, selected: number | null}>({idx: 0, score: 0, finished: false, selected: null});

  // Flashcard State
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const availableSubjects = course === '5-Year' ? SUBJECTS_5YR : SUBJECTS_3YR;

  // Filter topics based on course and active subject
  const filteredTopics = STATIC_TOPICS.filter(t => t.subject === activeSubject);

  const handleQuizOption = (optIdx: number) => {
    if (quizState.selected !== null) return;
    const isCorrect = optIdx === activeQuiz!.questions[quizState.idx].correct;
    setQuizState(prev => ({...prev, selected: optIdx, score: isCorrect ? prev.score + 1 : prev.score}));
  };

  const nextQuestion = () => {
    if (quizState.idx < activeQuiz!.questions.length - 1) {
      setQuizState(prev => ({...prev, idx: prev.idx + 1, selected: null}));
    } else {
      setQuizState(prev => ({...prev, finished: true}));
    }
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setQuizState({idx: 0, score: 0, finished: false, selected: null});
  };

  return (
    <div className="relative h-[calc(100vh-6rem)] md:h-full flex flex-col bg-white dark:bg-gray-900 overflow-hidden md:rounded-2xl shadow-xl md:border border-gray-200 dark:border-gray-800">
      
      {/* --- TOP BAR: Course Selector --- */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 z-10">
        <div className="flex items-center gap-2">
           <div className="bg-indigo-600 p-1.5 rounded-lg">
             <GraduationCap className="w-5 h-5 text-white" />
           </div>
           <span className="font-bold text-gray-800 dark:text-white">MHCET Hub</span>
        </div>
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {(['5-Year', '3-Year'] as CourseType[]).map((c) => (
            <button
              key={c}
              onClick={() => { setCourse(c); setActiveSubject(Subject.LegalAptitude); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${course === c ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 overflow-hidden relative">
        
        {/* VIEW: LEARN (Library) */}
        {activeTab === 'learn' && !readTopic && (
          <div className="h-full flex flex-col animate-in fade-in">
             {/* Subject Tabs */}
             <div className="flex overflow-x-auto p-4 gap-3 no-scrollbar border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900">
               {availableSubjects.map((sub) => (
                 <button
                  key={sub}
                  onClick={() => setActiveSubject(sub)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold border transition-all whitespace-nowrap ${
                    activeSubject === sub 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                  }`}
                 >
                   {sub}
                 </button>
               ))}
             </div>

             {/* Topic List */}
             <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
               <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">{activeSubject}</h2>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{filteredTopics.length} Topics</span>
               </div>
               
               {filteredTopics.length === 0 ? (
                 <div className="text-center py-10 text-gray-400">
                   <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
                   <p>Content coming soon for this section.</p>
                 </div>
               ) : (
                 filteredTopics.map((topic) => (
                   <div 
                    key={topic.id}
                    onClick={() => setReadTopic(topic)}
                    className="group bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden"
                   >
                      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 group-hover:bg-indigo-400 transition-colors"></div>
                      <div className="flex justify-between items-start mb-2 pl-2">
                        <h3 className="font-bold text-gray-800 dark:text-white text-lg leading-tight">{topic.title}</h3>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                          topic.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                          topic.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}>{topic.difficulty}</span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 pl-2 mb-3">{topic.summary}</p>
                      <div className="flex items-center gap-4 pl-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {topic.readTime}</span>
                        <span className="flex items-center gap-1 text-indigo-500 font-medium">Read Now <ArrowRight className="w-3 h-3" /></span>
                      </div>
                   </div>
                 ))
               )}
             </div>
          </div>
        )}

        {/* VIEW: READING MODE (Overlay) */}
        {readTopic && (
          <div className="absolute inset-0 z-20 bg-white dark:bg-gray-900 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0">
               <button onClick={() => setReadTopic(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" /></button>
               <h3 className="font-bold text-gray-800 dark:text-white truncate flex-1">{readTopic.title}</h3>
               <button className="text-indigo-600"><Bookmark className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 pb-24">
               <div className="prose dark:prose-invert max-w-none">
                 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6 font-medium">{readTopic.content.intro}</p>
                 
                 <div className="my-6 space-y-3">
                   <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-500">Key Points</h4>
                   <ul className="space-y-2">
                     {readTopic.content.keyPoints.map((kp, i) => (
                       <li key={i} className="flex gap-3 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                         <span className="text-indigo-500 font-bold mt-0.5">•</span>
                         {kp}
                       </li>
                     ))}
                   </ul>
                 </div>

                 {readTopic.content.caseLaws && (
                   <div className="my-6">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-500 mb-3">Landmark Case Laws</h4>
                      <div className="grid gap-3">
                        {readTopic.content.caseLaws.map((cl, i) => (
                          <div key={i} className="border-l-4 border-indigo-500 pl-4 py-1">
                            <p className="font-bold text-gray-900 dark:text-white">{cl.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{cl.ruling}"</p>
                          </div>
                        ))}
                      </div>
                   </div>
                 )}

                 {readTopic.content.example && (
                   <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-xl border border-yellow-200 dark:border-yellow-900/30 text-sm text-yellow-800 dark:text-yellow-200">
                      <span className="font-bold block mb-1">Example:</span>
                      {readTopic.content.example}
                   </div>
                 )}
               </div>
               
               <div className="mt-12 flex justify-center">
                 <button onClick={() => setReadTopic(null)} className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-transform active:scale-95">
                   <CheckCircle2 className="w-5 h-5" /> Mark as Read
                 </button>
               </div>
            </div>
          </div>
        )}

        {/* VIEW: REELS (Quick Bytes) */}
        {activeTab === 'reels' && (
          <div 
            ref={reelsRef}
            className="absolute inset-0 bg-black overflow-y-auto snap-y snap-mandatory no-scrollbar"
          >
            {REELS_DATA.map((reel) => (
              <div key={reel.id} className={`w-full h-full snap-start relative flex flex-col items-center justify-center p-8 text-center ${reel.color}`}>
                 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>
                 
                 <div className="relative z-10 max-w-md animate-in zoom-in duration-500">
                    <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest mb-6 border border-white/30">
                      {reel.type}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight drop-shadow-lg font-serif">
                      {reel.text}
                    </h2>
                    <div className="w-16 h-1 bg-white/50 rounded-full mx-auto mb-6"></div>
                    <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-md">
                      {reel.subText}
                    </p>
                 </div>

                 {/* Reel Actions */}
                 <div className="absolute right-4 bottom-20 flex flex-col gap-6 z-20">
                    <button className="flex flex-col items-center gap-1 text-white opacity-80 hover:opacity-100 transition-opacity">
                       <div className="p-3 bg-white/10 rounded-full backdrop-blur-md"><Star className="w-6 h-6" /></div>
                       <span className="text-[10px] font-bold">Save</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-white opacity-80 hover:opacity-100 transition-opacity">
                       <div className="p-3 bg-white/10 rounded-full backdrop-blur-md"><Share2 className="w-6 h-6" /></div>
                       <span className="text-[10px] font-bold">Share</span>
                    </button>
                 </div>
                 
                 <div className="absolute bottom-6 left-0 w-full text-center">
                    <p className="text-white/40 text-xs animate-bounce">Swipe for more</p>
                 </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW: FLASHCARDS */}
        {activeTab === 'cards' && (
           <div className="h-full flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 animate-in fade-in">
              <div className="w-full max-w-md h-[400px] perspective-1000 relative group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                 <div className={`w-full h-full transition-all duration-500 preserve-3d relative ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-indigo-100 dark:border-gray-700 flex flex-col items-center justify-center p-8 text-center">
                       <span className="absolute top-6 right-6 text-xs font-bold text-gray-400">Card {cardIndex + 1}/{REELS_DATA.length}</span>
                       <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold uppercase mb-6">{REELS_DATA[cardIndex].type}</span>
                       <h3 className="text-2xl font-bold text-gray-800 dark:text-white leading-relaxed">{REELS_DATA[cardIndex].text}</h3>
                       <p className="absolute bottom-6 text-gray-400 text-xs flex items-center gap-2"><RotateCw className="w-3 h-3" /> Tap to flip</p>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden bg-indigo-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-center" style={{ transform: 'rotateY(180deg)' }}>
                       <p className="text-xl text-white font-medium leading-relaxed">{REELS_DATA[cardIndex].subText}</p>
                    </div>
                 </div>
              </div>

              <div className="flex gap-4 mt-8">
                 <button onClick={() => { setIsFlipped(false); setTimeout(() => setCardIndex(prev => prev > 0 ? prev - 1 : REELS_DATA.length - 1), 200) }} className="p-4 bg-white dark:bg-gray-700 rounded-full shadow-lg text-indigo-600 dark:text-white hover:scale-110 transition-transform">
                    <ChevronLeft className="w-6 h-6" />
                 </button>
                 <button onClick={() => { setIsFlipped(false); setTimeout(() => setCardIndex(prev => (prev + 1) % REELS_DATA.length), 200) }} className="p-4 bg-white dark:bg-gray-700 rounded-full shadow-lg text-indigo-600 dark:text-white hover:scale-110 transition-transform">
                    <ChevronRight className="w-6 h-6" />
                 </button>
              </div>
           </div>
        )}

        {/* VIEW: QUIZ */}
        {activeTab === 'quiz' && (
          <div className="h-full flex flex-col p-4 animate-in fade-in">
             {!activeQuiz ? (
               <div className="grid gap-4">
                 {QUIZZES.map(q => (
                   <button 
                    key={q.id}
                    onClick={() => setActiveQuiz(q)}
                    className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:border-indigo-500 transition-colors text-left"
                   >
                     <div className="flex items-center gap-4">
                        <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full text-indigo-600 dark:text-indigo-400">
                          <Brain className="w-6 h-6" />
                        </div>
                        <div>
                           <h3 className="font-bold text-gray-800 dark:text-white text-lg">{q.title}</h3>
                           <p className="text-sm text-gray-500 dark:text-gray-400">{q.questions.length} Questions • {q.subject}</p>
                        </div>
                     </div>
                     <ChevronRight className="w-5 h-5 text-gray-400" />
                   </button>
                 ))}
               </div>
             ) : activeQuiz && !quizState.finished ? (
                <div className="flex-1 flex flex-col max-w-xl mx-auto w-full">
                   <div className="flex justify-between items-center mb-8">
                      <button onClick={resetQuiz}><X className="w-6 h-6 text-gray-400" /></button>
                      <span className="font-bold text-indigo-600">{quizState.idx + 1}/{activeQuiz.questions.length}</span>
                   </div>
                   
                   <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 leading-snug">
                        {activeQuiz.questions[quizState.idx].q}
                      </h3>
                      <div className="space-y-3">
                        {activeQuiz.questions[quizState.idx].options.map((opt, i) => {
                          const isSelected = quizState.selected === i;
                          const isCorrect = i === activeQuiz.questions[quizState.idx].correct;
                          let btnClass = "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50";
                          
                          if (quizState.selected !== null) {
                             if (isCorrect) btnClass = "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300";
                             else if (isSelected) btnClass = "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300";
                             else btnClass = "opacity-50";
                          }

                          return (
                            <button
                              key={i}
                              onClick={() => handleQuizOption(i)}
                              disabled={quizState.selected !== null}
                              className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${btnClass}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      
                      {quizState.selected !== null && (
                        <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-800 dark:text-indigo-200 text-sm animate-in fade-in">
                          <span className="font-bold">Explanation:</span> {activeQuiz.questions[quizState.idx].explanation}
                        </div>
                      )}
                   </div>

                   <button 
                    onClick={nextQuestion}
                    disabled={quizState.selected === null}
                    className="mt-6 w-full py-4 bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg"
                   >
                     {quizState.idx === activeQuiz.questions.length - 1 ? 'Finish' : 'Next Question'}
                   </button>
                </div>
             ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                   <Trophy className="w-24 h-24 text-yellow-400 mb-6" />
                   <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Quiz Complete!</h2>
                   <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">You scored {quizState.score} out of {activeQuiz.questions.length}</p>
                   <button onClick={resetQuiz} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">Back to Quizzes</button>
                </div>
             )}
          </div>
        )}
      </div>

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-2 flex justify-between items-center z-10 safe-area-bottom">
         {[
           { id: 'learn', label: 'Learn', icon: BookOpen },
           { id: 'reels', label: 'Reels', icon: PlayCircle },
           { id: 'cards', label: 'Cards', icon: Layers },
           { id: 'quiz', label: 'Quiz', icon: Trophy }
         ].map((nav) => (
           <button
             key={nav.id}
             onClick={() => { setActiveTab(nav.id as ViewMode); setReadTopic(null); }}
             className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
               activeTab === nav.id ? 'text-indigo-600 dark:text-indigo-400 -translate-y-1' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
             }`}
           >
             <nav.icon className={`w-6 h-6 ${activeTab === nav.id ? 'fill-current' : ''}`} />
             <span className="text-[10px] font-bold">{nav.label}</span>
           </button>
         ))}
      </div>

    </div>
  );
};

export default StudyHub;
