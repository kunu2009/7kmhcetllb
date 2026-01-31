import React, { useState, useEffect } from 'react';
import {
  Repeat,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Check,
  X,
  Brain,
  Flame,
  Target,
  Clock,
  Shuffle,
  BookOpen,
  Zap,
  Star,
  Filter
} from 'lucide-react';
import { Subject } from '../types';

// Types
interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: 'maxim' | 'article' | 'case' | 'definition' | 'amendment';
  subject: Subject;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: Date;
  nextReview?: Date;
  repetitions: number;
  easeFactor: number;
}

// Flashcard Data
const FLASHCARDS: Flashcard[] = [
  // Legal Maxims
  { id: 'max-1', front: 'Actus non facit reum nisi mens sit rea', back: 'An act does not make one guilty unless the mind is also guilty.\n\nEssential for criminal liability - both actus reus (guilty act) and mens rea (guilty mind) required.', category: 'maxim', subject: Subject.LegalAptitude, difficulty: 'medium', repetitions: 0, easeFactor: 2.5 },
  { id: 'max-2', front: 'Ignorantia juris non excusat', back: 'Ignorance of law is no excuse.\n\nEveryone is presumed to know the law. Cannot escape liability by claiming ignorance.', category: 'maxim', subject: Subject.LegalAptitude, difficulty: 'easy', repetitions: 0, easeFactor: 2.5 },
  { id: 'max-3', front: 'Ubi jus ibi remedium', back: 'Where there is a right, there is a remedy.\n\nIf a legal right exists, there must be a legal remedy for its violation.', category: 'maxim', subject: Subject.LegalAptitude, difficulty: 'easy', repetitions: 0, easeFactor: 2.5 },
  { id: 'max-4', front: 'Audi alteram partem', back: 'Hear the other side.\n\nPrinciple of natural justice - no one should be condemned unheard.', category: 'maxim', subject: Subject.LegalAptitude, difficulty: 'easy', repetitions: 0, easeFactor: 2.5 },
  { id: 'max-5', front: 'Nemo judex in causa sua', back: 'No one can be a judge in their own cause.\n\nPrinciple of natural justice - ensures impartiality in judicial proceedings.', category: 'maxim', subject: Subject.LegalAptitude, difficulty: 'medium', repetitions: 0, easeFactor: 2.5 },
  { id: 'max-6', front: 'Volenti non fit injuria', back: 'To one who consents, no injury is done.\n\nDefense in Law of Torts - if person consents to risk, cannot claim damages.', category: 'maxim', subject: Subject.LegalAptitude, difficulty: 'medium', repetitions: 0, easeFactor: 2.5 },
  { id: 'max-7', front: 'Res ipsa loquitur', back: 'The thing speaks for itself.\n\nUsed in negligence cases where the accident itself proves negligence (e.g., surgical tool left inside body).', category: 'maxim', subject: Subject.LegalAptitude, difficulty: 'medium', repetitions: 0, easeFactor: 2.5 },
  { id: 'max-8', front: 'Damnum sine injuria', back: 'Damage without legal injury.\n\nActual loss suffered but no legal right violated. NOT actionable.\nExample: Opening a rival shop legally.', category: 'maxim', subject: Subject.LegalAptitude, difficulty: 'hard', repetitions: 0, easeFactor: 2.5 },
  { id: 'max-9', front: 'Injuria sine damno', back: 'Legal injury without actual damage.\n\nLegal right violated but no actual loss. IS actionable.\nExample: Preventing someone from voting.', category: 'maxim', subject: Subject.LegalAptitude, difficulty: 'hard', repetitions: 0, easeFactor: 2.5 },
  { id: 'max-10', front: 'Caveat emptor', back: 'Let the buyer beware.\n\nBuyer responsible for checking quality before purchase. Now modified by consumer protection laws.', category: 'maxim', subject: Subject.LegalAptitude, difficulty: 'easy', repetitions: 0, easeFactor: 2.5 },
  
  // Constitutional Articles
  { id: 'art-1', front: 'Article 14', back: 'EQUALITY BEFORE LAW\n\nThe State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.', category: 'article', subject: Subject.LegalAptitude, difficulty: 'easy', repetitions: 0, easeFactor: 2.5 },
  { id: 'art-2', front: 'Article 19', back: 'PROTECTION OF SIX FREEDOMS (Citizens only)\n\n1. Speech and expression\n2. Assemble peacefully\n3. Form associations\n4. Move freely in India\n5. Reside and settle anywhere\n6. Practice any profession', category: 'article', subject: Subject.LegalAptitude, difficulty: 'medium', repetitions: 0, easeFactor: 2.5 },
  { id: 'art-3', front: 'Article 21', back: 'RIGHT TO LIFE AND PERSONAL LIBERTY\n\nNo person shall be deprived of his life or personal liberty except according to procedure established by law.\n\nExpanded in Maneka Gandhi case (1978).', category: 'article', subject: Subject.LegalAptitude, difficulty: 'easy', repetitions: 0, easeFactor: 2.5 },
  { id: 'art-4', front: 'Article 21A', back: 'RIGHT TO EDUCATION\n\nFree and compulsory education for children aged 6-14 years.\n\nAdded by 86th Amendment, 2002.', category: 'article', subject: Subject.LegalAptitude, difficulty: 'medium', repetitions: 0, easeFactor: 2.5 },
  { id: 'art-5', front: 'Article 32', back: 'RIGHT TO CONSTITUTIONAL REMEDIES\n\n"Heart and Soul" of Constitution - Dr. Ambedkar\n\nRight to move Supreme Court for enforcement of Fundamental Rights through 5 writs.', category: 'article', subject: Subject.LegalAptitude, difficulty: 'medium', repetitions: 0, easeFactor: 2.5 },
  { id: 'art-6', front: 'Article 44', back: 'UNIFORM CIVIL CODE\n\nDirective Principle - State shall endeavor to secure a Uniform Civil Code for citizens throughout India.\n\nNot yet implemented.', category: 'article', subject: Subject.LegalAptitude, difficulty: 'medium', repetitions: 0, easeFactor: 2.5 },
  { id: 'art-7', front: 'Article 51A', back: 'FUNDAMENTAL DUTIES\n\n11 duties of citizens (Part IVA)\nAdded by 42nd Amendment, 1976\n11th duty added by 86th Amendment, 2002', category: 'article', subject: Subject.LegalAptitude, difficulty: 'hard', repetitions: 0, easeFactor: 2.5 },
  { id: 'art-8', front: 'Article 370', back: 'SPECIAL STATUS TO J&K\n\nProvided special autonomous status to Jammu & Kashmir.\n\nAbrogated on 5 August 2019 by Presidential Order.', category: 'article', subject: Subject.LegalAptitude, difficulty: 'medium', repetitions: 0, easeFactor: 2.5 },
  
  // Important Cases
  { id: 'case-1', front: 'Kesavananda Bharati v. State of Kerala (1973)', back: 'BASIC STRUCTURE DOCTRINE\n\nParliament can amend Constitution but cannot alter its "basic structure".\n\n13-judge bench, 7:6 majority.\nOverruled Golaknath case.', category: 'case', subject: Subject.LegalAptitude, difficulty: 'hard', repetitions: 0, easeFactor: 2.5 },
  { id: 'case-2', front: 'Maneka Gandhi v. Union of India (1978)', back: 'EXPANDED ARTICLE 21\n\nRight to life includes right to live with dignity.\n\nProcedure must be fair, just and reasonable (not arbitrary).', category: 'case', subject: Subject.LegalAptitude, difficulty: 'hard', repetitions: 0, easeFactor: 2.5 },
  { id: 'case-3', front: 'Mohiri Bibi v. Dharmodas Ghose (1903)', back: 'CONTRACT WITH MINOR IS VOID AB INITIO\n\nMinor mortgaged house. Held: Contract void from beginning.\nMinor cannot be asked to return benefits.', category: 'case', subject: Subject.LegalAptitude, difficulty: 'medium', repetitions: 0, easeFactor: 2.5 },
  { id: 'case-4', front: 'Vishakha v. State of Rajasthan (1997)', back: 'SEXUAL HARASSMENT AT WORKPLACE\n\nSC laid down guidelines to prevent sexual harassment.\nLed to Sexual Harassment of Women at Workplace Act, 2013.', category: 'case', subject: Subject.LegalAptitude, difficulty: 'medium', repetitions: 0, easeFactor: 2.5 },
  { id: 'case-5', front: 'Golaknath v. State of Punjab (1967)', back: 'FUNDAMENTAL RIGHTS CANNOT BE AMENDED\n\nOverruled by Kesavananda Bharati case.\nHeld Parliament cannot amend Fundamental Rights.', category: 'case', subject: Subject.LegalAptitude, difficulty: 'hard', repetitions: 0, easeFactor: 2.5 },
  
  // Amendments
  { id: 'amd-1', front: '42nd Amendment (1976)', back: 'MINI CONSTITUTION\n\nAdded: Socialist, Secular, Integrity to Preamble\nAdded: Fundamental Duties (Part IVA)\nMade DPSP superior to FRs\nDuring Emergency (Indira Gandhi)', category: 'amendment', subject: Subject.LegalAptitude, difficulty: 'hard', repetitions: 0, easeFactor: 2.5 },
  { id: 'amd-2', front: '44th Amendment (1978)', back: 'UNDID 42ND AMENDMENT\n\nRemoved Right to Property from FRs\nSafeguards for Emergency\nJanata Party government (Morarji Desai)', category: 'amendment', subject: Subject.LegalAptitude, difficulty: 'hard', repetitions: 0, easeFactor: 2.5 },
  { id: 'amd-3', front: '73rd Amendment (1992)', back: 'PANCHAYATI RAJ\n\nAdded Part IX to Constitution\nAdded 11th Schedule (29 subjects)\n3-tier Panchayat system\n1/3 reservation for women', category: 'amendment', subject: Subject.LegalAptitude, difficulty: 'medium', repetitions: 0, easeFactor: 2.5 },
  { id: 'amd-4', front: '86th Amendment (2002)', back: 'RIGHT TO EDUCATION\n\nAdded Article 21A (RTE)\nAdded 11th Fundamental Duty\nFree education for 6-14 years', category: 'amendment', subject: Subject.LegalAptitude, difficulty: 'medium', repetitions: 0, easeFactor: 2.5 },
  { id: 'amd-5', front: '101st Amendment (2016)', back: 'GOODS AND SERVICES TAX (GST)\n\nOne Nation, One Tax\nAdded Article 246A\nGST Council under Article 279A', category: 'amendment', subject: Subject.LegalAptitude, difficulty: 'easy', repetitions: 0, easeFactor: 2.5 },
  { id: 'amd-6', front: '103rd Amendment (2019)', back: 'EWS RESERVATION\n\n10% reservation for Economically Weaker Sections\nIn education and public employment\nFor general category only', category: 'amendment', subject: Subject.LegalAptitude, difficulty: 'easy', repetitions: 0, easeFactor: 2.5 },

  // Definitions
  { id: 'def-1', front: 'What is "Consideration" in Contract Law?', back: 'Something in return (Quid pro quo)\n\nSection 2(d): When at the desire of the promisor, the promisee does or abstains from doing something, such act or abstinence is called consideration.\n\nCan be past, present, or future.', category: 'definition', subject: Subject.LegalAptitude, difficulty: 'medium', repetitions: 0, easeFactor: 2.5 },
  { id: 'def-2', front: 'What is "Tort"?', back: 'A civil wrong (other than breach of contract) for which remedy is an action for unliquidated damages.\n\nKey elements:\n1. Wrongful act\n2. Legal damage\n3. Legal remedy', category: 'definition', subject: Subject.LegalAptitude, difficulty: 'medium', repetitions: 0, easeFactor: 2.5 },
  { id: 'def-3', front: 'What are the 5 Constitutional Writs?', back: '1. HABEAS CORPUS - "You may have the body"\n2. MANDAMUS - "We command"\n3. CERTIORARI - "To be certified"\n4. PROHIBITION - Stop lower court\n5. QUO WARRANTO - "By what authority"', category: 'definition', subject: Subject.LegalAptitude, difficulty: 'hard', repetitions: 0, easeFactor: 2.5 },
];

