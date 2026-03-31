import { Subject } from '../types';
import type { MCQQuestion } from './mockTestQuestions';

export const CONTENT_SCALE_WAVE3_QUESTIONS: MCQQuestion[] = [
  // GK (50)
  {
    id: 'csu3-gk-1',
    question: 'The Constitution of India was adopted on:',
    options: ['26 January 1950', '15 August 1947', '26 November 1949', '2 October 1949'],
    correctAnswer: 2,
    explanation: 'The Constitution was adopted on 26 November 1949 and enforced on 26 January 1950.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Polity'
  },
  {
    id: 'csu3-gk-2',
    question: 'The Chairman of Rajya Sabha is the:',
    options: ['Prime Minister', 'President', 'Vice-President', 'Speaker'],
    correctAnswer: 2,
    explanation: 'The Vice-President of India is ex officio Chairman of Rajya Sabha.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Polity'
  },
  {
    id: 'csu3-gk-3',
    question: 'Lok Sabha is dissolved by:',
    options: ['Speaker', 'President', 'Prime Minister', 'Chief Justice of India'],
    correctAnswer: 1,
    explanation: 'The President dissolves Lok Sabha, usually on advice of the Council of Ministers.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Indian Polity'
  },
  {
    id: 'csu3-gk-4',
    question: 'The Comptroller and Auditor General is mentioned in:',
    options: ['Article 148', 'Article 280', 'Article 324', 'Article 356'],
    correctAnswer: 0,
    explanation: 'CAG provisions begin from Article 148.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Indian Polity'
  },
  {
    id: 'csu3-gk-5',
    question: 'The executive head of a state in India is the:',
    options: ['Chief Minister', 'Governor', 'Speaker', 'Chief Secretary'],
    correctAnswer: 1,
    explanation: 'The Governor is the constitutional executive head of the state.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Polity'
  },
  {
    id: 'csu3-gk-6',
    question: 'The upper house of Parliament is:',
    options: ['Lok Sabha', 'Rajya Sabha', 'Vidhan Sabha', 'Legislative Council'],
    correctAnswer: 1,
    explanation: 'Rajya Sabha is the Council of States and upper house at Union level.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Polity'
  },
  {
    id: 'csu3-gk-7',
    question: 'The minimum age to become President of India is:',
    options: ['30 years', '35 years', '40 years', '45 years'],
    correctAnswer: 1,
    explanation: 'A presidential candidate must be at least 35 years old.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Polity'
  },
  {
    id: 'csu3-gk-8',
    question: 'The budget is presented in Parliament by the:',
    options: ['Prime Minister', 'Home Minister', 'Finance Minister', 'Cabinet Secretary'],
    correctAnswer: 2,
    explanation: 'The Union Budget is presented by the Finance Minister.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Economy'
  },
  {
    id: 'csu3-gk-9',
    question: 'GST in India was introduced in year:',
    options: ['2014', '2016', '2017', '2019'],
    correctAnswer: 2,
    explanation: 'GST was launched on 1 July 2017.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Economy'
  },
  {
    id: 'csu3-gk-10',
    question: 'The currency of the United Kingdom is:',
    options: ['Euro', 'Dollar', 'Pound Sterling', 'Yen'],
    correctAnswer: 2,
    explanation: 'The UK uses Pound Sterling.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'World GK'
  },
  {
    id: 'csu3-gk-11',
    question: 'The national income in India is estimated by:',
    options: ['SEBI', 'NSO', 'RBI', 'NITI Aayog'],
    correctAnswer: 1,
    explanation: 'National Statistical Office compiles national income estimates.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Indian Economy'
  },
  {
    id: 'csu3-gk-12',
    question: 'Which one is a direct tax?',
    options: ['GST', 'Custom Duty', 'Income Tax', 'Excise Duty'],
    correctAnswer: 2,
    explanation: 'Income tax is paid directly to government by the taxpayer.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Economy'
  },
  {
    id: 'csu3-gk-13',
    question: 'The central bank of India is:',
    options: ['SBI', 'RBI', 'NABARD', 'SEBI'],
    correctAnswer: 1,
    explanation: 'Reserve Bank of India is the central bank.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Economy'
  },
  {
    id: 'csu3-gk-14',
    question: 'The HQ of World Bank is in:',
    options: ['New York', 'Washington D.C.', 'Geneva', 'London'],
    correctAnswer: 1,
    explanation: 'World Bank headquarters is in Washington D.C.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'World GK'
  },
  {
    id: 'csu3-gk-15',
    question: 'The largest ocean on Earth is:',
    options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'],
    correctAnswer: 2,
    explanation: 'Pacific Ocean is the largest ocean.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Geography'
  },
  {
    id: 'csu3-gk-16',
    question: 'The highest mountain peak in the world is:',
    options: ['K2', 'Kanchenjunga', 'Mount Everest', 'Makalu'],
    correctAnswer: 2,
    explanation: 'Mount Everest is the highest peak above sea level.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Geography'
  },
  {
    id: 'csu3-gk-17',
    question: 'Which river is called the Sorrow of Bihar?',
    options: ['Ganga', 'Kosi', 'Son', 'Ghaghra'],
    correctAnswer: 1,
    explanation: 'Kosi is known for frequent floods in Bihar.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Geography'
  },
  {
    id: 'csu3-gk-18',
    question: 'The Indian desert is:',
    options: ['Sahara', 'Kalahari', 'Thar', 'Atacama'],
    correctAnswer: 2,
    explanation: 'Thar Desert lies in northwestern India.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Geography'
  },
  {
    id: 'csu3-gk-19',
    question: 'The largest state of India by area is:',
    options: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Uttar Pradesh'],
    correctAnswer: 2,
    explanation: 'Rajasthan is the largest state by area.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Geography'
  },
  {
    id: 'csu3-gk-20',
    question: 'The longest river in the world is generally accepted as:',
    options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
    correctAnswer: 1,
    explanation: 'Traditional GK answer is Nile.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'World GK'
  },
  {
    id: 'csu3-gk-21',
    question: 'Who discovered sea route to India via Cape of Good Hope?',
    options: ['Columbus', 'Vasco da Gama', 'Magellan', 'Cook'],
    correctAnswer: 1,
    explanation: 'Vasco da Gama reached Calicut in 1498.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'History'
  },
  {
    id: 'csu3-gk-22',
    question: 'The Revolt of 1857 started from:',
    options: ['Delhi', 'Meerut', 'Lucknow', 'Kanpur'],
    correctAnswer: 1,
    explanation: 'The revolt began at Meerut in May 1857.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'History'
  },
  {
    id: 'csu3-gk-23',
    question: 'Who gave the call "Do or Die" during Quit India Movement?',
    options: ['Jawaharlal Nehru', 'Subhas Bose', 'Mahatma Gandhi', 'Sardar Patel'],
    correctAnswer: 2,
    explanation: 'Mahatma Gandhi gave the call during Quit India Movement (1942).',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'History'
  },
  {
    id: 'csu3-gk-24',
    question: 'The first battle of Panipat was fought in:',
    options: ['1526', '1556', '1761', '1498'],
    correctAnswer: 0,
    explanation: 'First Battle of Panipat was fought in 1526.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'History'
  },
  {
    id: 'csu3-gk-25',
    question: 'Who is known as Iron Man of India?',
    options: ['Bhagat Singh', 'Sardar Patel', 'Tilak', 'Rajendra Prasad'],
    correctAnswer: 1,
    explanation: 'Sardar Vallabhbhai Patel is known as Iron Man of India.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'History'
  },
  {
    id: 'csu3-gk-26',
    question: 'The first Governor-General of independent India was:',
    options: ['Lord Mountbatten', 'C. Rajagopalachari', 'Wavell', 'Nehru'],
    correctAnswer: 0,
    explanation: 'Lord Mountbatten served first, then Rajagopalachari became first Indian Governor-General.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'History'
  },
  {
    id: 'csu3-gk-27',
    question: 'The Green Revolution in India is associated with:',
    options: ['Milk production', 'Wheat and rice productivity', 'IT exports', 'Textile growth'],
    correctAnswer: 1,
    explanation: 'Green Revolution boosted food grain production, especially wheat and rice.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Economy'
  },
  {
    id: 'csu3-gk-28',
    question: 'Which is known as White Revolution in India?',
    options: ['Operation Flood', 'Operation Green', 'Operation Blue', 'Operation Red'],
    correctAnswer: 0,
    explanation: 'Operation Flood transformed dairy production.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Economy'
  },
  {
    id: 'csu3-gk-29',
    question: 'The largest planet of solar system is:',
    options: ['Mercury', 'Venus', 'Jupiter', 'Saturn'],
    correctAnswer: 2,
    explanation: 'Jupiter is the largest planet.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Science and Tech'
  },
  {
    id: 'csu3-gk-30',
    question: 'The nearest star to Earth is:',
    options: ['Polaris', 'Alpha Centauri', 'Sun', 'Sirius'],
    correctAnswer: 2,
    explanation: 'The Sun is the nearest star to Earth.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Science and Tech'
  },
  {
    id: 'csu3-gk-31',
    question: 'The chemical symbol of Gold is:',
    options: ['Ag', 'Au', 'Gd', 'Go'],
    correctAnswer: 1,
    explanation: 'Gold has symbol Au.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Science and Tech'
  },
  {
    id: 'csu3-gk-32',
    question: 'Human blood pH is approximately:',
    options: ['5.5', '6.8', '7.4', '8.5'],
    correctAnswer: 2,
    explanation: 'Normal blood pH is around 7.35 to 7.45.',
    subject: Subject.GK,
    difficulty: 'hard',
    topic: 'Science and Tech'
  },
  {
    id: 'csu3-gk-33',
    question: 'Vitamin C deficiency causes:',
    options: ['Rickets', 'Scurvy', 'Night blindness', 'Beriberi'],
    correctAnswer: 1,
    explanation: 'Scurvy is caused by Vitamin C deficiency.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Science and Tech'
  },
  {
    id: 'csu3-gk-34',
    question: 'The SI unit of force is:',
    options: ['Joule', 'Watt', 'Newton', 'Pascal'],
    correctAnswer: 2,
    explanation: 'Force is measured in Newton.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Science and Tech'
  },
  {
    id: 'csu3-gk-35',
    question: 'Which gas is most abundant in Earth atmosphere?',
    options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'],
    correctAnswer: 2,
    explanation: 'Nitrogen constitutes about 78% of atmosphere.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Science and Tech'
  },
  {
    id: 'csu3-gk-36',
    question: 'The national animal of India is:',
    options: ['Lion', 'Elephant', 'Tiger', 'Leopard'],
    correctAnswer: 2,
    explanation: 'Royal Bengal Tiger is the national animal.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Static GK'
  },
  {
    id: 'csu3-gk-37',
    question: 'The national bird of India is:',
    options: ['Sparrow', 'Peacock', 'Eagle', 'Parrot'],
    correctAnswer: 1,
    explanation: 'Indian peafowl (Peacock) is national bird.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Static GK'
  },
  {
    id: 'csu3-gk-38',
    question: 'The national song of India is:',
    options: ['Jana Gana Mana', 'Vande Mataram', 'Saare Jahan Se Achha', 'Ae Mere Watan Ke Logon'],
    correctAnswer: 1,
    explanation: 'Vande Mataram is the national song.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Static GK'
  },
  {
    id: 'csu3-gk-39',
    question: 'The largest democracy in the world is:',
    options: ['USA', 'India', 'Indonesia', 'Brazil'],
    correctAnswer: 1,
    explanation: 'India is regarded as the largest democracy by population.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'World GK'
  },
  {
    id: 'csu3-gk-40',
    question: 'UNO was established in:',
    options: ['1919', '1945', '1950', '1962'],
    correctAnswer: 1,
    explanation: 'United Nations was founded in 1945.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'World GK'
  },
  {
    id: 'csu3-gk-41',
    question: 'The headquarters of WHO is in:',
    options: ['Paris', 'Geneva', 'New York', 'Rome'],
    correctAnswer: 1,
    explanation: 'WHO headquarters is in Geneva.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'World GK'
  },
  {
    id: 'csu3-gk-42',
    question: 'The only planet known to support life is:',
    options: ['Mars', 'Earth', 'Venus', 'Jupiter'],
    correctAnswer: 1,
    explanation: 'Earth is the only known planet with life.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Science and Tech'
  },
  {
    id: 'csu3-gk-43',
    question: 'The tropic passing through the middle of India is:',
    options: ['Tropic of Capricorn', 'Equator', 'Tropic of Cancer', 'Arctic Circle'],
    correctAnswer: 2,
    explanation: 'Tropic of Cancer crosses central India.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Geography'
  },
  {
    id: 'csu3-gk-44',
    question: 'The largest continent is:',
    options: ['Africa', 'Europe', 'Asia', 'North America'],
    correctAnswer: 2,
    explanation: 'Asia is the largest continent by area and population.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'World GK'
  },
  {
    id: 'csu3-gk-45',
    question: 'Which city is known as the financial capital of India?',
    options: ['New Delhi', 'Mumbai', 'Kolkata', 'Bengaluru'],
    correctAnswer: 1,
    explanation: 'Mumbai is widely recognized as the financial capital of India.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Static GK'
  },
  {
    id: 'csu3-gk-46',
    question: 'Panchayati Raj in India is related to:',
    options: ['Urban local bodies', 'Rural local self-government', 'Judicial reforms', 'Tax reforms'],
    correctAnswer: 1,
    explanation: 'Panchayati Raj governs local self-government in rural areas.',
    subject: Subject.GK,
    difficulty: 'easy',
    topic: 'Indian Polity'
  },
  {
    id: 'csu3-gk-47',
    question: 'Municipal governance in urban areas is strengthened by:',
    options: ['73rd Amendment', '74th Amendment', '42nd Amendment', '44th Amendment'],
    correctAnswer: 1,
    explanation: '74th Amendment deals with urban local bodies.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Indian Polity'
  },
  {
    id: 'csu3-gk-48',
    question: 'The anti-defection law was added by which amendment?',
    options: ['42nd', '44th', '52nd', '73rd'],
    correctAnswer: 2,
    explanation: '52nd Amendment (1985) introduced anti-defection provisions.',
    subject: Subject.GK,
    difficulty: 'hard',
    topic: 'Indian Polity'
  },
  {
    id: 'csu3-gk-49',
    question: 'The Right to Education Act generally covers children in age group:',
    options: ['3 to 6', '6 to 14', '8 to 16', '10 to 18'],
    correctAnswer: 1,
    explanation: 'RTE operationally covers children from 6 to 14 years.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Indian Polity'
  },
  {
    id: 'csu3-gk-50',
    question: 'The election of President of India is conducted by:',
    options: ['Election Commission and electoral college', 'Supreme Court', 'Lok Sabha directly', 'Rajya Sabha only'],
    correctAnswer: 0,
    explanation: 'Election is by an electoral college and administered under ECI framework.',
    subject: Subject.GK,
    difficulty: 'medium',
    topic: 'Indian Polity'
  },

  // Logical Reasoning (50)
  {
    id: 'csu3-lr-1',
    question: 'If all A are B and all B are C, then:',
    options: ['All C are A', 'All A are C', 'Some C are A only', 'No A are C'],
    correctAnswer: 1,
    explanation: 'Transitivity: A subset B subset C implies all A are C.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Syllogism'
  },
  {
    id: 'csu3-lr-2',
    question: 'Series: 3, 6, 12, 24, ?',
    options: ['36', '42', '48', '60'],
    correctAnswer: 2,
    explanation: 'Each term doubles: 24 x 2 = 48.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Number Series'
  },
  {
    id: 'csu3-lr-3',
    question: 'A is brother of B. B is sister of C. C is father of D. A is D\'s:',
    options: ['Uncle', 'Father', 'Grandfather', 'Cousin'],
    correctAnswer: 0,
    explanation: 'A is sibling of C; therefore A is paternal uncle of D.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Blood Relations'
  },
  {
    id: 'csu3-lr-4',
    question: 'If DELHI is coded as EFMIJ, MUMBAI will be coded as:',
    options: ['NVNCBJ', 'NVMCBJ', 'MVNCBJ', 'OVNCBJ'],
    correctAnswer: 0,
    explanation: 'Each letter shifts +1: M->N, U->V, M->N, B->C, A->B, I->J.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Coding-Decoding'
  },
  {
    id: 'csu3-lr-5',
    question: 'If today is Wednesday, day after tomorrow is:',
    options: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
    correctAnswer: 1,
    explanation: 'Wednesday + 2 days = Friday.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Calendar Reasoning'
  },
  {
    id: 'csu3-lr-6',
    question: 'Pointing to a woman, Raj says: "She is the daughter of my mother\'s only son." The woman is Raj\'s:',
    options: ['Sister', 'Daughter', 'Niece', 'Mother'],
    correctAnswer: 1,
    explanation: 'Raj\'s mother\'s only son is Raj. So the woman is Raj\'s daughter.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Blood Relations'
  },
  {
    id: 'csu3-lr-7',
    question: 'Find odd one: 2, 3, 5, 9, 11',
    options: ['2', '3', '5', '9'],
    correctAnswer: 3,
    explanation: '9 is not prime while others are prime.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Odd One Out'
  },
  {
    id: 'csu3-lr-8',
    question: 'At what angle are clock hands at 6:00?',
    options: ['0 degree', '90 degree', '180 degree', '270 degree'],
    correctAnswer: 2,
    explanation: 'At 6:00, minute hand at 12 and hour hand at 6; angle is 180 degree.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Clock Reasoning'
  },
  {
    id: 'csu3-lr-9',
    question: 'If P is east of Q and R is north of P, then R is:',
    options: ['North of Q', 'North-East of Q', 'South-East of Q', 'West of Q'],
    correctAnswer: 1,
    explanation: 'From Q go east to P, then north to R. So R is north-east of Q.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Direction Sense'
  },
  {
    id: 'csu3-lr-10',
    question: 'In a row, A is 7th from left and 12th from right. Total persons:',
    options: ['17', '18', '19', '20'],
    correctAnswer: 1,
    explanation: 'Total = 7 + 12 - 1 = 18.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Ordering'
  },
  {
    id: 'csu3-lr-11',
    question: 'Statement: Some books are pens. Conclusion: Some pens are books.',
    options: ['Follows', 'Does not follow', 'Either or', 'Cannot say'],
    correctAnswer: 0,
    explanation: 'Some A are B implies some B are A.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Syllogism'
  },
  {
    id: 'csu3-lr-12',
    question: 'Series: 1, 4, 9, 16, ?',
    options: ['20', '24', '25', '27'],
    correctAnswer: 2,
    explanation: 'Perfect squares: 1^2, 2^2, 3^2, 4^2, 5^2.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Number Series'
  },
  {
    id: 'csu3-lr-13',
    question: 'If A=1, B=2 ... then CAB =',
    options: ['6', '5', '4', '3'],
    correctAnswer: 0,
    explanation: 'C(3) + A(1) + B(2) = 6.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Coding-Decoding'
  },
  {
    id: 'csu3-lr-14',
    question: 'Which is the mirror image-friendly pair?',
    options: ['b and d', 'p and q', 'M and W', 'All of these'],
    correctAnswer: 3,
    explanation: 'These pairs are commonly tested for mirror/symmetry transformation logic.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Non-Verbal Reasoning'
  },
  {
    id: 'csu3-lr-15',
    question: 'If all cats are animals and some animals are wild, then:',
    options: ['Some cats are wild', 'All wild are cats', 'No cat is wild', 'Cannot be determined for cats-wild relation'],
    correctAnswer: 3,
    explanation: 'No definite overlap between cats and wild given.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Syllogism'
  },
  {
    id: 'csu3-lr-16',
    question: 'Find next: Z, X, V, T, ?',
    options: ['R', 'Q', 'S', 'P'],
    correctAnswer: 0,
    explanation: 'Alphabet decreases by 2 each time: Z, X, V, T, R.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Letter Series'
  },
  {
    id: 'csu3-lr-17',
    question: 'If 8 men complete a work in 15 days, 12 men will complete it in:',
    options: ['8 days', '9 days', '10 days', '12 days'],
    correctAnswer: 2,
    explanation: 'Men x days constant => 8x15 = 12xD => D=10.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Analytical Reasoning'
  },
  {
    id: 'csu3-lr-18',
    question: 'In a class of 40, Riya is 15th from top. Rank from bottom:',
    options: ['24th', '25th', '26th', '27th'],
    correctAnswer: 2,
    explanation: 'Bottom rank = 40 - 15 + 1 = 26.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Ordering'
  },
  {
    id: 'csu3-lr-19',
    question: 'Choose odd one: Triangle, Square, Circle, Cube',
    options: ['Triangle', 'Square', 'Circle', 'Cube'],
    correctAnswer: 3,
    explanation: 'Cube is 3D whereas others are 2D figures.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Odd One Out'
  },
  {
    id: 'csu3-lr-20',
    question: 'At 9:00, smaller angle between clock hands is:',
    options: ['90 degree', '180 degree', '135 degree', '120 degree'],
    correctAnswer: 0,
    explanation: 'Hour hand at 9, minute at 12 gives 90 degree.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Clock Reasoning'
  },
  {
    id: 'csu3-lr-21',
    question: 'If NORTH is coded as OPSUI, SOUTH is coded as:',
    options: ['TPVUI', 'TPWUI', 'SPVTH', 'TQVUI'],
    correctAnswer: 0,
    explanation: 'Each letter shifts +1. S->T O->P U->V T->U H->I.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Coding-Decoding'
  },
  {
    id: 'csu3-lr-22',
    question: 'A is to the west of B. C is to the east of B. Then A is to the ___ of C.',
    options: ['east', 'west', 'north', 'south'],
    correctAnswer: 1,
    explanation: 'If C is east of B and A west of B, then A is west of C.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Direction Sense'
  },
  {
    id: 'csu3-lr-23',
    question: 'Find missing: 7, 14, 28, 56, ?',
    options: ['84', '98', '112', '124'],
    correctAnswer: 2,
    explanation: 'Each term doubles; 56 x 2 = 112.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Number Series'
  },
  {
    id: 'csu3-lr-24',
    question: 'If all roses are flowers and all flowers are plants, then all roses are plants is:',
    options: ['True', 'False', 'Partly true', 'Can\'t say'],
    correctAnswer: 0,
    explanation: 'By transitive inclusion, all roses are plants.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Syllogism'
  },
  {
    id: 'csu3-lr-25',
    question: 'In a queue, K is 9th from front and 11th from back. Total people are:',
    options: ['19', '20', '21', '22'],
    correctAnswer: 0,
    explanation: 'Total = 9 + 11 - 1 = 19.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Ordering'
  },
  {
    id: 'csu3-lr-26',
    question: 'The day before yesterday was Monday. Today is:',
    options: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    correctAnswer: 1,
    explanation: 'If day before yesterday was Monday, yesterday Tuesday, today Wednesday.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Calendar Reasoning'
  },
  {
    id: 'csu3-lr-27',
    question: 'Choose odd pair: 1-1, 2-4, 3-9, 4-18',
    options: ['1-1', '2-4', '3-9', '4-18'],
    correctAnswer: 3,
    explanation: 'Pattern n-n^2, so 4 should map to 16 not 18.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Odd One Out'
  },
  {
    id: 'csu3-lr-28',
    question: 'At 12:30, smaller angle between hands is:',
    options: ['180 degree', '165 degree', '150 degree', '175 degree'],
    correctAnswer: 1,
    explanation: 'Hour hand at 12.5 marks (15 degree), minute at 180 degree. Difference 165 degree.',
    subject: Subject.LogicalReasoning,
    difficulty: 'hard',
    topic: 'Clock Reasoning'
  },
  {
    id: 'csu3-lr-29',
    question: 'If P means +, Q means -, R means x, S means / then 12 R 2 P 4 =',
    options: ['20', '28', '30', '16'],
    correctAnswer: 1,
    explanation: '12 x 2 + 4 = 24 + 4 = 28.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Symbolic Reasoning'
  },
  {
    id: 'csu3-lr-30',
    question: 'A statement that is both relevant and supports the issue strongly is:',
    options: ['Weak argument', 'Strong argument', 'Assumption', 'Conclusion'],
    correctAnswer: 1,
    explanation: 'In argument strength questions, relevance plus direct support is strong argument.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Critical Reasoning'
  },
  {
    id: 'csu3-lr-31',
    question: 'Mirror image of 2:35 would appear as approximately:',
    options: ['9:25', '9:35', '8:25', '8:35'],
    correctAnswer: 0,
    explanation: 'Mirror time rule around 11:60 gives 11:60 - 2:35 = 9:25.',
    subject: Subject.LogicalReasoning,
    difficulty: 'hard',
    topic: 'Clock Reasoning'
  },
  {
    id: 'csu3-lr-32',
    question: 'Find next term: 5, 10, 20, 40, ?',
    options: ['60', '70', '80', '90'],
    correctAnswer: 2,
    explanation: 'Terms double successively.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Number Series'
  },
  {
    id: 'csu3-lr-33',
    question: 'If all mangoes are fruits and some fruits are yellow, then some mangoes are yellow is:',
    options: ['Definitely true', 'Definitely false', 'Cannot be determined', 'Both true and false'],
    correctAnswer: 2,
    explanation: 'No guaranteed overlap between mango set and yellow-fruit subset.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Syllogism'
  },
  {
    id: 'csu3-lr-34',
    question: 'Ravi walks north 5 km, east 3 km, south 5 km. He is now:',
    options: ['3 km east of start', '3 km west of start', '5 km north', '5 km south'],
    correctAnswer: 0,
    explanation: 'North and south cancel, net 3 km east.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Direction Sense'
  },
  {
    id: 'csu3-lr-35',
    question: 'Which one differs by category?',
    options: ['January', 'March', 'May', 'Monday'],
    correctAnswer: 3,
    explanation: 'Three are months, Monday is a weekday.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Odd One Out'
  },
  {
    id: 'csu3-lr-36',
    question: 'In code, PEN = 35 and BOOK = 43. If letters valued by alphabet positions, this indicates:',
    options: ['Sum of positions', 'Difference of positions', 'Product of positions', 'Random code'],
    correctAnswer: 0,
    explanation: 'PEN => 16+5+14=35, BOOK => 2+15+15+11=43.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Coding-Decoding'
  },
  {
    id: 'csu3-lr-37',
    question: 'If 1st Jan is Friday, what is day on 1st Feb (non-leap year)?',
    options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'],
    correctAnswer: 1,
    explanation: '31 days means +3 days from Friday -> Monday.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Calendar Reasoning'
  },
  {
    id: 'csu3-lr-38',
    question: 'In a group, M is taller than N but shorter than O. N is taller than P. Who is shortest?',
    options: ['M', 'N', 'O', 'P'],
    correctAnswer: 3,
    explanation: 'Order: O > M > N > P.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Ordering'
  },
  {
    id: 'csu3-lr-39',
    question: 'Choose the option that completes pattern: AB, DE, GH, ?',
    options: ['IJ', 'JK', 'KL', 'LM'],
    correctAnswer: 1,
    explanation: 'Pairs start at A, D, G, J with +3 progression.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Letter Series'
  },
  {
    id: 'csu3-lr-40',
    question: 'A clock gains 5 minutes every hour. In 6 hours, it gains:',
    options: ['20 min', '25 min', '30 min', '35 min'],
    correctAnswer: 2,
    explanation: '5 x 6 = 30 minutes.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Analytical Reasoning'
  },
  {
    id: 'csu3-lr-41',
    question: 'Statement: No bird is mammal. Some mammals are pets. Conclusion: Some pets are not birds.',
    options: ['Follows', 'Does not follow', 'Cannot be determined', 'None'],
    correctAnswer: 0,
    explanation: 'Some pets are mammals and no mammal is bird, so those pets are not birds.',
    subject: Subject.LogicalReasoning,
    difficulty: 'hard',
    topic: 'Syllogism'
  },
  {
    id: 'csu3-lr-42',
    question: 'If all teachers are educated and some educated are writers, then some teachers are writers is:',
    options: ['Definitely true', 'Definitely false', 'Cannot be determined', 'Always true'],
    correctAnswer: 2,
    explanation: 'No guaranteed overlap between teachers and writers.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Syllogism'
  },
  {
    id: 'csu3-lr-43',
    question: 'Find missing number: 11, 13, 17, 19, ?',
    options: ['21', '23', '25', '27'],
    correctAnswer: 1,
    explanation: 'Sequence of prime numbers.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Number Series'
  },
  {
    id: 'csu3-lr-44',
    question: 'A man faces west. He turns right, then right, then left. Final direction:',
    options: ['North', 'South', 'East', 'West'],
    correctAnswer: 0,
    explanation: 'West -> right to North -> right to East -> left to North.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Direction Sense'
  },
  {
    id: 'csu3-lr-45',
    question: 'Which one is not related to others?',
    options: ['Judge', 'Lawyer', 'Doctor', 'Court'],
    correctAnswer: 2,
    explanation: 'Doctor is not directly associated with legal profession set.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Odd One Out'
  },
  {
    id: 'csu3-lr-46',
    question: 'In an exam, A scores more than B, B more than C, C more than D. Highest is:',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Given ranking directly implies A highest.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Ordering'
  },
  {
    id: 'csu3-lr-47',
    question: 'Find the odd term: 6, 12, 18, 25, 30',
    options: ['6', '12', '18', '25'],
    correctAnswer: 3,
    explanation: 'All except 25 are multiples of 6.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Odd One Out'
  },
  {
    id: 'csu3-lr-48',
    question: 'If CAT=24 and DOG=26 by code sum, then BAT=',
    options: ['22', '23', '24', '25'],
    correctAnswer: 1,
    explanation: 'B(2)+A(1)+T(20)=23.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Coding-Decoding'
  },
  {
    id: 'csu3-lr-49',
    question: 'A statement accepted without proof in argument analysis is:',
    options: ['Conclusion', 'Fact', 'Assumption', 'Inference'],
    correctAnswer: 2,
    explanation: 'Assumption is an unstated premise accepted as true.',
    subject: Subject.LogicalReasoning,
    difficulty: 'medium',
    topic: 'Critical Reasoning'
  },
  {
    id: 'csu3-lr-50',
    question: 'If x > y and y > z, which must be true?',
    options: ['x < z', 'x = z', 'x > z', 'y < z'],
    correctAnswer: 2,
    explanation: 'By transitive relation, x is greater than z.',
    subject: Subject.LogicalReasoning,
    difficulty: 'easy',
    topic: 'Analytical Reasoning'
  }
];
