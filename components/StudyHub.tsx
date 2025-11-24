
import React, { useState, useEffect, useRef } from 'react';
import { Subject } from '../types';
import { 
  Book, Scale, Globe, Brain, PenTool, Calculator, PlayCircle, Calendar, Sparkles, RefreshCw, Layers, RotateCw, 
  ChevronLeft, ChevronRight, Lightbulb, Clock, AlertCircle, ChevronDown, ChevronUp, Landmark, BookOpen, Target, 
  Star, Gamepad2, Smartphone, Check, Save, PenLine, X, GraduationCap, Zap, Search, MessageCircle, Users, Ear 
} from 'lucide-react';
import { generateStudyPlan, explainConcept, generateTopicQuiz } from '../services/geminiService';
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

const GavelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>;

const QUICK_BYTES = [
  { text: "Tort is a civil wrong. Remedy: Unliquidated Damages.", color: "from-pink-500 to-rose-500", icon: Scale },
  { text: "Strict Liability: No need to prove negligence. (Rylands v Fletcher)", color: "from-purple-500 to-indigo-500", icon: AlertCircle },
  { text: "Defamation needs Publication to a third party.", color: "from-blue-500 to-cyan-500", icon: MessageCircle },
  { text: "Vicarious Liability: Master liable for Servant's acts.", color: "from-emerald-500 to-teal-500", icon: Users },
  { text: "Res Judicata: A matter once decided cannot be heard again.", color: "from-orange-500 to-red-500", icon: GavelIcon },
  { text: "Audi Alteram Partem: No one should be condemned unheard.", color: "from-teal-500 to-green-500", icon: Ear },
  { text: "Quid Pro Quo: Something for Something (Consideration).", color: "from-indigo-500 to-blue-600", icon: Scale },
  { text: "Ignorantia Juris Non Excusat: Mistake of Law is NO excuse.", color: "from-red-500 to-pink-600", icon: AlertCircle },
  { text: "Caveat Emptor: Let the buyer beware.", color: "from-yellow-500 to-orange-500", icon: Book }
];

const MATCH_PAIRS = [
    { id: '1', left: 'Damnum Sine Injuria', right: 'Damage without Legal Injury' },
    { id: '2', left: 'Injuria Sine Damno', right: 'Injury without Damage' },
    { id: '3', left: 'Volenti Non Fit Injuria', right: 'Defense of Consent' },
    { id: '4', left: 'Res Ipsa Loquitur', right: 'Things speak for themselves' },
    { id: '5', left: 'Actus Reus', right: 'Guilty Act' },
    { id: '6', left: 'Mens Rea', right: 'Guilty Mind' },
    { id: '7', left: 'Locus Standi', right: 'Right to appear/be heard' },
    { id: '8', left: 'Force Majeure', right: 'Unforeseeable Circumstances' }
];

