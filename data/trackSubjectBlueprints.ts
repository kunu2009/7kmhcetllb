import { CourseTrack, Subject } from '../types';
import { LLB5_SUBJECT_BLUEPRINTS, Llb5SubjectBlueprint } from './llb5SubjectBlueprint';

export type TrackSubjectBlueprint = Llb5SubjectBlueprint;

const LLB3_SUBJECT_BLUEPRINTS: TrackSubjectBlueprint[] = [
  {
    subject: Subject.LegalAptitude,
    weightHint: 'Core scoring section',
    overview: 'LLB 3-year legal aptitude focuses on principle-fact application, basic legal doctrines, and constitutional awareness.',
    concepts: ['Constitution', 'Torts', 'Contracts', 'Criminal law basics', 'Legal maxims'],
    tips: ['Practice principle-fact daily', 'Use case snapshots', 'Revise maxims with examples'],
    defaultTopic: 'Indian Constitution',
    modules: [
      {
        title: 'Constitution + Rights Framework',
        explanation: 'Build article-level confidence for direct and conceptual legal MCQs.',
        concepts: ['Preamble', 'Fundamental Rights', 'DPSP', 'Basic structure'],
        mcqFocus: ['Article recall', 'Case-law mapping', 'Application scenarios'],
        tips: ['Article cards', 'One-line case notes', 'Weekly constitutional revision'],
        practiceTopic: 'Indian Constitution',
        targetMcqs: 160
      },
      {
        title: 'Torts, Contracts, Criminal Basics',
        explanation: 'Cover high-frequency civil/criminal principles with scenario handling.',
        concepts: ['Negligence', 'Vicarious liability', 'Offer/acceptance', 'General exceptions'],
        mcqFocus: ['Doctrine identification', 'Exception questions', 'Fact-based legal outcomes'],
        tips: ['Doctrine comparison table', 'Contract essentials checklist', 'Timed legal mixed sets'],
        practiceTopic: 'Law of Torts',
        targetMcqs: 170
      }
    ]
  },
  {
    subject: Subject.GK,
    weightHint: 'High impact with consistency',
    overview: 'LLB 3-year GK combines current affairs and static topics with heavy repeat-value facts.',
    concepts: ['Current Affairs', 'Polity', 'History', 'Geography', 'Static GK'],
    tips: ['Daily 20-minute CA revision', 'Monthly capsule notes', 'Use quiz repetition cycles'],
    defaultTopic: 'Current Affairs',
    modules: [
      {
        title: 'Current Affairs Pipeline',
        explanation: 'Capture news-to-MCQ conversion with monthly revision rhythm.',
        concepts: ['National events', 'International affairs', 'Awards', 'Appointments'],
        mcqFocus: ['Date-event mapping', 'Person-role match', 'Policy/event recall'],
        tips: ['5 key headlines/day', 'Weekend recap', 'Flash revision before mocks'],
        practiceTopic: 'Current Affairs',
        targetMcqs: 180
      },
      {
        title: 'Static GK Anchors',
        explanation: 'Secure recurring static domains with condensed revision sheets.',
        concepts: ['Polity basics', 'Modern history', 'Indian geography', 'Institutions'],
        mcqFocus: ['Constitution bodies', 'Chronology', 'Map/location facts'],
        tips: ['One-page per topic', 'Color-code memory lists', 'Blend static with CA tests'],
        practiceTopic: 'History',
        targetMcqs: 140
      }
    ]
  },
  {
    subject: Subject.LogicalReasoning,
    weightHint: 'Speed multiplier',
    overview: 'Reasoning in LLB 3-year rewards structured elimination and fast puzzle frameworks.',
    concepts: ['Syllogisms', 'Critical reasoning', 'Coding-decoding', 'Blood relations', 'Direction sense'],
    tips: ['Solve by pattern buckets', 'Eliminate impossible options first', 'Practice timed LR blocks'],
    defaultTopic: 'Syllogisms',
    modules: [
      {
        title: 'Syllogism + Argument Logic',
        explanation: 'Strengthen inference quality and argument validity judgement.',
        concepts: ['Syllogism rules', 'Assumptions', 'Conclusions', 'Argument strength'],
        mcqFocus: ['Conclusion checks', 'Assumption detection', 'Inference quality'],
        tips: ['Venn + value approach', 'Reject extremes', 'Error-tag every wrong option'],
        practiceTopic: 'Syllogisms',
        targetMcqs: 150
      },
      {
        title: 'Arrangement + Direction + Relations',
        explanation: 'Use fixed templates to improve speed and reduce confusion errors.',
        concepts: ['Linear/circular arrangement', 'Direction tracking', 'Family tree logic'],
        mcqFocus: ['Placement scenarios', 'Distance-turn outcomes', 'Relation chain questions'],
        tips: ['Anchor first', 'Draw simple diagrams', 'Don’t mentally solve hard puzzles'],
        practiceTopic: 'Direction Sense',
        targetMcqs: 130
      }
    ]
  },
  {
    subject: Subject.English,
    weightHint: 'Reliable marks section',
    overview: 'English section can deliver stable marks through disciplined RC + grammar + vocabulary prep.',
    concepts: ['Reading Comprehension', 'Grammar', 'Vocabulary', 'Sentence correction', 'Idioms'],
    tips: ['Timed RC method', 'Grammar error notebook', 'Daily vocab in context'],
    defaultTopic: 'Reading Comprehension',
    modules: [
      {
        title: 'RC + Inference',
        explanation: 'Improve comprehension speed and evidence-based answering.',
        concepts: ['Main idea', 'Tone', 'Inference', 'Context clues'],
        mcqFocus: ['Passage evidence', 'Author intent', 'Safe inference choices'],
        tips: ['Preview then read', 'Avoid extreme options', 'Mark evidence lines'],
        practiceTopic: 'Reading Comprehension',
        targetMcqs: 150
      },
      {
        title: 'Grammar + Vocabulary Toolkit',
        explanation: 'Build correction accuracy and word-usage confidence.',
        concepts: ['SVA', 'Tense', 'Modifiers', 'Word usage', 'Idioms'],
        mcqFocus: ['Error spotting', 'Sentence improvement', 'Word replacement'],
        tips: ['Revise top grammar rules weekly', 'Use vocabulary clusters', 'Practice mixed sets'],
        practiceTopic: 'Grammar Spotting Errors',
        targetMcqs: 130
      }
    ]
  }
];

