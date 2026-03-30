import { Subject } from '../types';

export interface Llb5Module {
  title: string;
  explanation: string;
  concepts: string[];
  mcqFocus: string[];
  tips: string[];
  practiceTopic: string;
  targetMcqs: number;
}

export interface Llb5SubjectBlueprint {
  subject: Subject;
  weightHint: string;
  overview: string;
  concepts: string[];
  tips: string[];
  defaultTopic: string;
  modules: Llb5Module[];
}

export const LLB5_SUBJECT_BLUEPRINTS: Llb5SubjectBlueprint[] = [
  {
    subject: Subject.LegalAptitude,
    weightHint: 'High-weight core section',
    overview: 'This section tests legal principles, legal reasoning, and the ability to apply principles to fact situations quickly.',
    concepts: ['Constitution basics', 'Law of Torts', 'Contracts', 'Criminal law basics', 'Legal maxims'],
    tips: ['Solve principle-fact questions daily', 'Memorize 2-3 maxims per day', 'Revise landmark case triggers'],
    defaultTopic: 'Indian Constitution',
    modules: [
      {
        title: 'Constitution & Fundamental Rights',
        explanation: 'Master constitutional framework, Preamble, FR-DPSP balance, and key amendment logic for legal MCQs.',
        concepts: ['Preamble keywords', 'Articles 12-35', 'Basic structure doctrine', 'Judicial review'],
        mcqFocus: ['Article-based direct questions', 'Case-law match questions', 'Principle-fact constitutional scenarios'],
        tips: ['Build article-wise flashcards', 'Map every right to 1 landmark case', 'Revise amendment chronology weekly'],
        practiceTopic: 'Indian Constitution',
        targetMcqs: 180
      },
      {
        title: 'Law of Torts & Liability',
        explanation: 'Focus on negligence, vicarious liability, strict/absolute liability and common defenses.',
        concepts: ['Negligence elements', 'Vicarious liability', 'Strict vs absolute liability', 'Defences in torts'],
        mcqFocus: ['Case-identification questions', 'Exception/defense elimination', 'Fact-based liability mapping'],
        tips: ['Use one-line case summaries', 'Compare doctrines in tables', 'Practice 20 scenario MCQs every alternate day'],
        practiceTopic: 'Law of Torts',
        targetMcqs: 150
      },
      {
        title: 'Contracts, Crimes & Legal Maxims',
        explanation: 'Build exam-ready command over offer/acceptance, capacity, general exceptions and legal maxims usage.',
        concepts: ['Essentials of valid contract', 'Void/voidable differences', 'IPC basic exceptions', 'Latin maxims'],
        mcqFocus: ['Contract validity checks', 'Criminal intent exceptions', 'Maxim-to-scenario mapping'],
        tips: ['Revise key sections by theme', 'Use maxim-of-the-day notebook', 'Do mixed legal sets in timed mode'],
        practiceTopic: 'Contract Law',
        targetMcqs: 170
      }
    ]
  },
  {
    subject: Subject.LogicalReasoning,
    weightHint: 'Speed + accuracy driver',
    overview: 'This section rewards clean logic, structured elimination, and timed puzzle handling under pressure.',
    concepts: ['Syllogisms', 'Direction Sense', 'Blood Relations', 'Coding-Decoding', 'Critical Reasoning'],
    tips: ['Use elimination-first method', 'Timebox puzzle branches', 'Track recurring trap patterns'],
    defaultTopic: 'Syllogisms',
    modules: [
      {
        title: 'Core Logic: Syllogism + Critical Reasoning',
        explanation: 'Train inference quality, assumptions, strengthen/weaken, and statement-conclusion accuracy.',
        concepts: ['Syllogism validity', 'Assumptions', 'Conclusions', 'Arguments and inferences'],
        mcqFocus: ['Conclusion validity checks', 'Assumption detection', 'Strengthen/weaken options'],
        tips: ['Use 100-50 and Venn combo method', 'Reject extreme options first', 'Do post-test error tagging'],
        practiceTopic: 'Syllogisms',
        targetMcqs: 180
      },
      {
        title: 'Arrangement, Direction & Relation Systems',
        explanation: 'Improve speed in arrangement layouts, direction tracking and relation trees.',
        concepts: ['Linear/circular arrangement', 'Direction-sense formulas', 'Blood relation trees'],
        mcqFocus: ['Position swaps', 'Distance-turn logic', 'Family-chain coding'],
        tips: ['Use fixed anchor points', 'Draw minimal diagrams', 'Avoid mental-only solving in hard sets'],
        practiceTopic: 'Direction Sense',
        targetMcqs: 140
      },
      {
        title: 'Coding-Decoding + Mixed Puzzle Drill',
        explanation: 'Build pattern spotting and sequencing confidence for medium-to-hard LR sets.',
        concepts: ['Alphabet coding', 'Number patterns', 'Symbol substitution', 'Constraint filtering'],
        mcqFocus: ['Pattern continuation', 'Mixed coding logic', '2-step puzzle elimination'],
        tips: ['Create pattern buckets', 'Practice with 60-90 second timers', 'Re-solve incorrect questions next day'],
        practiceTopic: 'Coding-Decoding',
        targetMcqs: 140
      }
    ]
  },
  {
    subject: Subject.GK,
    weightHint: 'Daily current affairs edge',
    overview: 'GK/CA needs consistent revision cycles: daily current affairs + periodic static consolidation.',
    concepts: ['Current Affairs', 'Polity', 'History', 'Geography', 'Economics basics'],
    tips: ['Maintain 1-page daily CA notes', 'Weekly revision by theme', 'Use factual flash-recall'],
    defaultTopic: 'Current Affairs',
    modules: [
      {
        title: 'Current Affairs Monthly Engine',
        explanation: 'Create monthly capsules and connect events with context, appointments, and legal significance.',
        concepts: ['National affairs', 'International events', 'Appointments', 'Awards', 'Important bills/policies'],
        mcqFocus: ['Month-event mapping', 'Person-position match', 'Policy-outcome quick checks'],
        tips: ['Use 5-5-5 daily format', 'Weekly Sunday revision', 'Mark repeatable exam facts'],
        practiceTopic: 'Current Affairs',
        targetMcqs: 220
      },
      {
        title: 'Static GK with Exam Relevance',
        explanation: 'Prioritize high-yield static domains that are repeatedly seen in CET patterns.',
        concepts: ['Indian polity', 'Modern history basics', 'Geography facts', 'Economy terms'],
        mcqFocus: ['Constitution bodies', 'History chronology', 'Geo-location mapping'],
        tips: ['Topic-wise one-page sheets', 'Use memory clusters', 'Mix static with CA tests'],
        practiceTopic: 'History',
        targetMcqs: 160
      },
      {
        title: 'Business/Economy + Legal Affairs GK',
        explanation: 'Blend economy basics and law-related developments for integrated entrance relevance.',
        concepts: ['Repo/reverse repo', 'Budget basics', 'Judicial/legal updates', 'Major committees'],
        mcqFocus: ['Economy terminology', 'Legal current events', 'Institution-role MCQs'],
        tips: ['Track RBI and budget highlights', 'Create legal-GK cross links', 'Do 15 mixed GK MCQs daily'],
        practiceTopic: 'Economics',
        targetMcqs: 140
      }
    ]
  },
  {
    subject: Subject.English,
    weightHint: 'Stable score booster',
    overview: 'English rewards consistency: comprehension method, grammar accuracy, and vocabulary in context.',
    concepts: ['Reading Comprehension', 'Vocabulary', 'Grammar spotting', 'Sentence correction', 'Idioms/Phrases'],
    tips: ['Do timed RC sets', 'Revise error logs', 'Use context-based vocab memory'],
    defaultTopic: 'Reading Comprehension',
    modules: [
      {
        title: 'Reading Comprehension Performance',
        explanation: 'Develop passage structure spotting and evidence-first answering under time limits.',
        concepts: ['Tone and theme', 'Inference', 'Fact vs opinion', 'Context-based meaning'],
        mcqFocus: ['Main idea', 'Inference accuracy', 'Author attitude questions'],
        tips: ['Preview-first strategy', 'Avoid extreme options', 'Annotate only trigger lines'],
        practiceTopic: 'Reading Comprehension',
        targetMcqs: 180
      },
      {
        title: 'Grammar and Sentence Correction',
        explanation: 'Build high-accuracy grammar handling for error spotting and correction sets.',
        concepts: ['Subject-verb agreement', 'Tenses', 'Modifiers', 'Parallelism', 'Prepositions'],
        mcqFocus: ['Error spotting', 'Sentence improvement', 'Fill-in grammar blanks'],
        tips: ['Maintain personal grammar error log', 'Revise 10 rules every week', 'Practice mixed correction sets'],
        practiceTopic: 'Grammar Spotting Errors',
        targetMcqs: 160
      },
      {
        title: 'Vocabulary, Usage, Idioms',
        explanation: 'Strengthen contextual vocabulary and common expression handling for quick marks.',
        concepts: ['Synonym-antonym', 'Idioms/phrases', 'Word usage', 'Contextual vocabulary'],
        mcqFocus: ['Word replacement', 'Phrase meaning', 'Context sentence fit'],
        tips: ['Use theme-based vocab lists', 'Daily 20-word revision cycle', 'Practice idioms in mini-quizzes'],
        practiceTopic: 'Vocabulary',
        targetMcqs: 140
      }
    ]
  },
  {
    subject: Subject.Math,
    weightHint: 'Basic maths (high ROI)',
    overview: 'For LLB5, maths is usually foundational: high return comes from formula speed and arithmetic discipline.',
    concepts: ['Arithmetic basics', 'Percentages', 'Ratio/Proportion', 'Profit-Loss', 'Simple Interest'],
    tips: ['Memorize multipliers', 'Practice no-calculator shortcuts', 'Finish easy quant first in mocks'],
    defaultTopic: 'Arithmetic',
    modules: [
      {
        title: 'Arithmetic Core Toolkit',
        explanation: 'Build speed in percentages, ratios, averages, and simplification logic.',
        concepts: ['Percent basics', 'Ratio conversion', 'Average', 'Unitary method'],
        mcqFocus: ['Percentage change', 'Ratio equivalence', 'Average-based direct questions'],
        tips: ['Use fraction-percent mappings', 'Solve with approximation first', 'Practice 25 short arithmetic MCQs daily'],
        practiceTopic: 'Arithmetic',
        targetMcqs: 120
      },
      {
        title: 'Commercial Maths Essentials',
        explanation: 'Master profit-loss-discount-interest formulas for quick accuracy in objective tests.',
        concepts: ['Profit/loss', 'Discount', 'Simple interest', 'Successive percentage'],
        mcqFocus: ['CP/SP/MP mapping', 'Net discount', 'Interest-time calculations'],
        tips: ['Memorize standard multipliers', 'Avoid long equations for easy cases', 'Solve previous mistakes twice'],
        practiceTopic: 'Commercial Maths',
        targetMcqs: 120
      },
      {
        title: 'Data Interpretation Basics',
        explanation: 'Handle table/chart interpretation with unit-awareness and estimation-based shortcuts.',
        concepts: ['Table reading', 'Percent share', 'Growth comparison', 'Approximation'],
        mcqFocus: ['DI ratio/percentage', 'Trend comparisons', 'Fast option elimination'],
        tips: ['Read units first', 'Solve direct questions first', 'Use approximation when options are far'],
        practiceTopic: 'Data Interpretation',
        targetMcqs: 100
      }
    ]
  }
];

export const getLlb5SubjectBlueprint = (subject: Subject): Llb5SubjectBlueprint => {
  return LLB5_SUBJECT_BLUEPRINTS.find((item) => item.subject === subject) || LLB5_SUBJECT_BLUEPRINTS[0];
};
