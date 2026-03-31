import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Zap, 
  CheckCircle2, 
  Search, 
  FileText, 
  Newspaper,
  ChevronRight,
  ArrowLeft,
  Clock,
  Play,
  Type,
  Sun,
  Moon,
  Filter,
  X,
  Share2,
  Bookmark,
  ExternalLink,
  Bot,
  Gavel,
  Scale,
  ShieldAlert,
  List,
  Maximize2,
  Minimize2,
  ChevronLeft
} from 'lucide-react';
import { CourseTrack, Subject } from '../types';
import { explainConcept, generateStudyPlan, fetchReelNews, ReelNewsItem } from '../services/geminiService';
import { useProgress } from '../context/ProgressContext';
import ReactMarkdown from 'react-markdown';
import { useSearchParams } from 'react-router-dom';

// --- Types ---

interface StaticTopic {
  id: string;
  title: string;
  subject: Subject;
  summary: string;
  content: string; // Markdown supported
  difficulty: 'Easy' | 'Medium' | 'Hard';
  readTime: number; // minutes
  tags: string[];
  quiz?: {
    q: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
}

// --- Preloaded Data (Simulating Massive Library) ---

const STUDY_DATA: StaticTopic[] = [
  // LEGAL APTITUDE
  {
    id: 'la-1',
    title: 'Constitution: The Preamble',
    subject: Subject.LegalAptitude,
    difficulty: 'Medium',
    readTime: 10,
    summary: 'Source of authority, nature of state, and objectives of the Constitution.',
    tags: ['Constitution', 'Polity'],
    content: `
# The Preamble to the Constitution of India

**"We, the people of India..."**

The Preamble is the soul of the Constitution. It declares India to be a **Sovereign, Socialist, Secular, Democratic, Republic**.

## Key Keywords Explained:
1. **Sovereign**: India is free to conduct its own internal and external affairs.
2. **Socialist**: Added by the **42nd Amendment (1976)**. Focuses on democratic socialism (mixed economy).
3. **Secular**: Added by the **42nd Amendment (1976)**. The State has no religion.
4. **Democratic**: Government by the people.
5. **Republic**: Head of the state is elected, not hereditary.

## Important Case Laws:
- **Berubari Union Case (1960)**: Supreme Court said Preamble is *not* part of the Constitution.
- **Kesavananda Bharati Case (1973)**: SC overruled Berubari, declared Preamble *is* an integral part and part of the "Basic Structure".
- **LIC of India Case (1995)**: Reaffirmed Preamble is an integral part.

## 42nd Amendment Act, 1976
Known as the "Mini Constitution". It added three words: **Socialist, Secular, and Integrity**.
    `,
    quiz: [
      {
        q: "Which amendment added the words 'Socialist' and 'Secular' to the Preamble?",
        options: ["44th Amendment", "42nd Amendment", "1st Amendment", "86th Amendment"],
        correct: 1,
        explanation: "The 42nd Amendment Act, 1976 added Socialist, Secular, and Integrity."
      },
      {
        q: "In which case did the SC declare the Preamble as part of the Basic Structure?",
        options: ["Golaknath Case", "Maneka Gandhi Case", "Kesavananda Bharati Case", "Minerva Mills Case"],
        correct: 2,
        explanation: "Kesavananda Bharati v. State of Kerala (1973)."
      }
    ]
  },
  {
    id: 'la-2',
    title: 'Law of Torts: Vicarious Liability',
    subject: Subject.LegalAptitude,
    difficulty: 'Hard',
    readTime: 15,
    summary: 'Liability of one person for the act of another (Master-Servant relationship).',
    tags: ['Torts', 'Civil Law'],
    content: `
# Vicarious Liability

**Principle**: *Qui facit per alium facit per se* (He who acts through another does the act himself).

Normally, a person is liable for their own wrongs. However, in certain relationships, one person can be held liable for the torts committed by another.

## Essentials:
1. There must be a specific relationship (Master-Servant, Principal-Agent, Partners).
2. The wrongful act must be committed **during the course of employment**.

## Master and Servant
A master is liable for the torts of his servant if committed in the course of employment.
- **Respondent Superior**: Let the principal be liable.

## Course of Employment
If the servant does a wrongful act authorized by the master, or does an authorized act in a wrongful way, the master is liable.
- **Century Insurance Co v. Northern Ireland Road Transport Board**: Driver lit a cigarette while transferring petrol, causing an explosion. Master was held liable as it was during the course of employment (negligent way of doing work).

## Exception: Independent Contractor
A master is generally *not* liable for the torts of an independent contractor (one who acts according to his own will and judgment), except in cases of strict liability.
    `
  },
  {
    id: 'la-3',
    title: 'Criminal Law: General Exceptions (IPC)',
    subject: Subject.LegalAptitude,
    difficulty: 'Medium',
    readTime: 20,
    summary: 'Sections 76-106 of IPC. Conditions where acts are not crimes.',
    tags: ['IPC', 'Crimes'],
    content: `
# General Exceptions (IPC Sections 76-106)

Even if an act fits the definition of a crime, the accused may be acquitted if the act falls under General Exceptions.

## Mistake of Fact (Sec 76 & 79)
*Ignorantia facti excusat, ignorantia juris non excusat* (Mistake of fact is an excuse, mistake of law is not).
- **Sec 76**: Bound by law (e.g., soldier firing on mob by order).
- **Sec 79**: Justified by law (e.g., arresting someone believing they committed a murder).

## Accident (Sec 80)
Doing a lawful act, in a lawful manner, with lawful means, and without criminal intention.

## Necessity (Sec 81)
Preventing greater harm by causing smaller harm.
- **R v. Dudley and Stephens**: Necessity is *not* a defense for murder.

## Infancy (Sec 82 & 83)
- **Doli Incapax (Sec 82)**: Child under 7 years cannot commit a crime. Absolute immunity.
- **Sec 83**: Child between 7-12 years. Immunity depends on maturity of understanding.

## Right of Private Defense (Sec 96-106)
Every person has a right to defend their body and property, and that of others, against specific offenses.
- Can extend to causing death in extreme cases (rape, fear of death, acid attack).
    `
  },
  
  // LOGICAL REASONING
  {
    id: 'lr-1',
    title: 'Syllogisms: The 100-50 Rule',
    subject: Subject.LogicalReasoning,
    difficulty: 'Hard',
    readTime: 12,
    summary: 'A mathematical approach to solving syllogism questions without Venn Diagrams.',
    tags: ['Logic', 'Shortcuts'],
    content: `
# Syllogisms: 100-50 Method

A faster alternative to Venn Diagrams. Assign values to subjects and predicates.

## Assigning Values:
1. **All** A are B -> A=100, B=50
2. **No** A is B -> A=100, B=100
3. **Some** A are B -> A=50, B=50
4. **Some** A are not B -> A=50, B=100

## Rules for Conclusion:
1. If statement is **Positive**, conclusion must be **Positive**.
2. If statement is **Negative**, conclusion must be **Negative**.
3. **Income vs Expense**: Value in conclusion (Expense) cannot exceed value in statement (Income).
   - If A is 100 in statement, it can be 100 or 50 in conclusion.
   - If A is 50 in statement, it MUST be 50 in conclusion.

## Example:
Statement: All Cats (100) are Dogs (50).
Conclusion: All Dogs (100) are Cats (50).
*Check*: Dogs is 50 in statement but 100 in conclusion. **Invalid.**
    `
  },
  
  // GENERAL KNOWLEDGE
  {
    id: 'gk-1',
    title: 'International Organizations: UN & Bodies',
    subject: Subject.GK,
    difficulty: 'Easy',
    readTime: 8,
    summary: 'Headquarters and heads of major UN bodies.',
    tags: ['GK', 'International'],
    content: `
# Major International Organizations

## United Nations (UN)
- **HQ**: New York, USA
- **Founded**: 24 Oct 1945
- **Secretary General**: António Guterres

## International Court of Justice (ICJ)
- **HQ**: The Hague, Netherlands (Only principal organ not in NY)
- **Judges**: 15 judges for 9-year terms.

## World Health Organization (WHO)
- **HQ**: Geneva, Switzerland

## UNESCO
- **HQ**: Paris, France

## SAARC
- **HQ**: Kathmandu, Nepal
- **Members**: Afghanistan, Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan, Sri Lanka.
    `
  },
  
  // MORE LEGAL APTITUDE TOPICS
  {
    id: 'la-4',
    title: 'Fundamental Rights (Articles 12-35)',
    subject: Subject.LegalAptitude,
    difficulty: 'Hard',
    readTime: 25,
    summary: 'Part III of the Constitution - The soul of Indian democracy.',
    tags: ['Constitution', 'Rights', 'Important'],
    content: `
# Fundamental Rights (Part III: Articles 12-35)

Fundamental Rights are **justiciable** (enforceable by courts). Article 32 is the "heart and soul" of the Constitution.

## Six Fundamental Rights:

### 1. Right to Equality (Art. 14-18)
- **Art. 14**: Equality before law
- **Art. 15**: Prohibition of discrimination
- **Art. 16**: Equal opportunity in public employment
- **Art. 17**: Abolition of Untouchability
- **Art. 18**: Abolition of Titles

### 2. Right to Freedom (Art. 19-22)
**Art. 19** gives 6 freedoms to citizens only:
- Speech and expression
- Assemble peacefully
- Form associations/unions
- Move freely in India
- Reside and settle
- Practice any profession

**Art. 20**: Protection against conviction (No ex-post-facto law, Double jeopardy, Self-incrimination)
**Art. 21**: Right to Life and Personal Liberty
**Art. 21A**: Right to Education (6-14 years) - Added by 86th Amendment
**Art. 22**: Protection against arrest and detention

### 3. Right Against Exploitation (Art. 23-24)
- **Art. 23**: Prohibition of human trafficking
- **Art. 24**: No child labor below 14 years in hazardous industries

### 4. Right to Freedom of Religion (Art. 25-28)
- Secular State provisions
- Freedom of conscience and religion

### 5. Cultural & Educational Rights (Art. 29-30)
- Protection of minorities' interests

### 6. Right to Constitutional Remedies (Art. 32)
Dr. Ambedkar called Article 32 the "heart and soul" of the Constitution.

## Five Writs:
1. **Habeas Corpus** - "You may have the body"
2. **Mandamus** - "We command"
3. **Certiorari** - "To be certified"
4. **Prohibition** - Stop lower court
5. **Quo Warranto** - "By what authority"

## Important Cases:
- **Maneka Gandhi v. UOI (1978)**: Expanded Art. 21 scope
- **Vishakha v. State of Rajasthan (1997)**: Sexual harassment guidelines
- **NALSA v. UOI (2014)**: Transgender rights
    `,
    quiz: [
      {
        q: "Which Article is called the 'Heart and Soul' of the Constitution?",
        options: ["Article 14", "Article 19", "Article 21", "Article 32"],
        correct: 3,
        explanation: "Article 32 (Right to Constitutional Remedies) was called by Dr. Ambedkar as the heart and soul."
      },
      {
        q: "Right to Education was added by which Amendment?",
        options: ["73rd Amendment", "86th Amendment", "42nd Amendment", "44th Amendment"],
        correct: 1,
        explanation: "86th Amendment added Article 21A - Right to Education for children 6-14 years."
      }
    ]
  },
  {
    id: 'la-5',
    title: 'Contract Law: Essentials of Valid Contract',
    subject: Subject.LegalAptitude,
    difficulty: 'Medium',
    readTime: 18,
    summary: 'Section 10 of Indian Contract Act, 1872 - What makes a contract valid.',
    tags: ['Contract', 'Civil Law', 'Important'],
    content: `
# Essentials of a Valid Contract (Section 10)

**"All agreements are contracts if made by free consent of parties competent to contract, for a lawful consideration and with a lawful object, and are not hereby expressly declared to be void."**

## Essential Elements:

### 1. Offer and Acceptance
- Clear offer by one party
- Unconditional acceptance by another
- Communication is essential

### 2. Intention to Create Legal Relations
- Social/domestic agreements generally not enforceable
- **Balfour v. Balfour**: Husband's promise to wife - Not enforceable

### 3. Lawful Consideration
- "Something in return" (Quid pro quo)
- Can be past, present, or future
- Must be real, not illusory

### 4. Capacity to Contract (Sec 11)
Every person is competent EXCEPT:
- Minors (below 18)
- Persons of unsound mind
- Persons disqualified by law

**Mohiri Bibi v. Dharmodas Ghose (1903)**: Contract with minor is VOID AB INITIO

### 5. Free Consent (Sec 14)
Consent is free when NOT caused by:
- Coercion (Sec 15)
- Undue Influence (Sec 16)
- Fraud (Sec 17)
- Misrepresentation (Sec 18)
- Mistake (Sec 20-22)

### 6. Lawful Object
Object should not be:
- Forbidden by law
- Fraudulent
- Injurious to person or property
- Immoral or against public policy

### 7. Not Expressly Declared Void
Agreements in restraint of:
- Marriage (Sec 26)
- Trade (Sec 27)
- Legal proceedings (Sec 28)
- Are VOID
    `,
    quiz: [
      {
        q: "Contract with a minor is:",
        options: ["Voidable", "Valid", "Void ab initio", "Illegal"],
        correct: 2,
        explanation: "As per Mohiri Bibi v. Dharmodas Ghose, contract with minor is void ab initio (void from beginning)."
      }
    ]
  },
  {
    id: 'la-6',
    title: 'Legal Maxims You Must Know',
    subject: Subject.LegalAptitude,
    difficulty: 'Easy',
    readTime: 12,
    summary: '25 Most important Latin legal maxims for MH CET Law.',
    tags: ['Maxims', 'Important', 'Quick Read'],
    content: `
# 25 Essential Legal Maxims

## Basic Principles
1. **Actus non facit reum nisi mens sit rea** - An act does not make one guilty unless the mind is also guilty
2. **Ignorantia juris non excusat** - Ignorance of law is no excuse
3. **Ubi jus ibi remedium** - Where there is a right, there is a remedy
4. **Audi alteram partem** - Hear the other side
5. **Nemo debet bis vexari** - No man should be tried twice for same offence

## Tort Law Maxims
6. **Volenti non fit injuria** - No injury to one who consents
7. **Res ipsa loquitur** - The thing speaks for itself
8. **Damnum sine injuria** - Damage without legal injury
9. **Injuria sine damno** - Legal injury without actual damage
10. **Sic utere tuo ut alienum non laedas** - Use your property so as not to injure another's

## Contract Law Maxims
11. **Pacta sunt servanda** - Agreements must be kept
12. **Consensus ad idem** - Meeting of minds
13. **Ex nudo pacto non oritur actio** - No action arises from bare agreement
14. **Caveat emptor** - Let the buyer beware
15. **Quantum meruit** - As much as deserved

## Criminal Law Maxims
16. **Actus reus** - Guilty act
17. **Mens rea** - Guilty mind
18. **In pari delicto** - In equal fault
19. **Nemo judex in causa sua** - No one can be judge in their own cause
20. **De minimis non curat lex** - Law does not concern itself with trifles

## Constitutional Law Maxims
21. **Salus populi suprema lex** - Welfare of people is supreme law
22. **Rex non potest peccare** - The King can do no wrong
23. **Delegatus non potest delegare** - A delegate cannot delegate

## Procedural Maxims
24. **Res judicata** - Matter already judged
25. **Obiter dicta** - Said in passing (not binding)
    `
  },
  {
    id: 'la-7',
    title: 'Directive Principles & Fundamental Duties',
    subject: Subject.LegalAptitude,
    difficulty: 'Medium',
    readTime: 15,
    summary: 'Part IV (DPSP) and Part IVA (Duties) of the Constitution.',
    tags: ['Constitution', 'DPSP', 'Duties'],
    content: `
# Directive Principles of State Policy (Part IV: Art. 36-51)

DPSPs are **non-justiciable** (not enforceable by courts) but fundamental in governance.

## Classification:

### Socialist Principles
- Art. 38: Promote welfare of people
- Art. 39: Equal distribution of resources
- Art. 39A: Free legal aid
- Art. 41: Right to work, education, public assistance
- Art. 42: Just and humane conditions of work
- Art. 43: Living wage for workers
- Art. 43A: Worker participation in management

### Gandhian Principles
- Art. 40: Panchayati Raj
- Art. 43: Cottage industries
- Art. 46: Promotion of SC/ST welfare
- Art. 47: Prohibition of intoxicating drinks
- Art. 48: Prohibition of cow slaughter

### Liberal-Intellectual Principles
- Art. 44: Uniform Civil Code
- Art. 45: Early childhood care (0-6 years)
- Art. 48A: Environment protection
- Art. 49: Protection of monuments
- Art. 50: Separation of judiciary from executive
- Art. 51: International peace

---

# Fundamental Duties (Part IVA: Art. 51A)

Added by **42nd Amendment, 1976** based on USSR Constitution.
Originally 10 duties, **11th duty added by 86th Amendment (2002)**.

## The 11 Fundamental Duties:
1. Abide by Constitution, respect Flag & Anthem
2. Follow noble ideals of freedom struggle
3. Protect sovereignty, unity, integrity
4. Defend country and render national service
5. Promote harmony, renounce discrimination
6. Value and preserve composite culture
7. Protect natural environment
8. Develop scientific temper
9. Safeguard public property
10. Strive for excellence
11. **Provide education to children (6-14 years)** - Added in 2002
    `
  },
  
  // MORE GK TOPICS
  {
    id: 'gk-2',
    title: 'Indian Judiciary System',
    subject: Subject.GK,
    difficulty: 'Medium',
    readTime: 15,
    summary: 'Structure of Indian Courts from Supreme Court to Lok Adalats.',
    tags: ['Polity', 'Judiciary', 'Important'],
    content: `
# Indian Judiciary System

## Hierarchy of Courts

### 1. Supreme Court of India
- **Seat**: New Delhi
- **Established**: 26 January 1950
- **Chief Justice**: Head of Indian Judiciary
- **Judges**: 1 CJI + 33 other judges (max 34)
- **Jurisdiction**: Original, Appellate, Advisory

**Important Articles**:
- Art. 124: Establishment
- Art. 131: Original Jurisdiction
- Art. 136: Special Leave Petition
- Art. 141: Law declared by SC binding on all courts
- Art. 143: Advisory Jurisdiction

### 2. High Courts
- 25 High Courts in India
- Art. 214-231 deal with High Courts
- Can issue writs under Art. 226 (wider than Art. 32)

**Territorial Jurisdiction**:
- Bombay HC: Maharashtra, Goa, Dadra-Nagar Haveli, Daman-Diu
- Delhi HC: Delhi NCT
- Calcutta HC: West Bengal, Andaman-Nicobar

### 3. District Courts
- Principal civil court of original jurisdiction
- Sessions Court for criminal matters
- District Judge heads the court

### 4. Subordinate Courts
- Civil: Munsif Courts, Sub-Judge Courts
- Criminal: Magistrate Courts (CJM, JMFC)

### 5. Tribunals
- Administrative Tribunals (CAT)
- Income Tax Appellate Tribunal (ITAT)
- National Green Tribunal (NGT)
- NCLT (Company matters)

### 6. Lok Adalats
- Alternative Dispute Resolution
- No court fee
- Decision is final and binding
- Based on conciliation
    `
  },
  {
    id: 'gk-3',
    title: 'Important Constitutional Amendments',
    subject: Subject.GK,
    difficulty: 'Hard',
    readTime: 20,
    summary: 'Key amendments that shaped Indian Constitution.',
    tags: ['Constitution', 'Amendments', 'Important'],
    content: `
# Important Constitutional Amendments

## Landmark Amendments:

### 1st Amendment (1951)
- Added 9th Schedule
- Restrictions on freedom of speech (Art. 19)
- Land reforms validation

### 7th Amendment (1956)
- Reorganization of states on linguistic basis
- Abolished Part A, B, C, D states

### 24th Amendment (1971)
- Parliament can amend any part of Constitution
- Including Fundamental Rights

### 42nd Amendment (1976) - "Mini Constitution"
- Added Socialist, Secular, Integrity to Preamble
- Added Fundamental Duties (Part IVA)
- Made DPSP superior to FRs (Art. 14, 19, 31)
- Changed term "Fundamental Rights" scope

### 44th Amendment (1978)
- Right to Property removed from FRs
- Made legal right under Art. 300A
- Safeguards for Emergency

### 52nd Amendment (1985)
- Anti-defection law
- Added 10th Schedule

### 61st Amendment (1989)
- Voting age reduced: 21 → 18 years

### 73rd Amendment (1992)
- Panchayati Raj institutions
- Added Part IX, 11th Schedule

### 74th Amendment (1992)
- Municipalities
- Added Part IXA, 12th Schedule

### 86th Amendment (2002)
- Right to Education (Art. 21A)
- 11th Fundamental Duty

### 91st Amendment (2003)
- Limited Council of Ministers size
- 15% of Lok Sabha/Assembly strength

### 101st Amendment (2016)
- Goods and Services Tax (GST)

### 103rd Amendment (2019)
- 10% EWS reservation
    `
  },
  
  // LOGICAL REASONING TOPICS
  {
    id: 'lr-2',
    title: 'Blood Relations Made Easy',
    subject: Subject.LogicalReasoning,
    difficulty: 'Medium',
    readTime: 15,
    summary: 'Systematic approach to solve blood relation problems.',
    tags: ['Logic', 'Family Tree', 'Important'],
    content: `
# Blood Relations

## Basic Relationships:

### Paternal Side (Father's side)
- Father's Father = Grandfather
- Father's Mother = Grandmother
- Father's Brother = Uncle (Chacha/Tau)
- Father's Sister = Aunt (Bua)
- Father's Brother's children = Cousins

### Maternal Side (Mother's side)
- Mother's Father = Maternal Grandfather (Nana)
- Mother's Mother = Maternal Grandmother (Nani)
- Mother's Brother = Maternal Uncle (Mama)
- Mother's Sister = Aunt (Mausi)

### Spouse Relations
- Spouse's Father = Father-in-law
- Spouse's Mother = Mother-in-law
- Spouse's Brother = Brother-in-law
- Spouse's Sister = Sister-in-law

## Golden Rules:

1. **Same Generation = Same Level**
   - Siblings, Cousins → Same level

2. **One Generation Gap**
   - Parents, Aunts, Uncles → One level up
   - Children, Nephews, Nieces → One level down

3. **Two Generation Gap**
   - Grandparents → Two levels up
   - Grandchildren → Two levels down

## Symbols to Use:
- **+** = Male
- **-** = Female
- **=** = Married couple
- **|** = Parent-child
- **---** = Siblings

## Coded Relations:
If "A + B" means A is father of B:
- A + B - C means: A is father of B, B is mother of C
- So A is grandfather of C
    `
  },
  {
    id: 'lr-3',
    title: 'Critical Reasoning: Arguments',
    subject: Subject.LogicalReasoning,
    difficulty: 'Hard',
    readTime: 18,
    summary: 'Strengthen, weaken, and evaluate arguments.',
    tags: ['Logic', 'Arguments', 'Important'],
    content: `
# Critical Reasoning

## Argument Structure:
1. **Premise** - Given facts/statements
2. **Conclusion** - What follows from premises
3. **Assumption** - Unstated but necessary for conclusion

## Types of Questions:

### 1. Strengthen the Argument
- Find option that supports the conclusion
- Add evidence that makes conclusion more likely

### 2. Weaken the Argument
- Find option that attacks the conclusion
- Show alternative explanations
- Attack the assumptions

### 3. Find the Assumption
- What MUST be true for conclusion to hold
- Bridge between premise and conclusion

### 4. Inference Questions
- What can be concluded from given statements
- Must be definitely true

### 5. Paradox/Resolve Questions
- Two seemingly contradictory statements
- Find what explains both

## Common Logical Fallacies:

1. **Ad Hominem** - Attacking the person, not argument
2. **Appeal to Authority** - Expert said so
3. **Circular Reasoning** - Conclusion in premise
4. **False Cause** - Correlation ≠ Causation
5. **Slippery Slope** - Extreme consequence assumed
6. **Straw Man** - Misrepresenting opponent's argument
7. **False Dilemma** - Only two options presented

## Approach:
1. Read conclusion first
2. Identify the assumption
3. Eliminate clearly wrong options
4. Choose the most relevant answer
    `
  },
  
  // ENGLISH TOPICS
  {
    id: 'eng-1',
    title: 'Spotting Errors: Grammar Rules',
    subject: Subject.English,
    difficulty: 'Medium',
    readTime: 20,
    summary: 'Common grammar rules tested in MH CET Law.',
    tags: ['Grammar', 'Errors', 'Important'],
    content: `
# Spotting Errors - Key Rules

## Subject-Verb Agreement

### Rule 1: Singular Subject = Singular Verb
- The boy **plays** cricket. ✓
- The boys **play** cricket. ✓

### Rule 2: "Either...or", "Neither...nor"
- Verb agrees with NEARER subject
- Neither the teacher nor the students **were** present. ✓

### Rule 3: Collective Nouns
- As unit → Singular verb
- As individuals → Plural verb
- The jury **has** given its verdict. ✓
- The jury **are** divided in their opinion. ✓

### Rule 4: "Each", "Every", "Either", "Neither"
- Always singular verb
- Each of the boys **was** given a prize. ✓

## Tense Errors

### Rule 1: Consistency
- Don't mix tenses unnecessarily
- He **went** to market and **bought** vegetables. ✓

### Rule 2: Time Expressions
- Yesterday, ago, last → Past tense
- Tomorrow, next → Future tense

## Pronoun Errors

### Rule 1: Agreement
- Pronoun must agree with antecedent
- Everyone should do **their** duty. ✗
- Everyone should do **his/her** duty. ✓

### Rule 2: Case
- Subject case: I, we, he, she, they
- Object case: me, us, him, her, them
- Between you and **me** (not I) ✓

## Preposition Errors

### Common Mistakes:
- Accompanied **by** (not with)
- Angry **with** person, **at** thing
- Congratulate **on** (not for)
- Consist **of** (not in)
- Die **of** disease
- Different **from** (not than)
- Interested **in**
- Married **to**
- Superior/Inferior **to** (not than)
    `
  },
  {
    id: 'eng-2',
    title: 'One-Word Substitutions',
    subject: Subject.English,
    difficulty: 'Easy',
    readTime: 15,
    summary: '50 most important one-word substitutions.',
    tags: ['Vocabulary', 'Important', 'Quick Read'],
    content: `
# 50 Important One-Word Substitutions

## People
1. **Altruist** - One who works for others' welfare
2. **Atheist** - One who doesn't believe in God
3. **Bibliophile** - Lover of books
4. **Celibate** - One who remains unmarried
5. **Connoisseur** - Expert in fine arts/food/wine
6. **Cynic** - One who doubts human sincerity
7. **Egoist** - Self-centered person
8. **Extrovert** - Outgoing person
9. **Feminist** - Advocate of women's rights
10. **Glutton** - One who eats excessively
11. **Hypocrite** - One who pretends to be what they're not
12. **Introvert** - Reserved, inward-thinking person
13. **Misanthrope** - Hater of mankind
14. **Misogynist** - Hater of women
15. **Optimist** - One who sees the bright side
16. **Pessimist** - One who sees the dark side
17. **Philanthropist** - Lover of mankind
18. **Stoic** - One indifferent to pleasure/pain

## Actions/States
19. **Amnesty** - General pardon
20. **Autopsy** - Post-mortem examination
21. **Blasphemy** - Speaking against religion
22. **Calligraphy** - Beautiful handwriting
23. **Euthanasia** - Mercy killing
24. **Genocide** - Killing of a race
25. **Homicide** - Killing of a human
26. **Infanticide** - Killing of an infant
27. **Matricide** - Killing of one's mother
28. **Patricide** - Killing of one's father
29. **Regicide** - Killing of a king
30. **Suicide** - Killing oneself

## Government/Politics
31. **Anarchy** - Absence of government
32. **Autocracy** - Rule by one person
33. **Bureaucracy** - Rule by officials
34. **Democracy** - Rule by people
35. **Monarchy** - Rule by a king/queen
36. **Oligarchy** - Rule by a few
37. **Plutocracy** - Rule by the wealthy
38. **Theocracy** - Rule by religious leaders

## Miscellaneous
39. **Anonymous** - Without a name
40. **Antidote** - Medicine against poison
41. **Belligerent** - Engaged in war
42. **Contemporary** - Of the same time
43. **Eatable** - Fit to be eaten
44. **Edible** - Suitable for eating
45. **Illegal** - Against law
46. **Illegible** - Cannot be read
47. **Invisible** - Cannot be seen
48. **Inevitable** - Cannot be avoided
49. **Omniscient** - All-knowing
50. **Omnipotent** - All-powerful
    `
  },
  
  // MATHEMATICS TOPICS
  {
    id: 'math-1',
    title: 'Percentages & Profit-Loss',
    subject: Subject.Math,
    difficulty: 'Easy',
    readTime: 15,
    summary: 'Fundamental concepts for commercial mathematics.',
    tags: ['Mathematics', 'Commercial Math', 'Important'],
    content: `
# Percentages & Profit-Loss

## Percentage Basics
- Percent = Per Hundred
- x% = x/100

### Quick Conversions:
| Fraction | Percentage |
|----------|------------|
| 1/2 | 50% |
| 1/3 | 33.33% |
| 1/4 | 25% |
| 1/5 | 20% |
| 1/6 | 16.67% |
| 1/8 | 12.5% |
| 1/10 | 10% |

### Formulas:
- Percentage Increase = (Change / Original) × 100
- Percentage Decrease = (Decrease / Original) × 100

## Profit and Loss

### Key Terms:
- **Cost Price (CP)** = Price at which goods are bought
- **Selling Price (SP)** = Price at which goods are sold
- **Profit** = SP - CP (when SP > CP)
- **Loss** = CP - SP (when CP > SP)

### Formulas:
- Profit % = (Profit / CP) × 100
- Loss % = (Loss / CP) × 100
- SP = CP × (100 + Profit%)/100
- SP = CP × (100 - Loss%)/100

### Quick Tricks:
- If profit is 20%, SP = 1.2 × CP
- If loss is 10%, SP = 0.9 × CP
- Marked Price (MP) and Discount: SP = MP × (100 - Discount%)/100

## Example:
An article bought for ₹500 is sold for ₹600.
- Profit = 600 - 500 = ₹100
- Profit % = (100/500) × 100 = 20%
    `
  },
  {
    id: 'math-2',
    title: 'Ratio, Proportion & Partnership',
    subject: Subject.Math,
    difficulty: 'Medium',
    readTime: 15,
    summary: 'Essential for partnership and mixture problems.',
    tags: ['Mathematics', 'Ratio', 'Important'],
    content: `
# Ratio, Proportion & Partnership

## Ratio
A ratio compares two quantities of the same unit.
- Written as a:b or a/b
- A ratio of 2:3 means for every 2 parts of A, there are 3 parts of B

### Properties:
- a:b = ka:kb (multiply both by same number)
- a:b = a/k : b/k (divide both by same number)

### Types:
- **Duplicate Ratio** of a:b = a²:b²
- **Triplicate Ratio** of a:b = a³:b³
- **Sub-duplicate Ratio** of a:b = √a:√b

## Proportion
When two ratios are equal: a:b = c:d
Written as a:b :: c:d

### Properties:
- Product of extremes = Product of means
- a × d = b × c

## Partnership
When two or more people invest money for a business.

### Simple Partnership (Same Time):
- Profit shared in ratio of investments
- A:B = Investment_A : Investment_B

### Compound Partnership (Different Time):
- Profit shared in ratio of (Investment × Time)
- A:B = (I₁ × T₁) : (I₂ × T₂)

## Example:
A invests ₹5000 for 6 months, B invests ₹6000 for 5 months.
- A's share = 5000 × 6 = 30000
- B's share = 6000 × 5 = 30000
- Ratio = 30000:30000 = 1:1
- Profit divided equally!
    `
  },
  {
    id: 'math-3',
    title: 'Time, Speed & Distance',
    subject: Subject.Math,
    difficulty: 'Medium',
    readTime: 18,
    summary: 'Problems on trains, boats, and relative speed.',
    tags: ['Mathematics', 'Speed', 'Important'],
    content: `
# Time, Speed & Distance

## Basic Formula
**Distance = Speed × Time**

### Unit Conversions:
- km/hr to m/s: Multiply by 5/18
- m/s to km/hr: Multiply by 18/5

Example: 72 km/hr = 72 × 5/18 = 20 m/s

## Average Speed
When same distance is covered at different speeds:
**Average Speed = 2ab/(a+b)**
where a and b are the two speeds.

## Relative Speed

### Same Direction:
- Relative Speed = Difference of speeds
- If A=60 km/hr, B=40 km/hr → Relative = 20 km/hr

### Opposite Direction:
- Relative Speed = Sum of speeds
- If A=60 km/hr, B=40 km/hr → Relative = 100 km/hr

## Train Problems

### Train crossing a pole/person:
- Distance = Length of Train
- Time = Length / Speed

### Train crossing a platform:
- Distance = Length of Train + Length of Platform
- Time = (L_train + L_platform) / Speed

### Two trains crossing each other:
- Same direction: Time = (L₁ + L₂) / (S₁ - S₂)
- Opposite direction: Time = (L₁ + L₂) / (S₁ + S₂)

## Boats & Streams
- **Downstream** (with stream): Speed = Boat + Stream
- **Upstream** (against stream): Speed = Boat - Stream
- Speed of Boat = (Downstream + Upstream) / 2
- Speed of Stream = (Downstream - Upstream) / 2
    `
  },
  
  // MORE GK TOPICS
  {
    id: 'gk-4',
    title: 'Indian History: Freedom Struggle',
    subject: Subject.GK,
    difficulty: 'Medium',
    readTime: 20,
    summary: 'Key events and movements from 1857 to 1947.',
    tags: ['History', 'Freedom Struggle', 'Important'],
    content: `
# Indian Freedom Struggle (1857-1947)

## First War of Independence (1857)
- Also called: Sepoy Mutiny, Great Rebellion
- Started: 10 May 1857 at Meerut
- Causes: Greased cartridges (cow/pig fat), Doctrine of Lapse

### Key Leaders:
- Mangal Pandey - Barrackpore
- Rani Lakshmibai - Jhansi
- Tantia Tope - Kanpur
- Bahadur Shah Zafar - Delhi (Nominal leader)

## Moderate Phase (1885-1905)
- **INC Founded**: 1885, Bombay
- **Founder**: A.O. Hume
- **First President**: W.C. Bonnerjee

Key Leaders: Dadabhai Naoroji, Gopal Krishna Gokhale, Pherozeshah Mehta
Method: Prayer, Petition, Protest

## Extremist Phase (1905-1920)
- Key Leaders: Bal Gangadhar Tilak, Bipin Chandra Pal, Lala Lajpat Rai (Lal-Bal-Pal)
- Tilak: "Swaraj is my birthright"

### Bengal Partition (1905)
- By Lord Curzon
- Led to Swadeshi Movement
- Annulled in 1911

## Gandhian Era (1920-1947)

### Non-Cooperation Movement (1920-22)
- Against Rowlatt Act & Jallianwala Bagh
- Suspended after Chauri Chaura incident (1922)

### Civil Disobedience Movement (1930)
- Started with Dandi March (Salt Satyagraha)
- 12 March 1930, 385 km walk

### Quit India Movement (1942)
- "Do or Die" - Gandhi
- 8 August 1942

## Independence
- **15 August 1947**
- Mountbatten Plan
- Partition: India & Pakistan
    `
  },
  {
    id: 'gk-5',
    title: 'Indian Geography: Physical Features',
    subject: Subject.GK,
    difficulty: 'Easy',
    readTime: 15,
    summary: 'Mountains, rivers, and climate of India.',
    tags: ['Geography', 'Physical', 'Important'],
    content: `
# Physical Geography of India

## Physiographic Divisions

### 1. The Himalayan Mountains
- **Three Ranges**:
  - Greater Himalayas (Himadri) - Highest peaks
  - Lesser Himalayas (Himachal) - Hill stations
  - Outer Himalayas (Shiwaliks) - Lowest

### Highest Peaks in India:
1. K2/Godwin Austin - 8611m (PoK)
2. Kangchenjunga - 8586m (Sikkim)
3. Nanda Devi - 7816m (Uttarakhand)

### 2. Northern Plains
- Formed by: Indus, Ganga, Brahmaputra
- Most fertile region
- High population density

### 3. Peninsular Plateau
- Deccan Plateau (largest)
- Western Ghats & Eastern Ghats
- Black Soil (Regur) - Cotton

### 4. Coastal Plains
- Western Coast: Narrow, backwaters (Kerala)
- Eastern Coast: Wider, deltas

## Major Rivers

| River | Origin | Falls Into |
|-------|--------|-----------|
| Ganga | Gangotri | Bay of Bengal |
| Yamuna | Yamunotri | Ganga |
| Brahmaputra | Tibet (Mansarovar) | Bay of Bengal |
| Godavari | Nasik | Bay of Bengal |
| Krishna | Mahabaleshwar | Bay of Bengal |
| Narmada | Amarkantak | Arabian Sea |
| Tapi | Satpura | Arabian Sea |

## Climate
- **Monsoon Climate**
- Southwest Monsoon: June-September (80% rainfall)
- Northeast Monsoon: October-December (Tamil Nadu)
- Hottest: May-June
- Coldest: December-January
    `
  },
  {
    id: 'gk-6',
    title: 'Current Affairs: 2025-26 Highlights',
    subject: Subject.GK,
    difficulty: 'Medium',
    readTime: 12,
    summary: 'Recent important events for MH CET Law 2026.',
    tags: ['Current Affairs', '2025-26', 'Important'],
    content: `
# Current Affairs 2025-26 Highlights

## India's Key Appointments
- **President**: Droupadi Murmu
- **Vice President**: Jagdeep Dhankhar
- **Chief Justice of India**: Justice Sanjiv Khanna (from Nov 2024)
- **RBI Governor**: Shaktikanta Das (extended)

## International Organizations
- **UN Secretary General**: António Guterres
- **WHO Director-General**: Dr. Tedros Adhanom
- **World Bank President**: Ajay Banga (Indian-American)
- **IMF Managing Director**: Kristalina Georgieva

## India's Achievements
- G20 Presidency (2023)
- Chandrayaan-3: Moon landing (Aug 2023)
- Aditya L1: Sun mission (2023)
- UPI global expansion

## Important Days
| Date | Day |
|------|-----|
| Jan 26 | Republic Day |
| Apr 14 | Ambedkar Jayanti |
| Aug 15 | Independence Day |
| Oct 2 | Gandhi Jayanti |
| Nov 26 | Constitution Day |
| Dec 10 | Human Rights Day |

## Recent Legal Developments
- Bharatiya Nyaya Sanhita (BNS) replaced IPC
- Bharatiya Nagarik Suraksha Sanhita (BNSS) replaced CrPC
- Bharatiya Sakshya Adhiniyam (BSA) replaced Indian Evidence Act
- Effective from July 1, 2024

## Sports
- Cricket World Cup 2023: India Runner-up
- Asian Games 2023: India - 4th position
- Olympics 2024 Paris

*Note: Keep updating with recent news for MH CET Law 2026!*
    `
  },
  
  // MORE MATHEMATICS
  {
    id: 'math-4',
    title: 'Simple & Compound Interest',
    subject: Subject.Math,
    difficulty: 'Medium',
    readTime: 15,
    summary: 'Interest calculations essential for banking problems.',
    tags: ['Mathematics', 'Interest', 'Banking'],
    content: `
# Simple & Compound Interest

## Simple Interest (SI)

Interest calculated only on principal amount.

### Formula:
**SI = (P × R × T) / 100**

Where:
- P = Principal (initial amount)
- R = Rate of interest (per annum)
- T = Time (in years)

### Related Formulas:
- Amount (A) = P + SI = P(1 + RT/100)
- P = (SI × 100) / (R × T)
- R = (SI × 100) / (P × T)
- T = (SI × 100) / (P × R)

### Example:
Find SI on ₹5000 at 8% for 3 years.
SI = (5000 × 8 × 3) / 100 = ₹1200

## Compound Interest (CI)

Interest calculated on principal + accumulated interest.

### Formula:
**A = P(1 + R/100)^T**
**CI = A - P**

### For Different Compounding:
- Half-yearly: A = P(1 + R/200)^(2T)
- Quarterly: A = P(1 + R/400)^(4T)

### Quick Comparison:
| Time | SI | CI (when CI > SI) |
|------|----|--------------------|
| 2 years | 2PR/100 | PR/100 × (2 + R/100) |

### Difference between CI and SI for 2 years:
**CI - SI = P(R/100)²**

### Example:
CI on ₹10000 at 10% for 2 years compounded annually:
A = 10000(1 + 10/100)² = 10000 × 1.21 = ₹12100
CI = 12100 - 10000 = ₹2100
    `
  },
  {
    id: 'math-5',
    title: 'Time & Work',
    subject: Subject.Math,
    difficulty: 'Medium',
    readTime: 15,
    summary: 'Work efficiency and combined work problems.',
    tags: ['Mathematics', 'Work', 'Important'],
    content: `
# Time & Work

## Basic Concept
If A can do a work in 'n' days, A's one day's work = 1/n

## Key Formulas

### Work Done:
**Work = Efficiency × Time**

### Combined Work:
If A does work in 'a' days, B in 'b' days:
- Together: Work/day = 1/a + 1/b
- **Time together = ab/(a+b) days**

### For Three People (A, B, C):
Time = abc / (ab + bc + ca)

## Efficiency Concept
- Assume total work = LCM of all individual times
- Calculate efficiency of each person

### Example:
A does work in 10 days, B in 15 days.
- LCM = 30 units (total work)
- A's efficiency = 30/10 = 3 units/day
- B's efficiency = 30/15 = 2 units/day
- Together = 5 units/day
- Time = 30/5 = 6 days

## Special Cases

### Pipes & Cisterns:
- Inlet pipe: Positive work (fills)
- Outlet pipe: Negative work (empties)
- Net work = Inlet - Outlet

### Alternate Days:
If A and B work on alternate days starting with A:
- Calculate 2-day cycle work
- Find complete cycles
- Adjust for remaining work

### Men-Days Work:
**M₁ × D₁ = M₂ × D₂** (for same work)
**M₁ × D₁ × H₁ = M₂ × D₂ × H₂** (different hours)
    `
  },
  {
    id: 'math-6',
    title: 'Number System & LCM-HCF',
    subject: Subject.Math,
    difficulty: 'Easy',
    readTime: 12,
    summary: 'Fundamentals of numbers, divisibility, and factors.',
    tags: ['Mathematics', 'Numbers', 'Basic'],
    content: `
# Number System & LCM-HCF

## Types of Numbers

| Type | Definition | Examples |
|------|------------|----------|
| Natural | Counting numbers | 1, 2, 3... |
| Whole | Natural + 0 | 0, 1, 2... |
| Integers | Whole + Negatives | ...-2, -1, 0, 1, 2... |
| Rational | p/q form (q≠0) | 1/2, 3/4, 0.5 |
| Irrational | Non-terminating | √2, π |
| Prime | Only 2 factors (1 & itself) | 2, 3, 5, 7, 11 |
| Composite | More than 2 factors | 4, 6, 8, 9 |

## Divisibility Rules

| Divisor | Rule |
|---------|------|
| 2 | Last digit even |
| 3 | Sum of digits divisible by 3 |
| 4 | Last 2 digits divisible by 4 |
| 5 | Ends in 0 or 5 |
| 6 | Divisible by both 2 and 3 |
| 8 | Last 3 digits divisible by 8 |
| 9 | Sum of digits divisible by 9 |
| 11 | Difference of alternate digits sums = 0 or ÷11 |

## LCM (Least Common Multiple)
Smallest number divisible by all given numbers.

### Method: Prime Factorization
LCM = Product of highest powers of all prime factors

Example: LCM of 12 and 18
- 12 = 2² × 3
- 18 = 2 × 3²
- LCM = 2² × 3² = 36

## HCF (Highest Common Factor)
Largest number that divides all given numbers.

### Method: Prime Factorization
HCF = Product of lowest powers of common prime factors

Example: HCF of 12 and 18
- 12 = 2² × 3
- 18 = 2 × 3²
- HCF = 2 × 3 = 6

## Key Relation:
**LCM × HCF = Product of two numbers**
LCM × HCF = a × b
    `
  },
  
  // MORE LEGAL TOPICS
  {
    id: 'law-6',
    title: 'Criminal Law Basics (IPC/BNS)',
    subject: Subject.Legal,
    difficulty: 'Hard',
    readTime: 20,
    summary: 'Introduction to criminal law concepts and important sections.',
    tags: ['Criminal Law', 'IPC', 'BNS', 'Important'],
    content: `
# Criminal Law Basics

## Introduction
- **IPC (1860)** - Replaced by **BNS (2023)** from July 1, 2024
- Bharatiya Nyaya Sanhita (BNS) is the new criminal code

## Key Concepts

### Mens Rea & Actus Reus
- **Mens Rea**: Guilty mind/intention
- **Actus Reus**: Guilty act
- Crime = Mens Rea + Actus Reus

### Types of Offences:

| Type | Bailable | Compoundable |
|------|----------|--------------|
| Cognizable | Police can arrest without warrant | |
| Non-cognizable | Warrant needed | |
| Bailable | Bail as of right | |
| Non-bailable | Bail at court discretion | |

## Important Offences

### Against Body:
| IPC | BNS | Offence |
|-----|-----|---------|
| 299-300 | 100-101 | Culpable Homicide/Murder |
| 304 | 105 | Causing death by negligence |
| 307 | 109 | Attempt to murder |
| 319-322 | 115-117 | Hurt/Grievous Hurt |

### Murder vs Culpable Homicide:
- Murder = Intention to cause death
- Culpable Homicide = Knowledge that death likely

### Against Property:
| IPC | BNS | Offence |
|-----|-----|---------|
| 378 | 303 | Theft |
| 383 | 308 | Extortion |
| 390 | 309 | Robbery |
| 392 | 310 | Dacoity |

## General Exceptions (Chapter IV)
- Mistake of fact (not law)
- Judicial acts
- Act of child under 7
- Unsoundness of mind
- Intoxication (involuntary)
- Consent
- Private defence

## Right of Private Defence
- **Section 96-106 IPC** / **Section 34-44 BNS**
- Right to defend body & property
- Cannot cause more harm than necessary
    `
  },
  {
    id: 'law-7',
    title: 'Law of Torts Overview',
    subject: Subject.Legal,
    difficulty: 'Medium',
    readTime: 18,
    summary: 'Civil wrongs and remedies in tort law.',
    tags: ['Torts', 'Civil Law', 'Important'],
    content: `
# Law of Torts

## What is a Tort?
A **civil wrong** (other than breach of contract) for which remedy is damages.

### Elements:
1. Wrongful act or omission
2. Legal damage to plaintiff
3. Legal remedy (damages)

## Tort vs Crime vs Breach of Contract

| Aspect | Tort | Crime | Contract |
|--------|------|-------|----------|
| Nature | Civil wrong | Public wrong | Private agreement |
| Remedy | Damages | Punishment | Specific performance |
| Parties | Individual vs Individual | State vs Accused | Party vs Party |

## Types of Torts

### 1. Intentional Torts:
- **Assault** - Threat of force
- **Battery** - Actual physical contact
- **False Imprisonment** - Unlawful restraint
- **Trespass** - Unauthorized entry
- **Defamation** - Harm to reputation

### 2. Negligence:
Elements to prove:
1. Duty of care existed
2. Breach of duty
3. Causation
4. Damage

### 3. Strict Liability (Rylands v Fletcher):
- Liability without fault
- Dangerous thing escapes
- Non-natural use of land

### 4. Absolute Liability (MC Mehta v UOI):
- No exceptions/defences
- Hazardous industries
- Higher standards in India

## Important Maxims:
- **Volenti non fit injuria** - No injury to a willing person
- **Res ipsa loquitur** - The thing speaks for itself
- **Damnum sine injuria** - Damage without legal injury
- **Injuria sine damnum** - Legal injury without actual damage

## Defences:
1. Volenti non fit injuria (consent)
2. Act of God
3. Inevitable accident
4. Private defence
5. Statutory authority
6. Necessity
    `
  },
  {
    id: 'law-8',
    title: 'Family Law Essentials',
    subject: Subject.Legal,
    difficulty: 'Medium',
    readTime: 15,
    summary: 'Marriage, divorce, and succession laws in India.',
    tags: ['Family Law', 'Personal Law', 'Important'],
    content: `
# Family Law Essentials

## Marriage Laws in India

### Hindu Marriage Act, 1955
**Conditions for Valid Hindu Marriage (Section 5):**
1. Neither party has living spouse
2. Sound mind
3. Age: Male 21, Female 18
4. Not within prohibited degrees
5. Not sapindas (unless custom permits)

**Ceremonies Required:**
- Saptapadi (seven steps) OR
- Customary rites

### Special Marriage Act, 1954
- Secular law for all Indians
- Civil marriage
- Inter-religious marriages
- 30-day notice required

### Muslim Marriage
- Contract between parties
- Mehr (dower) to wife
- Witnesses required

## Divorce

### Hindu Marriage Act - Grounds (Section 13):
1. Adultery
2. Cruelty
3. Desertion (2 years)
4. Conversion
5. Unsound mind
6. Leprosy/Venereal disease
7. Renunciation
8. Not heard alive (7 years)

### Section 13B - Mutual Consent Divorce:
- Living separately 1+ year
- Cannot live together
- Mutually agreed

### Muslim Divorce:
- Talaq (by husband)
- Khula (wife's initiation)
- Mubarat (mutual)

## Succession/Inheritance

### Hindu Succession Act, 1956
**Class I Heirs (equal share):**
- Son, Daughter
- Widow, Mother
- Son/Daughter of predeceased son/daughter

**2005 Amendment:**
- Daughters = Sons (coparcenary rights)
- Equal right in ancestral property

### Muslim Succession:
- Sharers (fixed share)
- Residuaries (remaining)
- Distant kindred
    `
  },
  {
    id: 'eng-3',
    title: 'Business Communication Essentials',
    subject: Subject.English,
    difficulty: 'Easy',
    readTime: 14,
    summary: 'Formal email style, meeting language, and concise writing for entrance tests.',
    tags: ['Business', 'Communication', 'Writing'],
    content: `
# Business Communication Essentials

## 1) Formal Email Structure
- Subject line: clear and specific
- Opening: **Dear Sir/Madam** or named recipient
- Body: Purpose, key details, requested action
- Closing: **Regards / Sincerely**

## 2) Tone Rules for Competitive Exams
- Prefer neutral and professional tone
- Avoid slang and emotional exaggeration
- Use active voice for clarity

## 3) High-Impact Connectors
- Addition: *Moreover, Furthermore*
- Contrast: *However, On the other hand*
- Result: *Therefore, Consequently*

## 4) Common Error Traps
- Verb agreement: *The team is...*
- Parallel structure: *planning, preparing, and presenting*
- Ambiguous pronouns: replace with explicit nouns

## 5) Quick Practice Pattern
Convert informal text into formal text:
- "Send me the file ASAP" → "Kindly share the file at the earliest convenience."

Strong communication improves section scores and interview readiness.
    `
  },
  {
    id: 'eng-4',
    title: 'Reading Speed and Accuracy Strategy',
    subject: Subject.English,
    difficulty: 'Medium',
    readTime: 16,
    summary: 'A timed method for comprehension passages used in CET-style exams.',
    tags: ['Comprehension', 'Speed', 'Exam Strategy'],
    content: `
# Reading Speed and Accuracy Strategy

## 3-Step Method (8-10 min per passage)
1. **Preview (45 sec):** identify topic, tone, and structure.
2. **Purpose Read (4-5 min):** mark claims, examples, and conclusion.
3. **Question Match (3-4 min):** answer from text evidence only.

## Tone Keywords
- Positive: supportive, optimistic
- Neutral: analytical, objective
- Critical: skeptical, argumentative

## Accuracy Rules
- Eliminate options with extreme words: *always, never, completely*
- Prefer options that match the author’s exact claim
- For inference questions, choose the safest supported option

## Time Discipline
- Do not re-read full passage for each question
- Mark uncertain questions and return later

Consistency with this method improves both speed and score stability.
    `
  },
  {
    id: 'lr-4',
    title: 'Arrangements and Seating: Fast Setup Templates',
    subject: Subject.LogicalReasoning,
    difficulty: 'Medium',
    readTime: 18,
    summary: 'Standard templates for linear and circular seating questions with elimination shortcuts.',
    tags: ['Arrangements', 'LR', 'Templates'],
    content: `
# Arrangements and Seating: Fast Setup Templates

## Template A: Linear Arrangement
- Draw fixed slots: 1 to n
- Place absolute clues first: *A is at one end*
- Add relative clues: *B sits second to the right of C*

## Template B: Circular Arrangement
- Fix one person to remove rotation ambiguity
- Mark clockwise direction clearly
- Convert "opposite" into +n/2 position logic

## Elimination Shortcuts
- If one clue contradicts all possibilities, reject that branch immediately
- Use mini-cases only when clue uses *either/or*
- Keep each case in separate row to avoid mixing states

## Frequent Mistakes
- Switching left/right reference person
- Ignoring "facing center" vs "facing outside"
- Not updating constraints after each placement

Use templates to reduce setup time and avoid rework under exam pressure.
    `
  },
  {
    id: 'lr-5',
    title: 'Critical Reasoning for HM/BMS Tracks',
    subject: Subject.LogicalReasoning,
    difficulty: 'Hard',
    readTime: 15,
    summary: 'Assumption, strengthen, and weaken patterns for management-style aptitude sections.',
    tags: ['Critical Reasoning', 'Assumption', 'Argument'],
    content: `
# Critical Reasoning for HM/BMS Tracks

## Core Question Types
- Identify assumption
- Strengthen argument
- Weaken argument
- Find conclusion

## Assumption Test
Use **negation test**:
If negating the statement destroys the argument, it is a necessary assumption.

## Strengthen vs Weaken
- Strengthen adds supporting evidence to premise → conclusion link
- Weaken introduces alternative cause or missing condition

## Exam Pattern Tip
- First locate conclusion, then inspect premises
- Ignore factual familiarity; judge logic only

## Mini Example
Claim: "Customer complaints fell after training. Therefore training improved service quality."
- Strengthen: Complaint audits confirmed higher satisfaction.
- Weaken: Complaint channel was temporarily disabled.

Practice reasoning structure, not content trivia.
    `
  },
  {
    id: 'gk-7',
    title: 'Hospitality and Tourism GK Capsule',
    subject: Subject.GK,
    difficulty: 'Easy',
    readTime: 12,
    summary: 'Core hospitality terms, tourism bodies, and India-focused factual revision.',
    tags: ['Hospitality', 'Tourism', 'GK'],
    content: `
# Hospitality and Tourism GK Capsule

## Core Terms
- **ADR**: Average Daily Rate
- **RevPAR**: Revenue Per Available Room
- **Occupancy Rate**: Rooms sold / rooms available

## Institutions and Bodies
- Ministry of Tourism (India)
- India Tourism Development Corporation (ITDC)
- UN Tourism (formerly UNWTO)

## High-Yield India Facts
- Key gateways: Delhi, Mumbai, Bengaluru
- Major circuits: Golden Triangle, Kerala backwaters, Rajasthan heritage
- High tourism states often tested through culture-festival pairings

## Memory Trick
Learn facts in clusters: *State + Festival + Cuisine + Monument*.

This capsule supports HM aspirants with exam-relevant GK framing.
    `
  },
  {
    id: 'gk-8',
    title: 'Business & Economy GK Essentials',
    subject: Subject.GK,
    difficulty: 'Medium',
    readTime: 13,
    summary: 'Banking, inflation, GDP basics, and policy vocabulary for BBA/BMS/Other tracks.',
    tags: ['Economy', 'Business GK', 'Current Affairs'],
    content: `
# Business & Economy GK Essentials

## Banking Basics
- **Repo Rate**: Rate at which RBI lends to banks
- **Reverse Repo**: Rate RBI pays banks for parked funds
- **CRR/SLR**: Liquidity control tools

## Macro Basics
- **GDP**: Value of final goods/services produced domestically
- **Inflation**: Sustained rise in general price levels
- **Fiscal Deficit**: Government expenditure minus revenue (excluding borrowings)

## Market Vocabulary
- Bull market: broad upward trend
- Bear market: broad downward trend
- IPO: first public offer of company shares

## Exam Tip
Track major RBI policy announcements and Union Budget highlights in short weekly notes.
    `
  },
  {
    id: 'math-7',
    title: 'Data Interpretation: Tables and Percent Change',
    subject: Subject.Math,
    difficulty: 'Medium',
    readTime: 17,
    summary: 'Fast DI workflow for table/chart questions common in BBA/BMS entrances.',
    tags: ['DI', 'Percentages', 'Aptitude'],
    content: `
# Data Interpretation: Tables and Percent Change

## Fast DI Workflow
1. Read units first (thousands, lakhs, %)
2. Mark base values and totals
3. Solve direct questions before ratio/percentage questions

## Key Formulas
- Percentage change = $\frac{New-Old}{Old} \times 100$
- Ratio conversion to percent: $\frac{a}{b} \times 100$
- Average = $\frac{\text{sum}}{\text{count}}$

## Approximation Rule
Use controlled approximation for long divisions when options are far apart.

## Trap Alerts
- Comparing absolute increase vs percentage increase
- Ignoring different base years in trend tables
- Mixing row-total and column-total references

DI speed improves with disciplined sequence, not random calculation.
    `
  },
  {
    id: 'math-8',
    title: 'Profit, Discount, and Simple Interest Toolkit',
    subject: Subject.Math,
    difficulty: 'Easy',
    readTime: 15,
    summary: 'Compact formula toolkit for retail-math questions in aptitude tracks.',
    tags: ['Profit-Loss', 'Discount', 'Interest'],
    content: `
# Profit, Discount, and Simple Interest Toolkit

## Profit-Loss Basics
- Profit = SP - CP
- Loss = CP - SP
- Profit% = $\frac{Profit}{CP} \times 100$
- Loss% = $\frac{Loss}{CP} \times 100$

## Discount Basics
- Discount = MP - SP
- Discount% = $\frac{Discount}{MP} \times 100$
- Successive discount formula:
  $$Net\,Discount\% = a + b - \frac{ab}{100}$$

## Simple Interest
- SI = $\frac{P \times R \times T}{100}$
- Amount = Principal + SI

## Exam Shortcuts
- 20% profit means SP = 1.2 CP
- 20% loss means SP = 0.8 CP
- 25% discount means SP = 0.75 MP

Memorize multipliers to reduce calculation time.
    `
  },
  {
    id: 'eng-5',
    title: 'Hospitality Communication and Guest Handling English',
    subject: Subject.English,
    difficulty: 'Medium',
    readTime: 16,
    summary: 'Polite service vocabulary, complaint handling phrases, and scenario-ready communication patterns.',
    tags: ['Hospitality', 'Service English', 'HM Track'],
    content: `
# Hospitality Communication and Guest Handling English

## 1) Service Politeness Framework
- Greeting: "Good morning, welcome to our property."
- Confirmation: "Let me quickly verify that for you."
- Assurance: "I will resolve this immediately."
- Closure: "Thank you for your patience."

## 2) Complaint Handling Script
1. Acknowledge: "I understand your concern."
2. Apologize briefly: "I am sorry for the inconvenience."
3. Action step: "I will coordinate with housekeeping/front office right away."
4. Follow-up promise: "I will update you in 10 minutes."

## 3) Accuracy in Listening Questions
- Focus on intent words: *urgent, refund, replacement, reservation, confirmation*
- Identify emotional tone: calm, frustrated, demanding
- Pick option that solves the problem, not one that only sounds polite

## 4) High-Frequency Exam Conversions
- Direct to polite: "Wait here" -> "Could you please wait here for a moment?"
- Informal to formal: "We messed up" -> "There was an operational error on our side."

Clear and calm communication is a scoring edge in HM aptitude and interviews.
    `
  },
  {
    id: 'eng-6',
    title: 'Management RC and Business Vocabulary Boost',
    subject: Subject.English,
    difficulty: 'Hard',
    readTime: 18,
    summary: 'Comprehension strategy for market/economy passages and high-yield business word clusters.',
    tags: ['BBA/BMS', 'RC', 'Vocabulary'],
    content: `
# Management RC and Business Vocabulary Boost

## 1) Passage Types You Will See
- Market trend summaries
- Startup and funding reports
- Policy-impact editorials
- Consumer behavior caselets

## 2) Vocabulary Clusters
- Growth: expansion, scaling, acceleration
- Risk: volatility, exposure, downturn
- Finance: liquidity, leverage, valuation
- Strategy: segmentation, differentiation, positioning

## 3) RC Solving Protocol
1. Read title and first line to set context
2. Mark claim-evidence pairs
3. Flag numbers, years, and policy references
4. Solve factual questions first, inference later

## 4) Trap Avoidance
- Do not confuse author opinion with quoted expert opinion
- Ignore options that add new facts not in passage
- Eliminate absolute claims unless passage is absolute

Practice with business-themed passages improves both English and GK linkage.
    `
  },
  {
    id: 'lr-6',
    title: 'Data Sufficiency and Analytical Decision Rules',
    subject: Subject.LogicalReasoning,
    difficulty: 'Hard',
    readTime: 17,
    summary: 'Structured framework for data sufficiency and decision-making logic common in BBA/BMS tests.',
    tags: ['Data Sufficiency', 'Analytical', 'BBA/BMS'],
    content: `
# Data Sufficiency and Analytical Decision Rules

## 1) Data Sufficiency Format
- Statement I alone sufficient?
- Statement II alone sufficient?
- Both together sufficient?

## 2) Working Method
1. Identify target output (value/range/comparison)
2. Test Statement I independently
3. Reset and test Statement II independently
4. Combine only if both alone are insufficient

## 3) Decision-Making Cases
- Capacity vs demand constraints
- Cost vs quality trade-off
- Deadline vs risk trade-off

## 4) Elimination Heuristics
- If one statement gives unique value, mark sufficient quickly
- If both statements repeat same data, combined value is low
- If variables remain free, statement is insufficient

This framework reduces guesswork in higher-order aptitude sets.
    `
  },
  {
    id: 'lr-7',
    title: 'Service Operations Logic Caselets',
    subject: Subject.LogicalReasoning,
    difficulty: 'Medium',
    readTime: 15,
    summary: 'Queue, scheduling, and resource-allocation logic for hospitality and operations aptitude questions.',
    tags: ['Operations', 'Caselets', 'HM Track'],
    content: `
# Service Operations Logic Caselets

## 1) Typical Caselet Themes
- Check-in/check-out congestion
- Restaurant table allocation
- Housekeeping shift sequencing
- Event-slot scheduling conflicts

## 2) Fast Modeling Pattern
- Convert narrative into slots and constraints
- Mark hard constraints first (fixed slots)
- Add soft constraints after fixed placements

## 3) Queue Logic Tips
- Priority queue means arrival order may not hold
- Service time differences change completion order
- Parallel counters require lane-wise tracking

## 4) Common Error Traps
- Ignoring one-off exceptions
- Mixing up start time and completion time
- Forgetting mandatory buffer intervals

Caselet speed depends on neat structure more than raw math.
    `
  },
  {
    id: 'gk-9',
    title: 'Startup, Corporate, and Market Awareness Capsule',
    subject: Subject.GK,
    difficulty: 'Medium',
    readTime: 14,
    summary: 'Business-current affairs essentials for BBA/BMS and management aptitude tracks.',
    tags: ['Startup', 'Corporate GK', 'BBA/BMS'],
    content: `
# Startup, Corporate, and Market Awareness Capsule

## 1) Startup Ecosystem Basics
- Funding stages: Seed, Series A, Series B+
- Unicorn: startup valued at $1B+
- IPO: company lists shares to public market

## 2) Corporate Awareness Quick Points
- CEO/CFO role differences
- ESG: Environmental, Social, Governance focus
- Merger vs acquisition basics

## 3) Market Indicators to Track
- Index movement (Sensex/Nifty)
- Interest rate decisions by RBI
- Inflation and policy announcements

## 4) Exam Strategy
- Maintain one-page weekly business GK digest
- Track major appointments and exits
- Revise key terms through flashcards

Business-awareness questions reward consistency over memorizing random trivia.
    `
  },
  {
    id: 'gk-10',
    title: 'Travel, Tourism, and Hotel Industry Awareness',
    subject: Subject.GK,
    difficulty: 'Easy',
    readTime: 13,
    summary: 'Industry-specific GK for hospitality aspirants: tourism bodies, terminology, and India circuits.',
    tags: ['Tourism', 'Hotel Industry', 'HM Track'],
    content: `
# Travel, Tourism, and Hotel Industry Awareness

## 1) Tourism Ecosystem Basics
- Domestic vs inbound tourism
- Peak vs off-season demand
- Heritage, eco, and medical tourism categories

## 2) Hotel Operations Terms
- Occupancy %, ARR, RevPAR
- Front office, F&B, housekeeping key functions
- Overbooking risk and mitigation

## 3) India High-Yield Facts
- Golden Triangle: Delhi-Agra-Jaipur
- Coastal circuits and hill circuits in exam GK
- Major festival-tourism linkages by state

## 4) Test Tip
- Remember facts in clusters: destination + attraction + season + category

This capsule gives HM aspirants domain-specific GK without overloading details.
    `
  },
  {
    id: 'math-9',
    title: 'Time-Work, Scheduling, and Throughput Aptitude',
    subject: Subject.Math,
    difficulty: 'Hard',
    readTime: 19,
    summary: 'Operational math toolkit for shifts, team productivity, and process completion questions.',
    tags: ['Time & Work', 'Operations Math', 'BBA/BMS'],
    content: `
# Time-Work, Scheduling, and Throughput Aptitude

## 1) Core Relation
- Work = Rate x Time
- If A completes in 6 days, A's one-day work = 1/6

## 2) Team Combination Rule
- Combined rate = sum of individual rates
- Completion time = 1 / combined rate

## 3) Scheduling Questions
- Convert all durations to a common unit first
- Account for breaks, shift changes, and overlap windows
- Track cumulative output after each interval

## 4) Throughput Scenarios
- Service counters with unequal rates
- Machine/process output per hour
- Bottleneck stage determines total completion pace

Use fraction-based calculations to avoid decimal drift in long questions.
    `
  },
  {
    id: 'math-10',
    title: 'Ratio, Mixture, and Costing for Service Tracks',
    subject: Subject.Math,
    difficulty: 'Medium',
    readTime: 16,
    summary: 'Ratio-alligation-costing questions tailored for hospitality and business operations contexts.',
    tags: ['Ratio', 'Mixture', 'Costing', 'HM Track'],
    content: `
# Ratio, Mixture, and Costing for Service Tracks

## 1) Ratio Scaling
- Keep ratio in lowest form first
- Convert to actual values using common multiplier

## 2) Mixture and Alligation
- Weighted average for blending two categories
- Alligation shortcut for target-value blend

## 3) Costing Questions
- Total cost = fixed + variable components
- Unit cost = total cost / units produced
- Margin % usually computed on cost unless stated otherwise

## 4) Service Context Examples
- Ingredient blend costing
- Room package component pricing
- Event budget allocation ratios

Practice with context-rich problems to improve transfer in real exam caselets.
    `
  }
];

const StudyHub: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { markTopicMastered, learnerProfile } = useProgress();
  const [activeTab, setActiveTab] = useState<'library' | 'news' | 'plan'>('library');