const BBA_BMS_SUBJECT_BLUEPRINTS: TrackSubjectBlueprint[] = [
  {
    subject: Subject.Math,
    weightHint: 'Core for cutoffs',
    overview: 'BBA/BMS quant performance depends on arithmetic speed and DI handling.',
    concepts: ['Arithmetic', 'Percentages', 'Ratio-Proportion', 'Profit-Loss', 'Data Interpretation'],
    tips: ['Memorize shortcuts', 'Practice option elimination', 'Use approximation smartly'],
    defaultTopic: 'Arithmetic',
    modules: [
      {
        title: 'Arithmetic Foundation',
        explanation: 'Build formula fluency and speed for direct quant questions.',
        concepts: ['Percentages', 'Ratios', 'Averages', 'Simple equations'],
        mcqFocus: ['Short arithmetic', 'Percentage change', 'Ratio simplification'],
        tips: ['Fraction-percent map', '60-second drills', 'Maintain formula sheet'],
        practiceTopic: 'Arithmetic',
        targetMcqs: 180
      },
      {
        title: 'Commercial Maths + DI',
        explanation: 'Secure scoring in business-style aptitude and chart questions.',
        concepts: ['Profit-loss', 'Discount', 'SI', 'Tables/charts'],
        mcqFocus: ['CP-SP conversion', 'Net discount', 'DI trend comparison'],
        tips: ['Read units first', 'Do direct DI first', 'Use approximation where possible'],
        practiceTopic: 'Data Interpretation',
        targetMcqs: 160
      }
    ]
  },
  {
    subject: Subject.LogicalReasoning,
    weightHint: 'High speed section',
    overview: 'BBA/BMS reasoning needs quick pattern recognition and decision logic.',
    concepts: ['Syllogisms', 'Critical reasoning', 'Arrangements', 'Coding-decoding'],
    tips: ['Template-based solving', 'Case splitting only when needed', 'Focus on option elimination'],
    defaultTopic: 'Critical Reasoning',
    modules: [
      {
        title: 'Critical Reasoning Core',
        explanation: 'Handle assumption/strengthen/weaken questions efficiently.',
        concepts: ['Assumption', 'Inference', 'Strengthen/weaken', 'Conclusion'],
        mcqFocus: ['Argument support', 'Hidden assumption', 'Alternative cause'],
        tips: ['Find conclusion first', 'Negation test', 'Avoid outside knowledge bias'],
        practiceTopic: 'Critical Reasoning',
        targetMcqs: 150
      },
      {
        title: 'Arrangement + Coding Mix',
        explanation: 'Build comfort in mixed puzzle and code logic questions.',
        concepts: ['Linear arrangement', 'Circular seating', 'Symbol coding'],
        mcqFocus: ['Position constraints', 'Pattern decoding', 'Case elimination'],
        tips: ['Anchor slots', 'Mark constraints cleanly', 'Separate each case'],
        practiceTopic: 'Coding-Decoding',
        targetMcqs: 130
      }
    ]
  },
  {
    subject: Subject.English,
    weightHint: 'Consistency booster',
    overview: 'English contributes predictable marks via comprehension and grammar precision.',
    concepts: ['Reading Comprehension', 'Vocabulary', 'Grammar', 'Sentence correction'],
    tips: ['Daily vocab cycle', 'Timed RC passages', 'Track grammar mistakes'],
    defaultTopic: 'Reading Comprehension',
    modules: [
      {
        title: 'Comprehension + Tone',
        explanation: 'Improve speed and accuracy for passage-based questions.',
        concepts: ['Main idea', 'Tone', 'Inference', 'Context meaning'],
        mcqFocus: ['Passage evidence', 'Author intent', 'Logical inference'],
        tips: ['Preview passage quickly', 'Use textual evidence', 'Skip then return on time pressure'],
        practiceTopic: 'Reading Comprehension',
        targetMcqs: 120
      },
      {
        title: 'Grammar + Usage',
        explanation: 'Build sentence-level correction confidence.',
        concepts: ['SVA', 'Tense', 'Prepositions', 'Word usage'],
        mcqFocus: ['Error spotting', 'Sentence improvement', 'Usage fit'],
        tips: ['Rule revision loops', 'Micro-tests daily', 'Review recurring errors'],
        practiceTopic: 'Grammar Spotting Errors',
        targetMcqs: 110
      }
    ]
  },
  {
    subject: Subject.GK,
    weightHint: 'Business awareness edge',
    overview: 'BBA/BMS GK should combine current affairs with economy/business context.',
    concepts: ['Current Affairs', 'Business GK', 'Economy basics', 'Static GK'],
    tips: ['Track RBI/Budget', 'Weekly business recap', 'Revise appointments and organizations'],
    defaultTopic: 'Economics',
    modules: [
      {
        title: 'Business Current Affairs',
        explanation: 'Capture business-relevant updates and market vocabulary.',
        concepts: ['RBI policies', 'Budget highlights', 'Company news', 'Market terms'],
        mcqFocus: ['Term definitions', 'Policy-outcome links', 'Current event recall'],
        tips: ['Maintain business CA journal', 'Use weekly quizzes', 'Tag recurring topics'],
        practiceTopic: 'Economics',
        targetMcqs: 130
      },
      {
        title: 'Static GK Essentials',
        explanation: 'Secure frequently repeated static areas quickly.',
        concepts: ['Institutions', 'Indian polity', 'History basics'],
        mcqFocus: ['Body-role match', 'Timeline questions', 'Static fact recall'],
        tips: ['One-page static sheets', 'Flash revision', 'Interleave static and CA'],
        practiceTopic: 'Static GK',
        targetMcqs: 100
      }
    ]
  }
];

