// Reading Comprehension Passages for MH CET Law English Section
import { Subject } from '../types';

export interface RCPassage {
  id: string;
  title: string;
  passage: string;
  questions: RCQuestion[];
  difficulty: 'easy' | 'medium' | 'hard';
  wordCount: number;
  topic: string;
}

export interface RCQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: 'factual' | 'inferential' | 'vocabulary' | 'main-idea' | 'tone';
}

export const RC_PASSAGES: RCPassage[] = [
  // ============ LEGAL/JUDICIAL PASSAGES ============
  {
    id: 'rc-legal-1',
    title: 'Access to Justice',
    passage: `Access to justice is a fundamental right enshrined in various international human rights instruments and national constitutions. It encompasses not merely the right to approach a court but includes the right to a fair hearing, the right to legal representation, and the right to an effective remedy. In developing countries, several barriers impede access to justice: geographical remoteness, prohibitive costs, complex procedures, and a shortage of legal professionals.

The concept of legal aid emerged as a response to these barriers. Legal aid refers to the provision of assistance to people who are unable to afford legal representation and access to the court system. In India, Article 39A of the Constitution directs the State to ensure that the operation of the legal system promotes justice and ensures that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities.

The Legal Services Authorities Act, 1987, was enacted to give effect to this constitutional mandate. It established a nationwide uniform network of legal services authorities to provide free legal services to the weaker sections of society. The Act covers persons belonging to Scheduled Castes and Scheduled Tribes, women and children, victims of trafficking, persons with disabilities, industrial workmen, and those earning less than the specified income ceiling.

However, despite these provisions, the effectiveness of legal aid remains questionable. Studies indicate that awareness about legal aid services is abysmally low among the target beneficiaries. Moreover, the quality of legal representation provided is often inadequate due to overburdened lawyers and insufficient remuneration. The pendency of cases in Indian courts, running into millions, further compounds the problem.`,
    questions: [
      {
        id: 'rc-l1-q1',
        question: 'According to the passage, access to justice includes:',
        options: [
          'Only the right to approach a court',
          'Right to approach court, fair hearing, legal representation, and effective remedy',
          'Right to free legal services only',
          'Right to appeal in higher courts'
        ],
        correctAnswer: 1,
        explanation: 'The passage states that access to justice "encompasses not merely the right to approach a court but includes the right to a fair hearing, the right to legal representation, and the right to an effective remedy."',
        type: 'factual'
      },
      {
        id: 'rc-l1-q2',
        question: 'Which Article of the Indian Constitution relates to legal aid?',
        options: [
          'Article 21',
          'Article 32',
          'Article 39A',
          'Article 44'
        ],
        correctAnswer: 2,
        explanation: 'The passage explicitly mentions "Article 39A of the Constitution directs the State to ensure that the operation of the legal system promotes justice."',
        type: 'factual'
      },
      {
        id: 'rc-l1-q3',
        question: 'What is the main reason for questioning the effectiveness of legal aid?',
        options: [
          'Lack of constitutional mandate',
          'Insufficient number of courts',
          'Low awareness among beneficiaries and inadequate quality of representation',
          'High fees charged by legal aid lawyers'
        ],
        correctAnswer: 2,
        explanation: 'The passage states "awareness about legal aid services is abysmally low" and "quality of legal representation provided is often inadequate."',
        type: 'inferential'
      },
      {
        id: 'rc-l1-q4',
        question: 'The word "abysmally" in the passage most nearly means:',
        options: [
          'Surprisingly',
          'Extremely low or bad',
          'Moderately',
          'Considerably'
        ],
        correctAnswer: 1,
        explanation: '"Abysmally" means extremely bad or to an extreme degree (from "abyss" meaning bottomless pit).',
        type: 'vocabulary'
      },
      {
        id: 'rc-l1-q5',
        question: 'The tone of the passage towards legal aid in India is:',
        options: [
          'Entirely positive and optimistic',
          'Harshly critical without acknowledgment of efforts',
          'Balanced - acknowledging efforts while highlighting shortcomings',
          'Indifferent and detached'
        ],
        correctAnswer: 2,
        explanation: 'The passage acknowledges constitutional provisions and legislative efforts but also highlights problems like low awareness and poor quality, making it balanced.',
        type: 'tone'
      }
    ],
    difficulty: 'medium',
    wordCount: 340,
    topic: 'Legal Rights'
  },
  {
    id: 'rc-legal-2',
    title: 'Judicial Independence',
    passage: `Judicial independence is the cornerstone of a democratic society governed by the rule of law. It refers to the principle that the judiciary should be independent from the other branches of government—the executive and the legislature. This independence ensures that judges can make decisions based solely on law and facts, without external pressure or influence.

The importance of judicial independence cannot be overstated. It serves as a check on the powers of the executive and legislature, protecting citizens' rights from governmental overreach. An independent judiciary can strike down unconstitutional laws and executive actions, thereby upholding the supremacy of the constitution. Furthermore, it instills public confidence in the legal system, as people believe their disputes will be resolved impartially.

Several safeguards protect judicial independence in India. First, judges of the Supreme Court and High Courts are appointed through a collegium system, reducing executive influence in the selection process. Second, they have security of tenure—Supreme Court judges serve until age 65 and High Court judges until 62, removable only through a rigorous impeachment process. Third, their salaries and conditions of service cannot be varied to their disadvantage after appointment.

However, judicial independence faces several threats. Executive interference, though subtle, manifests through delayed appointments, transfers of inconvenient judges, and post-retirement appointments. The increasing backlog of cases puts pressure on judges to expedite proceedings, potentially compromising the quality of justice. Media trials and public pressure on high-profile cases can also influence judicial thinking.

Maintaining judicial independence requires constant vigilance. The judiciary must be self-reflective and transparent, addressing issues of accountability without compromising independence. A balance must be struck between judicial independence and judicial accountability—judges must be independent in their decision-making but accountable for judicial misconduct.`,
    questions: [
      {
        id: 'rc-l2-q1',
        question: 'What is the primary purpose of judicial independence according to the passage?',
        options: [
          'To make judiciary more powerful than other branches',
          'To enable judges to decide cases based solely on law and facts',
          'To delay government projects',
          'To increase the salary of judges'
        ],
        correctAnswer: 1,
        explanation: 'The passage states judicial independence "ensures that judges can make decisions based solely on law and facts, without external pressure or influence."',
        type: 'main-idea'
      },
      {
        id: 'rc-l2-q2',
        question: 'Which of the following is NOT mentioned as a safeguard for judicial independence in India?',
        options: [
          'Collegium system for appointments',
          'Security of tenure',
          'Protection of salary and conditions',
          'Direct election of judges by people'
        ],
        correctAnswer: 3,
        explanation: 'The passage mentions collegium, tenure security, and salary protection as safeguards. Election of judges is not mentioned anywhere.',
        type: 'factual'
      },
      {
        id: 'rc-l2-q3',
        question: 'According to the passage, how does executive interference manifest?',
        options: [
          'Through direct orders to judges',
          'Through delayed appointments and transfers of judges',
          'Through reducing judicial salaries',
          'Through abolishing courts'
        ],
        correctAnswer: 1,
        explanation: 'The passage states executive interference "manifests through delayed appointments, transfers of inconvenient judges, and post-retirement appointments."',
        type: 'factual'
      },
      {
        id: 'rc-l2-q4',
        question: 'The word "overreach" in the passage means:',
        options: [
          'Physical extension',
          'Exceeding proper limits or boundaries',
          'Reaching out to help',
          'Financial expenditure'
        ],
        correctAnswer: 1,
        explanation: 'In the context of government, "overreach" means exceeding the proper or legitimate limits of authority or power.',
        type: 'vocabulary'
      },
      {
        id: 'rc-l2-q5',
        question: 'What does the passage suggest about judicial independence and accountability?',
        options: [
          'They are mutually exclusive concepts',
          'Accountability should be prioritized over independence',
          'A balance must be struck between the two',
          'Independence makes accountability unnecessary'
        ],
        correctAnswer: 2,
        explanation: 'The passage concludes "A balance must be struck between judicial independence and judicial accountability."',
        type: 'inferential'
      }
    ],
    difficulty: 'hard',
    wordCount: 380,
    topic: 'Judiciary'
  },
  
  // ============ SOCIAL ISSUES PASSAGES ============
  {
    id: 'rc-social-1',
    title: 'Education and Social Mobility',
    passage: `Education has long been recognized as the great equalizer, a powerful tool for social mobility that can break the cycle of poverty and create opportunities for individuals regardless of their socioeconomic background. The relationship between education and social mobility is well-documented: higher levels of education typically correlate with better employment prospects, higher income, and improved quality of life.

In India, education was historically restricted to certain castes and classes, perpetuating social hierarchies across generations. The Constitution of India, recognizing this historical injustice, included provisions for educational equality. Article 21A guarantees the right to education for children aged 6 to 14, while Article 46 directs the State to promote educational interests of weaker sections.

The Right to Education Act, 2009, marked a paradigm shift by making elementary education a fundamental right. It mandates 25% reservation in private schools for children from economically weaker sections and disadvantaged groups. Additionally, various scholarship schemes and reservation policies in higher education aim to ensure that quality education reaches all sections of society.

Despite these efforts, significant disparities persist. The quality of education in government schools, where the majority of poor children study, often lags behind private institutions. First-generation learners face unique challenges—lack of guidance, linguistic barriers, and absence of educational resources at home. The digital divide has been further exposed by the COVID-19 pandemic, where online education remained inaccessible to millions without internet connectivity or devices.

True social mobility through education requires not just access but quality and relevance. Skill-based education aligned with market demands, vocational training programs, and career counseling can make education more meaningful for social advancement. Furthermore, affirmative action must be complemented by support systems that help disadvantaged students not just enter but succeed in educational institutions.`,
    questions: [
      {
        id: 'rc-s1-q1',
        question: 'Why is education called "the great equalizer" in the passage?',
        options: [
          'Because it makes everyone equal in intelligence',
          'Because it can help break poverty cycles and create opportunities regardless of background',
          'Because it provides equal marks to all students',
          'Because it removes all social differences immediately'
        ],
        correctAnswer: 1,
        explanation: 'The passage states education is "a powerful tool for social mobility that can break the cycle of poverty and create opportunities for individuals regardless of their socioeconomic background."',
        type: 'inferential'
      },
      {
        id: 'rc-s1-q2',
        question: 'What does the Right to Education Act, 2009 mandate regarding private schools?',
        options: [
          'Complete nationalization of private schools',
          '25% reservation for economically weaker sections',
          '50% fee reduction for all students',
          'Free education for all children'
        ],
        correctAnswer: 1,
        explanation: 'The passage explicitly states the Act "mandates 25% reservation in private schools for children from economically weaker sections."',
        type: 'factual'
      },
      {
        id: 'rc-s1-q3',
        question: 'The phrase "paradigm shift" in the passage suggests:',
        options: [
          'A minor adjustment in policy',
          'A fundamental change in approach or thinking',
          'A shift in exam patterns',
          'A change in school timings'
        ],
        correctAnswer: 1,
        explanation: '"Paradigm shift" refers to a fundamental change in approach or underlying assumptions—here, making education a fundamental right was a major change from previous policy.',
        type: 'vocabulary'
      },
      {
        id: 'rc-s1-q4',
        question: 'According to the passage, what problem did COVID-19 expose?',
        options: [
          'Lack of teachers',
          'Digital divide affecting online education access',
          'Shortage of textbooks',
          'Absence of examination system'
        ],
        correctAnswer: 1,
        explanation: 'The passage states "The digital divide has been further exposed by the COVID-19 pandemic, where online education remained inaccessible to millions."',
        type: 'factual'
      },
      {
        id: 'rc-s1-q5',
        question: 'What does the author suggest is needed for "true social mobility through education"?',
        options: [
          'Only access to schools',
          'Only reservation in jobs',
          'Access, quality, relevance, skill-based education, and support systems',
          'Complete abolition of private education'
        ],
        correctAnswer: 2,
        explanation: 'The passage suggests "not just access but quality and relevance. Skill-based education...vocational training...affirmative action must be complemented by support systems."',
        type: 'main-idea'
      }
    ],
    difficulty: 'medium',
    wordCount: 365,
    topic: 'Education'
  },
  
  // ============ ENVIRONMENTAL PASSAGES ============
  {
    id: 'rc-env-1',
    title: 'Environmental Justice',
    passage: `Environmental justice is a concept that emerged in the 1980s, recognizing that environmental burdens such as pollution, hazardous waste sites, and industrial facilities are disproportionately located in communities inhabited by poor and minority populations. It seeks to ensure fair treatment and meaningful involvement of all people regardless of race, color, national origin, or income in environmental decision-making.

In India, the intersection of environmental degradation and social inequality is starkly visible. Tribal communities dependent on forests for their livelihoods face displacement due to mining and dam projects. Urban slum dwellers, often living near industrial zones or waste dumping sites, suffer from higher rates of respiratory diseases and other health problems. Coastal fishing communities see their traditional livelihoods threatened by both climate change and industrial pollution.

The Indian judiciary has played a significant role in environmental justice through Public Interest Litigation (PIL). In the landmark MC Mehta cases, the Supreme Court addressed issues from industrial pollution in Delhi to cleaning of the Ganges. The Court has recognized the right to a clean environment as part of the right to life under Article 21. The National Green Tribunal, established in 2010, provides a specialized forum for environmental disputes.

However, environmental justice remains elusive for many. Environmental Impact Assessments (EIAs) are often perfunctory, failing to adequately consult affected communities. The promise of corporate social responsibility rarely reaches those most impacted by industrial operations. Climate change adaptation measures seldom prioritize the most vulnerable.

Achieving environmental justice requires a multi-pronged approach: strengthening community participation in environmental governance, ensuring rigorous and transparent EIAs, holding polluters accountable through the "polluter pays" principle, and integrating climate justice into adaptation planning. Most importantly, it requires recognizing that environmental rights are human rights, and that protecting the environment is inseparable from protecting human dignity.`,
    questions: [
      {
        id: 'rc-e1-q1',
        question: 'What is the core concern of environmental justice?',
        options: [
          'Protecting only wildlife',
          'Fair distribution of environmental burdens across all communities',
          'Promoting industrial development',
          'Preventing all forms of pollution'
        ],
        correctAnswer: 1,
        explanation: 'The passage explains environmental justice "seeks to ensure fair treatment...of all people regardless of race, color, national origin, or income" regarding environmental burdens.',
        type: 'main-idea'
      },
      {
        id: 'rc-e1-q2',
        question: 'Which of the following communities is NOT mentioned as facing environmental injustice in India?',
        options: [
          'Tribal communities',
          'Urban slum dwellers',
          'Coastal fishing communities',
          'Urban middle-class residents'
        ],
        correctAnswer: 3,
        explanation: 'The passage mentions tribal communities, urban slum dwellers, and coastal fishing communities, but does not mention urban middle-class residents.',
        type: 'factual'
      },
      {
        id: 'rc-e1-q3',
        question: 'The word "perfunctory" in the passage most nearly means:',
        options: [
          'Thorough and detailed',
          'Done routinely without care or interest',
          'Highly technical',
          'Completely rejected'
        ],
        correctAnswer: 1,
        explanation: '"Perfunctory" means carried out with minimum effort or without genuine interest—the passage criticizes EIAs as inadequate.',
        type: 'vocabulary'
      },
      {
        id: 'rc-e1-q4',
        question: 'According to the passage, which body provides specialized forum for environmental disputes in India?',
        options: [
          'Supreme Court only',
          'High Courts',
          'National Green Tribunal',
          'District Courts'
        ],
        correctAnswer: 2,
        explanation: 'The passage states "The National Green Tribunal, established in 2010, provides a specialized forum for environmental disputes."',
        type: 'factual'
      },
      {
        id: 'rc-e1-q5',
        question: 'What is the author\'s final argument about environmental rights?',
        options: [
          'They should be separate from human rights',
          'They are less important than economic development',
          'They are human rights inseparable from human dignity',
          'They apply only to urban areas'
        ],
        correctAnswer: 2,
        explanation: 'The passage concludes "recognizing that environmental rights are human rights, and that protecting the environment is inseparable from protecting human dignity."',
        type: 'inferential'
      }
    ],
    difficulty: 'hard',
    wordCount: 385,
    topic: 'Environment'
  },
  
  // ============ GENERAL/PHILOSOPHY PASSAGES ============
  {
    id: 'rc-phil-1',
    title: 'Justice and Fairness',
    passage: `The concept of justice has occupied philosophers since ancient times. Plato conceived justice as harmony—each part of society performing its designated function. Aristotle distinguished between distributive justice (fair allocation of goods) and corrective justice (rectifying wrongs). In modern times, John Rawls revolutionized political philosophy with his theory of "justice as fairness."

Rawls proposed a thought experiment called the "original position" where individuals choose principles of justice behind a "veil of ignorance"—unaware of their own place in society, their natural abilities, or their conception of the good. Rawls argued that rational individuals in this position would choose two principles: first, equal basic liberties for all; and second, that social and economic inequalities should benefit the least advantaged members of society (the "difference principle").

This theory has profound implications for law and policy. It suggests that inequalities are justifiable only if they improve the condition of the worst-off. A tax system, for instance, should be evaluated not by how it affects the majority but by how it impacts the poorest. Similarly, affirmative action policies can be justified if they ultimately benefit disadvantaged groups.

Critics argue that Rawls's theory is too abstract, divorced from real-world complexities of culture, history, and community bonds. Communitarians contend that justice cannot be determined in isolation from shared values and traditions. Libertarians object that the difference principle unjustly restricts individual liberty and property rights.

Despite these criticisms, Rawls's framework remains influential. It provides a powerful tool for evaluating the fairness of social institutions. In a world of growing inequality, his insistence that justice requires attention to the least advantaged resonates strongly. Whether in debates about healthcare, education, or criminal justice reform, Rawlsian principles offer a compelling benchmark for assessing fairness.`,
    questions: [
      {
        id: 'rc-p1-q1',
        question: 'According to the passage, what is the "veil of ignorance" in Rawls\'s theory?',
        options: [
          'A physical barrier preventing communication',
          'Ignorance about philosophy and ethics',
          'Unawareness of one\'s own position, abilities, and values when choosing principles of justice',
          'Legal blindness requiring judges to ignore evidence'
        ],
        correctAnswer: 2,
        explanation: 'The passage explains it as individuals being "unaware of their own place in society, their natural abilities, or their conception of the good" when choosing principles.',
        type: 'factual'
      },
      {
        id: 'rc-p1-q2',
        question: 'What is Rawls\'s "difference principle"?',
        options: [
          'All differences between people should be eliminated',
          'Inequalities are justified only if they benefit the least advantaged',
          'Different rules should apply to different people',
          'Economic differences determine political rights'
        ],
        correctAnswer: 1,
        explanation: 'The passage states that inequalities "should benefit the least advantaged members of society (the difference principle)."',
        type: 'factual'
      },
      {
        id: 'rc-p1-q3',
        question: 'Who, according to the passage, objects to Rawls on grounds of restricting liberty and property rights?',
        options: [
          'Communitarians',
          'Plato',
          'Libertarians',
          'Aristotle'
        ],
        correctAnswer: 2,
        explanation: 'The passage states "Libertarians object that the difference principle unjustly restricts individual liberty and property rights."',
        type: 'factual'
      },
      {
        id: 'rc-p1-q4',
        question: 'What is the main criticism of communitarians against Rawls?',
        options: [
          'His theory is too practical',
          'He ignores economic factors',
          'Justice cannot be determined in isolation from shared values and traditions',
          'He focuses too much on the poor'
        ],
        correctAnswer: 2,
        explanation: 'The passage states "Communitarians contend that justice cannot be determined in isolation from shared values and traditions."',
        type: 'factual'
      },
      {
        id: 'rc-p1-q5',
        question: 'The overall tone of the passage towards Rawls\'s theory is:',
        options: [
          'Completely dismissive',
          'Uncritically supportive',
          'Balanced—presenting the theory, its applications, and criticisms',
          'Confused and unclear'
        ],
        correctAnswer: 2,
        explanation: 'The passage explains Rawls\'s theory, shows its applications, presents criticisms from communitarians and libertarians, but concludes noting its continued influence—a balanced approach.',
        type: 'tone'
      }
    ],
    difficulty: 'hard',
    wordCount: 370,
    topic: 'Philosophy'
  }
];

// Helper functions
export const getPassagesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): RCPassage[] => {
  return RC_PASSAGES.filter(p => p.difficulty === difficulty);
};

export const getTotalRCQuestions = (): number => {
  return RC_PASSAGES.reduce((sum, p) => sum + p.questions.length, 0);
};

export default RC_PASSAGES;
