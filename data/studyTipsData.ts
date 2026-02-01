// Subject-wise Study Tips for MH CET Law Preparation
// Covers all 5 subjects with strategies, time management, and last-minute revision tips

export interface StudyTip {
  id: string;
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
}

export interface SubjectStrategy {
  id: string;
  subject: string;
  icon: string;
  color: string;
  weightage: number;
  totalQuestions: number;
  timeAllocation: number; // minutes recommended
  description: string;
  keyTopics: string[];
  tips: StudyTip[];
  dosDonts: {
    dos: string[];
    donts: string[];
  };
  resources: string[];
}

export const SUBJECT_STRATEGIES: SubjectStrategy[] = [
  {
    id: 'legal-reasoning',
    subject: 'Legal Reasoning & Legal Aptitude',
    icon: '⚖️',
    color: 'purple',
    weightage: 40,
    totalQuestions: 40,
    timeAllocation: 35,
    description: 'Tests your ability to apply legal principles to given facts. Most important section with highest weightage.',
    keyTopics: [
      'Law of Contracts (Offer, Acceptance, Consideration)',
      'Law of Torts (Negligence, Strict Liability, Vicarious)',
      'Indian Penal Code (Offences, Defences, Punishments)',
      'Constitutional Law (Fundamental Rights, DPSP)',
      'Family Law (Marriage, Divorce, Succession)',
      'Legal Maxims and Principles',
      'Legal Knowledge (Courts, Writs, PIL)'
    ],
    tips: [
      {
        id: 'lr-1',
        title: 'Master the Principle-Fact Pattern',
        content: 'Every legal reasoning question has a principle (legal rule) and facts (scenario). First, understand the principle completely before reading the facts. Identify key conditions in the principle.',
        priority: 'high'
      },
      {
        id: 'lr-2',
        title: 'Learn Legal Maxims with Examples',
        content: 'Memorize top 50 legal maxims with their meanings and applications. Examples: Audi alteram partem (hear both sides), Res ipsa loquitur (thing speaks for itself), Volenti non fit injuria (consent removes liability).',
        priority: 'high'
      },
      {
        id: 'lr-3',
        title: 'Practice Exception Spotting',
        content: 'Many legal principles have exceptions. Questions often test whether the exception applies. Always check if any exception to the general rule applies in the given facts.',
        priority: 'medium'
      },
      {
        id: 'lr-4',
        title: 'Focus on Contract & Tort Law',
        content: 'These two topics account for 50%+ questions. Master basics: valid contract elements, types of contracts, negligence, strict liability, defamation, nuisance.',
        priority: 'high'
      }
    ],
    dosDonts: {
      dos: [
        'Read the principle carefully before facts',
        'Identify key words in the principle (must, shall, may)',
        'Check if ALL conditions of the principle are satisfied',
        'Apply principle objectively without personal opinion',
        'Look for exceptions mentioned in the principle'
      ],
      donts: [
        'Don\'t assume facts not given in the question',
        'Don\'t apply real-world knowledge not in principle',
        'Don\'t get confused by similar-sounding options',
        'Don\'t spend more than 1 minute per question',
        'Don\'t skip this section - highest weightage!'
      ]
    },
    resources: [
      'CLAT Previous Year Papers (Legal Reasoning section)',
      'AP Bhardwaj Legal Reasoning book',
      'Bare acts of IPC, ICA (basic provisions only)',
      'Online passage-based legal reasoning practice'
    ]
  },
  {
    id: 'logical-reasoning',
    subject: 'Logical Reasoning',
    icon: '🧩',
    color: 'blue',
    weightage: 20,
    totalQuestions: 20,
    timeAllocation: 20,
    description: 'Tests analytical thinking, pattern recognition, and logical deduction abilities.',
    keyTopics: [
      'Syllogisms (All, Some, No, Only)',
      'Blood Relations',
      'Coding-Decoding',
      'Direction Sense',
      'Seating Arrangement (Linear & Circular)',
      'Puzzles',
      'Critical Reasoning (Strengthen, Weaken)',
      'Analogies and Classifications',
      'Series Completion'
    ],
    tips: [
      {
        id: 'log-1',
        title: 'Master Syllogisms with Venn Diagrams',
        content: 'Learn the standard Venn diagram method. Practice: All A are B → Some B are A (valid). No A is B → No B is A (valid). Remember: Some does not mean "only some".',
        priority: 'high'
      },
      {
        id: 'log-2',
        title: 'Blood Relations: Draw Family Tree',
        content: 'Always draw the family tree. Use symbols: + for male, - for female, = for marriage, | for child. Start from the fixed point and work outward.',
        priority: 'high'
      },
      {
        id: 'log-3',
        title: 'Seating: Create Templates',
        content: 'For linear arrangement, draw boxes. For circular, draw a circle with positions. Fill definite information first, then work with conditions.',
        priority: 'medium'
      },
      {
        id: 'log-4',
        title: 'Critical Reasoning Strategy',
        content: 'Identify conclusion first, then find the assumption. Strengthen means support the conclusion. Weaken means attack the assumption.',
        priority: 'medium'
      }
    ],
    dosDonts: {
      dos: [
        'Always draw diagrams for arrangements',
        'Eliminate impossible options systematically',
        'Practice regularly - logic improves with practice',
        'Time yourself - 1 minute per question maximum',
        'Check all conditions are satisfied'
      ],
      donts: [
        'Don\'t solve in your head - always write',
        'Don\'t assume gender from names',
        'Don\'t rush through complex arrangements',
        'Don\'t skip questions without trying',
        'Don\'t second-guess your logical deduction'
      ]
    },
    resources: [
      'RS Aggarwal Verbal & Non-Verbal Reasoning',
      'Previous year CLAT Logical Reasoning',
      'Online puzzle practice websites',
      'Analytical reasoning practice sets'
    ]
  },
  {
    id: 'english',
    subject: 'English Language',
    icon: '📚',
    color: 'cyan',
    weightage: 20,
    totalQuestions: 20,
    timeAllocation: 25,
    description: 'Tests reading comprehension, grammar, vocabulary, and language usage.',
    keyTopics: [
      'Reading Comprehension (RC)',
      'Para Jumbles',
      'Sentence Correction',
      'Fill in the Blanks',
      'Vocabulary (Synonyms, Antonyms)',
      'Idioms and Phrases',
      'One Word Substitution',
      'Error Spotting',
      'Cloze Test'
    ],
    tips: [
      {
        id: 'eng-1',
        title: 'RC Strategy: Read Questions First',
        content: 'Skim the questions before reading the passage. This helps you know what to look for. Focus on main idea, tone, and specific details asked.',
        priority: 'high'
      },
      {
        id: 'eng-2',
        title: 'Build Vocabulary Daily',
        content: 'Learn 10 new words daily with roots. Focus on legal vocabulary: plaintiff, defendant, jurisdiction, adjudication, etc. Use flashcards for revision.',
        priority: 'high'
      },
      {
        id: 'eng-3',
        title: 'Para Jumbles: Find Opening & Closing',
        content: 'Look for sentence with introduction (no pronoun reference). Find conclusion sentence. Link sentences with pronouns, articles (a→the), cause-effect.',
        priority: 'medium'
      },
      {
        id: 'eng-4',
        title: 'Grammar: Focus on Common Errors',
        content: 'Subject-verb agreement, tense consistency, article usage, prepositions, and pronoun-antecedent agreement are most tested.',
        priority: 'medium'
      }
    ],
    dosDonts: {
      dos: [
        'Read quality content daily (editorials, articles)',
        'Practice RC passages with timer',
        'Learn word roots for vocabulary building',
        'Review grammar rules systematically',
        'Practice para jumbles daily'
      ],
      donts: [
        'Don\'t spend too long on one RC passage',
        'Don\'t guess vocabulary - use context clues',
        'Don\'t ignore sentence correction practice',
        'Don\'t memorize without understanding',
        'Don\'t skip reading comprehension practice'
      ]
    },
    resources: [
      'Word Power Made Easy by Norman Lewis',
      'The Hindu Editorial for RC practice',
      'Wren & Martin English Grammar',
      'CLAT English section papers'
    ]
  },
  {
    id: 'mathematics',
    subject: 'Mathematics',
    icon: '🔢',
    color: 'amber',
    weightage: 10,
    totalQuestions: 10,
    timeAllocation: 12,
    description: 'Tests basic mathematical skills up to Class 10 level. Focus on accuracy over speed.',
    keyTopics: [
      'Percentage, Profit & Loss',
      'Simple & Compound Interest',
      'Ratio & Proportion',
      'Time & Work',
      'Time, Speed & Distance',
      'Average',
      'Number System',
      'Basic Geometry',
      'Data Interpretation'
    ],
    tips: [
      {
        id: 'math-1',
        title: 'Memorize Key Formulas',
        content: 'Know all formulas by heart. Focus on percentage shortcuts, SI/CI formulas, ratio tricks. Create a formula sheet and revise daily.',
        priority: 'high'
      },
      {
        id: 'math-2',
        title: 'Learn Calculation Shortcuts',
        content: 'Percentage to fraction conversions (12.5%=1/8, 16.67%=1/6). Multiplication tricks (×11, ×25, ×5). Square tricks (numbers ending in 5).',
        priority: 'high'
      },
      {
        id: 'math-3',
        title: 'Practice Mental Math',
        content: 'Most MH CET Math is solvable without extensive calculation. Practice approximation and elimination of wrong options.',
        priority: 'medium'
      },
      {
        id: 'math-4',
        title: 'Focus on High-Frequency Topics',
        content: 'Percentage, Profit/Loss, and SI/CI appear most frequently. Master these three topics for guaranteed marks.',
        priority: 'high'
      }
    ],
    dosDonts: {
      dos: [
        'Practice calculations without calculator',
        'Learn tables up to 20 and squares up to 30',
        'Use approximation for quick answers',
        'Check units in word problems',
        'Verify answer by back-calculation'
      ],
      donts: [
        'Don\'t panic if you see numbers',
        'Don\'t spend more than 1.5 min per question',
        'Don\'t attempt in sequence - pick easy ones first',
        'Don\'t ignore this section - easy marks!',
        'Don\'t do complex calculations when shortcuts exist'
      ]
    },
    resources: [
      'RS Aggarwal Quantitative Aptitude (selected chapters)',
      'Kiran SSC Mathematics',
      'CLAT Math section papers',
      'Online shortcut videos'
    ]
  },
  {
    id: 'gk-current',
    subject: 'General Knowledge & Current Affairs',
    icon: '🌍',
    color: 'green',
    weightage: 10,
    totalQuestions: 10,
    timeAllocation: 8,
    description: 'Tests awareness of current events and static GK including legal affairs.',
    keyTopics: [
      'Constitution of India',
      'Indian Polity & Governance',
      'Important Judgments',
      'Awards & Honours',
      'Sports Events',
      'National & International Affairs',
      'Science & Technology',
      'Important Days & Dates',
      'Legal News & Developments'
    ],
    tips: [
      {
        id: 'gk-1',
        title: 'Focus on Legal Current Affairs',
        content: 'Stay updated on Supreme Court judgments, new laws, legal appointments (CJI, judges), and legal news. These are specifically asked in law entrances.',
        priority: 'high'
      },
      {
        id: 'gk-2',
        title: 'Cover Last 6 Months Current Affairs',
        content: 'Questions are usually from 6 months before exam. Focus on: Government schemes, International summits, Awards, Sports events, Important appointments.',
        priority: 'high'
      },
      {
        id: 'gk-3',
        title: 'Master Static GK Basics',
        content: 'Constitutional basics: Fundamental Rights, DPSP, Emergency, Amendment procedure. Indian Polity: Parliament, Judiciary, Executive.',
        priority: 'medium'
      },
      {
        id: 'gk-4',
        title: 'Memorize Important Days',
        content: 'National and International days are frequently asked. Create a month-wise list and revise regularly. Know the theme for current year.',
        priority: 'medium'
      }
    ],
    dosDonts: {
      dos: [
        'Read newspaper daily (The Hindu/Indian Express)',
        'Follow monthly current affairs magazines',
        'Note down important appointments and awards',
        'Revise static GK weekly',
        'Focus on legal and constitutional news'
      ],
      donts: [
        'Don\'t try to cover everything - be selective',
        'Don\'t ignore static GK for current affairs',
        'Don\'t cram on exam day',
        'Don\'t neglect legal current affairs',
        'Don\'t spend too much time on obscure topics'
      ]
    },
    resources: [
      'Lucent\'s GK (selected topics)',
      'Monthly Current Affairs magazines (Pratiyogita Darpan)',
      'Legal Current Affairs compilations',
      'Laxmikanth Indian Polity (basics)'
    ]
  }
];