const subjects = [
  { id: Subject.LegalAptitude, icon: Scale, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30', desc: 'Constitution, Torts, Contracts, Crimes' },
  { id: Subject.GK, icon: Globe, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', desc: 'History, Geography, Current Affairs' },
  { id: Subject.LogicalReasoning, icon: Brain, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30', desc: 'Analogies, Coding, Blood Relations' },
  { id: Subject.English, icon: PenTool, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30', desc: 'Vocabulary, Grammar, Comprehension' },
  { id: Subject.Math, icon: Calculator, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30', desc: 'Basic Arithmetic, Percentages, Profit & Loss' },
];

// Expanded Content Library
const studyContentPlaceholder: Record<Subject, DetailedTopic[]> = {
  [Subject.LegalAptitude]: [
    { 
        title: "Law of Torts: Nature & Defenses", 
        readTime: "20m", 
        summary: "Tort is a civil wrong for which the remedy is a common law action for unliquidated damages. It differs from crime and contract breach.", 
        keyPoints: [
            "Damnum Sine Injuria: Damage without legal injury is NOT actionable (Gloucester Grammar School Case).",
            "Injuria Sine Damnum: Legal injury without damage IS actionable (Ashby v White).",
            "Volenti Non Fit Injuria: Defense of consent.",
            "Vis Major: Act of God."
        ], 
        casesOrExamples: [
            {title: 'Donoghue v Stevenson', desc: 'Established the "Neighbor Principle" in negligence.'}, 
            {title: 'Rylands v Fletcher', desc: 'Established the rule of Strict Liability.'},
            {title: 'MC Mehta v Union of India', desc: 'Established Absolute Liability in India (Oleum Gas Leak case).'}
        ], 
        proTip: 'Always check if there is a legal injury. No legal injury = No Tort (usually), unless it is Strict Liability.' 
    },
    { 
        title: "Indian Constitution: Fundamental Rights", 
        readTime: "35m", 
        summary: "Fundamental Rights (Part III, Art 12-35) are the Magna Carta of India. They are justiciable and enforceable via Art 32 & 226.", 
        keyPoints: [
            "Right to Equality (Art 14-18).", 
            "Right to Freedom (Art 19-22).",
            "Right against Exploitation (Art 23-24).",
            "Right to Constitutional Remedies (Art 32) - The 'Heart and Soul' (Ambedkar)."
        ], 
        casesOrExamples: [
            {title: 'Kesavananda Bharati Case', desc: 'Held Preamble is part of Constitution & Basic Structure doctrine.'},
            {title: 'Maneka Gandhi v Union of India', desc: 'Expanded Art 21 (Right to Life) to include Due Process.'},
            {title: 'Puttaswamy Case', desc: 'Right to Privacy is a fundamental right.'}
        ], 
        proTip: 'Memorize the writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto.' 
    },
    { 
        title: "Law of Contracts: Essentials", 
        readTime: "25m", 
        summary: "According to the Indian Contract Act, 1872, an agreement enforceable by law is a contract. Section 10 defines the essentials.", 
        keyPoints: [
            "Offer + Acceptance = Agreement.", 
            "Agreement + Enforceability = Contract.",
            "Free Consent: Not caused by Coercion, Undue Influence, Fraud, Misrepresentation, or Mistake.",
            "Consideration: Something in return (Quid Pro Quo)."
        ], 
        casesOrExamples: [
            {title: 'Carlill v Carbolic Smoke Ball Co', desc: 'General Offer can be accepted by performance.'},
            {title: 'Mohori Bibee v Dharmodas Ghose', desc: 'Minors agreement is void ab initio.'}
        ], 
        proTip: 'Silence does not amount to acceptance (Felthouse v Bindley).' 
    },
    { 
        title: "Criminal Law: General Exceptions", 
        readTime: "20m", 
        summary: "IPC Chapter IV (Sec 76-106) outlines conditions where an act is not an offence.", 
        keyPoints: [
            "Mistake of Fact (Sec 76, 79) is a defense; Mistake of Law is NOT.", 
            "Insanity (Sec 84): McNaughten Rules apply.",
            "Private Defense (Sec 96-106): Right to defend body and property."
        ], 
        casesOrExamples: [
            {title: 'R v Dudley and Stephens', desc: 'Necessity is not a defense for murder.'},
            {title: 'KM Nanavati v State of Maharashtra', desc: 'Grave and Sudden Provocation defense.'}
        ], 
        proTip: 'Child under 7 years is Doli Incapax (incapable of crime).' 
    },
    { 
        title: "Family Law: Hindu Marriage Act", 
        readTime: "15m", 
        summary: "Basics of HMA 1955, conditions for valid marriage, and grounds for divorce.", 
        keyPoints: [
            "Monogamy is mandatory (Sec 5).", 
            "Age: Groom 21, Bride 18.",
            "Sapinda Relationship: Prohibited degrees of relationship.",
            "Divorce by Mutual Consent (Sec 13B)."
        ], 
        proTip: 'Marriage registration is now compulsory in most states but non-registration does not invalidate it.' 
    },
  ],
  [Subject.GK]: [
    { 
        title: "Modern History: Freedom Struggle", 
        readTime: "30m", 
        summary: "Key timeline of India's fight for independence (1857-1947).", 
        keyPoints: [
            "1857: First War of Independence.", 
            "1905: Partition of Bengal.",
            "1919: Jallianwala Bagh & Rowlatt Act.",
            "1930: Dandi March (Civil Disobedience).",
            "1942: Quit India Movement."
        ], 
        proTip: 'Remember Chronology: Non-Cooperation -> Civil Disobedience -> Quit India.' 
    },
    { 
        title: "Geography: Indian Physiography", 
        readTime: "20m", 
        summary: "Physical features and river systems of India.", 
        keyPoints: [
            "Himalayan Rivers: Ganga, Indus, Brahmaputra (Perennial).", 
            "Peninsular Rivers: Godavari, Krishna, Kaveri (Rain-fed).",
            "West Flowing: Narmada, Tapti (Rift Valley)."
        ], 
        proTip: 'Godavari is known as Dakshin Ganga.' 
    },
    { 
        title: "International Organizations", 
        readTime: "15m", 
        summary: "Headquarters and Heads of major global bodies.", 
        keyPoints: [
            "UN: New York.", 
            "ICJ: The Hague, Netherlands.",
            "WTO/WHO/ILO: Geneva, Switzerland.",
            "UNESCO: Paris."
        ], 
        proTip: 'Most organizations ending in "Organization" and starting with "World" are in Geneva.' 
    },
    { 
        title: "Important Days", 
        readTime: "10m", 
        summary: "Crucial dates often asked in exams.", 
        keyPoints: ["Jan 26: Republic Day", "Nov 26: Constitution Day", "Dec 10: Human Rights Day", "June 5: Environment Day"] 
    }
  ],
  [Subject.LogicalReasoning]: [
    { 
        title: "Syllogisms: 100-50 Method", 
        readTime: "20m", 
        summary: "Deductive reasoning. Drawing conclusions from premises.", 
        keyPoints: ["All A are B.", "Some A are B.", "No A is B.", "If premises are positive, conclusion must be positive."], 
        casesOrExamples: [{title: 'Example', desc: 'All Cats are Dogs. All Dogs are Birds. -> All Cats are Birds.'}],
        proTip: 'Draw Venn Diagrams for visual confirmation.' 
    },
    { 
        title: "Blood Relations", 
        readTime: "15m", 
        summary: "Analyzing family trees.", 
        keyPoints: ["Paternal = Father's side.", "Maternal = Mother's side.", "Spouse = Husband/Wife."], 
        proTip: 'Break the sentence from the end. "My father\'s only son" is ME (if male).' 
    },
    { 
        title: "Coding & Decoding", 
        readTime: "15m", 
        summary: "Deciphering patterns.", 
        keyPoints: ["Letter Shifting (+1, -1).", "Reverse Order (A=Z).", "Opposite Pairs (AZ, BY, CX)."], 
        proTip: 'Write A-M and N-Z below it to find opposite pairs quickly.' 
    },
    {
        title: "Direction Sense",
        readTime: "10m",
        summary: "Solving movement based problems.",
        keyPoints: ["NEWS: North, East, West, South.", "Right turn from North = East.", "Pythagoras theorem for shortest distance."],
        proTip: 'Always draw a compass (+) before starting.'
    }
  ],
  [Subject.English]: [
    { 
        title: "Grammar: Subject-Verb Agreement", 
        readTime: "20m", 
        summary: "The verb must agree with the subject in number and person.", 
        keyPoints: ["Singular subject -> Singular verb.", "Everyone/Anyone -> Singular verb.", "Neither/Nor -> Verb agrees with nearest subject."], 
        casesOrExamples: [{title: 'Proximity Rule', desc: 'Neither the teacher nor the students WERE present.'}],
        proTip: '"One of the boys IS coming" (not are).' 
    },
    { 
        title: "Reading Comprehension Strategy", 
        readTime: "25m", 
        summary: "Techniques for speed reading and accuracy.", 
        keyPoints: ["Read questions FIRST.", "Skim first/last lines of paragraphs.", "Eliminate extreme options (always, never)."], 
        proTip: 'Do not bring outside knowledge. Answer only from the passage.' 
    },
    { 
        title: "Vocabulary: Root Words", 
        readTime: "30m", 
        summary: "Etymology hacks.", 
        keyPoints: ["Mal = Bad (Malice).", "Bene = Good (Benefit).", "Chron = Time (Chronology)."], 
        proTip: 'Negative prefix usually means negative answer choice.' 
    }
  ],
  [Subject.Math]: [
    { 
        title: "Percentages & Fractions", 
        readTime: "20m", 
        summary: "Foundation of arithmetic.", 
        keyPoints: ["1/2 = 50%", "1/3 = 33.33%", "1/4 = 25%", "1/5 = 20%"], 
        proTip: 'Memorize fractions up to 1/20 for speed.' 
    },
    { 
        title: "Profit, Loss & Discount", 
        readTime: "25m", 
        summary: "Commercial math basics.", 
        keyPoints: ["Profit = SP - CP", "Profit % = (Profit/CP)*100", "Discount is always on MP."], 
        proTip: 'Assume CP = 100 for easy calculation.' 
    },
    {
        title: "Time, Speed & Distance",
        readTime: "25m",
        summary: "Relationship between D, S, T.",
        keyPoints: ["D = S x T", "Relative Speed (Opposite) = S1 + S2", "Relative Speed (Same) = S1 - S2"],
        proTip: 'Convert km/hr to m/s by multiplying with 5/18.'
    }
  ],
};

const flashcardsData = [
  { id: 1, type: 'Maxim', front: 'Volenti non fit injuria', back: 'To a willing person, injury is not done.' },
  { id: 2, type: 'Case', front: 'Kesavananda Bharati', back: 'Basic Structure Doctrine.' },
  { id: 3, type: 'Maxim', front: 'Audi Alteram Partem', back: 'No one should be condemned unheard.' },
  { id: 4, type: 'Maxim', front: 'Actus Non Facit Reum Nisi Mens Sit Rea', back: 'The act itself does not constitute guilt unless done with a guilty mind.' },
  { id: 5, type: 'Maxim', front: 'Ubi Jus Ibi Remedium', back: 'Where there is a right, there is a remedy.' },
  { id: 6, type: 'Case', front: 'Shah Bano Case', back: 'Maintenance rights for Muslim women.' },
  { id: 7, type: 'Maxim', front: 'Res Ipsa Loquitur', back: 'The thing speaks for itself (Negligence).' },
  { id: 8, type: 'Case', front: 'Minerva Mills v Union of India', back: 'Judicial Review is part of Basic Structure.' }
];

// --- Sub-Components ---

const QuickBytesView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -clientWidth : clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <button onClick={onClose} className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors z-50"><X /></button>
      
      <button onClick={() => scroll('left')} className="absolute left-4 text-white/50 hover:text-white transition-colors hidden md:block z-50 p-2 bg-white/10 rounded-full hover:bg-white/20">
        <ChevronLeft className="w-8 h-8" />
      </button>
      
      <div 
        ref={scrollRef}
        className="w-full max-w-sm md:max-w-md h-[65vh] flex overflow-x-auto snap-x snap-mandatory rounded-3xl no-scrollbar gap-4 items-center"
      >
        {QUICK_BYTES.map((byte, i) => (
          <div key={i} className={`relative flex-shrink-0 w-full h-full snap-center flex flex-col items-center justify-center p-8 bg-gradient-to-br ${byte.color} text-white text-center rounded-3xl shadow-2xl border border-white/10 overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-white/20 p-4 rounded-full inline-flex mb-8 backdrop-blur-md shadow-lg ring-1 ring-white/30">
                {byte.icon && <byte.icon className="w-10 h-10 text-white" />}
              </div>
              <p className="text-2xl md:text-3xl font-bold leading-tight drop-shadow-md mb-6 font-serif">
                "{byte.text}"
              </p>
              <div className="w-16 h-1.5 bg-white/40 rounded-full mx-auto mb-6"></div>
               <div className="bg-black/20 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest text-white/80">
                Fact {i + 1} of {QUICK_BYTES.length}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => scroll('right')} className="absolute right-4 text-white/50 hover:text-white transition-colors hidden md:block z-50 p-2 bg-white/10 rounded-full hover:bg-white/20">
        <ChevronRight className="w-8 h-8" />
      </button>

       {/* Mobile Dots Indicator */}
       <div className="absolute bottom-10 flex gap-2 md:hidden">
          {QUICK_BYTES.map((_, i) => (
             <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
          ))}
       </div>
    </div>
  );
};

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
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
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
    <div className="fixed inset-0 z-50 bg-indigo-900/95 flex flex-col items-center justify-center p-4 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between mb-6 sticky top-0 bg-white dark:bg-gray-800 pb-2 z-10">
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

// --- Sub-Component: Explain Modal ---
const ExplainModal: React.FC<{ concept: string; subject: string; onClose: () => void }> = ({ concept, subject, onClose }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExplanation = async () => {
      const text = await explainConcept(concept, subject);
      setContent(text);
      setLoading(false);
    };
    fetchExplanation();
  }, [concept, subject]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col max-h-[85vh]">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-indigo-50/50 dark:bg-gray-800 rounded-t-2xl">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
             <Sparkles className="w-5 h-5" />
             <h3 className="font-bold text-lg">Deep Dive</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 overflow-y-auto">
          {loading ? (
             <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
             </div>
          ) : (
            <div className="prose dark:prose-invert max-w-none text-sm md:text-base">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{concept}</h2>
                <div className="whitespace-pre-wrap">{content}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Quiz Modal ---
const TopicQuizModal: React.FC<{ topic: string; subject: string; onClose: () => void }> = ({ topic, subject, onClose }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      const qs = await generateTopicQuiz(topic, subject);
      if (qs && qs.length > 0) {
        setQuestions(qs);
      } else {
        // Fallback for demo if API fails
        setQuestions([{
            question: `What is the core principle of ${topic}?`,
            options: ["Principle A", "Principle B", "Principle C", "Principle D"],
            correctIndex: 0,
            explanation: "This is a fallback question."
        }]);
      }
      setLoading(false);
    };
    loadQuiz();
  }, [topic, subject]);

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setShowExplanation(true);
    if (index === questions[currentQIndex].correctIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(p => p + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
            <div className="p-12 text-center">
                <div className="animate-spin w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Generating questions for {topic}...</p>
            </div>
        ) : finished ? (
            <div className="p-8 text-center">
                <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600 text-3xl font-bold">
                    {score}/{questions.length}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Quiz Complete!</h3>
                <p className="text-gray-500 mb-6">You've mastered this micro-topic.</p>
                <button onClick={onClose} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">Close</button>
            </div>
        ) : (
            <div className="p-6">
                 <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Question {currentQIndex + 1}/{questions.length}</span>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                 </div>
                 
                 <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 leading-relaxed">
                    {questions[currentQIndex].question}
                 </h3>

                 <div className="space-y-3 mb-6">
                    {questions[currentQIndex].options.map((opt: string, idx: number) => {
                        let btnClass = "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700";
                        if (selectedOption !== null) {
                            if (idx === questions[currentQIndex].correctIndex) btnClass = "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-300";
                            else if (idx === selectedOption) btnClass = "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-300";
                            else btnClass = "opacity-50";
                        }
                        return (
                            <button 
                                key={idx} 
                                onClick={() => handleOptionClick(idx)}
                                disabled={selectedOption !== null}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-sm ${btnClass}`}
                            >
                                {opt}
                            </button>
                        );
                    })}
                 </div>

                 {showExplanation && (
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-sm text-blue-800 dark:text-blue-300 animate-in fade-in">
                        <span className="font-bold block mb-1">Explanation:</span>
                        {questions[currentQIndex].explanation}
                    </div>
                 )}

                 <div className="flex justify-end">
                    <button 
                        onClick={nextQuestion} 
                        disabled={selectedOption === null}
                        className="bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all"
                    >
                        {currentQIndex === questions.length - 1 ? "Finish" : "Next"} <ChevronRight className="w-4 h-4" />
                    </button>
                 </div>
            </div>
        )}
      </div>
    </div>
  );
};

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
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // AI Interaction States
  const [explainModalData, setExplainModalData] = useState<{concept: string, subject: string} | null>(null);
  const [quizModalData, setQuizModalData] = useState<{topic: string, subject: string} | null>(null);

  const topics = studyContentPlaceholder[selectedSubject] || [];
  
  // Filtering Logic
  const filteredTopics = topics.filter(topic => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
        topic.title.toLowerCase().includes(query) ||
        topic.summary.toLowerCase().includes(query) ||
        topic.keyPoints.some(kp => kp.toLowerCase().includes(query))
    );
  });

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
      {/* Modals */}
      {showQuickBytes && <QuickBytesView onClose={() => setShowQuickBytes(false)} />}
      {showMatchGame && <MatchGame pairs={MATCH_PAIRS} onClose={() => setShowMatchGame(false)} />}
      {explainModalData && <ExplainModal concept={explainModalData.concept} subject={explainModalData.subject} onClose={() => setExplainModalData(null)} />}
      {quizModalData && <TopicQuizModal topic={quizModalData.topic} subject={quizModalData.subject} onClose={() => setQuizModalData(null)} />}

      <header className="flex flex-col gap-6 mb-6 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Study Hub</h2>
            <p className="text-gray-500 dark:text-gray-400">Master concepts with AI support.</p>
          </div>
          <button
            onClick={() => setShowQuickBytes(true)}
            className="px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/20 flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <Zap className="w-4 h-4" /> Quick Bytes
          </button>
        </div>
        
        <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar" aria-label="Tabs">
            {[
                { id: 'materials', label: 'Study Materials', icon: BookOpen },
                { id: 'flashcards', label: 'Flashcards', icon: RotateCw },
                { id: 'plan', label: 'Rank 1 Plan', icon: Target }
            ].map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`
                        group inline-flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-all whitespace-nowrap
                        ${isActive
                            ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                        }
                        `}
                    >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 group-hover:text-gray-500'}`} />
                        {tab.label}
                    </button>
                );
            })}
            </nav>
        </div>
      </header>

      {activeTab === 'materials' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 h-full overflow-hidden">
          {/* Sidebar */}
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

          {/* Main Content */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden">
            
            {/* Sticky Search Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 z-10">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search topics in ${selectedSubject}...`}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm"
                    />
                </div>
            </div>

            {/* Scrollable List */}
            <div className="p-6 overflow-y-auto flex-1">
                {filteredTopics.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 py-12">
                        {searchQuery ? (
                             <>
                                <Search className="w-16 h-16 mb-4 opacity-20" />
                                <p>No topics found matching "{searchQuery}".</p>
                                <button onClick={() => setSearchQuery('')} className="mt-2 text-indigo-500 hover:underline">Clear Search</button>
                             </>
                        ) : (
                            <>
                                <BookOpen className="w-16 h-16 mb-4 opacity-20" />
                                <p>Select a subject to view topics.</p>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                    {filteredTopics.map((topic: DetailedTopic, index: number) => {
                        const noteId = `${selectedSubject}-${index}`;
                        return (
                        <div key={index} className={`border rounded-xl transition-all duration-300 ${expandedTopicIndex === index ? 'border-indigo-200 dark:border-indigo-800 shadow-lg bg-white dark:bg-gray-800 ring-1 ring-indigo-50 dark:ring-indigo-900/30' : 'border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 hover:border-indigo-200'}`}>
                        <button onClick={() => toggleTopic(index)} className="w-full flex items-center justify-between p-5 text-left">
                            <div className="flex items-center gap-4">
                            <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-colors ${expandedTopicIndex === index ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600'}`}>{index + 1}</span>
                            <div>
                                <h4 className={`font-bold text-lg ${expandedTopicIndex === index ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-800 dark:text-gray-200'}`}>{topic.title}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> {topic.readTime} Read</p>
                            </div>
                            </div>
                            {expandedTopicIndex === index ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                        </button>

                        {expandedTopicIndex === index && (
                            <div className="p-5 pt-0 pl-4 md:pl-[4.5rem] animate-in fade-in slide-in-from-top-2">
                            <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-4 rounded-lg mb-6 border border-indigo-100 dark:border-indigo-900/20">
                                 <div className="flex justify-between items-start gap-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">{topic.summary}</p>
                                    <button 
                                        onClick={() => setExplainModalData({ concept: topic.title, subject: selectedSubject })}
                                        className="flex-shrink-0 bg-white dark:bg-gray-700 shadow-sm border border-indigo-100 dark:border-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-300 flex items-center gap-1 hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        <Sparkles className="w-3 h-3" /> Explain with AI
                                    </button>
                                 </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h5 className="font-bold text-sm text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-indigo-500" /> Key Concepts</h5>
                                    <ul className="space-y-2">
                                        {topic.keyPoints?.map((kp: string, i: number) => (
                                            <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2 group cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                onClick={() => setExplainModalData({ concept: kp, subject: selectedSubject })}
                                            >
                                                <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full mt-1.5 group-hover:bg-indigo-500 transition-colors"></span>
                                                {kp}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {topic.casesOrExamples && (
                                    <div>
                                        <h5 className="font-bold text-sm text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2"><GavelIcon /> Cases & Examples</h5>
                                        <div className="space-y-2">
                                            {topic.casesOrExamples.map((ce, i) => (
                                                <div key={i} className="bg-gray-50 dark:bg-gray-700/50 p-2.5 rounded-lg border border-gray-100 dark:border-gray-700">
                                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{ce.title}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ce.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {topic.proTip && (
                                <div className="mb-6 flex gap-3 items-start bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                                    <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-xs font-bold text-yellow-700 dark:text-yellow-500 uppercase tracking-wide">Rank 1 Tip</span>
                                        <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-0.5">{topic.proTip}</p>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-gray-100 dark:border-gray-700 pt-5">
                                <button onClick={() => setShowQuickBytes(true)} className="bg-gray-50 hover:bg-white border hover:border-pink-200 dark:bg-gray-700/50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-2 transition-all group">
                                    <Smartphone className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" /> Quick Bytes
                                </button>
                                <button onClick={() => setShowMatchGame(true)} className="bg-gray-50 hover:bg-white border hover:border-indigo-200 dark:bg-gray-700/50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-2 transition-all group">
                                    <Gamepad2 className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" /> Match Terms
                                </button>
                                <button onClick={() => setQuizModalData({ topic: topic.title, subject: selectedSubject })} className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-2 transition-all group shadow-sm">
                                    <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" /> Take Quiz
                                </button>
                                <button onClick={() => markTopicMastered()} className="bg-green-50 hover:bg-green-100 border border-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 dark:border-green-800 text-green-700 dark:text-green-300 p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-2 transition-all group shadow-sm">
                                    <Check className="w-5 h-5 group-hover:scale-110 transition-transform" /> Mark Done
                                </button>
                            </div>
                            
                            {/* Notes Section */}
                            <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-4">
                                <button 
                                    onClick={() => setActiveNoteId(activeNoteId === noteId ? null : noteId)}
                                    className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                                >
                                    <PenLine className="w-4 h-4" />
                                    {notes[noteId] ? 'Edit My Notes' : 'Add Personal Note'}
                                </button>
                                
                                {activeNoteId === noteId && (
                                    <div className="mt-3 animate-in fade-in slide-in-from-top-2 relative">
                                    <textarea
                                        value={notes[noteId] || ''}
                                        onChange={(e) => updateNote(noteId, e.target.value)}
                                        className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 outline-none min-h-[120px] bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-inner resize-none"
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
                )}
            </div>
          </div>
        </div>
      ) : activeTab === 'plan' ? (
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
             {!studyPlan ? (
                 <div className="text-center max-w-md mx-auto mt-10">
                    <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <GraduationCap className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Personalized Rank 1 Blueprint</h3>
                    <p className="text-gray-500 mb-6">AI-generated strategy tailored to your weak areas.</p>
                    
                    <div className="space-y-4 text-left">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Focus Areas</label>
                            <input value={weakAreas} onChange={(e) => setWeakAreas(e.target.value)} placeholder="e.g. Torts, Math" className="w-full p-3 border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Daily Commitment</label>
                            <select value={hoursPerDay} onChange={(e) => setHoursPerDay(e.target.value)} className="w-full p-3 border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                                <option value="2">2 Hours (Working Pro)</option>
                                <option value="4">4 Hours (Student)</option>
                                <option value="6">6 Hours (Serious)</option>
                                <option value="8">8+ Hours (Rank 1 Mode)</option>
                            </select>
                        </div>
                        <button onClick={handleGeneratePlan} disabled={loadingPlan} className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all mt-4 flex items-center justify-center gap-2">
                            {loadingPlan ? <><div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div> Generating...</> : "Generate Blueprint"}
                        </button>
                    </div>
                 </div>
             ) : (
                 <div className="animate-in fade-in">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Your Strategy</h3>
                        <button onClick={() => setStudyPlan(null)} className="text-sm text-indigo-600 font-bold hover:underline">Reset Plan</button>
                    </div>
                    <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                        <div className="whitespace-pre-wrap">{studyPlan}</div>
                    </div>
                 </div>
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
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${cardFilter === type ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
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
                             <div className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-800 border-2 border-indigo-100 dark:border-gray-700 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 hover:border-indigo-300 transition-colors">
                                 <button onClick={(e) => toggleDifficult(currentCard.id, e)} className="absolute top-6 left-6 z-10 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"><Star className={`w-6 h-6 ${difficultCardIds.includes(currentCard.id) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} /></button>
                                 <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold mb-6 uppercase tracking-wider">{(currentCard as any).type}</span>
                                 <h3 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">{currentCard.front}</h3>
                                 <p className="text-sm text-gray-400 absolute bottom-6 flex items-center gap-2"><RotateCw className="w-3 h-3" /> Click to flip</p>
                             </div>
                             {/* Back */}
                             <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-900 dark:to-gray-900 text-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8" style={{ transform: 'rotateY(180deg)' }}>
                                 <p className="text-xl md:text-2xl font-medium leading-relaxed">{currentCard.back}</p>
                             </div>
                         </div>
                    </div>
                 ) : (
                     <div className="text-center text-gray-500 dark:text-gray-400 py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">No cards found matching this filter.</div>
                 )}
                 {/* Controls */}
                 {filteredCards.length > 0 && (
                    <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <button onClick={() => {setIsFlipped(false); setTimeout(()=>setCurrentCardIndex(p=>(p-1+filteredCards.length)%filteredCards.length), 200)}} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"><ChevronLeft className="w-6 h-6" /></button>
                        <span className="font-bold font-mono text-lg">{currentCardIndex+1} / {filteredCards.length}</span>
                        <button onClick={() => {setIsFlipped(false); setTimeout(()=>setCurrentCardIndex(p=>(p+1)%filteredCards.length), 200)}} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"><ChevronRight className="w-6 h-6" /></button>
                    </div>
                 )}
             </div>
        </div>
      )}
    </div>
  );
};

export default StudyHub;
