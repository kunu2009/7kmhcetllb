import React, { useState, useEffect } from 'react';
import { Subject } from '../types';
import { Book, Scale, Globe, Brain, PenTool, Calculator, PlayCircle, Calendar, Sparkles, RefreshCw, Layers, RotateCw, ChevronLeft, ChevronRight, Lightbulb, Clock, AlertCircle, ChevronDown, ChevronUp, Landmark, BookOpen, Target } from 'lucide-react';
import { generateStudyPlan } from '../services/geminiService';

// --- Types for Rich Content ---
interface DetailedTopic {
  title: string;
  readTime: string;
  summary: string;
  keyPoints: string[];
  casesOrExamples?: { title: string; desc: string }[]; // For Legal (Cases) or Logic/Math (Examples)
  proTip?: string;
}

const subjects = [
  { id: Subject.LegalAptitude, icon: Scale, color: 'text-red-500', bg: 'bg-red-100', desc: 'Constitution, Torts, Contracts, Crimes' },
  { id: Subject.GK, icon: Globe, color: 'text-blue-500', bg: 'bg-blue-100', desc: 'History, Geography, Current Affairs' },
  { id: Subject.LogicalReasoning, icon: Brain, color: 'text-purple-500', bg: 'bg-purple-100', desc: 'Analogies, Coding, Blood Relations' },
  { id: Subject.English, icon: PenTool, color: 'text-green-500', bg: 'bg-green-100', desc: 'Vocabulary, Grammar, Comprehension' },
  { id: Subject.Math, icon: Calculator, color: 'text-orange-500', bg: 'bg-orange-100', desc: 'Basic Arithmetic, Percentages, Profit & Loss' },
];

