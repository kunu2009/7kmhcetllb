import React, { useState, useEffect, useRef } from 'react';
import { Subject } from '../types';
import { 
  BookOpen, Layers, Zap, Brain, ChevronLeft, ChevronRight, 
  X, Star, Share2, Bookmark, CheckCircle2, RotateCw, 
  Trophy, ArrowRight, PlayCircle, Clock, Filter, Search,
  GraduationCap, Smartphone, HelpCircle, Lightbulb,
  Globe, Calendar, ExternalLink, Newspaper
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { fetchCurrentAffairs, SearchResult, Source } from '../services/geminiService';

// --- Types ---

type CourseType = '5-Year' | '3-Year';
type ViewMode = 'learn' | 'reels' | 'cards' | 'quiz' | 'archive';

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

interface Flashcard {
  id: string;
  subject: Subject;
  question: string;
  answer: string;
  detail?: string;
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

const FLASHCARDS_DATA: Flashcard[] = [
    // LEGAL
    { id: 'f1', subject: Subject.LegalAptitude, question: 'Res Judicata', answer: 'A matter already judged.', detail: 'Section 11 of CPC. Once a court has decided a case, the same parties cannot file the same case again.' },
    { id: 'f2', subject: Subject.LegalAptitude, question: 'Mens Rea', answer: 'Guilty Mind / Criminal Intent.', detail: 'Essential for a crime. Actus Reus + Mens Rea = Crime.' },
    { id: 'f3', subject: Subject.LegalAptitude, question: 'Locus Standi', answer: 'The right to be heard in court.', detail: 'Traditionally, only the aggrieved person could approach court. PIL (Public Interest Litigation) relaxed this rule.' },
    { id: 'f4', subject: Subject.LegalAptitude, question: 'Caveat Emptor', answer: 'Let the buyer beware.', detail: 'The buyer is responsible for checking the quality of goods before purchase.' },
    { id: 'f5', subject: Subject.LegalAptitude, question: 'Void Contract', answer: 'A contract that is not enforceable by law.', detail: 'It is void from the beginning (Void ab initio), e.g., agreement with a minor.' },
    { id: 'f6', subject: Subject.LegalAptitude, question: 'Habeas Corpus', answer: 'To have the body.', detail: 'A writ issued to produce a person detained illegally before the court.' },
    { id: 'f7', subject: Subject.LegalAptitude, question: 'Force Majeure', answer: 'Act of God / Unforeseeable circumstances.', detail: 'A clause in contracts that frees parties from liability when an extraordinary event prevents performance.' },
    
    // CONSTITUTION
    { id: 'f8', subject: Subject.LegalAptitude, question: 'Article 14', answer: 'Equality before Law.', detail: 'Ensures equal protection of laws within the territory of India.' },
    { id: 'f9', subject: Subject.LegalAptitude, question: 'Schedule 8', answer: 'Official Languages.', detail: 'Lists the 22 recognized official languages of India.' },
    { id: 'f10', subject: Subject.LegalAptitude, question: 'Article 368', answer: 'Amendment of Constitution.', detail: 'Gives Parliament the power to amend the Constitution.' },

    // GK
    { id: 'f11', subject: Subject.GK, question: 'Satyameva Jayate Source', answer: 'Mundaka Upanishad', detail: 'The national motto of India, meaning "Truth Alone Triumphs".' },
    { id: 'f12', subject: Subject.GK, question: 'First Viceroy of India', answer: 'Lord Canning', detail: 'Appointed after the 1857 Revolt under the Govt of India Act, 1858.' },
    { id: 'f13', subject: Subject.GK, question: 'Longest River in World', answer: 'Nile', detail: 'Located in Africa. The longest river in India is Ganga.' },

    // LOGIC
    { id: 'f14', subject: Subject.LogicalReasoning, question: 'Clock: Hands Coincide', answer: '11 times in 12 hours.', detail: 'In 24 hours, they coincide 22 times.' },
    { id: 'f15', subject: Subject.LogicalReasoning, question: 'Leap Year Rule', answer: 'Divisible by 4 (except centuries unless div by 400).', detail: '1900 was NOT a leap year. 2000 WAS a leap year.' },
    
    // ENGLISH
    { id: 'f16', subject: Subject.English, question: 'Synonym: Candid', answer: 'Frank, Honest, Open.', detail: 'Antonym: Secretive, Evasive.' },
    { id: 'f17', subject: Subject.English, question: 'Idiom: White Elephant', answer: 'Expensive but useless possession.', detail: 'Derived from kings of Siam giving white elephants to courtiers to ruin them with maintenance costs.' },
];

const STATIC_TOPICS: StudyTopic[] = [
  // --- LEGAL APTITUDE ---
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
  {
    id: 'la-5',
    title: 'Fundamental Rights (Art 12-35)',
    subject: Subject.LegalAptitude,
    readTime: '25m',
    difficulty: 'Hard',
    summary: 'Magna Carta of India. Detailed look at Articles 14, 19, and 21.',
    content: {
      intro: 'Part III of the Constitution deals with Fundamental Rights. These are justiciable in nature.',
      keyPoints: [
        'Right to Equality (Art 14-18).',
        'Right to Freedom (Art 19-22).',
        'Right against Exploitation (Art 23-24).',
        'Right to Freedom of Religion (Art 25-28).',
        'Cultural and Educational Rights (Art 29-30).',
        'Right to Constitutional Remedies (Art 32) - Heart and Soul of Constitution.'
      ],
      caseLaws: [
        { name: 'Maneka Gandhi v Union of India', ruling: 'Expanded Art 21. "Procedure established by law" must be just, fair, and reasonable (Due Process).' },
        { name: 'Justice K.S. Puttaswamy v Union of India', ruling: 'Right to Privacy is a Fundamental Right under Art 21.' }
      ]
    }
  },
  {
    id: 'la-6',
    title: 'Criminal Law: General Exceptions',
    subject: Subject.LegalAptitude,
    readTime: '18m',
    difficulty: 'Medium',
    summary: 'When an act is NOT a crime. IPC Sections 76-106.',
    content: {
      intro: 'Even if the Actus Reus and Mens Rea exist, the accused may be acquitted if the act falls under General Exceptions (Chapter IV IPC).',
      keyPoints: [
        'Mistake of Fact (S. 76, 79): Valid defense (Ignorantia Facti Excusat).',
        'Mistake of Law: NOT a defense (Ignorantia Juris Non Excusat).',
        'Accident (S. 80): Act done without criminal intention.',
        'Infancy (S. 82): Child under 7 years (Doli Incapax - Incapable of crime).',
        'Private Defense (S. 96-106): Right to protect body and property.'
      ],
      statutes: [
        { section: 'Section 84', desc: 'Act of a person of unsound mind (McNaghten Rules).' },
        { section: 'Section 97', desc: 'Right of private defense of body and property.' }
      ]
    }
  },
  {
    id: 'la-7',
    title: 'Directive Principles (DPSP)',
    subject: Subject.LegalAptitude,
    readTime: '15m',
    difficulty: 'Easy',
    summary: 'Guidelines for the State. Non-justiciable but fundamental in governance.',
    content: {
      intro: 'Part IV (Art 36-51). Borrowed from Ireland. They aim to establish a Welfare State.',
      keyPoints: [
        'Socialist Principles: Art 39 (Equal pay), Art 41 (Right to work).',
        'Gandhian Principles: Art 40 (Village Panchayats), Art 44 (Uniform Civil Code).',
        'Liberal-Intellectual: Art 50 (Separation of Judiciary from Executive).'
      ],
      example: 'Article 44 (Uniform Civil Code) is a DPSP, meaning the state should try to implement it, but citizens cannot go to court demanding it immediately.'
    }
  },
  // --- GK ---
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
  {
    id: 'gk-3',
    title: 'International Organizations',
    subject: Subject.GK,
    readTime: '12m',
    difficulty: 'Medium',
    summary: 'UN, WTO, IMF, World Bank - HQs and purposes.',
    content: {
      intro: 'Knowledge of international bodies is crucial for the GK section.',
      keyPoints: [
        'United Nations (UN): HQ New York. Founded 1945.',
        'International Court of Justice (ICJ): HQ The Hague, Netherlands.',
        'UNESCO: HQ Paris, France.',
        'WTO (World Trade Org): HQ Geneva, Switzerland.',
        'IMF & World Bank: HQ Washington D.C. (Bretton Woods Twins).'
      ]
    }
  },
  {
    id: 'gk-4',
    title: 'Solar System Basics',
    subject: Subject.GK,
    readTime: '10m',
    difficulty: 'Easy',
    summary: 'Planets, Satellites, and Important Facts.',
    content: {
      intro: 'Our solar system consists of the Sun and 8 planets.',
      keyPoints: [
        'Mercury: Smallest, closest to Sun.',
        'Venus: Hottest planet, Morning/Evening Star.',
        'Mars: Red Planet (Iron Oxide).',
        'Jupiter: Largest planet.',
        'Saturn: Planet with rings.',
        'Ganymede: Largest satellite (Jupiter).',
        'Titan: Satellite of Saturn.'
      ]
    }
  },
  {
    id: 'gk-5',
    title: 'Indian Freedom Struggle (1915-1947)',
    subject: Subject.GK,
    readTime: '20m',
    difficulty: 'Hard',
    summary: 'Gandhian Era timeline.',
    content: {
      intro: 'The return of Mahatma Gandhi in 1915 marked the beginning of mass movements.',
      keyPoints: [
        '1917: Champaran Satyagraha (First Civil Disobedience).',
        '1919: Jallianwala Bagh Massacre.',
        '1920: Non-Cooperation Movement.',
        '1930: Dandi March (Salt Satyagraha).',
        '1942: Quit India Movement ("Do or Die").',
        '1947: Mountbatten Plan and Independence.'
      ]
    }
  },
  // --- LOGICAL REASONING ---
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
  {
    id: 'lr-2',
    title: 'Blood Relations',
    subject: Subject.LogicalReasoning,
    readTime: '15m',
    difficulty: 'Medium',
    summary: 'Solving family tree puzzles.',
    content: {
      intro: 'Identify relationships based on generations and gender.',
      keyPoints: [
        'Use (+) for Male and (-) for Female.',
        'Horizontal line (-) for siblings.',
        'Double line (=) for married couples.',
        'Vertical line (|) for generations.',
        'Paternal: Father\'s side. Maternal: Mother\'s side.'
      ],
      example: 'A is the brother of B. B is the daughter of C. Conclusion: A is the son of C.'
    }
  },
  {
    id: 'lr-3',
    title: 'Direction Sense',
    subject: Subject.LogicalReasoning,
    readTime: '12m',
    difficulty: 'Easy',
    summary: 'North, South, East, West navigation.',
    content: {
      intro: 'Always draw a compass reference before solving.',
      keyPoints: [
        'NEWS: North (Up), East (Right), West (Left), South (Down).',
        'Right Turn = Clockwise 90 degrees.',
        'Left Turn = Anti-clockwise 90 degrees.',
        'Shadows: At sunrise, shadow falls West. At sunset, shadow falls East.'
      ],
      example: 'A man walks 3km North, then 4km East. Shortest distance from start? Use Pythagoras: √(3² + 4²) = 5km.'
    }
  },
  // --- ENGLISH ---
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
        'Ultra Vires: Beyond powers.',
        'Locus Standi: Right to be heard in court.'
      ]
    }
  },
  {
    id: 'eng-2',
    title: 'Subject-Verb Agreement',
    subject: Subject.English,
    readTime: '15m',
    difficulty: 'Medium',
    summary: 'Rules for matching singular/plural subjects with verbs.',
    content: {
      intro: 'The verb must agree with the subject in number and person.',
      keyPoints: [
        'Rule 1: Two subjects joined by "and" take a plural verb. (Ram and Shyam are...)',
        'Rule 2: If joined by "or", "nor", "either...or", the verb agrees with the closer subject. (Neither the captain nor the players WERE playing).',
        'Rule 3: Collective nouns (Jury, Committee) take singular verb if acting as one unit.'
      ],
      example: 'Incorrect: The list of items are on the desk. Correct: The list of items IS on the desk (Subject is "List", not "Items").'
    }
  },
  // --- MATH ---
  {
    id: 'math-1',
    title: 'Percentage Hacks',
    subject: Subject.Math,
    readTime: '15m',
    difficulty: 'Medium',
    summary: 'Fraction to Percentage conversions for speed.',
    content: {
      intro: 'Memorizing fraction values saves huge time in DI and Arithmetic.',
      keyPoints: [
        '1/2 = 50%',
        '1/3 = 33.33%',
        '1/4 = 25%',
        '1/5 = 20%',
        '1/6 = 16.66%',
        '1/7 = 14.28%',
        '1/8 = 12.5%',
        '1/9 = 11.11%',
        '1/10 = 10%',
        '1/11 = 9.09%'
      ],
      example: 'What is 16.66% of 360? Instead of calculating, just divide 360 by 6 = 60.'
    }
  },
  {
    id: 'math-2',
    title: 'Profit and Loss',
    subject: Subject.Math,
    readTime: '15m',
    difficulty: 'Medium',
    summary: 'CP, SP, Profit%, Loss% formulas.',
    content: {
      intro: 'Fundamental concept for commercial maths.',
      keyPoints: [
        'Profit = SP - CP',
        'Loss = CP - SP',
        'Profit % = (Profit / CP) * 100',
        'Loss % = (Loss / CP) * 100',
        'Always calculate % on Cost Price (CP) unless specified.'
      ],
      example: 'A sells an item worth 100 at 20% profit. SP = 120. If he gives 10% discount on marked price (MP) of 150, SP = 135.'
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
  { id: 'r9', type: 'Fact', text: 'Article 32', subText: 'Dr. Ambedkar called it the "Heart and Soul" of the Constitution.', color: 'bg-gradient-to-br from-violet-500 to-purple-600' },
  { id: 'r10', type: 'Tip', text: 'Coding Decoding', subText: 'Remember EJOTY: E=5, J=10, O=15, T=20, Y=25 for alphabet positions.', color: 'bg-gradient-to-br from-orange-500 to-amber-600' },
  { id: 'r11', type: 'Case', text: 'Balfour v Balfour', subText: 'Domestic agreements are usually NOT legally binding contracts.', color: 'bg-gradient-to-br from-teal-500 to-green-600' },
  { id: 'r12', type: 'Maxim', text: 'Nemo Judex In Causa Sua', subText: 'No one should be a judge in their own cause (Rule against Bias).', color: 'bg-gradient-to-br from-rose-500 to-red-600' },
  { id: 'r13', type: 'Fact', text: 'Highest Law Officer', subText: 'Attorney General of India (Article 76).', color: 'bg-gradient-to-br from-blue-600 to-indigo-800' },
  { id: 'r14', type: 'Fact', text: 'Zero Hour', subText: 'Time gap between Question Hour and Agenda. Starts at 12 noon.', color: 'bg-gradient-to-br from-fuchsia-600 to-purple-800' },
  { id: 'r15', type: 'Tip', text: 'Square of 5', subText: 'Ends in 25. First digits = n*(n+1). Ex: 35^2 -> 3*4=12 -> 1225.', color: 'bg-gradient-to-br from-cyan-600 to-blue-800' }
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
      { q: 'Financial Emergency is under which Article?', options: ['Article 352', 'Article 356', 'Article 360', 'Article 370'], correct: 2, explanation: 'Art 360 deals with Financial Emergency. It has never been imposed in India.' },
      { q: 'Who is the Chairman of Rajya Sabha?', options: ['President', 'Vice President', 'PM', 'Speaker'], correct: 1, explanation: 'The Vice President is the ex-officio Chairman of the Rajya Sabha.' }
    ]
  },
  {
    id: 'q3',
    subject: Subject.LogicalReasoning,
    title: 'Coding-Decoding',
    questions: [
      { q: 'If CAT is written as DBU, how is DOG written?', options: ['EPH', 'EPF', 'FPH', 'EOG'], correct: 0, explanation: 'C+1=D, A+1=B, T+1=U. So D+1=E, O+1=P, G+1=H.' },
      { q: 'If RED is 27, what is BLUE?', options: ['40', '48', '36', '50'], correct: 0, explanation: 'R(18)+E(5)+D(4) = 27. B(2)+L(12)+U(21)+E(5) = 40.' },
      { q: 'Odd one out: 3, 5, 7, 9, 11', options: ['5', '7', '9', '11'], correct: 2, explanation: '9 is not a prime number (divisible by 3). Others are primes.' }
    ]
  },
  {
    id: 'q4',
    subject: Subject.English,
    title: 'Vocab Blast',
    questions: [
      { q: 'Synonym of "Benevolent"', options: ['Cruel', 'Kind', 'Rich', 'Poor'], correct: 1, explanation: 'Benevolent means well meaning and kindly.' },
      { q: 'Antonym of "Ambiguous"', options: ['Vague', 'Clear', 'Strange', 'Dark'], correct: 1, explanation: 'Ambiguous means unclear. Clear is the opposite.' }
    ]
  }
];

