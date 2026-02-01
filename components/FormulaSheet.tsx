import React, { useState } from 'react';
import { Calculator, ChevronDown, ChevronRight, Lightbulb, BookOpen } from 'lucide-react';
import MATH_FORMULAS, { CALCULATION_TRICKS, FormulaCategory, Formula } from '../data/mathFormulas';

const FormulaSheet: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(MATH_FORMULAS[0].id);
  const [expandedFormulas, setExpandedFormulas] = useState<Set<string>>(new Set());
  const [showTricks, setShowTricks] = useState(false);

  const currentCategory = MATH_FORMULAS.find(c => c.id === selectedCategory);

  const toggleFormula = (formulaId: string) => {
    const newExpanded = new Set(expandedFormulas);
    if (newExpanded.has(formulaId)) {
      newExpanded.delete(formulaId);
    } else {
      newExpanded.add(formulaId);
    }
    setExpandedFormulas(newExpanded);
  };

  const expandAll = () => {
    if (currentCategory) {
      const allIds = new Set(currentCategory.formulas.map(f => f.id));
      setExpandedFormulas(allIds);
    }
  };

  const collapseAll = () => {
    setExpandedFormulas(new Set());
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Formula & Shortcut Sheet</h1>
        </div>
        <p className="text-amber-100">
          Quick reference for all important math formulas and calculation tricks
        </p>
      </div>

      {/* Toggle Tricks/Formulas */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setShowTricks(false)}
          className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
            !showTricks
              ? 'bg-amber-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-amber-50'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          Formulas
        </button>
        <button
          onClick={() => setShowTricks(true)}
          className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
            showTricks
              ? 'bg-amber-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-amber-50'
          }`}
        >
          <Lightbulb className="w-5 h-5" />
          Quick Tricks
        </button>
      </div>

      {showTricks ? (
        // Quick Tricks View
        <div className="grid gap-4">
          {CALCULATION_TRICKS.map((trick, index) => (
            <div
              key={trick.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-amber-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">{trick.title}</h3>
                  <p className="text-gray-600 bg-amber-50 p-3 rounded-lg font-mono text-sm">
                    {trick.trick}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Formulas View
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
              <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
              <div className="space-y-2">
                {MATH_FORMULAS.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setExpandedFormulas(new Set());
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      selectedCategory === category.id
                        ? 'bg-amber-100 text-amber-800 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="text-sm">{category.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Formulas Content */}
          <div className="lg:col-span-3">
            {currentCategory && (
              <>
                {/* Category Header */}
                <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{currentCategory.icon}</span>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {currentCategory.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {currentCategory.formulas.length} formulas
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={expandAll}
                        className="text-sm text-amber-600 hover:text-amber-700 px-3 py-1 hover:bg-amber-50 rounded-lg"
                      >
                        Expand All
                      </button>
                      <button
                        onClick={collapseAll}
                        className="text-sm text-gray-600 hover:text-gray-700 px-3 py-1 hover:bg-gray-100 rounded-lg"
                      >
                        Collapse All
                      </button>
                    </div>
                  </div>
                </div>

                {/* Formula Cards */}
                <div className="space-y-3">
                  {currentCategory.formulas.map(formula => (
                    <FormulaCard
                      key={formula.id}
                      formula={formula}
                      isExpanded={expandedFormulas.has(formula.id)}
                      onToggle={() => toggleFormula(formula.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface FormulaCardProps {
  formula: Formula;
  isExpanded: boolean;
  onToggle: () => void;
}

const FormulaCard: React.FC<FormulaCardProps> = ({ formula, isExpanded, onToggle }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Formula Header */}
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-amber-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          )}
          <span className="font-medium text-gray-800">{formula.name}</span>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4">
          {/* Main Formula */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg mb-4">
            <p className="font-mono text-lg text-amber-800 text-center font-semibold">
              {formula.formula}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-3">
            {formula.explanation && (
              <div className="flex items-start gap-2">
                <span className="text-xs font-medium text-gray-500 uppercase w-24 shrink-0 pt-0.5">
                  Where:
                </span>
                <p className="text-gray-700 text-sm">{formula.explanation}</p>
              </div>
            )}

            {formula.example && (
              <div className="flex items-start gap-2">
                <span className="text-xs font-medium text-gray-500 uppercase w-24 shrink-0 pt-0.5">
                  Example:
                </span>
                <p className="text-gray-700 text-sm bg-blue-50 px-3 py-2 rounded-lg font-mono">
                  {formula.example}
                </p>
              </div>
            )}

            {formula.shortcut && (
              <div className="flex items-start gap-2">
                <span className="text-xs font-medium text-amber-600 uppercase w-24 shrink-0 pt-0.5">
                  ⚡ Shortcut:
                </span>
                <p className="text-amber-800 text-sm bg-amber-50 px-3 py-2 rounded-lg">
                  {formula.shortcut}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormulaSheet;