  const trackSubjectsMap: Record<CourseTrack, Subject[]> = {
    [CourseTrack.LLB3]: [Subject.LegalAptitude, Subject.GK, Subject.LogicalReasoning, Subject.English, Subject.Math],
    [CourseTrack.LLB5]: [Subject.LegalAptitude, Subject.GK, Subject.LogicalReasoning, Subject.English, Subject.Math],
    [CourseTrack.BBA_BMS]: [Subject.Math, Subject.LogicalReasoning, Subject.English, Subject.GK],
    [CourseTrack.HOTEL_MGMT]: [Subject.English, Subject.GK, Subject.LogicalReasoning, Subject.Math],
    [CourseTrack.OTHER]: [Subject.GK, Subject.LogicalReasoning, Subject.English, Subject.Math]
  };

  const trackQuickTopicIdsMap: Record<CourseTrack, string[]> = {
    [CourseTrack.LLB3]: ['la-1', 'la-2', 'la-3'],
    [CourseTrack.LLB5]: ['la-1', 'eng-3', 'lr-1', 'math-8'],
    [CourseTrack.BBA_BMS]: ['math-7', 'math-9', 'lr-6', 'gk-9', 'eng-6'],
    [CourseTrack.HOTEL_MGMT]: ['eng-5', 'gk-10', 'lr-7', 'math-10', 'gk-7'],
    [CourseTrack.OTHER]: ['gk-8', 'lr-6', 'eng-4', 'math-9', 'gk-9']
  };