// --- ARCHIVE CONSTANTS ---
const YEARS = Array.from({length: 12}, (_, i) => 2025 - i); // 2025 to 2014
const ARCHIVE_TOPICS = ["Major Events", "Awards & Honours", "Sports", "Government Schemes", "International Relations", "Legal Developments"];

// --- COMPONENTS ---

const StudyHub = () => {
  const [course, setCourse] = useState<CourseType>('5-Year');
  const [activeTab, setActiveTab] = useState<ViewMode>('learn');
  const [activeSubject, setActiveSubject] = useState<Subject>(Subject.LegalAptitude);
  const [readTopic, setReadTopic] = useState<StudyTopic | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Reels State
  const reelsRef = useRef<HTMLDivElement>(null);
  
  // Quiz State
  const [activeQuiz, setActiveQuiz] = useState<StaticQuiz | null>(null);
  const [quizState, setQuizState] = useState<{idx: number, score: number, finished: boolean, selected: number | null}>({idx: 0, score: 0, finished: false, selected: null});

  // Flashcard State
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Archive State
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [archiveSearch, setArchiveSearch] = useState<string>('');
  const [archiveResult, setArchiveResult] = useState<SearchResult | null>(null);
  const [archiveLoading, setArchiveLoading] = useState(false);

  const availableSubjects = course === '5-Year' ? SUBJECTS_5YR : SUBJECTS_3YR;

  // Filter topics based on course and active subject
  const filteredTopics = STATIC_TOPICS
    .filter(t => t.subject === activeSubject)
    .filter(t => 
      searchTerm === '' || 
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.content.keyPoints.some(kp => kp.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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

  const handleArchiveSearch = async (topic: string) => {
    setArchiveLoading(true);
    setArchiveResult(null);
    setArchiveSearch(topic);
    
    // Simulate navigation/loading delay for effect then fetch
    const result = await fetchCurrentAffairs(selectedYear.toString(), topic);
    setArchiveResult(result);
    setArchiveLoading(false);
  };

  return (
    <div className="relative h-[calc(100vh-6rem)] md:h-full flex flex-col bg-white dark:bg-gray-900 overflow-hidden md:rounded-2xl shadow-xl md:border border-gray-200 dark:border-gray-800 transition-all duration-300">
      
      {/* --- TOP BAR: Course Selector --- */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 z-10">
        <div className="flex items-center gap-2">
           <div className="bg-indigo-600 p-1.5 rounded-lg">
             <GraduationCap className="w-5 h-5 text-white" />
           </div>
           <span className="font-bold text-gray-800 dark:text-white hidden sm:block">MHCET Hub</span>
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
             {/* Search Bar */}
             <div className="p-4 pb-2">
               <div className="flex gap-2">
                 <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search topics, summaries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-800 pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                 </div>
                 {/* Quick Bytes Access */}
                 <button 
                  onClick={() => setActiveTab('reels')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2"
                  title="Open Quick Bytes"
                 >
                   <PlayCircle className="w-5 h-5" />
                 </button>
               </div>
             </div>

             {/* Subject Tabs */}
             <div className="flex overflow-x-auto p-4 pt-2 gap-3 no-scrollbar border-b border-gray-50 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
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
             <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 custom-scrollbar">
               <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">{activeSubject}</h2>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{filteredTopics.length} Topics</span>
               </div>
               
               {filteredTopics.length === 0 ? (
                 <div className="text-center py-10 text-gray-400">
                   <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                   <p>{searchTerm ? 'No matches found.' : 'Content coming soon for this section.'}</p>
                 </div>
               ) : (
                 filteredTopics.map((topic) => (
                   <div 
                    key={topic.id}
                    onClick={() => setReadTopic(topic)}
                    className="group bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden hover:shadow-md"
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
                      
                      {topic.subject === Subject.LegalAptitude && (
                        <div className="pl-2 mb-3">
                           <button className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-lg flex items-center gap-2 font-semibold">
                              <Brain className="w-3 h-3" /> Explain Concept
                           </button>
                        </div>
                      )}

                      <div className="flex items-center gap-4 pl-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {topic.readTime}</span>
                        <span className="flex items-center gap-1 text-indigo-500 font-medium group-hover:translate-x-1 transition-transform">Read Now <ArrowRight className="w-3 h-3" /></span>
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
            <div className="flex-1 overflow-y-auto p-5 pb-24 custom-scrollbar">
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

                 {readTopic.content.statutes && (
                    <div className="my-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-500 mb-3">Important Sections</h4>
                        <div className="grid grid-cols-1 gap-2">
                        {readTopic.content.statutes.map((st, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                <span className="font-bold text-indigo-700 dark:text-indigo-300">{st.section}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{st.desc}</span>
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
               
               <div className="mt-12 flex justify-center gap-3">
                 <button onClick={() => setActiveTab('quiz')} className="flex items-center gap-2 bg-white text-indigo-600 border border-indigo-200 px-6 py-3 rounded-full font-bold shadow-sm hover:bg-gray-50">
                    <Zap className="w-5 h-5" /> Take Quiz
                 </button>
                 <button onClick={() => setReadTopic(null)} className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-transform active:scale-95">
                   <CheckCircle2 className="w-5 h-5" /> Done
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
            <div className="fixed top-4 left-4 z-20">
                <div className="bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                    Quick Bytes
                </div>
            </div>
            {REELS_DATA.map((reel) => (
              <div key={reel.id} className={`w-full h-full snap-start relative flex flex-col items-center justify-center p-8 text-center ${reel.color}`}>
                 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>
                 
                 <div className="relative z-10 max-w-md animate-in zoom-in duration-500">
                    <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest mb-6 border border-white/30 shadow-xl">
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
                 <div className="absolute right-4 bottom-24 flex flex-col gap-6 z-20">
                    <button className="flex flex-col items-center gap-1 text-white opacity-80 hover:opacity-100 transition-opacity">
                       <div className="p-3 bg-white/10 rounded-full backdrop-blur-md"><Star className="w-6 h-6" /></div>
                       <span className="text-[10px] font-bold">Save</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-white opacity-80 hover:opacity-100 transition-opacity">
                       <div className="p-3 bg-white/10 rounded-full backdrop-blur-md"><Share2 className="w-6 h-6" /></div>
                       <span className="text-[10px] font-bold">Share</span>
                    </button>
                 </div>
                 
                 <div className="absolute bottom-6 left-0 w-full text-center flex flex-col items-center gap-2">
                    <p className="text-white/40 text-xs animate-bounce">Swipe for more</p>
                 </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW: ARCHIVE (Current Affairs 2014-2025) */}
        {activeTab === 'archive' && (
          <div className="h-full flex flex-col animate-in fade-in bg-gray-50 dark:bg-gray-900">
             <div className="p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">GK Time Machine</h2>
                </div>
                {/* Year Selector */}
                <div className="flex overflow-x-auto gap-2 no-scrollbar pb-2">
                  {YEARS.map(year => (
                    <button
                      key={year}
                      onClick={() => { setSelectedYear(year); setArchiveResult(null); }}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                        selectedYear === year 
                        ? 'bg-indigo-600 text-white shadow-md scale-105' 
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-4 custom-scrollbar pb-24">
                {!archiveResult && !archiveLoading && (
                   <div className="grid grid-cols-2 gap-4">
                      {ARCHIVE_TOPICS.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => handleArchiveSearch(topic)}
                          className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:shadow-md transition-all group"
                        >
                           <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                              <Newspaper className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                           </div>
                           <span className="font-bold text-gray-700 dark:text-gray-200 text-center">{topic}</span>
                           <span className="text-xs text-gray-400 mt-1">{selectedYear}</span>
                        </button>
                      ))}
                   </div>
                )}

                {archiveLoading && (
                   <div className="flex flex-col items-center justify-center h-64 text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">Searching {selectedYear} Archives...</p>
                      <p className="text-xs text-gray-400 mt-2">Powered by Google Search Grounding</p>
                   </div>
                )}

                {archiveResult && (
                  <div className="space-y-6 animate-in slide-in-from-bottom duration-300">
                     <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                           <Calendar className="w-5 h-5 text-indigo-500" />
                           {archiveSearch} ({selectedYear})
                        </h3>
                        <button onClick={() => setArchiveResult(null)} className="text-sm text-indigo-600 hover:underline">Change Topic</button>
                     </div>

                     <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="whitespace-pre-wrap leading-relaxed">{archiveResult.text}</div>
                     </div>

                     {/* Source Cards */}
                     {archiveResult.sources && archiveResult.sources.length > 0 && (
                       <div className="mt-6">
                          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Verified Sources</h4>
                          <div className="grid gap-3">
                             {archiveResult.sources.slice(0, 3).map((source, idx) => (
                               <a 
                                 key={idx} 
                                 href={source.uri} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border border-blue-100 dark:border-blue-800 group"
                               >
                                  <div className="mt-1 bg-white dark:bg-gray-800 p-1.5 rounded-lg shadow-sm">
                                    <Globe className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                     <p className="font-bold text-sm text-blue-900 dark:text-blue-200 truncate group-hover:text-blue-700">{source.title}</p>
                                     <p className="text-xs text-blue-600/70 dark:text-blue-400 truncate">{source.uri}</p>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                               </a>
                             ))}
                          </div>
                       </div>
                     )}
                  </div>
                )}
             </div>
          </div>
        )}

        {/* VIEW: FLASHCARDS (Overhauled) */}
        {activeTab === 'cards' && (
           <div className="h-full flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 animate-in fade-in">
              <div className="flex items-center justify-between w-full max-w-md mb-4">
                 <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    Card {cardIndex + 1} of {FLASHCARDS_DATA.length}
                 </span>
                 <span className="text-xs font-bold bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded">
                    {FLASHCARDS_DATA[cardIndex].subject}
                 </span>
              </div>
              
              <div className="w-full max-w-md h-[400px] perspective-1000 relative group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                 <div className={`w-full h-full transition-all duration-500 preserve-3d relative ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                    
                    {/* Front: Question/Term */}
                    <div className="absolute inset-0 backface-hidden bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center p-8 text-center">
                       <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                          <HelpCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                       </div>
                       <h3 className="text-2xl font-bold text-gray-800 dark:text-white leading-tight">
                         {FLASHCARDS_DATA[cardIndex].question}
                       </h3>
                       <p className="absolute bottom-6 text-gray-400 text-xs flex items-center gap-2 animate-pulse">
                         <RotateCw className="w-3 h-3" /> Tap to reveal answer
                       </p>
                    </div>

                    {/* Back: Answer/Explanation */}
                    <div className="absolute inset-0 backface-hidden bg-indigo-600 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center text-white" style={{ transform: 'rotateY(180deg)' }}>
                       <div className="mb-4 p-3 bg-white/20 rounded-full backdrop-blur-sm">
                          <Lightbulb className="w-6 h-6 text-yellow-300" />
                       </div>
                       <h3 className="text-xl font-bold mb-4">
                         {FLASHCARDS_DATA[cardIndex].answer}
                       </h3>
                       {FLASHCARDS_DATA[cardIndex].detail && (
                         <p className="text-sm text-indigo-100 leading-relaxed border-t border-indigo-400 pt-4 mt-2">
                           {FLASHCARDS_DATA[cardIndex].detail}
                         </p>
                       )}
                    </div>
                 </div>
              </div>

              <div className="flex gap-6 mt-8">
                 <button 
                  onClick={() => { setIsFlipped(false); setTimeout(() => setCardIndex(prev => prev > 0 ? prev - 1 : FLASHCARDS_DATA.length - 1), 200) }} 
                  className="p-4 bg-white dark:bg-gray-700 rounded-full shadow-lg text-gray-600 dark:text-white hover:scale-110 transition-transform border border-gray-200 dark:border-gray-600"
                 >
                    <ChevronLeft className="w-6 h-6" />
                 </button>
                 <button 
                  onClick={() => { setIsFlipped(false); setTimeout(() => setCardIndex(prev => (prev + 1) % FLASHCARDS_DATA.length), 200) }} 
                  className="p-4 bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/30 text-white hover:scale-110 transition-transform"
                 >
                    <ChevronRight className="w-6 h-6" />
                 </button>
              </div>
           </div>
        )}

        {/* VIEW: QUIZ */}
        {activeTab === 'quiz' && (
          <div className="h-full flex flex-col p-4 animate-in fade-in custom-scrollbar overflow-y-auto pb-20">
             {!activeQuiz ? (
               <div className="grid gap-4 pb-20">
                 {QUIZZES.map(q => (
                   <button 
                    key={q.id}
                    onClick={() => setActiveQuiz(q)}
                    className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:border-indigo-500 transition-all text-left group"
                   >
                     <div className="flex items-center gap-4">
                        <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                          <Brain className="w-6 h-6" />
                        </div>
                        <div>
                           <h3 className="font-bold text-gray-800 dark:text-white text-lg">{q.title}</h3>
                           <p className="text-sm text-gray-500 dark:text-gray-400">{q.questions.length} Questions • {q.subject}</p>
                        </div>
                     </div>
                     <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                   </button>
                 ))}
                 
                 <div className="text-center mt-8 text-gray-400 text-sm">
                    More quizzes added weekly.
                 </div>
               </div>
             ) : activeQuiz && !quizState.finished ? (
                <div className="flex-1 flex flex-col max-w-xl mx-auto w-full">
                   <div className="flex justify-between items-center mb-8">
                      <button onClick={resetQuiz}><X className="w-6 h-6 text-gray-400" /></button>
                      <span className="font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full text-sm">
                        Question {quizState.idx + 1} / {activeQuiz.questions.length}
                      </span>
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
                     {quizState.idx === activeQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                   </button>
                </div>
             ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                   <Trophy className="w-24 h-24 text-yellow-400 mb-6 animate-bounce" />
                   <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Quiz Complete!</h2>
                   <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">You scored {quizState.score} out of {activeQuiz.questions.length}</p>
                   <div className="flex gap-4">
                     <button onClick={() => { setQuizState({idx: 0, score: 0, finished: false, selected: null}) }} className="bg-white text-indigo-600 border border-indigo-200 px-6 py-3 rounded-full font-bold shadow-sm">Retry</button>
                     <button onClick={resetQuiz} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">New Quiz</button>
                   </div>
                </div>
             )}
          </div>
        )}
      </div>

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-2 flex justify-between items-center z-30 safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
         {[
           { id: 'learn', label: 'Learn', icon: BookOpen },
           { id: 'archive', label: 'Archive', icon: Calendar },
           { id: 'reels', label: 'Reels', icon: Smartphone },
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