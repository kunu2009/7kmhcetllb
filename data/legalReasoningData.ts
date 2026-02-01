// Legal Reasoning Passages and Questions for MH CET Law
import { Subject } from '../types';

export interface LegalPassage {
  id: string;
  title: string;
  principle: string;
  facts: string;
  questions: LegalReasoningQuestion[];
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export interface LegalReasoningQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const LEGAL_REASONING_PASSAGES: LegalPassage[] = [
  // ============ CONTRACT LAW ============
  {
    id: 'lr-contract-1',
    title: 'Minor\'s Agreement',
    principle: `According to Section 11 of the Indian Contract Act, 1872, every person is competent to contract who is of the age of majority according to the law to which he is subject, and who is of sound mind, and is not disqualified from contracting by any law to which he is subject. In India, the age of majority is 18 years. An agreement with a minor is void ab initio (void from the beginning) and cannot be ratified upon attaining majority.`,
    facts: `Rahul, a 17-year-old aspiring musician, entered into a contract with XYZ Music Company to produce his first album. The company advanced him ₹5,00,000 for equipment and studio time. Rahul used ₹3,00,000 for the stated purposes but spent ₹2,00,000 on personal expenses. Six months later, when Rahul turned 18, he refused to complete the album, claiming the contract was void. XYZ Music Company sued him for breach of contract and recovery of the entire amount.`,
    questions: [
      {
        id: 'lr-c1-q1',
        question: 'Is the contract between Rahul and XYZ Music Company valid?',
        options: [
          'Yes, because Rahul received benefits from the contract',
          'Yes, because Rahul ratified the contract by using the money',
          'No, because Rahul was a minor when the contract was made',
          'No, because music contracts are inherently void'
        ],
        correctAnswer: 2,
        explanation: 'A contract with a minor is void ab initio under Section 11. Rahul was 17 (minor) when the contract was made, hence it is void from the beginning.'
      },
      {
        id: 'lr-c1-q2',
        question: 'Can XYZ Music Company recover the ₹5,00,000 from Rahul?',
        options: [
          'Yes, the entire amount can be recovered',
          'Only the ₹2,00,000 spent on personal expenses can be recovered',
          'No, nothing can be recovered as the contract is void',
          'Only ₹3,00,000 used for equipment can be recovered'
        ],
        correctAnswer: 2,
        explanation: 'Under Mohori Bibee v. Dharmodas Ghose, a minor cannot be asked to refund money received under a void agreement. The minor\'s estate may be liable only for necessaries supplied.'
      },
      {
        id: 'lr-c1-q3',
        question: 'Can Rahul ratify the contract after turning 18?',
        options: [
          'Yes, if he agrees in writing',
          'Yes, if he continues to benefit from the contract',
          'No, a void contract cannot be ratified',
          'Yes, if the company agrees to new terms'
        ],
        correctAnswer: 2,
        explanation: 'A void agreement cannot be ratified. Since the original contract was void ab initio, it cannot be made valid by ratification after attaining majority. A fresh contract would be needed.'
      }
    ],
    difficulty: 'medium',
    topic: 'Contract - Capacity'
  },
  {
    id: 'lr-contract-2',
    title: 'Free Consent - Coercion',
    principle: `Section 15 of the Indian Contract Act defines coercion as committing or threatening to commit any act forbidden by the Indian Penal Code, or unlawful detaining or threatening to detain any property, with the intention of causing any person to enter into an agreement. When consent is caused by coercion, the agreement is voidable at the option of the party whose consent was so caused (Section 19).`,
    facts: `Mr. Sharma, an elderly farmer, owned a piece of agricultural land worth ₹50,00,000. His nephew Vikram threatened to file a false criminal case against Mr. Sharma's son for theft unless Mr. Sharma transferred the land to him for ₹5,00,000. Fearing public humiliation and legal harassment, Mr. Sharma signed the sale deed. Later, Mr. Sharma's son discovered the truth and advised his father to challenge the sale.`,
    questions: [
      {
        id: 'lr-c2-q1',
        question: 'Is the sale deed between Mr. Sharma and Vikram valid?',
        options: [
          'Yes, because Mr. Sharma signed it voluntarily',
          'Yes, because consideration was paid',
          'No, the contract is void',
          'The contract is voidable at Mr. Sharma\'s option'
        ],
        correctAnswer: 3,
        explanation: 'Vikram\'s threat to file a false criminal case amounts to coercion under Section 15 (threatening an IPC offense). Under Section 19, such contracts are voidable at the option of the coerced party.'
      },
      {
        id: 'lr-c2-q2',
        question: 'What remedy is available to Mr. Sharma?',
        options: [
          'He can only claim damages',
          'He can avoid the contract and claim restoration of land',
          'He must accept the contract as valid',
          'He can only file a criminal case against Vikram'
        ],
        correctAnswer: 1,
        explanation: 'Under Section 19, Mr. Sharma can avoid the contract. Under Section 64, when a contract is avoided, the party who received any advantage must restore it. He can also claim damages for any loss suffered.'
      }
    ],
    difficulty: 'medium',
    topic: 'Contract - Free Consent'
  },
  {
    id: 'lr-contract-3',
    title: 'Doctrine of Frustration',
    principle: `Section 56 of the Indian Contract Act deals with agreements to do impossible acts. If an act becomes impossible or unlawful after the contract is made, due to an event which the promisor could not prevent, the contract becomes void when the act becomes impossible or unlawful. This is known as the Doctrine of Frustration or Supervening Impossibility.`,
    facts: `ABC Events Pvt. Ltd. entered into a contract with Hotel Grand to host a wedding reception on March 20, 2020, for ₹10,00,000. A booking advance of ₹3,00,000 was paid. On March 15, 2020, the government imposed a complete lockdown due to COVID-19, prohibiting all gatherings. ABC Events demanded a full refund, while Hotel Grand offered only 50% refund citing their preparation costs.`,
    questions: [
      {
        id: 'lr-c3-q1',
        question: 'What is the status of the contract after the lockdown?',
        options: [
          'The contract remains valid and must be performed later',
          'The contract becomes voidable',
          'The contract becomes void due to frustration',
          'The contract is merely suspended'
        ],
        correctAnswer: 2,
        explanation: 'Under Section 56, the contract becomes void as performance became impossible due to government prohibition - an event neither party could prevent or foresee.'
      },
      {
        id: 'lr-c3-q2',
        question: 'Is ABC Events entitled to a refund of the advance?',
        options: [
          'Yes, full refund under Section 65',
          'No, because Hotel Grand incurred preparation costs',
          'Only 50% as offered by the hotel',
          'No refund is due as the contract is void'
        ],
        correctAnswer: 0,
        explanation: 'Section 65 states that when an agreement becomes void, any person who received any advantage under such agreement is bound to restore it. ABC Events is entitled to full refund.'
      }
    ],
    difficulty: 'hard',
    topic: 'Contract - Frustration'
  },

  // ============ TORT LAW ============
  {
    id: 'lr-tort-1',
    title: 'Negligence - Duty of Care',
    principle: `Negligence is the breach of a legal duty to take care, which results in damage to another. To establish negligence, the plaintiff must prove: (1) The defendant owed a duty of care to the plaintiff, (2) The defendant breached that duty, (3) The breach caused damage to the plaintiff. The "neighbour principle" from Donoghue v. Stevenson states that one must take reasonable care to avoid acts or omissions which could reasonably foreseeably injure one's neighbour.`,
    facts: `Dr. Mehta, a surgeon at City Hospital, performed an appendectomy on patient Seema. During the surgery, Dr. Mehta left a surgical sponge inside Seema's abdomen. Two weeks later, Seema developed severe infection and required another surgery to remove the sponge and treat the infection. She incurred additional medical expenses of ₹2,00,000 and suffered immense pain. Seema filed a case against Dr. Mehta and City Hospital.`,
    questions: [
      {
        id: 'lr-t1-q1',
        question: 'Did Dr. Mehta owe a duty of care to Seema?',
        options: [
          'No, because surgery always has risks',
          'Yes, a doctor-patient relationship creates duty of care',
          'Only if Seema paid for the surgery',
          'Only if there was a written agreement'
        ],
        correctAnswer: 1,
        explanation: 'A doctor-patient relationship automatically creates a duty of care. Dr. Mehta was legally obligated to exercise reasonable skill and care while treating Seema.'
      },
      {
        id: 'lr-t1-q2',
        question: 'Can the doctrine of "Res Ipsa Loquitur" be applied here?',
        options: [
          'No, because Seema was under anesthesia',
          'No, because some medical negligence is expected',
          'Yes, as leaving a sponge speaks for itself as negligence',
          'Yes, but only if the hospital admits fault'
        ],
        correctAnswer: 2,
        explanation: 'Res ipsa loquitur applies when: (1) the thing was in defendant\'s control, (2) the accident wouldn\'t happen without negligence. A surgical sponge left inside clearly indicates negligence without further proof.'
      },
      {
        id: 'lr-t1-q3',
        question: 'Is City Hospital also liable for Dr. Mehta\'s negligence?',
        options: [
          'No, only the doctor is personally liable',
          'Yes, under the principle of vicarious liability',
          'Only if the hospital was negligent in hiring Dr. Mehta',
          'No, because Dr. Mehta is an independent professional'
        ],
        correctAnswer: 1,
        explanation: 'Under vicarious liability (respondeat superior), an employer is liable for the torts of employees committed during the course of employment. City Hospital is vicariously liable for Dr. Mehta\'s negligence.'
      }
    ],
    difficulty: 'medium',
    topic: 'Tort - Negligence'
  },
  {
    id: 'lr-tort-2',
    title: 'Strict Liability',
    principle: `The rule in Rylands v. Fletcher (1868) states that a person who for his own purposes brings on his land and collects and keeps there anything likely to do mischief if it escapes, must keep it at his peril, and if he does not do so, is prima facie answerable for all the damage which is the natural consequence of its escape. This is strict liability - liability without fault. In M.C. Mehta v. Union of India (Oleum Gas Leak case), the Supreme Court evolved the principle of "Absolute Liability" for enterprises engaged in inherently dangerous activities.`,
    facts: `Bharat Chemicals Ltd. operates a pesticide manufacturing plant in an industrial area. Due to a valve malfunction, toxic gas leaked from the plant and spread to a nearby residential colony. 50 residents were hospitalized with respiratory problems, and 3 elderly persons died. The residents sued Bharat Chemicals for compensation. The company argued that they had taken all reasonable precautions and the leak occurred due to an unforeseeable valve defect.`,
    questions: [
      {
        id: 'lr-t2-q1',
        question: 'Can Bharat Chemicals escape liability by proving they took reasonable care?',
        options: [
          'Yes, if they prove no negligence on their part',
          'Yes, if the valve defect was manufactured defect',
          'No, strict/absolute liability applies regardless of care taken',
          'Yes, if they have valid pollution control certificates'
        ],
        correctAnswer: 2,
        explanation: 'Under strict/absolute liability (M.C. Mehta case), industries engaged in hazardous activities are liable regardless of whether they took reasonable care. The enterprise must bear the consequences of any harm.'
      },
      {
        id: 'lr-t2-q2',
        question: 'Can the "Act of God" defense be raised here?',
        options: [
          'Yes, if the valve defect was unpredictable',
          'No, valve malfunction is not an Act of God',
          'Yes, because external factors caused the leak',
          'Only if there was an earthquake or flood'
        ],
        correctAnswer: 1,
        explanation: 'Act of God defense requires an event of natural forces without human intervention (like earthquakes, floods). A valve malfunction is a mechanical/technical failure, not an Act of God.'
      },
      {
        id: 'lr-t2-q3',
        question: 'What principle would apply to determine compensation?',
        options: [
          'Compensation should be nominal',
          'Only actual medical expenses should be paid',
          'Compensation should be proportional to company\'s capacity to pay',
          'No compensation as no negligence is proved'
        ],
        correctAnswer: 2,
        explanation: 'Under M.C. Mehta\'s absolute liability, compensation must be correlated to the magnitude and capacity of the enterprise so that it has a deterrent effect.'
      }
    ],
    difficulty: 'hard',
    topic: 'Tort - Strict Liability'
  },
  {
    id: 'lr-tort-3',
    title: 'Defamation',
    principle: `Defamation is the publication of a false statement about a person that tends to lower their reputation in the estimation of right-thinking members of society. Libel is defamation in permanent form (writing, pictures), while slander is in transitory form (spoken words). Truth is an absolute defense to defamation. Fair comment on matters of public interest and statements made under qualified privilege are also defenses.`,
    facts: `Rajesh, a journalist, wrote an article in "Daily News" newspaper alleging that Mr. Kapoor, a local businessman, had evaded taxes worth ₹10 crores and bribed government officials. The article was based on an anonymous tip without any verification. Mr. Kapoor's business suffered heavily as clients withdrew contracts. Investigation later revealed the allegations were completely false. Mr. Kapoor sued Rajesh and "Daily News" for defamation.`,
    questions: [
      {
        id: 'lr-t3-q1',
        question: 'Is this case of libel or slander?',
        options: [
          'Slander, because it damaged reputation',
          'Libel, because it was published in written form',
          'Neither, because journalists have immunity',
          'Both, because it was widely circulated'
        ],
        correctAnswer: 1,
        explanation: 'Since the defamatory statement was published in a newspaper (permanent written form), it constitutes libel, not slander.'
      },
      {
        id: 'lr-t3-q2',
        question: 'Can Rajesh claim defense of "Fair Comment"?',
        options: [
          'Yes, because tax evasion is a matter of public interest',
          'Yes, because journalists have freedom of press',
          'No, because the comment was based on false facts',
          'No, because he didn\'t use word "allegedly"'
        ],
        correctAnswer: 2,
        explanation: 'Fair comment defense requires: (1) comment on facts, not false statements of fact, (2) fair and honest opinion. Since the allegations were false and presented as facts without verification, fair comment defense fails.'
      },
      {
        id: 'lr-t3-q3',
        question: 'Is "Daily News" also liable along with Rajesh?',
        options: [
          'No, only the journalist is liable',
          'Yes, the publisher is equally liable for defamatory content',
          'Only if they didn\'t edit the article',
          'No, if they print a correction'
        ],
        correctAnswer: 1,
        explanation: 'In defamation, everyone involved in publication - author, editor, printer, and publisher - is liable. "Daily News" is equally liable for publishing defamatory content.'
      }
    ],
    difficulty: 'medium',
    topic: 'Tort - Defamation'
  },

  // ============ CONSTITUTIONAL LAW ============
  {
    id: 'lr-const-1',
    title: 'Fundamental Rights - Article 21',
    principle: `Article 21 of the Constitution states: "No person shall be deprived of his life or personal liberty except according to procedure established by law." The Supreme Court in Maneka Gandhi v. Union of India (1978) held that the procedure must be fair, just, and reasonable, not arbitrary. Article 21 has been expanded to include various rights like right to livelihood, right to clean environment, right to health, right to shelter, right to privacy, etc.`,
    facts: `The Municipal Corporation of Newtown issued demolition notices to 500 street vendors operating near the railway station, giving them only 24 hours to vacate. The vendors, most of whom had been operating there for over 20 years and had no alternative source of livelihood, challenged the notice claiming violation of their fundamental rights. The Corporation argued that the vendors were encroaching on public property and causing obstruction.`,
    questions: [
      {
        id: 'lr-cn1-q1',
        question: 'Which fundamental right of the vendors is primarily affected?',
        options: [
          'Right to Freedom of Speech under Article 19(1)(a)',
          'Right to Life including Right to Livelihood under Article 21',
          'Right to Property under Article 300A',
          'Right to Equality under Article 14'
        ],
        correctAnswer: 1,
        explanation: 'Right to livelihood is an integral part of Right to Life under Article 21 (Olga Tellis case). Depriving vendors of their occupation without proper procedure affects their Article 21 rights.'
      },
      {
        id: 'lr-cn1-q2',
        question: 'Is the 24-hour notice sufficient under the law?',
        options: [
          'Yes, because encroachers have no rights',
          'Yes, for removal of encroachments no notice is needed',
          'No, the procedure must be fair and reasonable under Article 21',
          'No, minimum 7 days notice is mandatory by law'
        ],
        correctAnswer: 2,
        explanation: 'Under Maneka Gandhi principle, procedure must be fair, just, and reasonable. 24-hour notice without opportunity of hearing violates principles of natural justice and Article 21.'
      },
      {
        id: 'lr-cn1-q3',
        question: 'What should the Corporation have done before eviction?',
        options: [
          'Simply execute the demolition order',
          'Provide reasonable notice, hearing opportunity, and rehabilitation scheme',
          'Pay nominal compensation',
          'Get approval from State Government'
        ],
        correctAnswer: 1,
        explanation: 'Following Olga Tellis v. Bombay Municipal Corporation, authorities must provide reasonable notice, opportunity to be heard, and consider rehabilitation before eviction of persons whose livelihood is affected.'
      }
    ],
    difficulty: 'hard',
    topic: 'Constitutional Law - Article 21'
  },
  {
    id: 'lr-const-2',
    title: 'Equality Before Law - Article 14',
    principle: `Article 14 provides that "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India." Equality before law (British concept) means absence of special privileges. Equal protection of laws (American concept) means equal treatment in equal circumstances. Reasonable classification is permitted if it has (1) intelligible differentia and (2) rational nexus with the object sought to be achieved.`,
    facts: `State X announced a new policy reserving 80% of seats in state medical colleges for students who studied in schools within that state, and only 20% for students from other states. Arjun, who topped the national entrance exam but studied in State Y, was denied admission despite scoring higher than many State X candidates. He challenged the policy as violative of Article 14.`,
    questions: [
      {
        id: 'lr-cn2-q1',
        question: 'Does the policy violate the principle of equality?',
        options: [
          'No, states can make any policy for their residents',
          'No, domicile-based classification is always valid',
          'Yes, it creates unreasonable discrimination without rational nexus',
          'Yes, because merit should be the only criterion'
        ],
        correctAnswer: 2,
        explanation: 'While reasonable classification is permitted, 80% reservation based solely on place of schooling is excessive and has no rational nexus with medical education objectives. It discriminates without valid basis.'
      },
      {
        id: 'lr-cn2-q2',
        question: 'What would be a reasonable classification in this context?',
        options: [
          'Any percentage the state decides',
          'A reasonable percentage (like 15-25%) for promoting local education',
          '100% for state students only',
          'No classification is ever permitted'
        ],
        correctAnswer: 1,
        explanation: 'Courts have held that a reasonable percentage of domicile reservation (around 15-25%) may be permissible to promote local interests, but excessive reservation like 80% is arbitrary and unconstitutional.'
      }
    ],
    difficulty: 'medium',
    topic: 'Constitutional Law - Article 14'
  },

  // ============ CRIMINAL LAW ============
  {
    id: 'lr-crim-1',
    title: 'Right of Private Defense',
    principle: `Sections 96-106 of IPC deal with Right of Private Defense. Section 96 states that nothing is an offence which is done in the exercise of the right of private defense. This right extends to defense of one's own body and property, and the body and property of others. However, the right is subject to restrictions - it should be exercised only when there is reasonable apprehension of danger and the force used must be proportionate to the threat.`,
    facts: `Late at night, Mohan heard noises and found two men breaking into his house. One of the intruders, armed with a knife, lunged at Mohan. Mohan grabbed a cricket bat and struck the armed intruder on the head, causing his death. The other intruder, who was unarmed and trying to flee, was also hit by Mohan causing grievous injuries. Mohan was charged with culpable homicide and causing grievous hurt.`,
    questions: [
      {
        id: 'lr-cr1-q1',
        question: 'Is Mohan\'s action against the armed intruder justified?',
        options: [
          'No, he should have called the police instead',
          'No, causing death is never justified',
          'Yes, right of private defense extends to causing death when there is reasonable fear of death',
          'Yes, but only if the intruder attacked first'
        ],
        correctAnswer: 2,
        explanation: 'Under Section 100, the right of private defense of body extends to causing death when there is reasonable apprehension of death or grievous hurt. An armed intruder lunging with a knife creates such apprehension.'
      },
      {
        id: 'lr-cr1-q2',
        question: 'Is Mohan\'s action against the fleeing unarmed intruder justified?',
        options: [
          'Yes, because he was also a trespasser',
          'Yes, because he was an accomplice',
          'No, right of private defense cannot be used against a fleeing person',
          'No, but he can detain the fleeing person'
        ],
        correctAnswer: 2,
        explanation: 'The right of private defense is available only while the danger exists. Once the intruder was fleeing and no longer posed a threat, the right ceased. Using force against a fleeing person exceeds the right.'
      },
      {
        id: 'lr-cr1-q3',
        question: 'What is the key requirement for exercising right of private defense?',
        options: [
          'Prior warning must be given',
          'Reasonable apprehension of danger with no time for state protection',
          'Approval from police',
          'The defender must be in their own property'
        ],
        correctAnswer: 1,
        explanation: 'Section 99 states that the right is available only when there is no time to seek protection from public authorities and there is reasonable apprehension of danger.'
      }
    ],
    difficulty: 'hard',
    topic: 'Criminal Law - Private Defense'
  },
  {
    id: 'lr-crim-2',
    title: 'Culpable Homicide vs Murder',
    principle: `Section 299 defines Culpable Homicide as causing death by an act (1) with intention of causing death, or (2) with intention of causing bodily injury likely to cause death, or (3) with knowledge that the act is likely to cause death. Section 300 defines Murder as culpable homicide with additional elements of intention or knowledge regarding certainty of death. All murders are culpable homicides, but not all culpable homicides are murders.`,
    facts: `During a heated argument over a parking space, Anil pushed Suresh forcefully. Suresh fell backward, hit his head on the pavement, and died of brain hemorrhage. Medical evidence showed that such a push would not ordinarily cause death, but Suresh had an unusually thin skull which Anil was unaware of. Anil was charged with murder under Section 302 IPC.`,
    questions: [
      {
        id: 'lr-cr2-q1',
        question: 'Did Anil have the intention to cause death?',
        options: [
          'Yes, pushing someone is always dangerous',
          'No, a push ordinarily wouldn\'t cause death',
          'Yes, because death actually occurred',
          'No, but he is still liable for murder'
        ],
        correctAnswer: 1,
        explanation: 'Intention to cause death must be judged objectively. A push during an argument, while wrongful, does not ordinarily indicate intention to cause death.'
      },
      {
        id: 'lr-cr2-q2',
        question: 'Is Anil liable for murder under Section 300?',
        options: [
          'Yes, because Suresh died',
          'Yes, because he started the physical altercation',
          'No, as he lacked intention/knowledge to cause death',
          'No, because it was an accident'
        ],
        correctAnswer: 2,
        explanation: 'For murder under Section 300, there must be intention to cause death or bodily injury sufficient to cause death. A simple push lacks this element. The "egg-shell skull" rule doesn\'t convert it to murder.'
      },
      {
        id: 'lr-cr2-q3',
        question: 'What offence, if any, is Anil liable for?',
        options: [
          'No offence, as death was accidental',
          'Culpable homicide not amounting to murder (Section 304)',
          'Death by negligence (Section 304A)',
          'Hurt (Section 323)'
        ],
        correctAnswer: 2,
        explanation: 'Since there was no intention to cause death and a push doesn\'t amount to knowledge of likely death, Anil would be liable for causing death by negligence under Section 304A, not culpable homicide.'
      }
    ],
    difficulty: 'hard',
    topic: 'Criminal Law - Homicide'
  }
];

// Helper functions
export const getPassagesByTopic = (topic: string): LegalPassage[] => {
  return LEGAL_REASONING_PASSAGES.filter(p => p.topic.toLowerCase().includes(topic.toLowerCase()));
};

export const getPassagesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): LegalPassage[] => {
  return LEGAL_REASONING_PASSAGES.filter(p => p.difficulty === difficulty);
};

export const getTotalQuestions = (): number => {
  return LEGAL_REASONING_PASSAGES.reduce((sum, p) => sum + p.questions.length, 0);
};

export default LEGAL_REASONING_PASSAGES;