// --- Comprehensive Data Library ---
const studyContent: Record<Subject, DetailedTopic[]> = {
  [Subject.LegalAptitude]: [
    {
      title: "Indian Constitution: Fundamental Rights",
      readTime: "25 mins",
      summary: "Part III (Articles 12-35) forms the bedrock of democracy. These rights are justiciable, meaning you can move the court (Art 32/226) if violated.",
      keyPoints: [
        "Right to Equality (Art 14-18): Rule of Law, Abolition of Untouchability.",
        "Right to Freedom (Art 19-22): Speech, Assembly, Association, Life & Liberty.",
        "Right against Exploitation (Art 23-24): Trafficking, Child Labour.",
        "Freedom of Religion (Art 25-28): Secularism.",
        "Constitutional Remedies (Art 32): The 'Heart and Soul' of the Constitution."
      ],
      casesOrExamples: [
        { title: "Kesavananda Bharati v. State of Kerala (1973)", desc: "Established the 'Basic Structure Doctrine'. Parliament cannot alter the core features of the Constitution." },
        { title: "Maneka Gandhi v. Union of India (1978)", desc: "Expanded Art 21. 'Procedure established by law' must be just, fair, and reasonable (Due Process)." },
        { title: "Justice Puttaswamy v. Union of India (2017)", desc: "Declared Right to Privacy as a Fundamental Right under Article 21." }
      ],
      proTip: "Focus on Article 21 and 32. These are the most frequently tested articles in entrance exams."
    },
    {
      title: "Constitution: Directive Principles & Duties",
      readTime: "20 mins",
      summary: "Part IV (DPSP) and Part IV-A (Fundamental Duties). Non-justiciable but fundamental in governance.",
      keyPoints: [
        "DPSP (Art 36-51): Welfare State concept.",
        "Art 39A: Free Legal Aid.",
        "Art 44: Uniform Civil Code.",
        "Fundamental Duties (Art 51A): Added by 42nd Amendment (Swaran Singh Committee). 11 Duties total."
      ],
      casesOrExamples: [
        { title: "Minerva Mills v. Union of India", desc: "Harmony between FR and DPSP is part of Basic Structure." }
      ],
      proTip: "Memorize the 11th Duty (Education for children 6-14 yrs) added by 86th Amendment."
    },
    {
      title: "Law of Torts: General Principles",
      readTime: "20 mins",
      summary: "A Tort is a civil wrong for which the remedy is unliquidated damages. It is not codified law but based on precedents.",
      keyPoints: [
        "Damnum Sine Injuria: Damage without legal injury (No compensation, e.g., Gloucester Grammar School case).",
        "Injuria Sine Damno: Legal injury without damage (Compensation awarded, e.g., Ashby v. White).",
        "Volenti Non Fit Injuria: Defense of consent (e.g., Spectator at a cricket match).",
        "Vicarious Liability: Master is liable for servant's acts (Respondeat Superior)."
      ],
      casesOrExamples: [
        { title: "Donoghue v. Stevenson (1932)", desc: "Established the 'Neighbor Principle' in Negligence (Ginger Beer case)." },
        { title: "Rylands v. Fletcher (1868)", desc: "Laid down the rule of 'Strict Liability'." },
        { title: "M.C. Mehta v. UOI (1987)", desc: "Established 'Absolute Liability' for hazardous industries in India (Oleum Gas Leak)." }
      ],
      proTip: "Always identify if the plaintiff suffered a 'legal injury'. If no legal right is violated, there is no tort."
    },
    {
      title: "Law of Torts: Specific Torts",
      readTime: "25 mins",
      summary: "Defamation, Nuisance, Trespass, and Malicious Prosecution.",
      keyPoints: [
        "Defamation: Libel (Written) vs Slander (Spoken). Truth is a defense.",
        "Nuisance: Unlawful interference with enjoyment of land (Public vs Private).",
        "Trespass: Actionable per se (without proof of damage).",
        "Malicious Prosecution: Prosecution without reasonable cause."
      ],
      proTip: "In Defamation, 'publication' to a third party is mandatory."
    },
    {
      title: "Indian Contract Act, 1872",
      readTime: "20 mins",
      summary: "Deals with agreements that are enforceable by law. Section 2(h): Contract = Agreement + Enforceability.",
      keyPoints: [
        "Offer & Acceptance: Must be communicated.",
        "Consideration (Quid Pro Quo): Something in return.",
        "Free Consent: No Coercion, Undue Influence, Fraud, Misrepresentation, or Mistake.",
        "Void vs Voidable: Void is dead from start (ab initio); Voidable is valid until cancelled."
      ],
      casesOrExamples: [
        { title: "Carlill v. Carbolic Smoke Ball Co.", desc: "General Offer can be accepted by conduct." },
        { title: "Balfour v. Balfour", desc: "Social/Domestic agreements are NOT contracts (No intent to create legal relations)." },
        { title: "Mohori Bibee v. Dharmodas Ghose", desc: "Minors' agreements are Void Ab Initio." }
      ],
      proTip: "Memorize the difference between 'Void Agreement' and 'Voidable Contract'. It's a common trap."
    },
    {
      title: "Criminal Law (IPC): Offences Against Body",
      readTime: "30 mins",
      summary: "Culpable Homicide, Murder, Kidnapping, Abduction.",
      keyPoints: [
        "Culpable Homicide (Sec 299) vs Murder (Sec 300): Intensity of intention makes the difference.",
        "Kidnapping (Sec 359): From lawful guardianship (Age limits apply).",
        "Abduction (Sec 362): By force or deceit (No age limit)."
      ],
      casesOrExamples: [
        { title: "K.M. Nanavati v. State of Maharashtra", desc: "Grave and sudden provocation defense (Jury trial abolition)." }
      ]
    },
    {
      title: "Criminal Law (IPC): Offences Against Property",
      readTime: "20 mins",
      summary: "Theft, Extortion, Robbery, Dacoity.",
      keyPoints: [
        "Theft (Sec 378): Moving movable property without consent.",
        "Extortion (Sec 383): Inducing delivery of property by threat.",
        "Robbery (Sec 390): Theft/Extortion + Violence/Fear.",
        "Dacoity (Sec 391): Robbery by 5 or more persons."
      ],
      proTip: "The number of people involved distinguishes Robbery from Dacoity (5+)."
    },
    {
      title: "Family Law Basics",
      readTime: "15 mins",
      summary: "Hindu Law and Muslim Law essentials for entrance.",
      keyPoints: [
        "Hindu Marriage Act 1955: Monogamy, Conditions for marriage.",
        "Divorce: Theories (Fault, Consent, Breakdown).",
        "Muslim Law: Nikah is a civil contract. Dower (Mahr).",
        "Uniform Civil Code (Art 44): Current relevance."
      ],
      casesOrExamples: [
        { title: "Shah Bano Case", desc: "Maintenance rights for Muslim women." },
        { title: "Shayara Bano v. UOI", desc: "Triple Talaq declared unconstitutional." }
      ]
    },
    {
      title: "Legal Language & Maxims",
      readTime: "15 mins",
      summary: "Latin terms used frequently in legal proceedings.",
      keyPoints: [
        "Audi Alteram Partem: Hear the other side.",
        "Res Judicata: Matter already decided.",
        "Obiter Dicta: Remarks in passing (not binding).",
        "Ratio Decidendi: The reason for the decision (binding)."
      ],
      proTip: "Learn 5 new maxims daily. They are easy marks in the exam."
    }
  ],
  [Subject.GK]: [
    {
      title: "Current Affairs: Last 12 Months",
      readTime: "30 mins",
      summary: "High yield topics from National and International importance.",
      keyPoints: [
        "Awards: Nobel Prizes, Bharat Ratna, Padma Awards, Oscar Winners.",
        "Sports: Cricket World Cup, Olympics/Asian Games, Grand Slams.",
        "Appointments: Chief Justice of India, Election Commissioners, Heads of Global Bodies (UN, WHO).",
        "Summits: G20, BRICS, COP (Climate Change)."
      ],
      proTip: "Read the newspaper editoral page daily. Focus on Legal Appointments and Amendments."
    },
    {
      title: "International Organizations",
      readTime: "20 mins",
      summary: "UN, WTO, IMF, World Bank basics.",
      keyPoints: [
        "United Nations: Est 1945, HQ New York. 6 Organs.",
        "ICJ (International Court of Justice): HQ The Hague, Netherlands.",
        "IMF/World Bank: Bretton Woods Twins.",
        "SAARC, ASEAN, NATO: Members and Purpose."
      ]
    },
    {
      title: "Modern Indian History",
      readTime: "25 mins",
      summary: "The Freedom Struggle (1857-1947) is the most important section.",
      keyPoints: [
        "Revolt of 1857: Sepoy Mutiny basics.",
        "Gandhian Era: Non-Cooperation (1920), Civil Disobedience (1930), Quit India (1942).",
        "INC Sessions: 1929 Lahore (Purna Swaraj), 1931 Karachi (Fundamental Rights)."
      ]
    },
    {
      title: "Indian Geography",
      readTime: "20 mins",
      summary: "Physical features and static facts.",
      keyPoints: [
        "River Systems: Himalayan vs Peninsular.",
        "National Parks & Sanctuaries (Focus on locations like Kaziranga, Gir).",
        "Solar System facts (Planets, Satellites)."
      ]
    },
    {
      title: "Economics Basics",
      readTime: "15 mins",
      summary: "Macro-economic terms often asked.",
      keyPoints: [
        "GDP, GNP, NNP definitions.",
        "RBI Policies: Repo Rate, Reverse Repo, CRR, SLR.",
        "Inflation: Types and impact.",
        "Five Year Plans (History)."
      ]
    },
    {
      title: "General Science",
      readTime: "15 mins",
      summary: "Everyday science facts.",
      keyPoints: [
        "Vitamins & Deficiency Diseases (Vit A - Night Blindness, Vit C - Scurvy).",
        "Scientific Instruments (Seismograph, Barometer).",
        "Human Body: Largest bone (Femur), Largest Gland (Liver)."
      ]
    }
  ],
  [Subject.LogicalReasoning]: [
    {
      title: "Syllogisms",
      readTime: "20 mins",
      summary: "Deductive reasoning based on statements and conclusions.",
      keyPoints: [
        "Use Venn Diagrams to solve.",
        "Common quantifiers: All, Some, No, Some Not.",
        "Remember: If statements are positive, negative conclusion usually doesn't follow."
      ],
      casesOrExamples: [
        { title: "Example 1", desc: "Statement: All A are B. All B are C. -> Conclusion: All A are C (True)." },
        { title: "Example 2", desc: "Statement: Some A are B. Some B are C. -> Conclusion: Some A are C (False/Uncertain)." }
      ],
      proTip: "Always check for the 'Either-Or' case in conclusions."
    },
    {
      title: "Critical Reasoning",
      readTime: "25 mins",
      summary: "Identifying Assumptions, Arguments, and Inferences.",
      keyPoints: [
        "Assumption: What the author takes for granted (Implicit).",
        "Inference: What is definitely true based on the passage (Explicit/Derived).",
        "Strong vs Weak Arguments: Strong arguments deal with the core issue."
      ],
      casesOrExamples: [
        { title: "Negation Test", desc: "To find an assumption, negate the option. If the argument collapses, that option is the assumption." }
      ]
    },
    {
      title: "Coding-Decoding & Series",
      readTime: "15 mins",
      summary: "Pattern recognition in letters and numbers.",
      keyPoints: [
        "Letter Positions: A=1, B=2... Z=26 (EJOTY Rule: 5,10,15,20,25).",
        "Opposite Pairs: A-Z, B-Y, C-X (Crux), D-W (Dew).",
        "Number Series: Check for Differences, Squares, Cubes, Prime numbers."
      ]
    },
    {
      title: "Blood Relations",
      readTime: "20 mins",
      summary: "Navigating family trees.",
      keyPoints: [
        "Generations: Grandparents -> Parents -> Self/Siblings -> Children.",
        "In-laws relationships.",
        "Pointing to a photograph problems."
      ],
      proTip: "Draw a generation tree. Use + for Male and - for Female to avoid confusion."
    },
    {
      title: "Direction Sense",
      readTime: "15 mins",
      summary: "North, South, East, West logic.",
      keyPoints: [
        "NEWS (North, East, West, South).",
        "Pythagoras Theorem for shortest distance.",
        "Shadow cases: Morning (Sun East -> Shadow West), Evening (Sun West -> Shadow East)."
      ]
    },
    {
      title: "Seating Arrangement",
      readTime: "25 mins",
      summary: "Linear and Circular arrangements.",
      keyPoints: [
        "Circular: Facing center (Left is Clockwise) vs Facing outside.",
        "Linear: North facing (Left is your Left) vs South facing.",
        "Connect the definite information first."
      ]
    }
  ],
  [Subject.English]: [
    {
      title: "Reading Comprehension",
      readTime: "Ongoing",
      summary: "The heavyweight of the English section.",
      keyPoints: [
        "Skimming: Read first and last paragraphs to get the gist.",
        "Scanning: Look for specific keywords for factual questions.",
        "Tone of Passage: Analytical, Critical, Sarcastic, Narrative."
      ],
      proTip: "Read the questions FIRST before reading the passage to know what to look for."
    },
    {
      title: "Grammar Essentials: Spotting Errors",
      readTime: "20 mins",
      summary: "Rules for Spotting Errors and Sentence Correction.",
      keyPoints: [
        "Subject-Verb Agreement: 'The list of items IS on the desk' (Subject is List, not Items).",
        "Tenses: Consistency is key.",
        "Modifiers: 'Walking down the road, the tree fell' (Incorrect) vs 'Walking down the road, he saw a tree fall'."
      ]
    },
    {
      title: "Vocabulary: Root Words",
      readTime: "10 mins",
      summary: "Enhancing word power.",
      keyPoints: [
        "Root Words: 'Mal' (bad) -> Malice, Malfunction.",
        "Root Words: 'Bene' (good) -> Benefit, Benevolent.",
        "Root Words: 'Logy' (study) -> Biology, Theology."
      ]
    },
    {
      title: "Idioms & Phrases",
      readTime: "15 mins",
      summary: "Common figurative expressions.",
      keyPoints: [
        "Barking up the wrong tree: Accusing the wrong person.",
        "Once in a blue moon: Rarely.",
        "Burn the midnight oil: Work late into the night.",
        "Piece of cake: Very easy."
      ]
    },
    {
      title: "One Word Substitution",
      readTime: "15 mins",
      summary: "Replacing phrases with a single word.",
      keyPoints: [
        "A person who does not believe in God: Atheist.",
        "Government by the people: Democracy.",
        "A cure for all diseases: Panacea.",
        "One who knows everything: Omniscient."
      ]
    },
    {
      title: "Para Jumbles",
      readTime: "20 mins",
      summary: "Ordering sentences to form a coherent paragraph.",
      keyPoints: [
        "Find the Opening Sentence (Introduces the topic).",
        "Find Mandatory Pairs (Chronology, Noun-Pronoun link).",
        "Look for Concluding Sentence."
      ]
    }
  ],
  [Subject.Math]: [
    {
      title: "Arithmetic Basics: Percentages",
      readTime: "30 mins",
      summary: "Foundation for Data Interpretation and word problems.",
      keyPoints: [
        "Fraction to % conversion (1/2=50%, 1/3=33.33%, 1/4=25%, 1/5=20%).",
        "Percentage Increase/Decrease formulas.",
        "Successive percentage change: A + B + (AB/100)."
      ],
      proTip: "Don't solve everything. Use approximation and options to eliminate wrong answers quickly."
    },
    {
      title: "Profit, Loss & Discount",
      readTime: "20 mins",
      summary: "Commercial Mathematics.",
      keyPoints: [
        "Profit = SP - CP.",
        "Profit % = (Profit/CP) * 100.",
        "Discount is always on Marked Price (MP).",
        "False Weights logic."
      ]
    },
    {
      title: "Time, Speed & Distance",
      readTime: "25 mins",
      summary: "Motion problems.",
      keyPoints: [
        "Speed = Distance / Time.",
        "Average Speed = 2xy/(x+y) (for equal distances).",
        "Trains: Lengths add up when crossing each other.",
        "Boats & Streams: Downstream (u+v), Upstream (u-v)."
      ]
    },
    {
      title: "Time & Work",
      readTime: "20 mins",
      summary: "Efficiency and Man-days.",
      keyPoints: [
        "If A does work in n days, 1 day work = 1/n.",
        "Efficiency is inversely proportional to Time.",
        "M1D1H1 = M2D2H2 (Chain Rule)."
      ]
    },
    {
      title: "Ratio & Proportion",
      readTime: "15 mins",
      summary: "Comparison of quantities.",
      keyPoints: [
        "A:B = a/b.",
        "Proportion: a:b :: c:d => ad = bc.",
        "Mixtures & Alligation rule."
      ]
    }
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
  { id: 13, type: 'Case', front: 'Minerva Mills v. Union of India', back: 'Struck down clauses of 42nd Amendment. Harmony between FR and DPSP is basic structure.' },
  { id: 14, type: 'Maxim', front: 'Caveat Emptor', back: 'Let the buyer beware.' },
  { id: 15, type: 'Case', front: 'Indra Sawhney v. Union of India', back: 'Mandal Commission case. Capped reservation at 50%.' }
];

const StudyHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'materials' | 'plan' | 'flashcards'>('materials');
  const [selectedSubject, setSelectedSubject] = useState<Subject>(Subject.LegalAptitude);
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  
  // Expanded UI State
  const [expandedTopicIndex, setExpandedTopicIndex] = useState<number | null>(null);
  
  // Personalization State
  const [weakAreas, setWeakAreas] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('4');

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

  // Reset expanded topic when subject changes
  useEffect(() => {
    setExpandedTopicIndex(null);
  }, [selectedSubject]);

  const handleGeneratePlan = async () => {
    setLoadingPlan(true);
    const plan = await generateStudyPlan(weakAreas, hoursPerDay);
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

  const toggleTopic = (index: number) => {
    if (expandedTopicIndex === index) {
      setExpandedTopicIndex(null);
    } else {
      setExpandedTopicIndex(index);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Study Hub</h2>
          <p className="text-gray-500">Your comprehensive arsenal for Rank 1 preparation.</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 h-full overflow-hidden">
          {/* Subject List - Fixed height on mobile, scrollable on desktop */}
          <div className="lg:col-span-1 space-y-3 overflow-y-auto max-h-[200px] lg:max-h-full pr-2">
            {subjects.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                  selectedSubject === sub.id
                    ? 'bg-white shadow-md border-l-4 border-indigo-600 ring-1 ring-indigo-50'
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
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
               <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                 <BookOpen className="w-5 h-5 text-indigo-600" />
                 {selectedSubject} Modules
               </h3>
               <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                 {studyContent[selectedSubject]?.length || 0} Topics
               </span>
            </div>

            <div className="space-y-4">
              {studyContent[selectedSubject]?.map((topic, index) => (
                <div key={index} className={`border rounded-xl transition-all duration-300 ${expandedTopicIndex === index ? 'border-indigo-200 shadow-md bg-indigo-50/10' : 'border-gray-200 hover:border-indigo-200'}`}>
                  
                  {/* Header (Clickable) */}
                  <button 
                    onClick={() => toggleTopic(index)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-colors ${expandedTopicIndex === index ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {index + 1}
                      </span>
                      <div>
                        <h4 className={`font-bold text-lg transition-colors ${expandedTopicIndex === index ? 'text-indigo-700' : 'text-gray-800'}`}>
                          {topic.title}
                        </h4>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" /> {topic.readTime}
                        </p>
                      </div>
                    </div>
                    {expandedTopicIndex === index ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>

                  {/* Expanded Content */}
                  {expandedTopicIndex === index && (
                    <div className="p-4 pt-0 pl-[4.5rem] animate-in fade-in slide-in-from-top-2">
                      <p className="text-gray-600 mb-4 leading-relaxed border-b border-dashed border-indigo-200 pb-4">
                        {topic.summary}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-bold text-gray-800 text-sm mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4 text-indigo-500" /> Rank 1 Concepts
                          </h5>
                          <ul className="space-y-2">
                            {topic.keyPoints.map((point, i) => (
                              <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0"></span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {topic.casesOrExamples && (
                           <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                             <h5 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                               {selectedSubject === Subject.LegalAptitude ? <Landmark className="w-4 h-4 text-orange-500" /> : <Lightbulb className="w-4 h-4 text-orange-500" />}
                               {selectedSubject === Subject.LegalAptitude ? "Landmark Cases" : "Illustrative Examples"}
                             </h5>
                             <div className="space-y-3">
                               {topic.casesOrExamples.map((item, i) => (
                                 <div key={i}>
                                   <p className="text-xs font-bold text-indigo-700">{item.title}</p>
                                   <p className="text-xs text-gray-500 leading-tight">{item.desc}</p>
                                 </div>
                               ))}
                             </div>
                           </div>
                        )}
                      </div>

                      {topic.proTip && (
                        <div className="mt-4 bg-yellow-50 text-yellow-800 text-sm p-3 rounded-lg border border-yellow-100 flex items-start gap-2">
                           <Sparkles className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                           <div>
                             <span className="font-bold">Expert Strategy:</span> {topic.proTip}
                           </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                 <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-blue-800 mb-1 text-sm">Want deeper analysis?</h4>
                <p className="text-sm text-blue-600">
                  Head to the <strong className="cursor-pointer hover:underline" onClick={() => setActiveTab('flashcards')}>Flashcards</strong> tab to test your recall on these topics immediately.
                </p>
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
             <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4">
               <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                 <Calendar className="w-10 h-10 text-indigo-600" />
               </div>
               <h3 className="text-2xl font-bold text-gray-800 mb-3">Personalized 12-Week Blueprint</h3>
               <p className="text-gray-500 mb-6">
                 Tell us a bit about your prep status, and we will craft a tailored schedule to hit AIR 1.
               </p>
               
               {/* Personalization Inputs */}
               <div className="w-full space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100 text-left mb-6">
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                     <AlertCircle className="w-4 h-4 text-orange-500" /> Weak Subjects
                   </label>
                   <input 
                     type="text" 
                     placeholder="e.g., Legal Torts, Math, Syllogisms"
                     value={weakAreas}
                     onChange={(e) => setWeakAreas(e.target.value)}
                     className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                     <Clock className="w-4 h-4 text-blue-500" /> Study Hours / Day
                   </label>
                   <select 
                     value={hoursPerDay}
                     onChange={(e) => setHoursPerDay(e.target.value)}
                     className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-200 outline-none text-sm bg-white"
                   >
                     <option value="2">2 Hours (Working Professional)</option>
                     <option value="4">4 Hours (Student)</option>
                     <option value="6">6 Hours (Dedicated)</option>
                     <option value="8+">8+ Hours (Rank 1 Target)</option>
                   </select>
                 </div>
               </div>

               <button 
                 onClick={handleGeneratePlan}
                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
               >
                 <Sparkles className="w-5 h-5" /> Generate My Plan
               </button>
             </div>
           ) : loadingPlan ? (
             <div className="flex flex-col items-center justify-center h-full">
               <RefreshCw className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
               <p className="text-gray-600 font-medium">Analyzing your profile & crafting roadmap...</p>
             </div>
           ) : (
             <div className="h-full flex flex-col">
               <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                 <div>
                   <h3 className="text-xl font-bold text-gray-800">Your Rank 1 Strategy</h3>
                   <p className="text-xs text-gray-500 mt-1">Optimized for {hoursPerDay} hours/day • Focus: {weakAreas || 'Balanced'}</p>
                 </div>
                 <button 
                   onClick={() => setStudyPlan(null)}
                   className="text-sm text-indigo-600 font-medium hover:text-indigo-800 flex items-center gap-1"
                 >
                   <RefreshCw className="w-3 h-3" /> New Plan
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