const Flashcards: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>(FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [streak, setStreak] = useState(0);
  const [todayReviewed, setTodayReviewed] = useState(0);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [studyMode, setStudyMode] = useState<'browse' | 'review'>('browse');

  const filteredCards = cards.filter(card => {
    const matchCategory = filterCategory === 'all' || card.category === filterCategory;
    const matchDifficulty = filterDifficulty === 'all' || card.difficulty === filterDifficulty;
    return matchCategory && matchDifficulty;
  });

  const currentCard = filteredCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % filteredCards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
    }, 150);
  };

  const handleShuffle = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setCards(prev => {
      const otherCards = prev.filter(c => !filteredCards.find(f => f.id === c.id));
      return [...shuffled, ...otherCards];
    });
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleRating = (rating: 'easy' | 'good' | 'hard' | 'again') => {
    setTodayReviewed(prev => prev + 1);
    
    if (rating === 'easy' || rating === 'good') {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    
    handleNext();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'maxim': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'article': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'case': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'amendment': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'definition': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-emerald-500';
      case 'medium': return 'text-amber-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Brain className="w-7 h-7 text-indigo-500" /> Flashcards
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Master legal concepts with spaced repetition</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 px-4 py-2 rounded-xl">
            <Flame className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-amber-700 dark:text-amber-400">{streak} streak</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-xl">
            <Check className="w-5 h-5 text-emerald-500" />
            <span className="font-bold text-emerald-700 dark:text-emerald-400">{todayReviewed} today</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Cards', value: cards.length, icon: BookOpen, color: 'text-indigo-500' },
          { label: 'Maxims', value: cards.filter(c => c.category === 'maxim').length, icon: Star, color: 'text-purple-500' },
          { label: 'Articles', value: cards.filter(c => c.category === 'article').length, icon: Target, color: 'text-blue-500' },
          { label: 'Cases', value: cards.filter(c => c.category === 'case').length, icon: Zap, color: 'text-amber-500' },
          { label: 'Amendments', value: cards.filter(c => c.category === 'amendment').length, icon: Clock, color: 'text-emerald-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filterCategory}
            onChange={(e) => { setFilterCategory(e.target.value); setCurrentIndex(0); setIsFlipped(false); }}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm"
          >
            <option value="all">All Categories</option>
            <option value="maxim">Legal Maxims</option>
            <option value="article">Constitutional Articles</option>
            <option value="case">Landmark Cases</option>
            <option value="amendment">Amendments</option>
            <option value="definition">Definitions</option>
          </select>
        </div>
        <select
          value={filterDifficulty}
          onChange={(e) => { setFilterDifficulty(e.target.value); setCurrentIndex(0); setIsFlipped(false); }}
          className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm"
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          onClick={handleShuffle}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
        >
          <Shuffle className="w-4 h-4" /> Shuffle
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
          {currentIndex + 1} of {filteredCards.length} cards
        </span>
      </div>

      {/* Flashcard */}
      {currentCard && (
        <div className="flex flex-col items-center">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full max-w-2xl cursor-pointer perspective-1000"
          >
            <div className={`relative w-full min-h-[350px] transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              {/* Front */}
              <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 shadow-2xl backface-hidden flex flex-col ${isFlipped ? 'invisible' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white capitalize`}>
                    {currentCard.category}
                  </span>
                  <span className={`text-sm font-medium ${getDifficultyColor(currentCard.difficulty)} bg-white/20 px-2 py-1 rounded capitalize`}>
                    {currentCard.difficulty}
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-white text-center leading-relaxed">
                    {currentCard.front}
                  </h2>
                </div>
                <p className="text-center text-indigo-200 text-sm mt-4">
                  Tap to reveal answer
                </p>
              </div>

              {/* Back */}
              <div className={`absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl backface-hidden rotate-y-180 flex flex-col border-2 border-indigo-200 dark:border-indigo-800 ${!isFlipped ? 'invisible' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(currentCard.category)} capitalize`}>
                    {currentCard.category}
                  </span>
                  <RotateCcw className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="text-gray-700 dark:text-gray-200 text-lg whitespace-pre-line leading-relaxed">
                    {currentCard.back}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Buttons (show when flipped) */}
          {isFlipped && (
            <div className="flex gap-3 mt-6 animate-in fade-in slide-in-from-bottom-4">
              <button
                onClick={() => handleRating('again')}
                className="flex items-center gap-2 px-6 py-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                <X className="w-4 h-4" /> Again
              </button>
              <button
                onClick={() => handleRating('hard')}
                className="flex items-center gap-2 px-6 py-3 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-xl font-medium hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
              >
                Hard
              </button>
              <button
                onClick={() => handleRating('good')}
                className="flex items-center gap-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                Good
              </button>
              <button
                onClick={() => handleRating('easy')}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
              >
                <Check className="w-4 h-4" /> Easy
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex gap-1">
              {filteredCards.slice(Math.max(0, currentIndex - 3), Math.min(filteredCards.length, currentIndex + 4)).map((_, i) => {
                const actualIndex = Math.max(0, currentIndex - 3) + i;
                return (
                  <button
                    key={actualIndex}
                    onClick={() => { setCurrentIndex(actualIndex); setIsFlipped(false); }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      actualIndex === currentIndex ? 'bg-indigo-600 w-6' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                );
              })}
            </div>
            <button
              onClick={handleNext}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <h3 className="font-bold text-lg mb-4">💡 Pro Tip: Spaced Repetition</h3>
        <p className="text-indigo-100">
          Review cards you marked "Hard" or "Again" more frequently. Cards marked "Easy" will appear less often. 
          This technique helps you remember information long-term with less effort!
        </p>
      </div>
    </div>
  );
};

export default Flashcards;
