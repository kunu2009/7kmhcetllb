import React, { useState } from 'react';
import { 
  BookOpen, ChevronRight, ChevronLeft, CheckCircle, 
  XCircle, Lightbulb, RotateCcw, Award, Filter, Clock, FileText
} from 'lucide-react';
import { RC_PASSAGES, RCPassage } from '../data/readingComprehensionData';

type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard';

export default function ReadingComprehension() {
  const [selectedPassage, setSelectedPassage] = useState<RCPassage | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [completedPassages, setCompletedPassages] = useState<Set<string>>(new Set());
  const [showPassage, setShowPassage] = useState(true);

  const filteredPassages = difficultyFilter === 'all' 
    ? RC_PASSAGES 
    : RC_PASSAGES.filter(p => p.difficulty === difficultyFilter);

  const handleSelectPassage = (passage: RCPassage) => {
    setSelectedPassage(passage);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowPassage(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !selectedPassage) return;
    
    const currentQuestion = selectedPassage.questions[currentQuestionIndex];
    const questionId = currentQuestion.id;
    
    if (!answeredQuestions.has(questionId)) {
      setAnsweredQuestions(prev => new Set(prev).add(questionId));
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore(prev => prev + 1);
      }
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (!selectedPassage) return;
    
    if (currentQuestionIndex < selectedPassage.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompletedPassages(prev => new Set(prev).add(selectedPassage.id));
    }
  };

  const handleBackToList = () => {
    setSelectedPassage(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const resetProgress = () => {
    setScore(0);
    setAnsweredQuestions(new Set());
    setCompletedPassages(new Set());
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'factual': return 'bg-blue-500/20 text-blue-400';
      case 'inferential': return 'bg-purple-500/20 text-purple-400';
      case 'vocabulary': return 'bg-green-500/20 text-green-400';
      case 'main-idea': return 'bg-orange-500/20 text-orange-400';
      case 'tone': return 'bg-pink-500/20 text-pink-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Passage List View
  if (!selectedPassage) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <FileText className="text-cyan-400" />
                Reading Comprehension
              </h1>
              <p className="text-gray-400 mt-1">Practice RC passages for English section</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-gray-400 text-sm">Score: </span>
                <span className="text-white font-bold">{score}</span>
                <span className="text-gray-400 text-sm">/{answeredQuestions.size}</span>
              </div>
              <button
                onClick={resetProgress}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                title="Reset Progress"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-800 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-400" />
                <span className="text-gray-400 text-sm">Difficulty:</span>
              </div>
              {(['all', 'easy', 'medium', 'hard'] as DifficultyFilter[]).map(level => (
                <button
                  key={level}
                  onClick={() => setDifficultyFilter(level)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize
                    ${difficultyFilter === level 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-sm">Total Passages</p>
              <p className="text-2xl font-bold text-white">{RC_PASSAGES.length}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-sm">Total Questions</p>
              <p className="text-2xl font-bold text-white">
                {RC_PASSAGES.reduce((sum, p) => sum + p.questions.length, 0)}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-sm">Completed</p>
              <p className="text-2xl font-bold text-green-400">{completedPassages.size}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-sm">Accuracy</p>
              <p className="text-2xl font-bold text-cyan-400">
                {answeredQuestions.size > 0 
                  ? `${Math.round((score / answeredQuestions.size) * 100)}%` 
                  : '-'}
              </p>
            </div>
          </div>

          {/* Passage Cards */}
          <div className="grid gap-4">
            {filteredPassages.map(passage => {
              const isCompleted = completedPassages.has(passage.id);
              return (
                <div
                  key={passage.id}
                  onClick={() => handleSelectPassage(passage)}
                  className={`bg-gray-800 rounded-xl p-5 cursor-pointer transition-all hover:bg-gray-750 
                            border-2 ${isCompleted ? 'border-green-500/30' : 'border-transparent'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{passage.title}</h3>
                        {isCompleted && <CheckCircle size={18} className="text-green-500" />}
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{passage.topic}</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(passage.difficulty)}`}>
                          {passage.difficulty.toUpperCase()}
                        </span>
                        <span className="text-gray-500 text-sm flex items-center gap-1">
                          <Clock size={14} />
                          ~{Math.ceil(passage.wordCount / 200)} min read
                        </span>
                        <span className="text-gray-500 text-sm">
                          {passage.questions.length} questions
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={24} className="text-gray-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Passage Practice View
  const currentQuestion = selectedPassage.questions[currentQuestionIndex];
  const isAnswered = showExplanation;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Passages
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPassage(!showPassage)}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {showPassage ? 'Hide Passage' : 'Show Passage'}
            </button>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Question</span>
              <span className="bg-cyan-600 text-white px-3 py-1 rounded-lg font-medium">
                {currentQuestionIndex + 1}/{selectedPassage.questions.length}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Passage Panel */}
          {showPassage && (
            <div className="bg-gray-800 rounded-xl p-5 lg:max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">{selectedPassage.title}</h2>
                <span className="text-gray-500 text-sm">{selectedPassage.wordCount} words</span>
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {selectedPassage.passage}
              </p>
            </div>
          )}

          {/* Question Panel */}
          <div className={showPassage ? '' : 'lg:col-span-2 max-w-3xl mx-auto w-full'}>
            {/* Question Type Badge */}
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getQuestionTypeColor(currentQuestion.type)}`}>
                {currentQuestion.type.toUpperCase().replace('-', ' ')}
              </span>
            </div>

            {/* Question */}
            <div className="bg-gray-800 rounded-xl p-5 mb-6">
              <h4 className="text-white font-medium mb-4">{currentQuestion.question}</h4>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  let optionClass = 'bg-gray-700 hover:bg-gray-600 border-transparent';
                  
                  if (isAnswered) {
                    if (index === currentQuestion.correctAnswer) {
                      optionClass = 'bg-green-500/20 border-green-500 text-green-300';
                    } else if (index === selectedAnswer && !isCorrect) {
                      optionClass = 'bg-red-500/20 border-red-500 text-red-300';
                    } else {
                      optionClass = 'bg-gray-700/50 border-transparent opacity-60';
                    }
                  } else if (selectedAnswer === index) {
                    optionClass = 'bg-cyan-500/20 border-cyan-500';
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${optionClass}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-sm font-medium">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-gray-200">{option}</span>
                        {isAnswered && index === currentQuestion.correctAnswer && (
                          <CheckCircle size={20} className="text-green-500 ml-auto flex-shrink-0" />
                        )}
                        {isAnswered && index === selectedAnswer && !isCorrect && (
                          <XCircle size={20} className="text-red-500 ml-auto flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className={`rounded-xl p-5 mb-6 ${isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-orange-500/10 border border-orange-500/30'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={20} className={isCorrect ? 'text-green-400' : 'text-orange-400'} />
                  <h4 className={`font-semibold ${isCorrect ? 'text-green-400' : 'text-orange-400'}`}>
                    {isCorrect ? 'Correct!' : 'Explanation'}
                  </h4>
                </div>
                <p className="text-gray-300">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
              {!showExplanation ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 
                           disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg 
                           font-medium transition-colors flex items-center gap-2"
                >
                  {currentQuestionIndex < selectedPassage.questions.length - 1 ? (
                    <>Next Question <ChevronRight size={18} /></>
                  ) : (
                    <>Complete <Award size={18} /></>
                  )}
                </button>
              )}
            </div>

            {/* Completion Message */}
            {currentQuestionIndex === selectedPassage.questions.length - 1 && showExplanation && (
              <div className="mt-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6 text-center">
                <Award className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">Passage Completed! 🎉</h3>
                <p className="text-gray-300 mb-4">
                  You've answered all questions for "{selectedPassage.title}"
                </p>
                <button
                  onClick={handleBackToList}
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                >
                  Practice More Passages
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
