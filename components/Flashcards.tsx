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
  Filter,
  Globe,
  Calculator,
  MessageSquare
} from 'lucide-react';
import { Subject } from '../types';
import { FLASHCARDS_DATA, Flashcard } from '../data/flashcardsData';

const Flashcards: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>(FLASHCARDS_DATA);
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
      case 'section': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
      case 'gk': return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400';
      case 'reasoning': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'english': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400';
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
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Brain className="w-6 h-6 md:w-7 md:h-7 text-indigo-500" /> Flashcards
          </h1>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Master legal concepts with spaced repetition</p>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-2 bg-amber-100 dark:bg-amber-900/30 px-2 md:px-4 py-1.5 md:py-2 rounded-xl">
            <Flame className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
            <span className="font-bold text-sm md:text-base text-amber-700 dark:text-amber-400">{streak}</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-2 md:px-4 py-1.5 md:py-2 rounded-xl">
            <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
            <span className="font-bold text-sm md:text-base text-emerald-700 dark:text-emerald-400">{todayReviewed} today</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3">
        {[
          { label: 'Total', value: cards.length, icon: BookOpen, color: 'text-indigo-500' },
          { label: 'Maxims', value: cards.filter(c => c.category === 'maxim').length, icon: Star, color: 'text-purple-500' },
          { label: 'Articles', value: cards.filter(c => c.category === 'article').length, icon: Target, color: 'text-blue-500' },
          { label: 'Cases', value: cards.filter(c => c.category === 'case').length, icon: Zap, color: 'text-amber-500' },
          { label: 'IPC/BNS', value: cards.filter(c => c.category === 'section').length, icon: Clock, color: 'text-rose-500' },
          { label: 'GK', value: cards.filter(c => c.category === 'gk').length, icon: Globe, color: 'text-cyan-500' },
          { label: 'Reasoning', value: cards.filter(c => c.category === 'reasoning').length, icon: Brain, color: 'text-orange-500' },
          { label: 'English', value: cards.filter(c => c.category === 'english').length, icon: MessageSquare, color: 'text-pink-500' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white dark:bg-gray-800 p-2 md:p-3 rounded-xl border border-gray-100 dark:border-gray-700 ${i > 3 ? 'hidden md:block' : ''}`}>
            <div className="flex items-center justify-between">
              <stat.icon className={`w-3 h-3 md:w-4 md:h-4 ${stat.color}`} />
              <span className="text-base md:text-xl font-bold text-gray-800 dark:text-white">{stat.value}</span>
            </div>
            <p className="text-[9px] md:text-[10px] text-gray-500 dark:text-gray-400 mt-1 truncate">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 md:gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500 hidden md:block" />
          <select
            value={filterCategory}
            onChange={(e) => { setFilterCategory(e.target.value); setCurrentIndex(0); setIsFlipped(false); }}
            className="px-2 md:px-4 py-1.5 md:py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-xs md:text-sm"
          >
            <option value="all">All Categories</option>
            <option value="maxim">Legal Maxims</option>
            <option value="article">Articles</option>
            <option value="case">Cases</option>
            <option value="amendment">Amendments</option>
            <option value="section">IPC/BNS Sections</option>
            <option value="gk">General Knowledge</option>
            <option value="reasoning">Logical Reasoning</option>
            <option value="english">English</option>
          </select>
        </div>
        <select
          value={filterDifficulty}
          onChange={(e) => { setFilterDifficulty(e.target.value); setCurrentIndex(0); setIsFlipped(false); }}
          className="px-2 md:px-4 py-1.5 md:py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-xs md:text-sm"
        >
          <option value="all">All Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          onClick={handleShuffle}
          className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors text-xs md:text-sm"
        >
          <Shuffle className="w-3 h-3 md:w-4 md:h-4" /> Shuffle
        </button>
        <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 ml-auto">
          {currentIndex + 1}/{filteredCards.length}
        </span>
      </div>

      {/* Flashcard */}
      {currentCard && (
        <div className="flex flex-col items-center">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full max-w-2xl cursor-pointer perspective-1000"
          >
            <div className={`relative w-full min-h-[280px] md:min-h-[350px] transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              {/* Front */}
              <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl backface-hidden flex flex-col ${isFlipped ? 'invisible' : ''}`}>
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold bg-white/20 text-white capitalize`}>
                    {currentCard.category}
                  </span>
                  <span className={`text-xs md:text-sm font-medium ${getDifficultyColor(currentCard.difficulty)} bg-white/20 px-2 py-0.5 md:py-1 rounded capitalize`}>
                    {currentCard.difficulty}
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <h2 className="text-lg md:text-3xl font-bold text-white text-center leading-relaxed">
                    {currentCard.front}
                  </h2>
                </div>
                <p className="text-center text-indigo-200 text-xs md:text-sm mt-2 md:mt-4">
                  Tap to reveal answer
                </p>
              </div>

              {/* Back */}
              <div className={`absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl backface-hidden rotate-y-180 flex flex-col border-2 border-indigo-200 dark:border-indigo-800 ${!isFlipped ? 'invisible' : ''}`}>
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold ${getCategoryColor(currentCard.category)} capitalize`}>
                    {currentCard.category}
                  </span>
                  <RotateCcw className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="text-gray-700 dark:text-gray-200 text-sm md:text-lg whitespace-pre-line leading-relaxed">
                    {currentCard.back}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Buttons (show when flipped) */}
          {isFlipped && (
            <div className="flex gap-2 md:gap-3 mt-4 md:mt-6 animate-in fade-in slide-in-from-bottom-4">
              <button
                onClick={() => handleRating('again')}
                className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-xs md:text-base"
              >
                <X className="w-3 h-3 md:w-4 md:h-4" /> Again
              </button>
              <button
                onClick={() => handleRating('hard')}
                className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-xl font-medium hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors text-xs md:text-base"
              >
                Hard
              </button>
              <button
                onClick={() => handleRating('good')}
                className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-xs md:text-base"
              >
                Good
              </button>
              <button
                onClick={() => handleRating('easy')}
                className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors text-xs md:text-base"
              >
                <Check className="w-3 h-3 md:w-4 md:h-4" /> Easy
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center gap-3 md:gap-4 mt-4 md:mt-6">
            <button
              onClick={handlePrev}
              className="p-2 md:p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex gap-1">
              {filteredCards.slice(Math.max(0, currentIndex - 3), Math.min(filteredCards.length, currentIndex + 4)).map((_, i) => {
                const actualIndex = Math.max(0, currentIndex - 3) + i;
                return (
                  <button
                    key={actualIndex}
                    onClick={() => { setCurrentIndex(actualIndex); setIsFlipped(false); }}
                    className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-colors ${
                      actualIndex === currentIndex ? 'bg-indigo-600 w-4 md:w-6' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                );
              })}
            </div>
            <button
              onClick={handleNext}
              className="p-2 md:p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl md:rounded-2xl p-4 md:p-6 text-white">
        <h3 className="font-bold text-sm md:text-lg mb-2 md:mb-4">💡 Pro Tip: Spaced Repetition</h3>
        <p className="text-indigo-100 text-xs md:text-base">
          Review cards you marked "Hard" or "Again" more frequently. This technique helps you remember information long-term!
        </p>
      </div>
    </div>
  );
};

export default Flashcards;