const HOTEL_SUBJECT_BLUEPRINTS: TrackSubjectBlueprint[] = [
  {
    subject: Subject.English,
    weightHint: 'Primary differentiator',
    overview: 'Hotel management track prioritizes communication-ready English and practical comprehension.',
    concepts: ['Comprehension', 'Grammar', 'Vocabulary', 'Business communication'],
    tips: ['Practice concise writing', 'Daily reading', 'Use context-based vocabulary'],
    defaultTopic: 'Reading Comprehension',
    modules: [
      {
        title: 'Communication + Comprehension',
        explanation: 'Build applied English performance for service-oriented entrance patterns.',
        concepts: ['Tone', 'Clarity', 'Formal usage', 'Comprehension'],
        mcqFocus: ['Passage meaning', 'Sentence clarity', 'Word choice'],
        tips: ['Read and summarize daily', 'Avoid verbose options', 'Practice formal rewrites'],
        practiceTopic: 'Reading Comprehension',
        targetMcqs: 140
      },
      {
        title: 'Grammar + Vocabulary Precision',
        explanation: 'Improve grammatical correctness and fluency in objective format.',
        concepts: ['SVA', 'Tenses', 'Articles', 'Vocabulary in context'],
        mcqFocus: ['Error spotting', 'Fill-in usage', 'Word meaning'],
        tips: ['Track top 50 recurring errors', 'Revise with mini-tests', 'Use phrase banks'],
        practiceTopic: 'Grammar Spotting Errors',
        targetMcqs: 120
      }
    ]
  },
  {
    subject: Subject.GK,
    weightHint: 'Hospitality relevance',
    overview: 'HM GK combines tourism/hospitality awareness with current affairs coverage.',
    concepts: ['Tourism facts', 'Hospitality terms', 'Current affairs', 'Static GK'],
    tips: ['Cluster by state/festival', 'Track tourism news', 'Revise acronyms'],
    defaultTopic: 'Current Affairs',
    modules: [
      {
        title: 'Tourism & Hospitality Core',
        explanation: 'Target domain-specific GK often asked in HM patterns.',
        concepts: ['Tourism circuits', 'Hospitality metrics', 'Industry bodies'],
        mcqFocus: ['Term meaning', 'Body-HQ match', 'Hospitality fact recall'],
        tips: ['Maintain domain note bank', 'Practice short factual quizzes', 'Use mnemonic clusters'],
        practiceTopic: 'Current Affairs',
        targetMcqs: 130
      },
      {
        title: 'Current Affairs Layer',
        explanation: 'Blend national/international updates with sector awareness.',
        concepts: ['National events', 'International updates', 'Appointments'],
        mcqFocus: ['Date-event recall', 'Person-role match', 'Policy announcements'],
        tips: ['Daily 10 news notes', 'Weekly review', 'Test via mixed quizzes'],
        practiceTopic: 'Current Affairs',
        targetMcqs: 110
      }
    ]
  },
  {
    subject: Subject.LogicalReasoning,
    weightHint: 'Scoring with practice',
    overview: 'Logical reasoning supports HM cutoff with time-managed puzzle execution.',
    concepts: ['Arrangements', 'Coding-decoding', 'Direction sense', 'Critical reasoning'],
    tips: ['Template solving', 'Timebox attempts', 'Focus on accuracy first'],
    defaultTopic: 'Direction Sense',
    modules: [
      {
        title: 'Arrangement + Direction',
        explanation: 'Improve speed in spatial and seating logic questions.',
        concepts: ['Linear arrangement', 'Direction turns', 'Position logic'],
        mcqFocus: ['Placement questions', 'Distance-turn outcomes', 'Constraint handling'],
        tips: ['Anchor points', 'Clean rough work', 'Avoid over-branching'],
        practiceTopic: 'Direction Sense',
        targetMcqs: 120
      },
      {
        title: 'Coding + Critical Logic',
        explanation: 'Build pattern recognition and argument-based reasoning confidence.',
        concepts: ['Code patterns', 'Assumptions', 'Conclusions'],
        mcqFocus: ['Pattern decode', 'Inference validity', 'Argument strength'],
        tips: ['Pattern buckets', 'Eliminate extremes', 'Re-practice wrong attempts'],
        practiceTopic: 'Coding-Decoding',
        targetMcqs: 100
      }
    ]
  },
  {
    subject: Subject.Math,
    weightHint: 'Basic aptitude support',
    overview: 'Numerical ability in HM is largely basic arithmetic and percentage-oriented.',
    concepts: ['Arithmetic', 'Percentages', 'Ratios', 'Simple interest'],
    tips: ['Memorize quick formulas', 'Do short timed sets', 'Prioritize easy wins'],
    defaultTopic: 'Arithmetic',
    modules: [
      {
        title: 'Arithmetic Fundamentals',
        explanation: 'Strengthen baseline numeracy for routine aptitude questions.',
        concepts: ['Basic operations', 'Percentages', 'Ratios', 'Averages'],
        mcqFocus: ['Direct calculations', 'Percentage conversion', 'Ratio simplification'],
        tips: ['Use mental math techniques', 'Daily 20-question drill', 'Track speed'],
        practiceTopic: 'Arithmetic',
        targetMcqs: 100
      },
      {
        title: 'Commercial Basics',
        explanation: 'Cover simple commercial math for exam confidence.',
        concepts: ['Profit-loss', 'Discount', 'Simple interest'],
        mcqFocus: ['SP-CP mapping', 'Net discount', 'Interest value'],
        tips: ['Formula flashcards', 'Unit checks', 'Solve without long equations'],
        practiceTopic: 'Commercial Maths',
        targetMcqs: 90
      }
    ]
  }
];

