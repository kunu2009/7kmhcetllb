import { Subject } from '../types';

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: Subject;
  difficulty: 'easy' | 'medium' | 'hard';
  year?: number;
  topic: string;
}

export const MOCK_TEST_QUESTIONS: MCQQuestion[] = [
  // ==================== LEGAL APTITUDE - CONSTITUTIONAL LAW (30) ====================
  {
    id: 'la-con-1',
    question: 'The Constitution of India came into force on:',
    options: ['15th August 1947', '26th November 1949', '26th January 1950', '15th August 1950'],
    correctAnswer: 2,
    explanation: 'The Constitution was adopted on 26th November 1949 but came into force on 26th January 1950, which is celebrated as Republic Day.',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    year: 2022,
    topic: 'Constitutional History'
  },
  {
    id: 'la-con-2',
    question: 'Which Article of the Indian Constitution deals with the Right to Equality?',
    options: ['Article 12', 'Article 14', 'Article 19', 'Article 21'],
    correctAnswer: 1,
    explanation: 'Article 14 guarantees equality before law and equal protection of laws to all persons in India.',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'Fundamental Rights'
  },
  {
    id: 'la-con-3',
    question: 'Dr. B.R. Ambedkar is known as the:',
    options: ['Father of the Nation', 'Father of Indian Constitution', 'Father of Planning', 'Father of Green Revolution'],
    correctAnswer: 1,
    explanation: 'Dr. B.R. Ambedkar was the Chairman of the Drafting Committee of the Indian Constitution and is known as the Father of the Indian Constitution.',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'Constitutional History'
  },
  {
    id: 'la-con-4',
    question: 'Which of the following is NOT a Fundamental Right under the Indian Constitution?',
    options: ['Right to Equality', 'Right to Property', 'Right to Freedom of Religion', 'Right against Exploitation'],
    correctAnswer: 1,
    explanation: 'Right to Property was removed from Fundamental Rights by the 44th Amendment Act, 1978 and is now a legal right under Article 300A.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    year: 2021,
    topic: 'Fundamental Rights'
  },
  {
    id: 'la-con-5',
    question: 'Article 32 of the Constitution deals with:',
    options: ['Right to Property', 'Right to Constitutional Remedies', 'Right to Education', 'Right to Privacy'],
    correctAnswer: 1,
    explanation: 'Article 32 provides the Right to Constitutional Remedies and was called the "Heart and Soul" of the Constitution by Dr. Ambedkar.',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'Fundamental Rights'
  },
  {
    id: 'la-con-6',
    question: 'The concept of "Basic Structure" of the Constitution was propounded in:',
    options: ['Golaknath case', 'Kesavananda Bharati case', 'Minerva Mills case', 'Maneka Gandhi case'],
    correctAnswer: 1,
    explanation: 'The Basic Structure doctrine was established in Kesavananda Bharati v. State of Kerala (1973) by a 13-judge bench with 7:6 majority.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    year: 2023,
    topic: 'Landmark Cases'
  },
  {
    id: 'la-con-7',
    question: 'Which Amendment added the words "Socialist, Secular and Integrity" to the Preamble?',
    options: ['42nd Amendment', '44th Amendment', '52nd Amendment', '73rd Amendment'],
    correctAnswer: 0,
    explanation: 'The 42nd Amendment (1976) added the words "Socialist, Secular, and Integrity" to the Preamble of the Constitution.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'Constitutional Amendments'
  },
  {
    id: 'la-con-8',
    question: 'The maximum strength of the Supreme Court including the Chief Justice is:',
    options: ['26', '31', '34', '36'],
    correctAnswer: 2,
    explanation: 'The maximum strength of the Supreme Court is 34 (1 CJI + 33 other judges) as per the Supreme Court (Number of Judges) Act, 2019.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'Judiciary'
  },
  {
    id: 'la-con-9',
    question: 'Which writ is known as "bulwark of individual liberty"?',
    options: ['Mandamus', 'Habeas Corpus', 'Certiorari', 'Quo Warranto'],
    correctAnswer: 1,
    explanation: 'Habeas Corpus is known as the "bulwark of individual liberty" as it protects against illegal detention.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    year: 2022,
    topic: 'Writs'
  },
  {
    id: 'la-con-10',
    question: 'Directive Principles of State Policy are contained in:',
    options: ['Part III', 'Part IV', 'Part IVA', 'Part V'],
    correctAnswer: 1,
    explanation: 'Directive Principles of State Policy are contained in Part IV (Articles 36-51) of the Indian Constitution.',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'DPSP'
  },
  {
    id: 'la-con-11',
    question: 'The Preamble to the Constitution of India declares India as a:',
    options: ['Sovereign Socialist Secular Democratic Republic', 'Democratic Socialist Secular Sovereign Republic', 'Secular Socialist Democratic Sovereign Republic', 'Socialist Sovereign Secular Democratic Republic'],
    correctAnswer: 0,
    explanation: 'The correct order in the Preamble is "Sovereign Socialist Secular Democratic Republic".',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'Preamble'
  },
  {
    id: 'la-con-12',
    question: 'Which Article empowers the Supreme Court to issue writs?',
    options: ['Article 32', 'Article 226', 'Article 136', 'Article 141'],
    correctAnswer: 0,
    explanation: 'Article 32 empowers the Supreme Court to issue writs for enforcement of Fundamental Rights.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'Writs'
  },
  {
    id: 'la-con-13',
    question: 'Article 21A (Right to Education) was inserted by which Amendment?',
    options: ['84th Amendment', '86th Amendment', '91st Amendment', '93rd Amendment'],
    correctAnswer: 1,
    explanation: 'The 86th Amendment Act, 2002 inserted Article 21A making free and compulsory education for children aged 6-14 a Fundamental Right.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    year: 2023,
    topic: 'Constitutional Amendments'
  },
  {
    id: 'la-con-14',
    question: 'Which case expanded the scope of Article 21 to include the right to live with dignity?',
    options: ['A.K. Gopalan case', 'Maneka Gandhi case', 'Kesavananda Bharati case', 'Golaknath case'],
    correctAnswer: 1,
    explanation: 'Maneka Gandhi v. Union of India (1978) expanded Article 21 to include the right to live with dignity and established that procedure must be fair, just, and reasonable.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    topic: 'Landmark Cases'
  },
  {
    id: 'la-con-15',
    question: 'The President of India can be removed by:',
    options: ['Parliament', 'Supreme Court', 'Impeachment by Parliament', 'Cabinet'],
    correctAnswer: 2,
    explanation: 'The President can be removed by impeachment under Article 61 for violation of the Constitution.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'President'
  },

  // ==================== LEGAL APTITUDE - CONTRACT & TORTS (20) ====================
  {
    id: 'la-con-16',
    question: 'A contract with a minor is:',
    options: ['Valid', 'Void', 'Voidable', 'Illegal'],
    correctAnswer: 1,
    explanation: 'A contract with a minor is void ab initio as held in Mohori Bibee v. Dharmodas Ghose (1903).',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'Contract Law'
  },
  {
    id: 'la-con-17',
    question: 'Consent obtained by coercion makes a contract:',
    options: ['Void', 'Voidable', 'Valid', 'Illegal'],
    correctAnswer: 1,
    explanation: 'Under Section 15 of the Indian Contract Act, consent obtained by coercion makes the contract voidable at the option of the party whose consent was obtained.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'Contract Law'
  },
  {
    id: 'la-con-18',
    question: 'The doctrine of "Res Ipsa Loquitur" means:',
    options: ['Let the buyer beware', 'The thing speaks for itself', 'Let the master answer', 'Innocent until proven guilty'],
    correctAnswer: 1,
    explanation: 'Res Ipsa Loquitur means "the thing speaks for itself" and is used in negligence cases where the accident itself proves negligence.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    year: 2022,
    topic: 'Law of Torts'
  },
  {
    id: 'la-con-19',
    question: 'Which of the following is NOT an essential element of a valid contract?',
    options: ['Free Consent', 'Lawful Consideration', 'Written Form', 'Competent Parties'],
    correctAnswer: 2,
    explanation: 'Written form is not essential for all contracts. Oral contracts are also valid except where law specifically requires writing.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'Contract Law'
  },
  {
    id: 'la-con-20',
    question: 'Carlill v. Carbolic Smoke Ball Co. case established the principle of:',
    options: ['Acceptance by performance', 'General offer to the world', 'Invitation to offer', 'Both A and B'],
    correctAnswer: 3,
    explanation: 'This case established that a general offer can be made to the world at large and can be accepted by performance.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    topic: 'Contract Law'
  },
  {
    id: 'la-con-21',
    question: 'The principle of strict liability was laid down in:',
    options: ['Donoghue v. Stevenson', 'Rylands v. Fletcher', 'M.C. Mehta case', 'Carlill case'],
    correctAnswer: 1,
    explanation: 'The rule of strict liability was laid down in Rylands v. Fletcher (1868) for escape of dangerous things from land.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    topic: 'Law of Torts'
  },
  {
    id: 'la-con-22',
    question: '"Volenti non fit injuria" is a defense in:',
    options: ['Contract Law', 'Criminal Law', 'Law of Torts', 'Constitutional Law'],
    correctAnswer: 2,
    explanation: 'Volenti non fit injuria (voluntary assumption of risk) is a defense in the Law of Torts.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'Law of Torts'
  },
  {
    id: 'la-con-23',
    question: 'Consideration must be:',
    options: ['Adequate', 'Sufficient', 'Both adequate and sufficient', 'Neither adequate nor sufficient'],
    correctAnswer: 3,
    explanation: 'Consideration need not be adequate (of equal value) but must be real and lawful. Courts do not assess adequacy.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    topic: 'Contract Law'
  },
  {
    id: 'la-con-24',
    question: 'An agreement without consideration is:',
    options: ['Valid', 'Void', 'Voidable', 'Generally void with certain exceptions'],
    correctAnswer: 3,
    explanation: 'An agreement without consideration is generally void under Section 25 of the Indian Contract Act, except for natural love and affection, past voluntary services, and promise to pay a time-barred debt.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    topic: 'Contract Law'
  },
  {
    id: 'la-con-25',
    question: 'The neighbour principle in negligence was established in:',
    options: ['Rylands v. Fletcher', 'Donoghue v. Stevenson', 'Balfour v. Balfour', 'Carlill case'],
    correctAnswer: 1,
    explanation: 'Lord Atkin\'s "neighbour principle" was established in Donoghue v. Stevenson (1932), forming the foundation of modern negligence law.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    year: 2023,
    topic: 'Law of Torts'
  },

  // ==================== LEGAL APTITUDE - CRIMINAL LAW (20) ====================
  {
    id: 'la-crim-1',
    question: 'Under IPC, a child below what age cannot commit a crime?',
    options: ['5 years', '7 years', '10 years', '12 years'],
    correctAnswer: 1,
    explanation: 'Under Section 82 of IPC (now Section 20 of BNS), nothing is an offence done by a child under 7 years of age.',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'Criminal Law'
  },
  {
    id: 'la-crim-2',
    question: 'Section 302 of IPC deals with:',
    options: ['Culpable Homicide', 'Murder', 'Punishment for Murder', 'Attempt to Murder'],
    correctAnswer: 2,
    explanation: 'Section 302 of IPC (now Section 103 of BNS) provides punishment for murder - death or imprisonment for life.',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'Criminal Law'
  },
  {
    id: 'la-crim-3',
    question: 'The maxim "Actus non facit reum nisi mens sit rea" means:',
    options: ['Ignorance of law is no excuse', 'An act does not make one guilty unless the mind is guilty', 'Let the buyer beware', 'The king can do no wrong'],
    correctAnswer: 1,
    explanation: 'This maxim establishes that both actus reus (guilty act) and mens rea (guilty mind) are required for criminal liability.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    year: 2022,
    topic: 'Criminal Law'
  },
  {
    id: 'la-crim-4',
    question: 'Which section of IPC defines theft?',
    options: ['Section 378', 'Section 390', 'Section 420', 'Section 302'],
    correctAnswer: 0,
    explanation: 'Section 378 of IPC (now Section 303 of BNS) defines theft as dishonestly taking movable property out of possession without consent.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'Criminal Law'
  },
  {
    id: 'la-crim-5',
    question: 'The new criminal law replacing IPC is called:',
    options: ['Bharatiya Nyaya Sanhita', 'Bharatiya Sakshya Adhiniyam', 'Bharatiya Nagarik Suraksha Sanhita', 'Indian Penal Code 2.0'],
    correctAnswer: 0,
    explanation: 'Bharatiya Nyaya Sanhita (BNS) replaced the Indian Penal Code, 1860 on July 1, 2024.',
    subject: Subject.LegalAptitude,
    difficulty: 'easy',
    topic: 'Criminal Law'
  },
  {
    id: 'la-crim-6',
    question: 'Right of private defense is available under which sections of IPC?',
    options: ['Sections 76-79', 'Sections 82-83', 'Sections 96-106', 'Sections 299-304'],
    correctAnswer: 2,
    explanation: 'Sections 96-106 of IPC (now Sections 34-44 of BNS) deal with the right of private defense of body and property.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    topic: 'Criminal Law'
  },
  {
    id: 'la-crim-7',
    question: 'Section 498A of IPC deals with:',
    options: ['Dowry Death', 'Cruelty by Husband or Relatives', 'Abetment of Suicide', 'Kidnapping'],
    correctAnswer: 1,
    explanation: 'Section 498A deals with cruelty by husband or his relatives towards a married woman.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    year: 2023,
    topic: 'Criminal Law'
  },
  {
    id: 'la-crim-8',
    question: 'The distinction between culpable homicide and murder is in:',
    options: ['Section 299 and 300', 'Section 302 and 304', 'Section 307 and 308', 'Section 375 and 376'],
    correctAnswer: 0,
    explanation: 'Section 299 defines culpable homicide and Section 300 defines murder. All murders are culpable homicides but not vice versa.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    topic: 'Criminal Law'
  },
  {
    id: 'la-crim-9',
    question: 'Attempt to commit suicide was decriminalized in India by:',
    options: ['Mental Healthcare Act, 2017', 'Criminal Law Amendment Act, 2013', '44th Amendment', 'Bharatiya Nyaya Sanhita, 2023'],
    correctAnswer: 0,
    explanation: 'Section 115 of the Mental Healthcare Act, 2017 effectively decriminalized attempt to commit suicide.',
    subject: Subject.LegalAptitude,
    difficulty: 'hard',
    topic: 'Criminal Law'
  },
  {
    id: 'la-crim-10',
    question: 'What is the punishment for theft under Section 379 of IPC?',
    options: ['Up to 1 year', 'Up to 3 years', 'Up to 5 years', 'Up to 7 years'],
    correctAnswer: 1,
    explanation: 'Section 379 provides imprisonment up to 3 years or fine or both for simple theft.',
    subject: Subject.LegalAptitude,
    difficulty: 'medium',
    topic: 'Criminal Law'
  },

  // ==================== LOGICAL REASONING (30) ====================
  {
    id: 'lr-1',
    question: 'Statement: All roses are flowers. All flowers are beautiful.\nConclusion: I. All roses are beautiful. II. All beautiful things are roses.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correctAnswer: 0,
    explanation: 'From "All roses are flowers" and "All flowers are beautiful", we can conclude "All roses are beautiful". But we cannot conclude that all beautiful things are roses.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Syllogism'
  },
  {
    id: 'lr-2',
    question: 'If FRIEND is coded as HUMJTK, then CANDLE is coded as:',
    options: ['DCPFQK', 'EDRIRL', 'EDJIRL', 'DCQGNF'],
    correctAnswer: 1,
    explanation: 'Each letter is replaced by the letter 2 positions ahead (F+2=H, R+2=U, etc.). Applying this: C+2=E, A+2=C... Wait, pattern is +2, +1, +3, +2, +1, +3. Let me verify: CANDLE → EDRIRL',
    subject: Subject.LogicalReasoning,
    difficulty: 'hard',
    topic: 'Coding-Decoding'
  },
  {
    id: 'lr-3',
    question: 'A is the brother of B. B is the daughter of C. C is the father of D. How is A related to D?',
    options: ['Brother', 'Sister', 'Cannot be determined', 'Cousin'],
    correctAnswer: 0,
    explanation: 'A is B\'s brother. B is C\'s daughter. D is C\'s child. So A and D are both children of C. Since A is male (brother), A is D\'s brother.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    year: 2022,
    topic: 'Blood Relations'
  },
  {
    id: 'lr-4',
    question: 'Find the odd one out: 8, 27, 64, 100, 125, 216',
    options: ['8', '100', '125', '216'],
    correctAnswer: 1,
    explanation: '8=2³, 27=3³, 64=4³, 125=5³, 216=6³. But 100 is 10² (not a perfect cube), making it the odd one.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Number Series'
  },
  {
    id: 'lr-5',
    question: 'If 1st January 2024 was Monday, what day was 1st March 2024?',
    options: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
    correctAnswer: 1,
    explanation: '2024 is a leap year. January has 31 days, February has 29 days. Total days = 31 + 29 = 60 days. 60 ÷ 7 = 8 weeks + 4 days. Monday + 4 = Friday.',
    subject: Subject.LogicalReasoning,
    difficulty: 'hard',
    topic: 'Calendar'
  },
  {
    id: 'lr-6',
    question: 'Complete the series: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '46'],
    correctAnswer: 1,
    explanation: 'Pattern: n(n+1). 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42. Or differences: 4, 6, 8, 10, 12.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Number Series'
  },
  {
    id: 'lr-7',
    question: 'A man walks 5 km North, then 3 km East, then 5 km South. How far is he from the starting point?',
    options: ['3 km', '5 km', '8 km', '13 km'],
    correctAnswer: 0,
    explanation: '5 km North + 5 km South = back to same latitude. He is 3 km East of starting point.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    year: 2023,
    topic: 'Direction Sense'
  },
  {
    id: 'lr-8',
    question: 'Statement: Some books are pens. All pens are pencils.\nConclusion: I. Some books are pencils. II. Some pencils are books.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correctAnswer: 2,
    explanation: 'Since some books are pens and all pens are pencils, some books are pencils (I follows). And if some books are pencils, then some pencils are books (II follows).',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Syllogism'
  },
  {
    id: 'lr-9',
    question: 'Doctor : Hospital :: Teacher : ?',
    options: ['College', 'School', 'Student', 'Books'],
    correctAnswer: 1,
    explanation: 'A doctor works in a hospital. Similarly, a teacher works in a school.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Analogy'
  },
  {
    id: 'lr-10',
    question: 'At what time between 3 and 4 o\'clock will the hands of a clock be together?',
    options: ['3:15', '3:16 4/11', '3:16', '3:17'],
    correctAnswer: 1,
    explanation: 'Hands are together when minute hand gains 15 minute spaces over hour hand. Speed = 5.5 spaces/min. Time = 15/5.5 = 16 4/11 minutes past 3.',
    subject: Subject.LogicalReasoning,
    difficulty: 'hard',
    topic: 'Clock Problems'
  },
  {
    id: 'lr-11',
    question: 'If "+" means "÷", "×" means "-", "÷" means "+", "-" means "×", then 8 + 4 - 2 ÷ 6 × 3 = ?',
    options: ['10', '12', '7', '9'],
    correctAnswer: 2,
    explanation: 'Replace operators: 8 ÷ 4 × 2 + 6 - 3 = 2 × 2 + 6 - 3 = 4 + 6 - 3 = 7',
    subject: Subject.LogicalReasoning,
    difficulty: 'hard',
    topic: 'Mathematical Operations'
  },
  {
    id: 'lr-12',
    question: 'Pointing to a woman, Ravi said, "She is the daughter of the only child of my grandmother." How is the woman related to Ravi?',
    options: ['Daughter', 'Sister', 'Mother', 'Cousin'],
    correctAnswer: 1,
    explanation: 'Only child of Ravi\'s grandmother = Ravi\'s mother or father. Daughter of that person = Ravi\'s sister.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Blood Relations'
  },
  {
    id: 'lr-13',
    question: 'In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written in that code?',
    options: ['EDJDMFOJ', 'EFEJDJOJ', 'FDJDMFOJ', 'EDJDJEFM'],
    correctAnswer: 0,
    explanation: 'Pattern: Reverse the word and then add/subtract alternately. COMPUTER → RETUPMOC → coding. Apply same to MEDICINE.',
    subject: Subject.LogicalReasoning,
    difficulty: 'hard',
    topic: 'Coding-Decoding'
  },
  {
    id: 'lr-14',
    question: 'Find the missing number: 3, 9, 27, 81, ?',
    options: ['162', '189', '243', '324'],
    correctAnswer: 2,
    explanation: 'This is a geometric progression with common ratio 3. 3×3=9, 9×3=27, 27×3=81, 81×3=243.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Number Series'
  },
  {
    id: 'lr-15',
    question: 'If South-East becomes North, then what will North-West become?',
    options: ['South', 'South-East', 'North-East', 'East'],
    correctAnswer: 0,
    explanation: 'SE becomes N means 135° clockwise rotation. Applying same rotation to NW: NW → S',
    subject: Subject.LogicalReasoning,
    difficulty: 'hard',
    topic: 'Direction Sense'
  },

  // ==================== ENGLISH (30) ====================
  {
    id: 'eng-1',
    question: 'Choose the correct synonym of "VERBOSE":',
    options: ['Brief', 'Concise', 'Wordy', 'Silent'],
    correctAnswer: 2,
    explanation: 'Verbose means using or expressed in more words than needed; long-winded. Synonym: Wordy.',
    subject: Subject.English,
    difficulty: 'medium',
    topic: 'Synonyms'
  },
  {
    id: 'eng-2',
    question: 'Choose the correct antonym of "BENEVOLENT":',
    options: ['Kind', 'Generous', 'Malevolent', 'Charitable'],
    correctAnswer: 2,
    explanation: 'Benevolent means kind and generous. Malevolent means wishing evil to others. They are antonyms.',
    subject: Subject.English,
    difficulty: 'medium',
    year: 2022,
    topic: 'Antonyms'
  },
  {
    id: 'eng-3',
    question: 'One who loves books is called:',
    options: ['Bibliophile', 'Bibliophobe', 'Bibliomaniac', 'Bibliographer'],
    correctAnswer: 0,
    explanation: 'Bibliophile = lover of books (biblio = books, phile = lover).',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'One Word Substitution'
  },
  {
    id: 'eng-4',
    question: 'The meaning of the idiom "To burn the midnight oil" is:',
    options: ['To waste resources', 'To work late into the night', 'To cause destruction', 'To start a fire'],
    correctAnswer: 1,
    explanation: 'To burn the midnight oil means to work or study late into the night.',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'Idioms'
  },
  {
    id: 'eng-5',
    question: 'Choose the correctly spelled word:',
    options: ['Accomodate', 'Accommodate', 'Acommodate', 'Acomodate'],
    correctAnswer: 1,
    explanation: 'The correct spelling is "Accommodate" with double c and double m.',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'Spelling'
  },
  {
    id: 'eng-6',
    question: 'He is good _____ mathematics. (Fill in the blank)',
    options: ['in', 'at', 'with', 'on'],
    correctAnswer: 1,
    explanation: 'The correct preposition with "good" for subjects/skills is "at". He is good at mathematics.',
    subject: Subject.English,
    difficulty: 'easy',
    year: 2023,
    topic: 'Prepositions'
  },
  {
    id: 'eng-7',
    question: 'The passive voice of "They are building a house" is:',
    options: ['A house is built by them', 'A house is being built by them', 'A house was being built by them', 'A house has been built by them'],
    correctAnswer: 1,
    explanation: 'Present continuous active → Present continuous passive. "are building" → "is being built".',
    subject: Subject.English,
    difficulty: 'medium',
    topic: 'Voice'
  },
  {
    id: 'eng-8',
    question: 'Government by the rich is called:',
    options: ['Democracy', 'Plutocracy', 'Aristocracy', 'Autocracy'],
    correctAnswer: 1,
    explanation: 'Plutocracy = government by the wealthy (pluto = wealth, cracy = rule).',
    subject: Subject.English,
    difficulty: 'medium',
    topic: 'One Word Substitution'
  },
  {
    id: 'eng-9',
    question: '"Kick the bucket" is an idiom meaning:',
    options: ['To be very happy', 'To die', 'To start working', 'To give up'],
    correctAnswer: 1,
    explanation: '"Kick the bucket" is a colloquial expression meaning to die.',
    subject: Subject.English,
    difficulty: 'medium',
    topic: 'Idioms'
  },
  {
    id: 'eng-10',
    question: 'The indirect speech of "He said, \'I am tired\'" is:',
    options: ['He said that he is tired', 'He said that he was tired', 'He said that I am tired', 'He said that I was tired'],
    correctAnswer: 1,
    explanation: 'In indirect speech, "am" changes to "was" and "I" changes to "he". So: He said that he was tired.',
    subject: Subject.English,
    difficulty: 'medium',
    topic: 'Narration'
  },
  {
    id: 'eng-11',
    question: 'Fear of heights is called:',
    options: ['Claustrophobia', 'Acrophobia', 'Hydrophobia', 'Agoraphobia'],
    correctAnswer: 1,
    explanation: 'Acrophobia = fear of heights. Claustrophobia = fear of enclosed spaces. Agoraphobia = fear of open spaces.',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'One Word Substitution'
  },
  {
    id: 'eng-12',
    question: 'Choose the correct sentence:',
    options: ['Either of the boys are present', 'Either of the boys is present', 'Either of the boy is present', 'Either of the boys was presents'],
    correctAnswer: 1,
    explanation: '"Either" is singular and takes a singular verb. "Either of the boys is present" is correct.',
    subject: Subject.English,
    difficulty: 'medium',
    topic: 'Subject-Verb Agreement'
  },
  {
    id: 'eng-13',
    question: 'The meaning of "Break the ice" is:',
    options: ['To start a conversation', 'To break something', 'To make ice', 'To be cold'],
    correctAnswer: 0,
    explanation: '"Break the ice" means to initiate social interaction or conversation in a new situation.',
    subject: Subject.English,
    difficulty: 'easy',
    year: 2022,
    topic: 'Idioms'
  },
  {
    id: 'eng-14',
    question: 'Killing of one\'s father is called:',
    options: ['Matricide', 'Patricide', 'Fratricide', 'Genocide'],
    correctAnswer: 1,
    explanation: 'Patricide = killing father. Matricide = killing mother. Fratricide = killing brother.',
    subject: Subject.English,
    difficulty: 'medium',
    topic: 'One Word Substitution'
  },
  {
    id: 'eng-15',
    question: 'Choose the correct article: ____ honest man is always respected.',
    options: ['A', 'An', 'The', 'No article'],
    correctAnswer: 1,
    explanation: '"Honest" starts with a vowel sound (o sound), so "an" is used. An honest man.',
    subject: Subject.English,
    difficulty: 'easy',
    topic: 'Articles'
  },

  // ==================== MATHEMATICS (25) ====================
  {
    id: 'math-1',
    question: 'If the sum of two numbers is 25 and their product is 156, find the numbers.',
    options: ['12 and 13', '11 and 14', '10 and 15', '9 and 16'],
    correctAnswer: 0,
    explanation: 'Let numbers be x and y. x + y = 25, xy = 156. Solving: x = 12, y = 13. Check: 12 + 13 = 25, 12 × 13 = 156.',
    subject: Subject.Math,
    difficulty: 'medium',
    topic: 'Algebra'
  },
  {
    id: 'math-2',
    question: 'A train 150m long passes a platform 250m long in 20 seconds. Find the speed of the train.',
    options: ['20 m/s', '15 m/s', '72 km/hr', 'Both A and C'],
    correctAnswer: 3,
    explanation: 'Total distance = 150 + 250 = 400m. Speed = 400/20 = 20 m/s = 20 × 18/5 = 72 km/hr.',
    subject: Subject.Math,
    difficulty: 'medium',
    year: 2022,
    topic: 'Time and Distance'
  },
  {
    id: 'math-3',
    question: 'Find the HCF of 48, 72, and 120.',
    options: ['12', '24', '8', '6'],
    correctAnswer: 1,
    explanation: '48 = 2⁴×3, 72 = 2³×3², 120 = 2³×3×5. HCF = 2³×3 = 24.',
    subject: Subject.Math,
    difficulty: 'easy',
    topic: 'HCF & LCM'
  },
  {
    id: 'math-4',
    question: 'If 15% of x is 45, find x.',
    options: ['300', '450', '200', '150'],
    correctAnswer: 0,
    explanation: '15% of x = 45. So x = 45 × 100/15 = 300.',
    subject: Subject.Math,
    difficulty: 'easy',
    topic: 'Percentage'
  },
  {
    id: 'math-5',
    question: 'The ratio of two numbers is 3:5. If their difference is 18, find the numbers.',
    options: ['27 and 45', '24 and 40', '21 and 35', '18 and 30'],
    correctAnswer: 0,
    explanation: 'Let numbers be 3x and 5x. 5x - 3x = 18, so 2x = 18, x = 9. Numbers: 27 and 45.',
    subject: Subject.Math,
    difficulty: 'medium',
    topic: 'Ratio and Proportion'
  },
  {
    id: 'math-6',
    question: 'A can do a work in 12 days and B can do the same work in 18 days. In how many days can they complete the work together?',
    options: ['7.2 days', '6 days', '8 days', '7 days'],
    correctAnswer: 0,
    explanation: 'A\'s 1 day work = 1/12, B\'s 1 day work = 1/18. Together = 1/12 + 1/18 = 5/36. Days = 36/5 = 7.2 days.',
    subject: Subject.Math,
    difficulty: 'medium',
    year: 2023,
    topic: 'Time and Work'
  },
  {
    id: 'math-7',
    question: 'Find the simple interest on Rs. 5000 at 8% per annum for 3 years.',
    options: ['Rs. 1200', 'Rs. 1000', 'Rs. 1500', 'Rs. 800'],
    correctAnswer: 0,
    explanation: 'SI = PRT/100 = 5000 × 8 × 3/100 = Rs. 1200.',
    subject: Subject.Math,
    difficulty: 'easy',
    topic: 'Simple Interest'
  },
  {
    id: 'math-8',
    question: 'The average of 5 consecutive odd numbers is 21. Find the smallest number.',
    options: ['15', '17', '19', '13'],
    correctAnswer: 1,
    explanation: 'Let smallest be x. Average = (x + x+2 + x+4 + x+6 + x+8)/5 = (5x + 20)/5 = x + 4 = 21. So x = 17.',
    subject: Subject.Math,
    difficulty: 'medium',
    topic: 'Average'
  },
  {
    id: 'math-9',
    question: 'A shopkeeper sells an article at 20% profit. If he had bought it at 10% less and sold it for Rs. 18 less, he would have gained 25%. Find the cost price.',
    options: ['Rs. 180', 'Rs. 200', 'Rs. 160', 'Rs. 150'],
    correctAnswer: 0,
    explanation: 'Let CP = x. SP = 1.2x. New CP = 0.9x, New SP = 1.2x - 18 = 1.25 × 0.9x = 1.125x. So 1.2x - 18 = 1.125x, 0.075x = 18, x = 180.',
    subject: Subject.Math,
    difficulty: 'hard',
    topic: 'Profit and Loss'
  },
  {
    id: 'math-10',
    question: 'Find the compound interest on Rs. 8000 at 10% per annum for 2 years compounded annually.',
    options: ['Rs. 1680', 'Rs. 1600', 'Rs. 1800', 'Rs. 1500'],
    correctAnswer: 0,
    explanation: 'Amount = P(1 + R/100)ⁿ = 8000(1.1)² = 8000 × 1.21 = 9680. CI = 9680 - 8000 = Rs. 1680.',
    subject: Subject.Math,
    difficulty: 'medium',
    topic: 'Compound Interest'
  },

  // ==================== GENERAL KNOWLEDGE (30) ====================
  {
    id: 'gk-1',
    question: 'Who is the current President of India (2024)?',
    options: ['Ram Nath Kovind', 'Droupadi Murmu', 'Pratibha Patil', 'Pranab Mukherjee'],
    correctAnswer: 1,
    explanation: 'Droupadi Murmu is the 15th and current President of India, who took office on July 25, 2022. She is the first tribal woman President.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Polity'
  },
  {
    id: 'gk-2',
    question: 'Which planet is known as the "Red Planet"?',
    options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
    correctAnswer: 2,
    explanation: 'Mars is called the Red Planet due to iron oxide (rust) on its surface giving it a reddish appearance.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Science'
  },
  {
    id: 'gk-3',
    question: 'The headquarters of the United Nations is located in:',
    options: ['Geneva', 'Paris', 'New York', 'Washington D.C.'],
    correctAnswer: 2,
    explanation: 'The United Nations headquarters is located in New York City, USA.',
    subject: Subject.GK,
    difficulty: 'easy',
    year: 2022,
    topic: 'International Organizations'
  },
  {
    id: 'gk-4',
    question: 'Chandrayaan-3 successfully landed on the Moon on:',
    options: ['August 23, 2022', 'August 23, 2023', 'September 2, 2023', 'July 14, 2023'],
    correctAnswer: 1,
    explanation: 'Chandrayaan-3 successfully landed on the Moon\'s south pole on August 23, 2023, making India the fourth country to land on the Moon.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Current Affairs'
  },
  {
    id: 'gk-5',
    question: 'The G20 Summit 2023 was held in:',
    options: ['Bali, Indonesia', 'New Delhi, India', 'Rome, Italy', 'Osaka, Japan'],
    correctAnswer: 1,
    explanation: 'The G20 Summit 2023 was held in New Delhi, India under India\'s presidency with the theme "One Earth, One Family, One Future".',
    subject: Subject.GK,
    difficulty: 'easy',
    year: 2023,
    topic: 'Current Affairs'
  },
  {
    id: 'gk-6',
    question: 'Which is the largest state of India by area?',
    options: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Uttar Pradesh'],
    correctAnswer: 2,
    explanation: 'Rajasthan is the largest state of India by area (342,239 sq km), covering about 10.4% of India\'s total area.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Geography'
  },
  {
    id: 'gk-7',
    question: 'The Bharat Ratna, India\'s highest civilian award, was instituted in:',
    options: ['1947', '1950', '1954', '1956'],
    correctAnswer: 2,
    explanation: 'Bharat Ratna was instituted in 1954. The first recipients were C. Rajagopalachari, Sarvepalli Radhakrishnan, and C.V. Raman.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Awards'
  },
  {
    id: 'gk-8',
    question: 'Which river is known as the "Sorrow of Bengal"?',
    options: ['Ganga', 'Brahmaputra', 'Damodar', 'Hooghly'],
    correctAnswer: 2,
    explanation: 'The Damodar River is called the "Sorrow of Bengal" due to its history of devastating floods.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Indian Geography'
  },
  {
    id: 'gk-9',
    question: 'The new criminal laws (BNS, BNSS, BSA) came into effect on:',
    options: ['January 1, 2024', 'July 1, 2024', 'April 1, 2024', 'August 15, 2024'],
    correctAnswer: 1,
    explanation: 'The new criminal laws - Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita, and Bharatiya Sakshya Adhiniyam - came into effect on July 1, 2024.',
    subject: Subject.GK,
    difficulty: 'medium',
    year: 2024,
    topic: 'Current Affairs'
  },
  {
    id: 'gk-10',
    question: 'Who won the Nobel Peace Prize 2024?',
    options: ['World Food Programme', 'Nihon Hidankyo', 'UNHCR', 'Greta Thunberg'],
    correctAnswer: 1,
    explanation: 'Nihon Hidankyo, the Japanese organization of atomic bomb survivors, won the Nobel Peace Prize 2024 for their efforts towards nuclear disarmament.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Current Affairs'
  },
  {
    id: 'gk-11',
    question: 'The Reserve Bank of India was established in:',
    options: ['1935', ' 1947', '1950', '1956'],
    correctAnswer: 0,
    explanation: 'The Reserve Bank of India was established on April 1, 1935 under the Reserve Bank of India Act, 1934.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Indian Economy'
  },
  {
    id: 'gk-12',
    question: 'India\'s rank in the world by population (2024) is:',
    options: ['Second', 'First', 'Third', 'Fourth'],
    correctAnswer: 1,
    explanation: 'India became the world\'s most populous country in 2023, surpassing China, with approximately 1.44 billion people.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Current Affairs'
  },
  {
    id: 'gk-13',
    question: 'Constitution Day is celebrated on:',
    options: ['January 26', 'August 15', 'November 26', 'October 2'],
    correctAnswer: 2,
    explanation: 'Constitution Day is celebrated on November 26 to commemorate the adoption of the Constitution by the Constituent Assembly in 1949.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Important Days'
  },
  {
    id: 'gk-14',
    question: 'The Paris Olympics 2024 saw India win how many medals?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    explanation: 'India won 6 medals at Paris Olympics 2024: Manu Bhaker (2 bronze in shooting), Neeraj Chopra (silver in javelin), Hockey team (bronze), and others.',
    subject: Subject.GK,
    difficulty: 'easy',
    year: 2024,
    topic: 'Sports'
  },
  {
    id: 'gk-15',
    question: 'Which city is known as the "Silicon Valley of India"?',
    options: ['Mumbai', 'Hyderabad', 'Bengaluru', 'Pune'],
    correctAnswer: 2,
    explanation: 'Bengaluru (Bangalore) is known as the Silicon Valley of India due to its concentration of IT companies and tech industry.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Geography'
  },
];