  const trackSubjects = trackSubjectsMap[learnerProfile.targetCourse] || trackSubjectsMap[CourseTrack.LLB3];
  
  // --- Library State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<'All' | Subject>('All');
  const [filterDifficulty, setFilterDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [filterTime, setFilterTime] = useState<'All' | 'Short' | 'Long'>('All'); // Short < 15m
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<StaticTopic | null>(null);
  
  // --- Reader State ---
  const [readerTheme, setReaderTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [readerSize, setReaderSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [explanationLoading, setExplanationLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [showToC, setShowToC] = useState(false);

  // --- News State ---
  const [newsCategory, setNewsCategory] = useState<'all' | 'legal' | 'business' | 'tech' | 'sports' | 'world'>('all');
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsResult, setNewsResult] = useState<ReelNewsItem[]>([]);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const reelListRef = useRef<HTMLDivElement | null>(null);

  // --- Plan State ---
  const [planLoading, setPlanLoading] = useState(false);
  const [studyPlan, setStudyPlan] = useState<string | null>(null);

  // --- Filtering Logic ---
  const filteredTopics = useMemo(() => {
    return STUDY_DATA.filter(topic => {
      const matchesTrack = trackSubjects.includes(topic.subject);
      const matchesSubject = filterSubject === 'All' || topic.subject === filterSubject;
      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            topic.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDiff = filterDifficulty === 'All' || topic.difficulty === filterDifficulty;
      const matchesTime = filterTime === 'All' || 
                          (filterTime === 'Short' && topic.readTime < 15) || 
                          (filterTime === 'Long' && topic.readTime >= 15);
      return matchesTrack && matchesSubject && matchesSearch && matchesDiff && matchesTime;
    });
  }, [searchQuery, filterSubject, filterDifficulty, filterTime, trackSubjects]);

  const quickTopics = useMemo(() => {
    const ids = trackQuickTopicIdsMap[learnerProfile.targetCourse] || trackQuickTopicIdsMap[CourseTrack.LLB3];
    return ids
      .map(id => STUDY_DATA.find(topic => topic.id === id))
      .filter((topic): topic is StaticTopic => Boolean(topic));
  }, [learnerProfile.targetCourse]);

  // --- ToC Logic ---
  const toc = useMemo(() => {
    if (!selectedTopic) return [];
    return selectedTopic.content.split('\n')
      .filter(line => line.trim().startsWith('#'))
      .map((line, index) => {
        const match = line.match(/^(#+)\s+(.*)$/);
        if (!match) return null;
        return { id: index, level: match[1].length, text: match[2].trim() };
      })
      .filter((item): item is { id: number, level: number, text: string } => item !== null);
  }, [selectedTopic]);

  const scrollToSection = (text: string) => {
    const headings = document.querySelectorAll('article h1, article h2, article h3, article h4, article h5, article h6');
    for (let i = 0; i < headings.length; i++) {
      if (headings[i].textContent?.trim() === text.trim()) {
        headings[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        setShowToC(false);
        break;
      }
    }
  };

  // --- Handlers ---

  const handleExplain = async () => {
    if (!selectedTopic) return;
    setExplanationLoading(true);
    const result = await explainConcept(selectedTopic.title, selectedTopic.subject);
    setAiExplanation(result);
    setExplanationLoading(false);
  };

  const handleNewsFetch = async () => {
    setNewsLoading(true);
    setNewsError(null);
    const result = await fetchReelNews({ category: newsCategory, limit: 18, offset: 0 });
    if (!result.length) {
      setNewsError('Could not load news right now. Please try again in a moment.');
    }
    setNewsResult(result);
    setNewsLoading(false);
  };

  const openReelFullscreen = (index: number) => {
    setActiveReelIndex(index);
  };

  const closeReelFullscreen = () => {
    setActiveReelIndex(null);
  };

  const stepReel = (step: 1 | -1) => {
    if (activeReelIndex === null) return;
    const nextIndex = activeReelIndex + step;
    if (nextIndex < 0 || nextIndex >= newsResult.length) return;
    setActiveReelIndex(nextIndex);
  };

  const getDisplaySummary = (text: string) => {
    const clean = text.trim();
    return clean.length > 360 ? `${clean.slice(0, 357)}...` : clean;
  };

  useEffect(() => {
    if (activeTab === 'news' && newsResult.length === 0 && !newsLoading) {
      handleNewsFetch();
    }
  }, [activeTab]);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'library' || tabParam === 'news' || tabParam === 'plan') {
      setActiveTab(tabParam);
    }

    const subjectParam = searchParams.get('subject');
    if (subjectParam && (Object.values(Subject) as string[]).includes(subjectParam)) {
      setFilterSubject(subjectParam as Subject);
      setActiveTab('library');
    }

    const queryParam = searchParams.get('q');
    if (queryParam) {
      setSearchQuery(queryParam);
      setActiveTab('library');
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeReelIndex === null) return;
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeReelFullscreen();
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') stepReel(1);
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') stepReel(-1);
    };
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [activeReelIndex, newsResult.length]);

  const handleGeneratePlan = async () => {
    setPlanLoading(true);
    const plan = await generateStudyPlan();
    setStudyPlan(plan);
    setPlanLoading(false);
  };

  // --- Render Helpers ---

  const getThemeClasses = () => {
    switch(readerTheme) {
      case 'dark': return 'bg-gray-900 text-gray-100';
      case 'sepia': return 'bg-[#f4ecd8] text-[#5b4636]';
      default: return 'bg-white text-gray-900';
    }
  };

  const getSizeClass = () => {
    switch(readerSize) {
      case 'sm': return 'prose-sm';
      case 'lg': return 'prose-lg';
      default: return 'prose-base';
    }
  };

  // --- Views ---

  const renderReader = () => {
    if (!selectedTopic) return null;

    return (
      <div className={`fixed inset-0 z-50 flex flex-col ${getThemeClasses()} transition-colors duration-300`}>
        {/* Reader Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 shadow-sm bg-opacity-95 backdrop-blur-sm sticky top-0 z-10">
          <button onClick={() => setSelectedTopic(null)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4">
            {/* Table of Contents */}
            <div className="relative">
              <button 
                onClick={() => setShowToC(!showToC)}
                className={`p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${showToC ? 'ring-2 ring-indigo-500' : ''}`}
                title="Table of Contents"
              >
                <List className="w-5 h-5" />
              </button>
              
              {showToC && (
                <div className="absolute top-12 right-0 w-64 bg-white dark:bg-gray-900 shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-in fade-in zoom-in-95">
                   <div className="p-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                     <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Jump to Section</h4>
                   </div>
                   <div className="max-h-64 overflow-y-auto py-2 custom-scrollbar">
                     {toc.length > 0 ? (
                       toc.map((item) => (
                         <button
                           key={item.id}
                           onClick={() => scrollToSection(item.text)}
                           className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-colors truncate block"
                           style={{ paddingLeft: `${Math.min(item.level * 12, 48)}px` }}
                         >
                           {item.text}
                         </button>
                       ))
                     ) : (
                       <p className="px-4 py-2 text-sm text-gray-400 italic">No sections found</p>
                     )}
                   </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button 
                onClick={() => setReaderTheme('light')} 
                className={`p-2 rounded-md ${readerTheme === 'light' ? 'bg-white shadow-sm' : ''}`} title="Light"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setReaderTheme('sepia')} 
                className={`p-2 rounded-md ${readerTheme === 'sepia' ? 'bg-[#e8ddc1] shadow-sm' : ''}`} title="Sepia"
              >
                <BookOpen className="w-4 h-4 text-[#8b6b4e]" />
              </button>
              <button 
                onClick={() => setReaderTheme('dark')} 
                className={`p-2 rounded-md ${readerTheme === 'dark' ? 'bg-gray-700 shadow-sm' : ''}`} title="Dark"
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>

            {/* Font Size Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button 
                onClick={() => setReaderSize('sm')} 
                className={`px-3 py-1 rounded-md text-xs font-bold ${readerSize === 'sm' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
              >
                A-
              </button>
              <button 
                onClick={() => setReaderSize('md')} 
                className={`px-3 py-1 rounded-md text-sm font-bold ${readerSize === 'md' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
              >
                A
              </button>
              <button 
                onClick={() => setReaderSize('lg')} 
                className={`px-3 py-1 rounded-md text-lg font-bold ${readerSize === 'lg' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
              >
                A+
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-3xl mx-auto w-full custom-scrollbar">
          <article className={`prose dark:prose-invert max-w-none ${getSizeClass()}`}>
            <ReactMarkdown>{selectedTopic.content}</ReactMarkdown>
          </article>

          {/* AI Explanation Area */}
          {aiExplanation && (
            <div className="mt-8 p-6 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
               <h3 className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold mb-3">
                 <Bot className="w-5 h-5" /> AI Tutor Explanation
               </h3>
               <ReactMarkdown className="prose-sm dark:prose-invert text-gray-700 dark:text-gray-300">
                 {aiExplanation}
               </ReactMarkdown>
            </div>
          )}

          {/* Actions Footer */}
          <div className="mt-12 mb-20 flex flex-col md:flex-row gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
             <button 
               onClick={handleExplain} 
               disabled={explanationLoading}
               className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
             >
                {explanationLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Zap className="w-5 h-5" /> Explain with AI
                  </>
                )}
             </button>
             {selectedTopic.quiz && (
               <button className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Take Topic Quiz
               </button>
             )}
          </div>
        </div>
      </div>
    );
  };

  const renderLibrary = () => (
    <div className="space-y-4 md:space-y-6">
      {/* Search Header */}
      <div className="sticky top-0 bg-gray-100 dark:bg-gray-900 pt-2 pb-3 md:pb-4 z-10">
        <div className="flex gap-2 mb-3 md:mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
            <input 
              type="text" 
              placeholder="Search topics, tags..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm md:text-base"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 md:p-3 rounded-lg md:rounded-xl border transition-colors ${showFilters ? 'bg-indigo-100 border-indigo-200 text-indigo-700' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500'}`}
          >
            <Filter className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-lg md:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 animate-in slide-in-from-top-2">
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Difficulty</label>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {['All', 'Easy', 'Medium', 'Hard'].map(lvl => (
                    <button 
                      key={lvl}
                      onClick={() => setFilterDifficulty(lvl as any)}
                      className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors ${filterDifficulty === lvl ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Read Time</label>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {['All', 'Short', 'Long'].map(time => (
                    <button 
                      key={time}
                      onClick={() => setFilterTime(time as any)}
                      className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors ${filterTime === time ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                    >
                      {time === 'All' ? 'Any' : (time === 'Short' ? '<15m' : '>15m')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Quick Access - Track Starter */}
      <div className="mb-2">
        <div className="mb-3 md:mb-4">
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dedicated Sections</span>
          </div>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            <button
              onClick={() => setFilterSubject('All')}
              className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium border transition-colors ${
                filterSubject === 'All'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-indigo-300'
              }`}
            >
              All Subjects
            </button>
            {trackSubjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setFilterSubject(subject)}
                className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium border transition-colors ${
                  filterSubject === subject
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-indigo-300'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2 md:mb-3">
           <Gavel className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-600 dark:text-indigo-400" />
           <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quick Study: {learnerProfile.targetCourse}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {quickTopics.map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-1.5 md:py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs md:text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors border border-indigo-100 dark:border-indigo-800"
            >
              {topic.subject === Subject.LegalAptitude ? <Scale className="w-3 h-3 md:w-3.5 md:h-3.5" /> : topic.subject === Subject.LogicalReasoning ? <ShieldAlert className="w-3 h-3 md:w-3.5 md:h-3.5" /> : <Gavel className="w-3 h-3 md:w-3.5 md:h-3.5" />}
              <span className="line-clamp-1">{topic.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {filteredTopics.length > 0 ? (
          filteredTopics.map(topic => (
            <div 
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className="bg-white dark:bg-gray-800 p-4 md:p-5 rounded-lg md:rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2 md:mb-3">
                <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-bold ${
                  topic.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
                  topic.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-red-100 text-red-700'
                }`}>
                  {topic.difficulty}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {topic.readTime}m
                </span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base md:text-lg mb-1.5 md:mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {topic.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 md:mb-4">
                {topic.summary}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-1.5 md:gap-2 flex-wrap">
                   {topic.tags.slice(0, 2).map(tag => (
                     <span key={tag} className="text-xs bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 md:px-2 py-0.5 md:py-1 rounded">#{tag}</span>
                   ))}
                </div>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 md:py-12">
            <div className="bg-gray-50 dark:bg-gray-800 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
               <Search className="w-6 h-6 md:w-8 md:h-8 text-gray-300" />
            </div>
            <h3 className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300">No topics found</h3>
            <p className="text-gray-400 text-xs md:text-sm">Try adjusting your search or filters</p>
            <button 
              onClick={() => { setSearchQuery(''); setFilterSubject('All'); setFilterDifficulty('All'); setFilterTime('All'); }}
              className="mt-3 md:mt-4 text-indigo-600 font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-indigo-900 text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
           <h2 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 flex items-center gap-2">
             <Newspaper className="w-5 h-5 md:w-6 md:h-6" /> News Reels
           </h2>
           <p className="text-indigo-200 text-xs md:text-sm mb-4 md:mb-6 max-w-lg">
             Short-scroll current affairs using free APIs (Inshorts + RSS fallback).
           </p>
           
           <div className="flex flex-col gap-2 md:gap-3">
             <div className="flex gap-2 md:gap-3">
               <select 
                 value={newsCategory} 
                 onChange={(e) => setNewsCategory(e.target.value as typeof newsCategory)}
                 className="bg-white/10 border border-indigo-400/30 rounded-lg px-3 md:px-4 py-2.5 md:py-3 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm md:text-base"
               >
                 <option value="all" className="text-gray-900">All</option>
                 <option value="legal" className="text-gray-900">Legal</option>
                 <option value="business" className="text-gray-900">Business</option>
                 <option value="tech" className="text-gray-900">Tech</option>
                 <option value="sports" className="text-gray-900">Sports</option>
                 <option value="world" className="text-gray-900">World</option>
               </select>
               <div className="flex-1 bg-white/10 border border-indigo-400/30 rounded-lg px-3 md:px-4 py-2.5 md:py-3 text-indigo-100 text-xs md:text-sm flex items-center">
                 Swipe/scroll vertically for reel view
               </div>
             </div>
             <button 
               onClick={handleNewsFetch}
               disabled={newsLoading}
               className="bg-yellow-400 text-indigo-900 font-bold px-4 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-yellow-300 transition-colors shadow-lg flex items-center justify-center gap-2 text-sm md:text-base"
             >
               {newsLoading ? <div className="w-4 h-4 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
               Refresh Reels
             </button>
           </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none hidden md:block">
           <Search className="w-64 h-64 -mb-12 -mr-12" />
        </div>
      </div>

      {newsError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl p-4 text-sm">
          {newsError}
        </div>
      )}

      {newsResult.length > 0 && (
        <div className="animate-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {newsResult.length} reels loaded • Category: {newsCategory}
            </div>
            <button
              onClick={() => openReelFullscreen(0)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" /> Full Screen
            </button>
          </div>

          <div ref={reelListRef} className="h-[68vh] md:h-[74vh] overflow-y-auto snap-y snap-mandatory space-y-4 pr-1 custom-scrollbar">
            {newsResult.map((item, index) => (
              <article
                key={item.id}
                className="snap-start min-h-[62vh] bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col"
              >
                {item.imageUrl && !failedImages[item.id] && (
                  <div className="h-44 md:h-56 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={() => setFailedImages(prev => ({ ...prev, [item.id]: true }))}
                    />
                  </div>
                )}
                {(!item.imageUrl || failedImages[item.id]) && (
                  <div className="h-44 md:h-56 w-full bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/40 dark:to-violet-900/20 flex items-center justify-center">
                    <Newspaper className="w-12 h-12 text-indigo-500/70" />
                  </div>
                )}

                <div className="p-4 md:p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="px-2 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium">
                      {item.category || newsCategory}
                    </span>
                    <span>{item.publishedAt || 'Latest'}</span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-snug mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-5 flex-1">
                    {getDisplaySummary(item.summary)}
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">Source: {item.source || 'News Feed'}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openReelFullscreen(index)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 text-xs md:text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                      >
                        <Maximize2 className="w-3.5 h-3.5" /> Full
                      </button>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-white text-xs md:text-sm font-medium transition-colors ${item.url === '#' ? 'bg-gray-400 cursor-not-allowed pointer-events-none' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                      >
                        Read Full <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {activeReelIndex !== null && newsResult[activeReelIndex] && (
        <div className="fixed inset-0 z-[90] bg-black text-white flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/15 backdrop-blur-sm bg-black/70">
            <div className="text-xs uppercase tracking-wider text-gray-300">Reel {activeReelIndex + 1} / {newsResult.length}</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => stepReel(-1)}
                disabled={activeReelIndex === 0}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => stepReel(1)}
                disabled={activeReelIndex === newsResult.length - 1}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={closeReelFullscreen}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
                title="Exit full screen"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <article className="min-h-full max-w-3xl mx-auto flex flex-col">
              {newsResult[activeReelIndex].imageUrl && !failedImages[`fs-${newsResult[activeReelIndex].id}`] && (
                <div className="h-[42vh] w-full bg-gray-900 overflow-hidden">
                  <img
                    src={newsResult[activeReelIndex].imageUrl}
                    alt={newsResult[activeReelIndex].title}
                    className="w-full h-full object-cover"
                    onError={() => setFailedImages(prev => ({ ...prev, [`fs-${newsResult[activeReelIndex].id}`]: true }))}
                  />
                </div>
              )}
              <div className="p-5 md:p-7 flex-1 flex flex-col bg-gray-950">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span className="px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300">{newsResult[activeReelIndex].category || newsCategory}</span>
                  <span>{newsResult[activeReelIndex].publishedAt || 'Latest'}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-4">{newsResult[activeReelIndex].title}</h3>
                <p className="text-sm md:text-base text-gray-200 leading-relaxed mb-8 flex-1">{newsResult[activeReelIndex].summary}</p>
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/15">
                  <span className="text-xs text-gray-400">Source: {newsResult[activeReelIndex].source || 'News Feed'}</span>
                  <a
                    href={newsResult[activeReelIndex].url}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${newsResult[activeReelIndex].url === '#' ? 'bg-gray-500 cursor-not-allowed pointer-events-none' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                  >
                    Read Full Article <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}
    </div>
  );

  const renderPlan = () => (
    <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
      <div className="text-center space-y-3 md:space-y-4">
         <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">AI Personal Strategist</h2>
         <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-lg mx-auto px-4">
           Get a custom 12-week roadmap tailored to your weak areas and schedule.
         </p>
         <button 
           onClick={handleGeneratePlan}
           disabled={planLoading}
           className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 mx-auto text-sm md:text-base"
         >
           {planLoading ? <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Zap className="w-4 h-4 md:w-5 md:h-5" />}
           Generate My Plan
         </button>
      </div>
      
      {studyPlan && (
        <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in-95">
           <ReactMarkdown className="prose dark:prose-invert max-w-none prose-sm md:prose-base prose-headings:text-indigo-600 dark:prose-headings:text-indigo-400 prose-a:text-blue-500">
             {studyPlan}
           </ReactMarkdown>
        </div>
      )}
    </div>
  );

  // --- Main Render ---

  if (selectedTopic) return renderReader();

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Top Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4 md:mb-6 overflow-x-auto no-scrollbar">
         <button 
           onClick={() => setActiveTab('library')}
           className={`flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-3 md:py-4 border-b-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${activeTab === 'library' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
         >
           <BookOpen className="w-4 h-4" /> Library
         </button>
         <button 
           onClick={() => setActiveTab('news')}
           className={`flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-3 md:py-4 border-b-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${activeTab === 'news' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
         >
           <Newspaper className="w-4 h-4" /> Reels
         </button>
         <button 
           onClick={() => setActiveTab('plan')}
           className={`flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-3 md:py-4 border-b-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${activeTab === 'plan' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
         >
           <Zap className="w-4 h-4" /> <span className="hidden sm:inline">Study</span> Plan
         </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px] md:min-h-[500px]">
        {activeTab === 'library' && renderLibrary()}
        {activeTab === 'news' && renderNews()}
        {activeTab === 'plan' && renderPlan()}
      </div>
    </div>
  );
};

export default StudyHub;