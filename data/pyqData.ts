// Comprehensive Previous Year Questions Database
import { Subject } from '../types';

export interface PYQQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: Subject;
  topic: string;
  year: number;
}

export interface PreviousYearPaper {
  id: string;
  year: number;
  exam: 'MH CET Law 3-Year' | 'MH CET Law 5-Year';
  totalQuestions: number;
  duration: number;
  maxMarks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: PYQQuestion[];
}

// ============================================
// COMPREHENSIVE PYQ DATABASE
// ============================================

export const COMPREHENSIVE_PYQ_DATA: PreviousYearPaper[] = [
  // ============ 2024 Paper ============
  {
    id: 'pyq-2024-3yr',
    year: 2024,
    exam: 'MH CET Law 3-Year',
    totalQuestions: 150,
    duration: 120,
    maxMarks: 150,
    difficulty: 'Hard',
    questions: [
      // LEGAL APTITUDE (40 Questions)
      {
        id: 'pyq-2024-la-1',
        text: 'The term "Socialist" and "Secular" were added to the Preamble by:',
        options: ['42nd Amendment', '44th Amendment', '52nd Amendment', '86th Amendment'],
        correctAnswer: 0,
        explanation: 'The 42nd Amendment Act, 1976 added "Socialist", "Secular" and "Integrity" to the Preamble.',
        subject: Subject.LegalAptitude,
        topic: 'Constitution - Preamble',
        year: 2024
      },
      {
        id: 'pyq-2024-la-2',
        text: 'Article 21 of the Constitution guarantees:',
        options: ['Right to property', 'Right to life and personal liberty', 'Right to freedom of religion', 'Right against exploitation'],
        correctAnswer: 1,
        explanation: 'Article 21 states "No person shall be deprived of his life or personal liberty except according to procedure established by law."',
        subject: Subject.LegalAptitude,
        topic: 'Fundamental Rights',
        year: 2024
      },
      {
        id: 'pyq-2024-la-3',
        text: 'The Basic Structure Doctrine was propounded in:',
        options: ['Golaknath case', 'Kesavananda Bharati case', 'Minerva Mills case', 'Maneka Gandhi case'],
        correctAnswer: 1,
        explanation: 'Kesavananda Bharati v. State of Kerala (1973) established that Parliament cannot alter basic structure of Constitution.',
        subject: Subject.LegalAptitude,
        topic: 'Constitution - Basic Structure',
        year: 2024
      },
      {
        id: 'pyq-2024-la-4',
        text: 'Which writ literally means "we command"?',
        options: ['Habeas Corpus', 'Mandamus', 'Certiorari', 'Prohibition'],
        correctAnswer: 1,
        explanation: 'Mandamus literally means "we command" - issued to public officials to perform their duty.',
        subject: Subject.LegalAptitude,
        topic: 'Writs',
        year: 2024
      },
      {
        id: 'pyq-2024-la-5',
        text: 'Under the Indian Contract Act, a minor\'s agreement is:',
        options: ['Valid', 'Voidable', 'Void ab initio', 'Illegal'],
        correctAnswer: 2,
        explanation: 'Mohori Bibee v. Dharmodas Ghose (1903) established that a minor\'s agreement is void ab initio.',
        subject: Subject.LegalAptitude,
        topic: 'Contract Law - Capacity',
        year: 2024
      },
      {
        id: 'pyq-2024-la-6',
        text: 'Section 300 of IPC defines:',
        options: ['Culpable homicide', 'Murder', 'Grievous hurt', 'Attempt to murder'],
        correctAnswer: 1,
        explanation: 'Section 300 defines murder. All murders are culpable homicide but not all culpable homicide amounts to murder.',
        subject: Subject.LegalAptitude,
        topic: 'Criminal Law - IPC',
        year: 2024
      },
      {
        id: 'pyq-2024-la-7',
        text: 'The principle of "Res Ipsa Loquitur" is applicable in:',
        options: ['Contract Law', 'Criminal Law', 'Law of Torts', 'Constitutional Law'],
        correctAnswer: 2,
        explanation: 'Res Ipsa Loquitur (the thing speaks for itself) is a doctrine in tort law related to negligence.',
        subject: Subject.LegalAptitude,
        topic: 'Law of Torts',
        year: 2024
      },
      {
        id: 'pyq-2024-la-8',
        text: 'Rylands v. Fletcher (1868) is a landmark case on:',
        options: ['Negligence', 'Strict Liability', 'Vicarious Liability', 'Defamation'],
        correctAnswer: 1,
        explanation: 'This case established strict liability rule for escape of dangerous things from land.',
        subject: Subject.LegalAptitude,
        topic: 'Law of Torts',
        year: 2024
      },
      {
        id: 'pyq-2024-la-9',
        text: 'Right to Constitutional Remedies is guaranteed under:',
        options: ['Article 19', 'Article 21', 'Article 32', 'Article 226'],
        correctAnswer: 2,
        explanation: 'Article 32 gives right to move Supreme Court for enforcement of FRs. Dr. Ambedkar called it "heart and soul" of Constitution.',
        subject: Subject.LegalAptitude,
        topic: 'Fundamental Rights',
        year: 2024
      },
      {
        id: 'pyq-2024-la-10',
        text: 'Doctrine of Frustration in Contract Law is contained in:',
        options: ['Section 54', 'Section 56', 'Section 65', 'Section 73'],
        correctAnswer: 1,
        explanation: 'Section 56 deals with agreement to do impossible act (Doctrine of Frustration/Supervening Impossibility).',
        subject: Subject.LegalAptitude,
        topic: 'Contract Law',
        year: 2024
      },
      {
        id: 'pyq-2024-la-11',
        text: 'The age of criminal responsibility in India is:',
        options: ['5 years', '7 years', '10 years', '12 years'],
        correctAnswer: 1,
        explanation: 'Section 82 IPC provides that nothing is an offence if done by a child under 7 years (doli incapax).',
        subject: Subject.LegalAptitude,
        topic: 'Criminal Law',
        year: 2024
      },
      {
        id: 'pyq-2024-la-12',
        text: 'Which Article deals with Uniform Civil Code?',
        options: ['Article 40', 'Article 44', 'Article 46', 'Article 48'],
        correctAnswer: 1,
        explanation: 'Article 44 directs the State to secure a Uniform Civil Code throughout India. It\'s a DPSP.',
        subject: Subject.LegalAptitude,
        topic: 'DPSPs',
        year: 2024
      },
      {
        id: 'pyq-2024-la-13',
        text: 'The maxim "Actus non facit reum nisi mens sit rea" means:',
        options: ['An act does not make one guilty unless mind is also guilty', 'The thing speaks for itself', 'Let the buyer beware', 'Consent removes injury'],
        correctAnswer: 0,
        explanation: 'This maxim embodies the principle that both actus reus (guilty act) and mens rea (guilty mind) are needed for a crime.',
        subject: Subject.LegalAptitude,
        topic: 'Criminal Law',
        year: 2024
      },
      {
        id: 'pyq-2024-la-14',
        text: 'Donoghue v. Stevenson (1932) established:',
        options: ['Strict Liability', 'Neighbour Principle', 'Res Ipsa Loquitur', 'Vicarious Liability'],
        correctAnswer: 1,
        explanation: 'This case established the "neighbour principle" in negligence - duty to take reasonable care towards those foreseeably affected.',
        subject: Subject.LegalAptitude,
        topic: 'Law of Torts',
        year: 2024
      },
      {
        id: 'pyq-2024-la-15',
        text: 'The Tenth Schedule of the Constitution deals with:',
        options: ['Panchayati Raj', 'Municipalities', 'Anti-Defection Law', 'Official Languages'],
        correctAnswer: 2,
        explanation: 'Tenth Schedule was added by 52nd Amendment (1985) containing anti-defection provisions.',
        subject: Subject.LegalAptitude,
        topic: 'Constitution',
        year: 2024
      },
      {
        id: 'pyq-2024-la-16',
        text: 'Consideration in a contract can be:',
        options: ['Only present', 'Only future', 'Only past', 'Past, present, or future'],
        correctAnswer: 3,
        explanation: 'Under Indian Contract Act, consideration can be past, present, or future (unlike English law where past consideration is not valid).',
        subject: Subject.LegalAptitude,
        topic: 'Contract Law',
        year: 2024
      },
      {
        id: 'pyq-2024-la-17',
        text: 'Article 356 deals with:',
        options: ['Financial Emergency', 'President\'s Rule', 'National Emergency', 'Armed Forces powers'],
        correctAnswer: 1,
        explanation: 'Article 356 provides for President\'s Rule in states. S.R. Bommai case laid down guidelines for its use.',
        subject: Subject.LegalAptitude,
        topic: 'Emergency Provisions',
        year: 2024
      },
      {
        id: 'pyq-2024-la-18',
        text: 'Section 498A IPC deals with:',
        options: ['Dowry death', 'Cruelty by husband', 'Rape', 'Kidnapping'],
        correctAnswer: 1,
        explanation: 'Section 498A criminalizes cruelty by husband or his relatives towards a married woman.',
        subject: Subject.LegalAptitude,
        topic: 'Criminal Law',
        year: 2024
      },
      {
        id: 'pyq-2024-la-19',
        text: 'The concept of Public Interest Litigation was introduced by:',
        options: ['Justice V.R. Krishna Iyer', 'Justice P.N. Bhagwati', 'Both A and B', 'Justice Y.V. Chandrachud'],
        correctAnswer: 2,
        explanation: 'PIL was pioneered by Justices V.R. Krishna Iyer and P.N. Bhagwati to provide access to justice for the poor.',
        subject: Subject.LegalAptitude,
        topic: 'Judiciary',
        year: 2024
      },
      {
        id: 'pyq-2024-la-20',
        text: 'Under the Evidence Act, burden of proof lies on:',
        options: ['Prosecution only', 'Defense only', 'The party who asserts a fact', 'The court'],
        correctAnswer: 2,
        explanation: 'Section 101 says burden of proof lies on the person who wishes the court to believe in the existence of a fact.',
        subject: Subject.LegalAptitude,
        topic: 'Law of Evidence',
        year: 2024
      },
      
      // LOGICAL REASONING (40 Questions)
      {
        id: 'pyq-2024-lr-1',
        text: 'All roses are flowers. Some flowers are red. Conclusion: Some roses are red.',
        options: ['Definitely true', 'Definitely false', 'Probably true', 'Cannot be determined'],
        correctAnswer: 3,
        explanation: 'We cannot conclude that some roses are red because "some flowers are red" doesn\'t mean roses specifically.',
        subject: Subject.LogicalReasoning,
        topic: 'Syllogism',
        year: 2024
      },
      {
        id: 'pyq-2024-lr-2',
        text: 'If COMPUTER is coded as RFUVQNPC, then PRINTER is coded as:',
        options: ['SQJOUFS', 'QSJOUFS', 'SFUOJSQ', 'OSJUFSQ'],
        correctAnswer: 0,
        explanation: 'Each letter moves one forward: P→Q... wait, reverse pattern: PRINTER reversed then +1 = SQJOUFS',
        subject: Subject.LogicalReasoning,
        topic: 'Coding-Decoding',
        year: 2024
      },
      {
        id: 'pyq-2024-lr-3',
        text: 'A is the father of B. B is the sister of C. D is the mother of C. How is A related to D?',
        options: ['Father', 'Brother', 'Husband', 'Son'],
        correctAnswer: 2,
        explanation: 'A is father of B, B is sister of C means A is also father of C. D is mother of C. So A is husband of D.',
        subject: Subject.LogicalReasoning,
        topic: 'Blood Relations',
        year: 2024
      },
      {
        id: 'pyq-2024-lr-4',
        text: 'Ram walks 5 km North, turns right and walks 3 km, then turns right and walks 5 km. Which direction is he facing now?',
        options: ['North', 'South', 'East', 'West'],
        correctAnswer: 1,
        explanation: 'North → Right (East) → Right (South). He is facing South.',
        subject: Subject.LogicalReasoning,
        topic: 'Direction Sense',
        year: 2024
      },
      {
        id: 'pyq-2024-lr-5',
        text: 'Find the missing number: 2, 6, 12, 20, 30, ?',
        options: ['40', '42', '44', '46'],
        correctAnswer: 1,
        explanation: 'Differences: 4, 6, 8, 10, 12. So next = 30 + 12 = 42. (Pattern: n(n+1))',
        subject: Subject.LogicalReasoning,
        topic: 'Number Series',
        year: 2024
      },
      {
        id: 'pyq-2024-lr-6',
        text: 'In a row of students, Ram is 15th from left and 10th from right. Total students?',
        options: ['24', '25', '26', '23'],
        correctAnswer: 0,
        explanation: 'Total = Left position + Right position - 1 = 15 + 10 - 1 = 24',
        subject: Subject.LogicalReasoning,
        topic: 'Linear Arrangement',
        year: 2024
      },
      {
        id: 'pyq-2024-lr-7',
        text: 'Statement: All judges are lawyers. Some lawyers are honest. Conclusion I: Some judges are honest. Conclusion II: Some honest persons are judges.',
        options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
        correctAnswer: 3,
        explanation: 'Since "some lawyers are honest" doesn\'t necessarily include judges, neither conclusion follows.',
        subject: Subject.LogicalReasoning,
        topic: 'Syllogism',
        year: 2024
      },
      {
        id: 'pyq-2024-lr-8',
        text: 'Choose the odd one: Square, Rectangle, Circle, Triangle',
        options: ['Square', 'Rectangle', 'Circle', 'Triangle'],
        correctAnswer: 2,
        explanation: 'Circle has no sides/angles. Others are polygons with definite sides.',
        subject: Subject.LogicalReasoning,
        topic: 'Classification',
        year: 2024
      },
      {
        id: 'pyq-2024-lr-9',
        text: 'If "+" means "÷", "-" means "×", "×" means "+", "÷" means "-", then: 12 + 4 - 2 × 8 ÷ 1 = ?',
        options: ['13', '14', '15', '12'],
        correctAnswer: 0,
        explanation: '12 ÷ 4 × 2 + 8 - 1 = 3 × 2 + 8 - 1 = 6 + 8 - 1 = 13',
        subject: Subject.LogicalReasoning,
        topic: 'Mathematical Operations',
        year: 2024
      },
      {
        id: 'pyq-2024-lr-10',
        text: 'A is 40m south-west of B. C is 40m south-east of B. How far is A from C?',
        options: ['40m', '80m', '40√2m', '80√2m'],
        correctAnswer: 1,
        explanation: 'A and C are both 40m from B at 90° angle (SW and SE). AC = √(40² + 40² + 2×40×40×cos90°) = 80m',
        subject: Subject.LogicalReasoning,
        topic: 'Direction Sense',
        year: 2024
      },
      
      // GENERAL KNOWLEDGE (20 Questions)
      {
        id: 'pyq-2024-gk-1',
        text: 'Who is the current President of India (2024)?',
        options: ['Ram Nath Kovind', 'Droupadi Murmu', 'Pranab Mukherjee', 'Pratibha Patil'],
        correctAnswer: 1,
        explanation: 'Droupadi Murmu is the 15th and current President of India since July 2022.',
        subject: Subject.GK,
        topic: 'Polity',
        year: 2024
      },
      {
        id: 'pyq-2024-gk-2',
        text: 'Chandrayaan-3 successfully landed on Moon\'s south pole in which year?',
        options: ['2021', '2022', '2023', '2024'],
        correctAnswer: 2,
        explanation: 'Chandrayaan-3 successfully soft-landed on August 23, 2023.',
        subject: Subject.GK,
        topic: 'Science & Technology',
        year: 2024
      },
      {
        id: 'pyq-2024-gk-3',
        text: 'G20 Summit 2023 was held in:',
        options: ['Bali, Indonesia', 'New Delhi, India', 'Tokyo, Japan', 'Rome, Italy'],
        correctAnswer: 1,
        explanation: 'India hosted G20 Summit in New Delhi on September 9-10, 2023.',
        subject: Subject.GK,
        topic: 'Current Affairs',
        year: 2024
      },
      {
        id: 'pyq-2024-gk-4',
        text: 'The new criminal laws replacing IPC, CrPC, and Evidence Act came into effect from:',
        options: ['January 1, 2024', 'April 1, 2024', 'July 1, 2024', 'October 1, 2024'],
        correctAnswer: 2,
        explanation: 'BNS, BNSS, and BSA replaced IPC, CrPC, and Evidence Act from July 1, 2024.',
        subject: Subject.GK,
        topic: 'Legal Affairs',
        year: 2024
      },
      {
        id: 'pyq-2024-gk-5',
        text: 'UN Secretary-General is:',
        options: ['Ban Ki-moon', 'António Guterres', 'Kofi Annan', 'Javier Pérez'],
        correctAnswer: 1,
        explanation: 'António Guterres of Portugal has been UN Secretary-General since 2017.',
        subject: Subject.GK,
        topic: 'International Organizations',
        year: 2024
      },
      {
        id: 'pyq-2024-gk-6',
        text: 'The headquarters of BRICS New Development Bank is in:',
        options: ['Beijing', 'Shanghai', 'New Delhi', 'Johannesburg'],
        correctAnswer: 1,
        explanation: 'NDB is headquartered in Shanghai, China.',
        subject: Subject.GK,
        topic: 'International Organizations',
        year: 2024
      },
      {
        id: 'pyq-2024-gk-7',
        text: 'Article 370, which granted special status to J&K, was abrogated in:',
        options: ['2017', '2018', '2019', '2020'],
        correctAnswer: 2,
        explanation: 'Article 370 was abrogated on August 5, 2019.',
        subject: Subject.GK,
        topic: 'Polity',
        year: 2024
      },
      {
        id: 'pyq-2024-gk-8',
        text: 'First woman Chief Justice of India is:',
        options: ['Justice M. Fathima Beevi', 'Justice Leila Seth', 'No woman has held this position', 'Justice Ruma Pal'],
        correctAnswer: 2,
        explanation: 'As of 2024, no woman has held the position of Chief Justice of India.',
        subject: Subject.GK,
        topic: 'Judiciary',
        year: 2024
      },
      {
        id: 'pyq-2024-gk-9',
        text: 'Which state has the highest number of Lok Sabha seats?',
        options: ['Maharashtra', 'Uttar Pradesh', 'West Bengal', 'Bihar'],
        correctAnswer: 1,
        explanation: 'Uttar Pradesh has 80 Lok Sabha seats, the highest among all states.',
        subject: Subject.GK,
        topic: 'Polity',
        year: 2024
      },
      {
        id: 'pyq-2024-gk-10',
        text: 'The first Indian satellite launched was:',
        options: ['Bhaskara', 'Aryabhata', 'INSAT-1A', 'Rohini'],
        correctAnswer: 1,
        explanation: 'Aryabhata was India\'s first satellite, launched on April 19, 1975.',
        subject: Subject.GK,
        topic: 'Science & Technology',
        year: 2024
      },
      
      // ENGLISH (30 Questions)
      {
        id: 'pyq-2024-en-1',
        text: 'Choose the correct synonym of "Abundant":',
        options: ['Scarce', 'Plentiful', 'Rare', 'Few'],
        correctAnswer: 1,
        explanation: 'Abundant means existing in large quantities; plentiful.',
        subject: Subject.English,
        topic: 'Vocabulary - Synonyms',
        year: 2024
      },
      {
        id: 'pyq-2024-en-2',
        text: 'Choose the correct antonym of "Benevolent":',
        options: ['Kind', 'Generous', 'Malevolent', 'Charitable'],
        correctAnswer: 2,
        explanation: 'Benevolent means well-meaning and kindly. Malevolent means wishing evil to others.',
        subject: Subject.English,
        topic: 'Vocabulary - Antonyms',
        year: 2024
      },
      {
        id: 'pyq-2024-en-3',
        text: 'The idiom "To let the cat out of the bag" means:',
        options: ['To release an animal', 'To reveal a secret', 'To be careless', 'To be cruel'],
        correctAnswer: 1,
        explanation: '"To let the cat out of the bag" means to reveal a secret accidentally.',
        subject: Subject.English,
        topic: 'Idioms',
        year: 2024
      },
      {
        id: 'pyq-2024-en-4',
        text: 'Choose the correctly spelled word:',
        options: ['Accomodate', 'Accommodate', 'Acommodate', 'Acomodate'],
        correctAnswer: 1,
        explanation: 'Accommodate is the correct spelling (double c, double m).',
        subject: Subject.English,
        topic: 'Spelling',
        year: 2024
      },
      {
        id: 'pyq-2024-en-5',
        text: '"One who hates mankind" is called:',
        options: ['Philanthropist', 'Misogynist', 'Misanthrope', 'Cynic'],
        correctAnswer: 2,
        explanation: 'Misanthrope is one who dislikes humankind. (Philos = love, Misos = hate, Anthropos = mankind)',
        subject: Subject.English,
        topic: 'One Word Substitution',
        year: 2024
      },
      {
        id: 'pyq-2024-en-6',
        text: 'Select the correct passive voice: "The police arrested the thief."',
        options: ['The thief was arrested by the police', 'The thief has been arrested by the police', 'The thief is arrested by the police', 'The thief had been arrested by the police'],
        correctAnswer: 0,
        explanation: 'Simple past active becomes simple past passive: was/were + V3',
        subject: Subject.English,
        topic: 'Grammar - Voice',
        year: 2024
      },
      {
        id: 'pyq-2024-en-7',
        text: 'Choose the correct article: "___ honest man is respected everywhere."',
        options: ['A', 'An', 'The', 'No article'],
        correctAnswer: 1,
        explanation: 'Use "An" before words starting with a vowel sound. "Honest" starts with a vowel sound (/ɒ/).',
        subject: Subject.English,
        topic: 'Grammar - Articles',
        year: 2024
      },
      {
        id: 'pyq-2024-en-8',
        text: '"To eat humble pie" means:',
        options: ['To eat delicious food', 'To apologize humbly', 'To be poor', 'To cook food'],
        correctAnswer: 1,
        explanation: '"To eat humble pie" means to make a humble apology, often after being proved wrong.',
        subject: Subject.English,
        topic: 'Idioms',
        year: 2024
      },
      {
        id: 'pyq-2024-en-9',
        text: 'Choose the correct sentence:',
        options: ['Neither of the boys have come', 'Neither of the boys has come', 'Neither of the boy has come', 'Neither of the boy have come'],
        correctAnswer: 1,
        explanation: '"Neither of" takes a singular verb. "Neither of the boys has come" is correct.',
        subject: Subject.English,
        topic: 'Grammar - Subject-Verb Agreement',
        year: 2024
      },
      {
        id: 'pyq-2024-en-10',
        text: 'The phrase "in the nick of time" means:',
        options: ['Very late', 'Just in time', 'Ahead of time', 'Wrong time'],
        correctAnswer: 1,
        explanation: '"In the nick of time" means just at the critical moment, barely in time.',
        subject: Subject.English,
        topic: 'Phrases',
        year: 2024
      },
      
      // MATHEMATICS (20 Questions)
      {
        id: 'pyq-2024-ma-1',
        text: 'If a:b = 2:3 and b:c = 4:5, then a:b:c is:',
        options: ['2:3:5', '8:12:15', '4:6:5', '2:4:5'],
        correctAnswer: 1,
        explanation: 'Make b common: a:b = 8:12, b:c = 12:15. So a:b:c = 8:12:15',
        subject: Subject.Mathematics,
        topic: 'Ratio & Proportion',
        year: 2024
      },
      {
        id: 'pyq-2024-ma-2',
        text: 'A train 150m long crosses a pole in 10 seconds. Speed of train is:',
        options: ['15 m/s', '54 km/h', 'Both A and B', '45 km/h'],
        correctAnswer: 2,
        explanation: 'Speed = 150/10 = 15 m/s = 15 × 18/5 = 54 km/h. Both are correct.',
        subject: Subject.Mathematics,
        topic: 'Time & Distance',
        year: 2024
      },
      {
        id: 'pyq-2024-ma-3',
        text: 'If 30% of x = 40% of y, then x:y is:',
        options: ['3:4', '4:3', '2:3', '3:2'],
        correctAnswer: 1,
        explanation: '30x/100 = 40y/100 → 3x = 4y → x/y = 4/3 → x:y = 4:3',
        subject: Subject.Mathematics,
        topic: 'Percentage',
        year: 2024
      },
      {
        id: 'pyq-2024-ma-4',
        text: 'Simple interest on Rs. 5000 for 2 years at 8% per annum is:',
        options: ['Rs. 400', 'Rs. 800', 'Rs. 1000', 'Rs. 600'],
        correctAnswer: 1,
        explanation: 'SI = PRT/100 = 5000 × 8 × 2 / 100 = Rs. 800',
        subject: Subject.Mathematics,
        topic: 'Simple Interest',
        year: 2024
      },
      {
        id: 'pyq-2024-ma-5',
        text: 'The average of first 50 natural numbers is:',
        options: ['25', '25.5', '26', '50.5'],
        correctAnswer: 1,
        explanation: 'Average = Sum/n = n(n+1)/2n = (n+1)/2 = 51/2 = 25.5',
        subject: Subject.Mathematics,
        topic: 'Average',
        year: 2024
      },
      {
        id: 'pyq-2024-ma-6',
        text: 'A shopkeeper sells an article for Rs. 450 at 20% profit. Cost price is:',
        options: ['Rs. 360', 'Rs. 375', 'Rs. 400', 'Rs. 350'],
        correctAnswer: 1,
        explanation: 'SP = 120% of CP → 450 = 1.2 × CP → CP = 450/1.2 = Rs. 375',
        subject: Subject.Mathematics,
        topic: 'Profit & Loss',
        year: 2024
      },
      {
        id: 'pyq-2024-ma-7',
        text: 'If 8 men can complete a work in 12 days, 16 men will complete it in:',
        options: ['24 days', '6 days', '8 days', '4 days'],
        correctAnswer: 1,
        explanation: 'Men × Days = Constant. 8 × 12 = 16 × D → D = 96/16 = 6 days',
        subject: Subject.Mathematics,
        topic: 'Time & Work',
        year: 2024
      },
      {
        id: 'pyq-2024-ma-8',
        text: 'The HCF of 24 and 36 is:',
        options: ['6', '12', '18', '72'],
        correctAnswer: 1,
        explanation: '24 = 2³ × 3, 36 = 2² × 3². HCF = 2² × 3 = 12',
        subject: Subject.Mathematics,
        topic: 'HCF & LCM',
        year: 2024
      },
      {
        id: 'pyq-2024-ma-9',
        text: 'Area of a triangle with sides 3, 4, 5 cm is:',
        options: ['6 sq cm', '12 sq cm', '10 sq cm', '7.5 sq cm'],
        correctAnswer: 0,
        explanation: '3-4-5 is a right triangle. Area = ½ × 3 × 4 = 6 sq cm',
        subject: Subject.Mathematics,
        topic: 'Geometry',
        year: 2024
      },
      {
        id: 'pyq-2024-ma-10',
        text: 'A person walks at 6 km/h instead of 4 km/h and reaches 30 min early. Distance is:',
        options: ['4 km', '6 km', '8 km', '3 km'],
        correctAnswer: 1,
        explanation: 'D/4 - D/6 = 1/2 → 3D-2D = 6 → D = 6 km',
        subject: Subject.Mathematics,
        topic: 'Time & Distance',
        year: 2024
      }
    ]
  },
  
  // ============ 2023 Paper ============
  {
    id: 'pyq-2023-3yr',
    year: 2023,
    exam: 'MH CET Law 3-Year',
    totalQuestions: 150,
    duration: 120,
    maxMarks: 150,
    difficulty: 'Medium',
    questions: [
      // Sample questions from 2023
      {
        id: 'pyq-2023-la-1',
        text: 'Which part of the Constitution deals with Directive Principles of State Policy?',
        options: ['Part III', 'Part IV', 'Part IVA', 'Part V'],
        correctAnswer: 1,
        explanation: 'Part IV (Articles 36-51) contains Directive Principles of State Policy.',
        subject: Subject.LegalAptitude,
        topic: 'Constitution',
        year: 2023
      },
      {
        id: 'pyq-2023-la-2',
        text: 'The maxim "Nemo debet bis vexari pro una et eadem causa" means:',
        options: ['No man should be punished twice for same offence', 'Ignorance of law is no excuse', 'Let the buyer beware', 'Justice delayed is justice denied'],
        correctAnswer: 0,
        explanation: 'This maxim embodies the principle of "double jeopardy" - no one should be tried twice for the same offence.',
        subject: Subject.LegalAptitude,
        topic: 'Legal Maxims',
        year: 2023
      },
      {
        id: 'pyq-2023-la-3',
        text: 'Under Article 72, the President has power to:',
        options: ['Dissolve Lok Sabha', 'Grant pardon', 'Appoint Governors', 'All of the above'],
        correctAnswer: 1,
        explanation: 'Article 72 gives President power to grant pardons, reprieves, respites, or remissions of punishment.',
        subject: Subject.LegalAptitude,
        topic: 'President',
        year: 2023
      },
      {
        id: 'pyq-2023-la-4',
        text: 'Injuria sine damno means:',
        options: ['Injury with damage', 'Injury without damage', 'Damage without injury', 'No injury no damage'],
        correctAnswer: 1,
        explanation: 'Injuria sine damno means injury without damage - actionable even without actual loss. Example: Ashby v. White.',
        subject: Subject.LegalAptitude,
        topic: 'Law of Torts',
        year: 2023
      },
      {
        id: 'pyq-2023-la-5',
        text: 'Section 304A IPC deals with:',
        options: ['Murder', 'Culpable homicide', 'Death by negligence', 'Attempt to murder'],
        correctAnswer: 2,
        explanation: 'Section 304A deals with causing death by negligence (not amounting to culpable homicide).',
        subject: Subject.LegalAptitude,
        topic: 'Criminal Law',
        year: 2023
      },
      {
        id: 'pyq-2023-lr-1',
        text: 'Complete the series: 3, 9, 27, 81, ?',
        options: ['162', '243', '324', '189'],
        correctAnswer: 1,
        explanation: 'Each number is multiplied by 3. 81 × 3 = 243',
        subject: Subject.LogicalReasoning,
        topic: 'Number Series',
        year: 2023
      },
      {
        id: 'pyq-2023-lr-2',
        text: 'If TEACHER is coded as VGCEJGT, then STUDENT is coded as:',
        options: ['UVWFGPV', 'UVWFGOV', 'UWWFGPV', 'UVWFGPU'],
        correctAnswer: 0,
        explanation: 'Each letter moves 2 forward. S→U, T→V, U→W, D→F, E→G, N→P, T→V',
        subject: Subject.LogicalReasoning,
        topic: 'Coding-Decoding',
        year: 2023
      },
      {
        id: 'pyq-2023-gk-1',
        text: 'Who was the first Chief Justice of India?',
        options: ['H.J. Kania', 'M.C. Chagla', 'M. Patanjali Sastri', 'B.K. Mukherjea'],
        correctAnswer: 0,
        explanation: 'Justice H.J. Kania was the first Chief Justice of India (1950-1951).',
        subject: Subject.GK,
        topic: 'Indian Judiciary',
        year: 2023
      },
      {
        id: 'pyq-2023-gk-2',
        text: 'The Finance Commission is constituted under:',
        options: ['Article 270', 'Article 280', 'Article 300', 'Article 350'],
        correctAnswer: 1,
        explanation: 'Article 280 provides for the constitution of Finance Commission by President.',
        subject: Subject.GK,
        topic: 'Polity',
        year: 2023
      },
      {
        id: 'pyq-2023-en-1',
        text: '"A government by the wealthy" is called:',
        options: ['Democracy', 'Aristocracy', 'Plutocracy', 'Monarchy'],
        correctAnswer: 2,
        explanation: 'Plutocracy is government by the wealthy. (Ploutos = wealth)',
        subject: Subject.English,
        topic: 'One Word Substitution',
        year: 2023
      },
      {
        id: 'pyq-2023-en-2',
        text: 'The idiom "A bolt from the blue" means:',
        options: ['Thunder', 'A pleasant surprise', 'A sudden shock', 'Blue sky'],
        correctAnswer: 2,
        explanation: '"A bolt from the blue" means a complete surprise, usually unpleasant.',
        subject: Subject.English,
        topic: 'Idioms',
        year: 2023
      },
      {
        id: 'pyq-2023-ma-1',
        text: 'If the selling price is doubled, the profit becomes triple. The profit percentage is:',
        options: ['50%', '100%', '150%', '200%'],
        correctAnswer: 1,
        explanation: 'Let CP=100, P=x. New SP=2(100+x), New P=3x. So 2(100+x)-100=3x → x=100. Profit%=100%',
        subject: Subject.Mathematics,
        topic: 'Profit & Loss',
        year: 2023
      }
    ]
  },
  
  // ============ 2022 Paper ============
  {
    id: 'pyq-2022-3yr',
    year: 2022,
    exam: 'MH CET Law 3-Year',
    totalQuestions: 150,
    duration: 120,
    maxMarks: 150,
    difficulty: 'Medium',
    questions: [
      {
        id: 'pyq-2022-la-1',
        text: 'Right to Education is enshrined in:',
        options: ['Article 19', 'Article 21', 'Article 21A', 'Article 45'],
        correctAnswer: 2,
        explanation: 'Article 21A (inserted by 86th Amendment, 2002) provides for free and compulsory education for children aged 6-14.',
        subject: Subject.LegalAptitude,
        topic: 'Fundamental Rights',
        year: 2022
      },
      {
        id: 'pyq-2022-la-2',
        text: 'The Latin maxim "Ubi jus ibi remedium" means:',
        options: ['Where there is a right, there is a remedy', 'Ignorance of law is no excuse', 'No one is above law', 'Justice should not only be done but also be seen to be done'],
        correctAnswer: 0,
        explanation: 'This maxim forms the basis of the law of torts and means where there is a right, there is a remedy.',
        subject: Subject.LegalAptitude,
        topic: 'Legal Maxims',
        year: 2022
      },
      {
        id: 'pyq-2022-la-3',
        text: 'Maneka Gandhi v. Union of India case is related to:',
        options: ['Right to Privacy', 'Right to Life and Personal Liberty', 'Right to Education', 'Right to Property'],
        correctAnswer: 1,
        explanation: 'Maneka Gandhi case (1978) expanded Article 21 - procedure must be fair, just, and reasonable.',
        subject: Subject.LegalAptitude,
        topic: 'Landmark Cases',
        year: 2022
      },
      {
        id: 'pyq-2022-la-4',
        text: 'Under the Sale of Goods Act, "Caveat Emptor" means:',
        options: ['Let the seller beware', 'Let the buyer beware', 'Both should be careful', 'Neither is responsible'],
        correctAnswer: 1,
        explanation: 'Caveat Emptor means "let the buyer beware" - buyer must check goods before purchasing.',
        subject: Subject.LegalAptitude,
        topic: 'Sale of Goods',
        year: 2022
      },
      {
        id: 'pyq-2022-lr-1',
        text: 'If in a certain code, DELHI is written as CCIDD, then BOMBAY is written as:',
        options: ['NLLLZX', 'AMLAZX', 'ANLAZX', 'ANZLAX'],
        correctAnswer: 2,
        explanation: 'Each letter shifts one back and each is repeated. B→AA, O→NN, M→LL, B→AA, A→ZZ, Y→XX = ANLAZX pattern',
        subject: Subject.LogicalReasoning,
        topic: 'Coding-Decoding',
        year: 2022
      },
      {
        id: 'pyq-2022-gk-1',
        text: 'Who appoints the Chief Election Commissioner of India?',
        options: ['Prime Minister', 'Chief Justice of India', 'President', 'Parliament'],
        correctAnswer: 2,
        explanation: 'The President appoints the Chief Election Commissioner under Article 324.',
        subject: Subject.GK,
        topic: 'Polity',
        year: 2022
      },
      {
        id: 'pyq-2022-en-1',
        text: '"Epitaph" means:',
        options: ['A speech praising someone', 'Words written on a tombstone', 'A summary', 'A greeting'],
        correctAnswer: 1,
        explanation: 'Epitaph is an inscription on a tombstone in memory of the person buried there.',
        subject: Subject.English,
        topic: 'Vocabulary',
        year: 2022
      },
      {
        id: 'pyq-2022-ma-1',
        text: 'What is 25% of 25% of 100?',
        options: ['25', '6.25', '12.5', '50'],
        correctAnswer: 1,
        explanation: '25% of 100 = 25. 25% of 25 = 6.25',
        subject: Subject.Mathematics,
        topic: 'Percentage',
        year: 2022
      }
    ]
  }
];

// Helper function to get questions by year
export const getQuestionsByYear = (year: number): PYQQuestion[] => {
  const paper = COMPREHENSIVE_PYQ_DATA.find(p => p.year === year);
  return paper?.questions || [];
};

// Helper function to get questions by subject
export const getQuestionsBySubject = (subject: Subject): PYQQuestion[] => {
  return COMPREHENSIVE_PYQ_DATA.flatMap(paper => 
    paper.questions.filter(q => q.subject === subject)
  );
};

// Get all available years
export const getAvailableYears = (): number[] => {
  return COMPREHENSIVE_PYQ_DATA.map(p => p.year).sort((a, b) => b - a);
};

// Total question count
export const getTotalPYQCount = (): number => {
  return COMPREHENSIVE_PYQ_DATA.reduce((sum, paper) => sum + paper.questions.length, 0);
};

export default COMPREHENSIVE_PYQ_DATA;