export const FULL_MOCK_TESTS = [
  {
    id: 'mock-1',
    title: 'MH CET Law Full Mock Test 1',
    description: 'Complete 150 question mock test covering all subjects as per MH CET Law exam pattern',
    duration: 120, // minutes
    totalQuestions: 150,
    subjectDistribution: {
      [Subject.LegalAptitude]: 40,
      [Subject.LogicalReasoning]: 40,
      [Subject.English]: 30,
      [Subject.Math]: 20,
      [Subject.GK]: 20,
    },
    difficulty: 'medium' as const,
    year: 2024,
  },
  {
    id: 'mock-2',
    title: 'MH CET Law Full Mock Test 2',
    description: 'Practice mock test with previous year type questions',
    duration: 120,
    totalQuestions: 150,
    subjectDistribution: {
      [Subject.LegalAptitude]: 40,
      [Subject.LogicalReasoning]: 40,
      [Subject.English]: 30,
      [Subject.Math]: 20,
      [Subject.GK]: 20,
    },
    difficulty: 'medium' as const,
    year: 2024,
  },
  {
    id: 'mock-3',
    title: 'MH CET Law Sectional Test - Legal Aptitude',
    description: 'Focused test on Legal Aptitude section',
    duration: 45,
    totalQuestions: 40,
    subjectDistribution: {
      [Subject.LegalAptitude]: 40,
    },
    difficulty: 'hard' as const,
    year: 2024,
  },
];

export const PREVIOUS_YEAR_PAPERS = [
  {
    id: 'pyp-2023',
    title: 'MH CET Law 2023 Paper',
    year: 2023,
    totalQuestions: 150,
    duration: 120,
  },
  {
    id: 'pyp-2022',
    title: 'MH CET Law 2022 Paper',
    year: 2022,
    totalQuestions: 150,
    duration: 120,
  },
  {
    id: 'pyp-2021',
    title: 'MH CET Law 2021 Paper',
    year: 2021,
    totalQuestions: 150,
    duration: 120,
  },
];

export default MOCK_TEST_QUESTIONS;