// Time Management Tips for Exam Day
export const EXAM_DAY_TIPS = [
  {
    id: 'time-1',
    title: 'Ideal Time Distribution',
    content: 'Legal Reasoning: 35 min | Logical Reasoning: 20 min | English: 25 min | Math: 12 min | GK: 8 min | Revision: 20 min'
  },
  {
    id: 'time-2',
    title: 'Section Order Strategy',
    content: 'Start with your strongest section for confidence. Attempt GK first if confident (quick marks). Keep Legal Reasoning for focused attention.'
  },
  {
    id: 'time-3',
    title: 'Skip and Return Strategy',
    content: 'If stuck for more than 1 minute, mark and move on. Return to skipped questions in the last 20 minutes. Never leave easy marks!'
  },
  {
    id: 'time-4',
    title: 'No Negative Marking Advantage',
    content: 'MH CET Law has NO negative marking! Attempt ALL questions. Make educated guesses - eliminate 2 options, pick from remaining.'
  },
  {
    id: 'time-5',
    title: 'Last 10 Minutes Protocol',
    content: 'Review marked questions. Ensure all questions attempted. Don\'t change answers unless sure. Trust your first instinct.'
  }
];

// Last Week Revision Strategy
export const LAST_WEEK_STRATEGY = [
  {
    day: 'Day 7 (Week Before)',
    tasks: ['Revise Legal Reasoning principles', 'Solve 1 full mock test', 'Review errors from previous mocks']
  },
  {
    day: 'Day 6',
    tasks: ['Focus on Logical Reasoning puzzles', 'Practice 20 RC passages', 'Revise math formulas']
  },
  {
    day: 'Day 5',
    tasks: ['Revise all legal maxims', 'Practice syllogisms', 'Read current affairs of last 3 months']
  },
  {
    day: 'Day 4',
    tasks: ['Solve another full mock', 'Analyze weak areas', 'Revise vocabulary flashcards']
  },
  {
    day: 'Day 3',
    tasks: ['Quick revision of all subjects', 'Practice quick calculations', 'Light study - no new topics']
  },
  {
    day: 'Day 2',
    tasks: ['Revise formula sheet', 'Review important dates & days', 'Early sleep - rest is important!']
  },
  {
    day: 'Day 1 (Exam Day)',
    tasks: ['Light revision only', 'Check admit card & documents', 'Reach center 1 hour early', 'Stay calm and confident!']
  }
];

export default SUBJECT_STRATEGIES;