const OTHER_SUBJECT_BLUEPRINTS: TrackSubjectBlueprint[] = [
  ...BBA_BMS_SUBJECT_BLUEPRINTS
];

const TRACK_BLUEPRINT_MAP: Record<CourseTrack, TrackSubjectBlueprint[]> = {
  [CourseTrack.LLB3]: LLB3_SUBJECT_BLUEPRINTS,
  [CourseTrack.LLB5]: LLB5_SUBJECT_BLUEPRINTS,
  [CourseTrack.BBA_BMS]: BBA_BMS_SUBJECT_BLUEPRINTS,
  [CourseTrack.HOTEL_MGMT]: HOTEL_SUBJECT_BLUEPRINTS,
  [CourseTrack.OTHER]: OTHER_SUBJECT_BLUEPRINTS
};

export const getTrackSubjectBlueprints = (track: CourseTrack): TrackSubjectBlueprint[] => {
  return TRACK_BLUEPRINT_MAP[track] || TRACK_BLUEPRINT_MAP[CourseTrack.LLB3];
};

export const getTrackSubjectBlueprintBySubject = (
  track: CourseTrack,
  subject: Subject
): TrackSubjectBlueprint => {
  const trackBlueprints = getTrackSubjectBlueprints(track);
  return trackBlueprints.find((item) => item.subject === subject) || trackBlueprints[0];
};
