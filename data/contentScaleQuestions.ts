import { Subject } from '../types';
import type { MCQQuestion } from './mockTestQuestions';
import { CONTENT_SCALE_WAVE3_QUESTIONS } from './contentScaleWave3Questions';

export const CONTENT_SCALE_UP_QUESTIONS: MCQQuestion[] = [
  // Legal Aptitude (12)
  {
    id: 'csu-la-1',
    question: 'Which Article of the Constitution abolishes untouchability?',
    options: ['Article 14', 'Article 17', 'Article 19', 'Article 21'],
    correctAnswer: 1,
    explanation: 'Article 17 abolishes untouchability and forbids its practice in any form.',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'Fundamental Rights'
  },
  {
    id: 'csu-la-2',
    question: 'A contingent contract can be enforced when:',
    options: ['The contract is signed', 'The uncertain event happens', 'The promisor demands', 'A third party approves'],
    correctAnswer: 1,
    explanation: 'Under the Contract Act, contingent contracts are enforceable only upon occurrence of the uncertain event.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'Contract Law'
  },
  {
    id: 'csu-la-3',
    question: 'Battery in tort law primarily means:',
    options: ['Damage to property', 'Unauthorized physical contact', 'Mental stress alone', 'Economic loss only'],
    correctAnswer: 1,
    explanation: 'Battery is intentional and unauthorized application of force to another person.',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'Law of Torts'
  },
  {
    id: 'csu-la-4',
    question: 'Which is a constitutional remedy against unlawful detention?',
    options: ['Mandamus', 'Certiorari', 'Habeas Corpus', 'Quo Warranto'],
    correctAnswer: 2,
    explanation: 'Habeas Corpus is issued to produce a detained person before court and test legality of detention.',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'Writs'
  },
  {
    id: 'csu-la-5',
    question: 'Defamation requires publication of a statement to:',
    options: ['The plaintiff only', 'A third person', 'The police only', 'Court registry only'],
    correctAnswer: 1,
    explanation: 'Publication to at least one person other than the plaintiff is an essential element of defamation.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'Law of Torts'
  },
  {
    id: 'csu-la-6',
    question: 'Consideration in Indian contract law may move from:',
    options: ['Promisee only', 'Promisor only', 'Promisee or any other person', 'Only legal guardian'],
    correctAnswer: 2,
    explanation: 'In India, consideration may move from the promisee or any other person.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    topic: 'Contract Law'
  },
  {
    id: 'csu-la-7',
    question: 'Who can amend the Constitution under Article 368?',
    options: ['Supreme Court', 'Parliament', 'President alone', 'State High Courts'],
    correctAnswer: 1,
    explanation: 'Parliament exercises constituent power to amend the Constitution under Article 368.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'Constitutional Amendments'
  },
  {
    id: 'csu-la-8',
    question: 'In negligence, "duty of care" is tested by:',
    options: ['Reasonable person standard', 'Criminal intention test', 'Strict liability rule only', 'Contractual privity only'],
    correctAnswer: 0,
    explanation: 'Breach is judged against what a reasonable person would do in similar circumstances.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'Law of Torts'
  },
  {
    id: 'csu-la-9',
    question: 'A void contract is:',
    options: ['Enforceable against both parties', 'Valid till rescinded', 'Not enforceable by law', 'Always criminal'],
    correctAnswer: 2,
    explanation: 'A void agreement/contract is not enforceable by law.',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'Contract Law'
  },
  {
    id: 'csu-la-10',
    question: 'Article 226 empowers High Courts to issue writs for:',
    options: ['Only Fundamental Rights', 'Only civil disputes', 'Fundamental Rights and other purposes', 'Only criminal matters'],
    correctAnswer: 2,
    explanation: 'Article 226 has wider scope than Article 32; it covers FR and other legal rights.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    topic: 'Writs'
  },
  {
    id: 'csu-la-11',
    question: 'The age of majority in India for contract competency is generally:',
    options: ['16 years', '17 years', '18 years', '21 years'],
    correctAnswer: 2,
    explanation: 'Generally, a person attains majority at 18 years unless special legal circumstances apply.',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'Contract Law'
  },
  {
    id: 'csu-la-12',
    question: 'Which maxim supports strict liability in Rylands v Fletcher?',
    options: ['Actus non facit reum nisi mens sit rea', 'Sic utere tuo ut alienum non laedas', 'Audi alteram partem', 'Nemo judex in causa sua'],
    correctAnswer: 1,
    explanation: 'Use your property so as not to injure another is the core rationale behind strict liability.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    topic: 'Law of Torts'
  },

  // General Knowledge (12)
  {
    id: 'csu-gk-1',
    question: 'The headquarters of the Reserve Bank of India is in:',
    options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
    correctAnswer: 1,
    explanation: 'The RBI headquarters is located in Mumbai.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Economy'
  },
  {
    id: 'csu-gk-2',
    question: 'The term GDP refers to:',
    options: ['General Domestic Price', 'Gross Domestic Product', 'Gross Development Plan', 'Government Debt Position'],
    correctAnswer: 1,
    explanation: 'GDP is the total value of goods and services produced within a country in a period.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Economy Basics'
  },
  {
    id: 'csu-gk-3',
    question: 'Rajya Sabha is a:',
    options: ['Temporary house', 'Permanent house', 'Judicial body', 'Executive council'],
    correctAnswer: 1,
    explanation: 'Rajya Sabha is a permanent house and is not subject to dissolution.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Polity'
  },
  {
    id: 'csu-gk-4',
    question: 'The Tropic of Cancer passes through how many Indian states?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 2,
    explanation: 'The Tropic of Cancer passes through 8 Indian states.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Geography'
  },
  {
    id: 'csu-gk-5',
    question: 'NITI Aayog replaced:',
    options: ['Finance Commission', 'Planning Commission', 'Election Commission', 'UPSC'],
    correctAnswer: 1,
    explanation: 'NITI Aayog replaced the Planning Commission in 2015.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Polity'
  },
  {
    id: 'csu-gk-6',
    question: 'The longest river in India is:',
    options: ['Yamuna', 'Godavari', 'Ganga', 'Brahmaputra'],
    correctAnswer: 2,
    explanation: 'The Ganga is considered the longest river in India.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Geography'
  },
  {
    id: 'csu-gk-7',
    question: 'The Right to Information Act came into force in:',
    options: ['2002', '2005', '2008', '2010'],
    correctAnswer: 1,
    explanation: 'The RTI Act was enacted in 2005 and came into force the same year.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Current Affairs and Governance'
  },
  {
    id: 'csu-gk-8',
    question: 'ISRO stands for:',
    options: ['Indian Space Research Organisation', 'International Space Research Office', 'Indian Satellite Regulation Organisation', 'Inter-State Research Organization'],
    correctAnswer: 0,
    explanation: 'ISRO stands for Indian Space Research Organisation.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Science and Tech'
  },
  {
    id: 'csu-gk-9',
    question: 'The constitutional body that conducts elections in India is:',
    options: ['Election Commission of India', 'Law Commission', 'Finance Commission', 'Planning Board'],
    correctAnswer: 0,
    explanation: 'The Election Commission of India supervises and conducts elections.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Polity'
  },
  {
    id: 'csu-gk-10',
    question: 'The currency of Japan is:',
    options: ['Won', 'Yen', 'Ringgit', 'Baht'],
    correctAnswer: 1,
    explanation: 'Japan uses the Japanese Yen.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'World GK'
  },
  {
    id: 'csu-gk-11',
    question: 'Fiscal deficit means:',
    options: ['Total revenue minus expenditure', 'Total expenditure minus total receipts excluding borrowings', 'Import minus export', 'Debt minus assets'],
    correctAnswer: 1,
    explanation: 'Fiscal deficit is excess of total expenditure over total receipts excluding borrowings.',
    subject: Subject.GK,
    difficulty: 'hard',
    topic: 'Indian Economy'
  },
  {
    id: 'csu-gk-12',
    question: 'The largest planet in our solar system is:',
    options: ['Saturn', 'Earth', 'Jupiter', 'Mars'],
    correctAnswer: 2,
    explanation: 'Jupiter is the largest planet in the solar system.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Science and Tech'
  },

  // Logical Reasoning (12)
  {
    id: 'csu-lr-1',
    question: 'If all pens are books and some books are tables, which conclusion definitely follows?',
    options: ['Some pens are tables', 'All books are pens', 'Some tables are books', 'No pen is table'],
    correctAnswer: 2,
    explanation: 'From "some books are tables," conversion gives "some tables are books."',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Syllogism'
  },
  {
    id: 'csu-lr-2',
    question: 'Pointing to a man, A says: "He is the son of my father\'s only son." The man is A\'s:',
    options: ['Brother', 'Father', 'Son', 'Uncle'],
    correctAnswer: 2,
    explanation: 'A\'s father\'s only son is A. So the man is the son of A, i.e., A\'s son.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Blood Relations'
  },
  {
    id: 'csu-lr-3',
    question: 'Series: 2, 6, 12, 20, 30, ? ',
    options: ['40', '42', '44', '46'],
    correctAnswer: 1,
    explanation: 'Pattern is n(n+1): 1x2, 2x3, 3x4... next is 6x7 = 42.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Number Series'
  },
  {
    id: 'csu-lr-4',
    question: 'In code language, CAT is DBU. Then DOG is:',
    options: ['EPH', 'EPI', 'FPI', 'EOH'],
    correctAnswer: 0,
    explanation: 'Each letter shifts +1: D->E, O->P, G->H.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Coding-Decoding'
  },
  {
    id: 'csu-lr-5',
    question: 'If South-East becomes North, North-East becomes West and so on, East becomes:',
    options: ['South-West', 'North-West', 'South-East', 'North-East'],
    correctAnswer: 1,
    explanation: 'Based on rotational remapping in the given direction logic, East maps to North-West.',
    subject: Subject.LogicalReasoning,
    difficulty: 'hard',
    topic: 'Direction Sense'
  },
  {
    id: 'csu-lr-6',
    question: 'Find the odd one out: 3, 5, 11, 14, 17',
    options: ['3', '5', '11', '14'],
    correctAnswer: 3,
    explanation: '14 is the only non-prime number in the set.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Odd One Out'
  },
  {
    id: 'csu-lr-7',
    question: 'Clock shows 3:15. Angle between hour and minute hands is:',
    options: ['0 degree', '7.5 degree', '15 degree', '22.5 degree'],
    correctAnswer: 1,
    explanation: 'At 3:15, hour hand is at 97.5 degree and minute hand at 90 degree. Difference = 7.5 degree.',
    subject: Subject.LogicalReasoning,
    difficulty: 'hard',
    topic: 'Clock Reasoning'
  },
  {
    id: 'csu-lr-8',
    question: 'Statement: Some lawyers are writers. Conclusion: Some writers are lawyers.',
    options: ['Conclusion follows', 'Conclusion does not follow', 'Both follow and do not follow', 'Cannot be determined'],
    correctAnswer: 0,
    explanation: 'Particular affirmative propositions are convertible: some A are B implies some B are A.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Syllogism'
  },
  {
    id: 'csu-lr-9',
    question: 'A is older than B, B is older than C. Who is youngest?',
    options: ['A', 'B', 'C', 'Cannot say'],
    correctAnswer: 2,
    explanation: 'Given A > B > C in age, C is the youngest.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Ordering'
  },
  {
    id: 'csu-lr-10',
    question: 'If 5 cats catch 5 mice in 5 minutes, then 100 cats catch 100 mice in:',
    options: ['1 min', '5 min', '10 min', '100 min'],
    correctAnswer: 1,
    explanation: 'Each cat catches one mouse in 5 minutes, so 100 cats catch 100 mice in same 5 minutes.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Analytical Reasoning'
  },
  {
    id: 'csu-lr-11',
    question: 'Which pair has the same relationship as "Judge : Court"?',
    options: ['Teacher : School', 'Doctor : Hospital', 'Pilot : Cockpit', 'Captain : Team'],
    correctAnswer: 0,
    explanation: 'A judge works in a court; similarly, a teacher works in a school.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Analogy'
  },
  {
    id: 'csu-lr-12',
    question: 'Choose the next term: AZ, BY, CX, ?',
    options: ['DW', 'DV', 'DX', 'EW'],
    correctAnswer: 0,
    explanation: 'First letter increases, second decreases: A-Z, B-Y, C-X, D-W.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Letter Series'
  },

  // English (12)
  {
    id: 'csu-eng-1',
    question: 'Choose the correct sentence.',
    options: ['She do not like coffee.', 'She does not likes coffee.', 'She does not like coffee.', 'She not like coffee.'],
    correctAnswer: 2,
    explanation: 'With "does not", verb remains in base form: like.',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'Grammar'
  },
  {
    id: 'csu-eng-2',
    question: 'Synonym of "abundant" is:',
    options: ['Scarce', 'Plentiful', 'Tiny', 'Weak'],
    correctAnswer: 1,
    explanation: 'Abundant means available in large quantity, i.e., plentiful.',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'Vocabulary'
  },
  {
    id: 'csu-eng-3',
    question: 'Antonym of "optimistic" is:',
    options: ['Hopeful', 'Cheerful', 'Pessimistic', 'Positive'],
    correctAnswer: 2,
    explanation: 'Pessimistic is the opposite of optimistic.',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'Vocabulary'
  },
  {
    id: 'csu-eng-4',
    question: 'Choose the correct indirect speech: He said, "I am busy."',
    options: ['He said that he was busy.', 'He said that I am busy.', 'He says he was busy.', 'He told I was busy.'],
    correctAnswer: 0,
    explanation: 'Pronoun and tense shift appropriately in reported speech.',
    subject: Subject.English,
    difficulty: 'medium',
    topic: 'Grammar'
  },
  {
    id: 'csu-eng-5',
    question: 'Fill in the blank: Neither of the boys ___ present.',
    options: ['are', 'were', 'is', 'have'],
    correctAnswer: 2,
    explanation: 'Neither takes singular verb: is.',
    subject: Subject.English,
    difficulty: 'medium',
    topic: 'Grammar'
  },
  {
    id: 'csu-eng-6',
    question: 'Choose the correctly spelled word.',
    options: ['Accomodation', 'Accommodation', 'Acommodation', 'Accommadation'],
    correctAnswer: 1,
    explanation: 'Correct spelling is Accommodation.',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'Spelling'
  },
  {
    id: 'csu-eng-7',
    question: 'One who cannot read or write is called:',
    options: ['Literate', 'Illiterate', 'Scholar', 'Novice'],
    correctAnswer: 1,
    explanation: 'Illiterate means unable to read and write.',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'Vocabulary'
  },
  {
    id: 'csu-eng-8',
    question: 'Choose the correct preposition: She is good ___ mathematics.',
    options: ['at', 'in', 'on', 'for'],
    correctAnswer: 0,
    explanation: 'The correct collocation is good at.',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'Grammar'
  },
  {
    id: 'csu-eng-9',
    question: 'Identify the part with error: "He has been living here since five years."',
    options: ['He has been', 'living here', 'since five years', 'No error'],
    correctAnswer: 2,
    explanation: 'Use "for five years" for duration; "since" is for a point in time.',
    subject: Subject.English,
    difficulty: 'medium',
    topic: 'Error Spotting'
  },
  {
    id: 'csu-eng-10',
    question: 'Choose the best meaning of "meticulous".',
    options: ['Careless', 'Very careful and precise', 'Quick-tempered', 'Very noisy'],
    correctAnswer: 1,
    explanation: 'Meticulous means paying careful attention to detail.',
    subject: Subject.English,
    difficulty: 'medium',
    topic: 'Vocabulary'
  },
  {
    id: 'csu-eng-11',
    question: 'Choose the passive voice: "They completed the project."',
    options: ['The project has been completed by them.', 'The project was completed by them.', 'The project is completed by them.', 'The project had completed by them.'],
    correctAnswer: 1,
    explanation: 'Simple past active converts to simple past passive: was completed.',
    subject: Subject.English,
    difficulty: 'medium',
    topic: 'Grammar'
  },
  {
    id: 'csu-eng-12',
    question: 'Choose the correct connector: "He was tired, ___ he continued working."',
    options: ['because', 'but', 'so', 'therefore'],
    correctAnswer: 1,
    explanation: 'The sentence shows contrast, so "but" is the correct conjunction.',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'Grammar'
  },

  // Mathematics (12)
  {
    id: 'csu-math-1',
    question: 'If 25% of a number is 60, the number is:',
    options: ['120', '180', '240', '300'],
    correctAnswer: 2,
    explanation: 'Number = 60 / 0.25 = 240.',
    subject: Subject.Math,
    difficulty: 'easy',
    topic: 'Percentages'
  },
  {
    id: 'csu-math-2',
    question: 'The ratio 45:60 in simplest form is:',
    options: ['3:4', '4:5', '5:6', '9:12'],
    correctAnswer: 0,
    explanation: 'Divide both by 15: 45:60 = 3:4.',
    subject: Subject.Math,
    difficulty: 'easy',
    topic: 'Ratio and Proportion'
  },
  {
    id: 'csu-math-3',
    question: 'Simple interest on Rs. 2000 at 10% p.a. for 2 years is:',
    options: ['200', '300', '400', '500'],
    correctAnswer: 2,
    explanation: 'SI = (P x R x T)/100 = (2000 x 10 x 2)/100 = 400.',
    subject: Subject.Math,
    difficulty: 'easy',
    topic: 'Simple Interest'
  },
  {
    id: 'csu-math-4',
    question: 'Average of 12, 18, 24, 30 is:',
    options: ['18', '20', '21', '22'],
    correctAnswer: 2,
    explanation: 'Sum is 84, divide by 4 gives 21.',
    subject: Subject.Math,
    difficulty: 'easy',
    topic: 'Average'
  },
  {
    id: 'csu-math-5',
    question: 'A train covers 180 km in 3 hours. Speed is:',
    options: ['50 km/h', '55 km/h', '60 km/h', '65 km/h'],
    correctAnswer: 2,
    explanation: 'Speed = distance/time = 180/3 = 60 km/h.',
    subject: Subject.Math,
    difficulty: 'easy',
    topic: 'Speed and Distance'
  },
  {
    id: 'csu-math-6',
    question: 'If CP = 500 and SP = 575, profit percent is:',
    options: ['10%', '12%', '15%', '18%'],
    correctAnswer: 2,
    explanation: 'Profit = 75. Profit% = 75/500 x 100 = 15%.',
    subject: Subject.Math,
    difficulty: 'medium',
    topic: 'Profit and Loss'
  },
  {
    id: 'csu-math-7',
    question: 'A can finish a task in 10 days. A\'s one-day work is:',
    options: ['1/5', '1/8', '1/10', '1/12'],
    correctAnswer: 2,
    explanation: 'One-day work is reciprocal of total days = 1/10.',
    subject: Subject.Math,
    difficulty: 'easy',
    topic: 'Time and Work'
  },
  {
    id: 'csu-math-8',
    question: 'Compound interest on Rs. 1000 at 10% for 2 years is:',
    options: ['200', '210', '220', '230'],
    correctAnswer: 1,
    explanation: 'Amount = 1000 x 1.1^2 = 1210. CI = 210.',
    subject: Subject.Math,
    difficulty: 'medium',
    topic: 'Compound Interest'
  },
  {
    id: 'csu-math-9',
    question: 'If 3x + 5 = 20, x =',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: '3x = 15 so x = 5.',
    subject: Subject.Math,
    difficulty: 'easy',
    topic: 'Algebra'
  },
  {
    id: 'csu-math-10',
    question: 'Area of a rectangle with length 12 and breadth 7 is:',
    options: ['84', '78', '96', '72'],
    correctAnswer: 0,
    explanation: 'Area = length x breadth = 12 x 7 = 84.',
    subject: Subject.Math,
    difficulty: 'easy',
    topic: 'Mensuration'
  },
  {
    id: 'csu-math-11',
    question: 'A discount of 20% on Rs. 500 gives selling price:',
    options: ['350', '375', '400', '425'],
    correctAnswer: 2,
    explanation: 'Discount = 100, so selling price = 500 - 100 = 400.',
    subject: Subject.Math,
    difficulty: 'easy',
    topic: 'Percentages'
  },
  {
    id: 'csu-math-12',
    question: 'If 2 men can do a work in 12 days, 4 men can do it in:',
    options: ['3 days', '4 days', '6 days', '8 days'],
    correctAnswer: 2,
    explanation: 'Work is inversely proportional to men. Doubling men halves days: 12 to 6.',
    subject: Subject.Math,
    difficulty: 'medium',
    topic: 'Time and Work'
  },

  // Wave 2: High relevance set (40)
  // Legal Aptitude (8)
  {
    id: 'csu2-la-1',
    question: 'Principle: A person is liable for negligence when duty, breach, and damage are proved. Fact: A doctor omits basic sterilization and patient gets infection. Liability?',
    options: ['No liability due to profession', 'Liable because all negligence elements are present', 'Liable only if criminal case is filed', 'No liability without written contract'],
    correctAnswer: 1,
    explanation: 'Duty exists, omission is breach, and infection is damage linked to breach, so negligence liability arises.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    topic: 'Principle-Fact Negligence'
  },
  {
    id: 'csu2-la-2',
    question: 'In constitutional law, judicial review means power of courts to:',
    options: ['Appoint judges', 'Amend constitution', 'Examine validity of laws and executive actions', 'Conduct elections'],
    correctAnswer: 2,
    explanation: 'Judicial review allows courts to test constitutionality of legislative and executive actions.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'Constitutional Law'
  },
  {
    id: 'csu2-la-3',
    question: 'A threat to harm a person to obtain signature primarily affects which contract element?',
    options: ['Consideration', 'Capacity', 'Free consent', 'Lawful object'],
    correctAnswer: 2,
    explanation: 'Threat or coercion vitiates free consent under the Contract Act.',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'Contract Law'
  },
  {
    id: 'csu2-la-4',
    question: 'Which of the following is generally NOT a writ?',
    options: ['Mandamus', 'Certiorari', 'Injunction', 'Quo Warranto'],
    correctAnswer: 2,
    explanation: 'Injunction is an equitable remedy, not one of the five constitutional writs.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'Writs'
  },
  {
    id: 'csu2-la-5',
    question: 'Defamation per se in law generally means statement is:',
    options: ['True', 'Harmless opinion always', 'Inherently damaging to reputation', 'Valid if spoken privately'],
    correctAnswer: 2,
    explanation: 'Certain imputations are considered inherently harmful and actionable without detailed proof of special damage.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    topic: 'Law of Torts'
  },
  {
    id: 'csu2-la-6',
    question: 'Which right is directly enforceable through Article 32?',
    options: ['Legal rights in general', 'Fundamental Rights', 'Contractual rights only', 'Property disputes only'],
    correctAnswer: 1,
    explanation: 'Article 32 is specifically for enforcement of Fundamental Rights.',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'Fundamental Rights'
  },
  {
    id: 'csu2-la-7',
    question: 'In tort law, "injuria sine damnum" means:',
    options: ['Damage without legal injury', 'Legal injury without actual loss', 'No injury no action', 'Intent without act'],
    correctAnswer: 1,
    explanation: 'Violation of a legal right itself is actionable even if no actual monetary loss is shown.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    topic: 'Legal Maxims'
  },
  {
    id: 'csu2-la-8',
    question: 'An offer lapses when:',
    options: ['Accepted in time', 'Revoked before acceptance', 'Written on stamp paper', 'Made to public'],
    correctAnswer: 1,
    explanation: 'A valid revocation before acceptance terminates the offer.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'Contract Law'
  },

  // General Knowledge (8)
  {
    id: 'csu2-gk-1',
    question: 'The Finance Commission of India is constituted under which Article?',
    options: ['Article 263', 'Article 280', 'Article 356', 'Article 370'],
    correctAnswer: 1,
    explanation: 'Article 280 provides for constitution of the Finance Commission.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Indian Polity'
  },
  {
    id: 'csu2-gk-2',
    question: 'Repo rate is the rate at which RBI lends to:',
    options: ['Public directly', 'Commercial banks', 'State governments only', 'Foreign banks only'],
    correctAnswer: 1,
    explanation: 'Repo is the policy rate for RBI lending to commercial banks against securities.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Indian Economy'
  },
  {
    id: 'csu2-gk-3',
    question: 'Which schedule of the Constitution deals with official languages?',
    options: ['Seventh', 'Eighth', 'Ninth', 'Tenth'],
    correctAnswer: 1,
    explanation: 'The Eighth Schedule lists recognized official languages.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Indian Polity'
  },
  {
    id: 'csu2-gk-4',
    question: 'The longest day in the Northern Hemisphere occurs around:',
    options: ['21 March', '21 June', '23 September', '22 December'],
    correctAnswer: 1,
    explanation: 'Summer solstice in the Northern Hemisphere is around 21 June.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Geography'
  },
  {
    id: 'csu2-gk-5',
    question: 'The anti-defection law is in which schedule?',
    options: ['Eighth', 'Ninth', 'Tenth', 'Eleventh'],
    correctAnswer: 2,
    explanation: 'The Tenth Schedule contains anti-defection provisions.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Indian Polity'
  },
  {
    id: 'csu2-gk-6',
    question: 'Which body releases the CPI inflation data in India?',
    options: ['RBI', 'NSO (under MoSPI)', 'SEBI', 'NITI Aayog'],
    correctAnswer: 1,
    explanation: 'CPI data is published by NSO under the Ministry of Statistics and Programme Implementation.',
    subject: Subject.GK,
    difficulty: 'hard',
    topic: 'Current Affairs and Governance'
  },
  {
    id: 'csu2-gk-7',
    question: 'The Parliament can legislate on State List in national interest under:',
    options: ['Article 249', 'Article 123', 'Article 356 only', 'Article 368'],
    correctAnswer: 0,
    explanation: 'Article 249 permits Parliament to legislate on State List if Rajya Sabha passes a national interest resolution.',
    subject: Subject.GK,
    difficulty: 'hard',
    topic: 'Indian Polity'
  },
  {
    id: 'csu2-gk-8',
    question: 'The term "Blue Economy" is most related to:',
    options: ['Space sector', 'Ocean resources and sustainable marine growth', 'Cryptocurrency markets', 'Rural banking'],
    correctAnswer: 1,
    explanation: 'Blue Economy concerns sustainable use of ocean resources for economic growth and livelihoods.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Current Affairs and Governance'
  },

  // Logical Reasoning (8)
  {
    id: 'csu2-lr-1',
    question: 'Statement: All judges are lawyers. Some lawyers are teachers. Conclusion: Some judges are teachers.',
    options: ['Definitely true', 'Definitely false', 'Cannot be determined', 'Both true and false'],
    correctAnswer: 2,
    explanation: 'No direct overlap between judges and teachers is guaranteed.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Syllogism'
  },
  {
    id: 'csu2-lr-2',
    question: 'If 1st January is Monday, then 1st March of the same non-leap year is:',
    options: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
    correctAnswer: 1,
    explanation: 'Jan has 31 days and Feb has 28 days, total 59 days = 3 days forward. Monday -> Thursday.',
    subject: Subject.LogicalReasoning,
    difficulty: 'hard',
    topic: 'Calendar Reasoning'
  },
  {
    id: 'csu2-lr-3',
    question: 'A word is coded by reversing letters and adding 1 to each alphabet position. CAT becomes:',
    options: ['UBD', 'UBC', 'DBU', 'TCB'],
    correctAnswer: 0,
    explanation: 'CAT reversed is TAC; adding 1 yields UBD.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Coding-Decoding'
  },
  {
    id: 'csu2-lr-4',
    question: 'Find missing term: 4, 9, 19, 39, ?',
    options: ['69', '71', '79', '81'],
    correctAnswer: 2,
    explanation: 'Pattern x2+1: 4->9->19->39->79.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Number Series'
  },
  {
    id: 'csu2-lr-5',
    question: 'If A is south of B, C is east of A, and D is north of C, then D is in which direction from B?',
    options: ['East', 'South-East', 'North-East', 'South-West'],
    correctAnswer: 0,
    explanation: 'Coordinates show D ends directly east of B.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Direction Sense'
  },
  {
    id: 'csu2-lr-6',
    question: 'Which option is a strong argument: "Should civic education be mandatory in schools?"',
    options: ['No, because exams are already many', 'Yes, because informed citizens improve democracy', 'No, because not all become politicians', 'Yes, because schools need fewer subjects'],
    correctAnswer: 1,
    explanation: 'A strong argument is relevant and logically connected to the policy objective.',
    subject: Subject.LogicalReasoning,
    difficulty: 'hard',
    topic: 'Critical Reasoning'
  },
  {
    id: 'csu2-lr-7',
    question: 'Choose the odd pair: 2-4, 3-9, 4-16, 5-20',
    options: ['2-4', '3-9', '4-16', '5-20'],
    correctAnswer: 3,
    explanation: 'First three pairs are n-n^2; 5 should map to 25, not 20.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Odd One Out'
  },
  {
    id: 'csu2-lr-8',
    question: 'In a queue, P is 12th from front and 18th from back. Total persons are:',
    options: ['29', '30', '31', '32'],
    correctAnswer: 0,
    explanation: 'Total = 12 + 18 - 1 = 29.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Ordering'
  },

  // English (8)
  {
    id: 'csu2-eng-1',
    question: 'Choose the correctly punctuated sentence.',
    options: ['Lets eat, friends.', 'Let\'s eat friends.', 'Let\'s eat, friends.', 'Lets eat friends.'],
    correctAnswer: 2,
    explanation: 'Comma changes meaning; "Let\'s eat, friends." is correct.',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'Grammar'
  },
  {
    id: 'csu2-eng-2',
    question: 'Replace the underlined phrase: "He is senior than me."',
    options: ['senior to me', 'senior from me', 'senior over me', 'senior with me'],
    correctAnswer: 0,
    explanation: 'The correct usage is "senior to".',
    subject: Subject.English,
    difficulty: 'medium',
    topic: 'Error Spotting'
  },
  {
    id: 'csu2-eng-3',
    question: 'Choose the antonym of "transparent".',
    options: ['clear', 'opaque', 'honest', 'lucid'],
    correctAnswer: 1,
    explanation: 'Opaque is opposite to transparent.',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'Vocabulary'
  },
  {
    id: 'csu2-eng-4',
    question: 'Select the correct sentence in active voice for: "The law was amended by Parliament."',
    options: ['Parliament amends the law.', 'Parliament amended the law.', 'Parliament had amend the law.', 'Parliament has amending the law.'],
    correctAnswer: 1,
    explanation: 'Simple past passive converts to simple past active.',
    subject: Subject.English,
    difficulty: 'medium',
    topic: 'Grammar'
  },
  {
    id: 'csu2-eng-5',
    question: 'Choose the most appropriate connector: "The witness was credible; ___, the court accepted the testimony."',
    options: ['however', 'therefore', 'although', 'unless'],
    correctAnswer: 1,
    explanation: 'Second clause is consequence, so "therefore" fits.',
    subject: Subject.English,
    difficulty: 'medium',
    topic: 'Grammar'
  },
  {
    id: 'csu2-eng-6',
    question: 'One-word substitution: "A person who writes dictionaries"',
    options: ['Biographer', 'Lexicographer', 'Calligrapher', 'Cartographer'],
    correctAnswer: 1,
    explanation: 'A dictionary compiler is called a lexicographer.',
    subject: Subject.English,
    difficulty: 'hard',
    topic: 'Vocabulary'
  },
  {
    id: 'csu2-eng-7',
    question: 'Choose the correctly spelled word.',
    options: ['Jurisdiction', 'Jurisdication', 'Jurisdection', 'Juridiction'],
    correctAnswer: 0,
    explanation: 'Correct spelling is Jurisdiction.',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'Spelling'
  },
  {
    id: 'csu2-eng-8',
    question: 'Identify the grammatically correct sentence.',
    options: ['Each of the players have arrived.', 'Each of the players has arrived.', 'Each of players have arrived.', 'Each players has arrived.'],
    correctAnswer: 1,
    explanation: '"Each" is singular and takes singular verb "has".',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'Grammar'
  },

  // Mathematics (8)
  {
    id: 'csu2-math-1',
    question: 'A sum becomes Rs. 1200 at 10% simple interest in 2 years. Principal is:',
    options: ['Rs. 900', 'Rs. 950', 'Rs. 1000', 'Rs. 1100'],
    correctAnswer: 2,
    explanation: 'For simple interest at 10% for 2 years, amount = 1.2P. So P = 1200/1.2 = 1000.',
    subject: Subject.Math,
    difficulty: 'hard',
    topic: 'Simple Interest'
  },
  {
    id: 'csu2-math-2',
    question: 'If a price is increased by 20% and then decreased by 20%, net change is:',
    options: ['0%', '4% decrease', '4% increase', '2% decrease'],
    correctAnswer: 1,
    explanation: 'Successive change = a - b - ab/100 for +20 and -20 gives -4%.',
    subject: Subject.Math,
    difficulty: 'medium',
    topic: 'Percentages'
  },
  {
    id: 'csu2-math-3',
    question: 'A and B together do work in 6 days. A alone does it in 10 days. B alone does it in:',
    options: ['12 days', '15 days', '18 days', '20 days'],
    correctAnswer: 1,
    explanation: 'B\'s rate = 1/6 - 1/10 = 1/15, so B takes 15 days.',
    subject: Subject.Math,
    difficulty: 'medium',
    topic: 'Time and Work'
  },
  {
    id: 'csu2-math-4',
    question: 'A boat goes 30 km downstream in 3 hours. Downstream speed is:',
    options: ['8 km/h', '9 km/h', '10 km/h', '12 km/h'],
    correctAnswer: 2,
    explanation: 'Speed = distance/time = 30/3 = 10 km/h.',
    subject: Subject.Math,
    difficulty: 'easy',
    topic: 'Speed and Distance'
  },
  {
    id: 'csu2-math-5',
    question: 'The average of first 5 even natural numbers is:',
    options: ['5', '6', '7', '8'],
    correctAnswer: 1,
    explanation: 'Numbers: 2,4,6,8,10; sum 30, average 6.',
    subject: Subject.Math,
    difficulty: 'easy',
    topic: 'Average'
  },
  {
    id: 'csu2-math-6',
    question: 'If x:y = 3:5 and y:z = 10:7, then x:z =',
    options: ['3:7', '6:7', '15:7', '30:35'],
    correctAnswer: 1,
    explanation: 'From x:y=3:5 and y:z=10:7, make y common: x:y=6:10 so x:z=6:7.',
    subject: Subject.Math,
    difficulty: 'medium',
    topic: 'Ratio and Proportion'
  },
  {
    id: 'csu2-math-7',
    question: 'A shopkeeper marks an item 25% above cost and gives 10% discount. Profit % is:',
    options: ['10%', '12.5%', '15%', '17.5%'],
    correctAnswer: 1,
    explanation: 'SP factor = 1.25 x 0.9 = 1.125, so profit = 12.5%.',
    subject: Subject.Math,
    difficulty: 'hard',
    topic: 'Profit and Loss'
  },
  {
    id: 'csu2-math-8',
    question: 'Solve: 2x - 7 = 17',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2,
    explanation: '2x = 24 so x = 12.',
    subject: Subject.Math,
    difficulty: 'easy',
    topic: 'Algebra'
  },
  ...CONTENT_SCALE_WAVE3_QUESTIONS
];
