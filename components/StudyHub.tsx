import React, { useState, useMemo } from 'react';
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
  Bot
} from 'lucide-react';
import { Subject } from '../types';
import { 
  explainConcept, 
  generateStudyPlan, 
  generateTopicQuiz, 
  fetchCurrentAffairs, 
  SearchResult 
} from '../services/geminiService';
import { useProgress } from '../context/ProgressContext';
import ReactMarkdown from 'react-markdown';

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
  }
];

const StudyHub: React.FC = () => {
  const { markTopicMastered } = useProgress();
  const [activeTab, setActiveTab] = useState<'library' | 'news' | 'plan'>('library');
  
  // --- Library State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [filterTime, setFilterTime] = useState<'All' | 'Short' | 'Long'>('All'); // Short < 15m
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<StaticTopic | null>(null);
  
  // --- Reader State ---
  const [readerTheme, setReaderTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [readerSize, setReaderSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [explanationLoading, setExplanationLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  // --- News State ---
  const [newsYear, setNewsYear] = useState('2024');
  const [newsTopic, setNewsTopic] = useState('Legal Developments');
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsResult, setNewsResult] = useState<SearchResult | null>(null);

  // --- Plan State ---
  const [planLoading, setPlanLoading] = useState(false);
  const [studyPlan, setStudyPlan] = useState<string | null>(null);

  // --- Filtering Logic ---
  const filteredTopics = useMemo(() => {
    return STUDY_DATA.filter(topic => {
      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            topic.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDiff = filterDifficulty === 'All' || topic.difficulty === filterDifficulty;
      const matchesTime = filterTime === 'All' || 
                          (filterTime === 'Short' && topic.readTime < 15) || 
                          (filterTime === 'Long' && topic.readTime >= 15);
      return matchesSearch && matchesDiff && matchesTime;
    });
  }, [searchQuery, filterDifficulty, filterTime]);

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
    const result = await fetchCurrentAffairs(newsYear, newsTopic);
    setNewsResult(result);
    setNewsLoading(false);
  };

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
        <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-3xl mx-auto w-full">
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
    <div className="space-y-6">
      {/* Search Header */}
      <div className="sticky top-0 bg-gray-100 dark:bg-gray-900 pt-2 pb-4 z-10">
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search topics, tags..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl border transition-colors ${showFilters ? 'bg-indigo-100 border-indigo-200 text-indigo-700' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500'}`}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 animate-in slide-in-from-top-2">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Difficulty</label>
                <div className="flex gap-2">
                  {['All', 'Easy', 'Medium', 'Hard'].map(lvl => (
                    <button 
                      key={lvl}
                      onClick={() => setFilterDifficulty(lvl as any)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterDifficulty === lvl ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Read Time</label>
                <div className="flex gap-2">
                  {['All', 'Short', 'Long'].map(time => (
                    <button 
                      key={time}
                      onClick={() => setFilterTime(time as any)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterTime === time ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                    >
                      {time === 'All' ? 'Any Time' : (time === 'Short' ? '< 15 mins' : '> 15 mins')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.length > 0 ? (
          filteredTopics.map(topic => (
            <div 
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
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
              <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg mb-2 group-hover:text-indigo-600 transition-colors">
                {topic.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                {topic.summary}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-2">
                   {topic.tags.map(tag => (
                     <span key={tag} className="text-xs bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded">#{tag}</span>
                   ))}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="bg-gray-50 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">No topics found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
            <button 
              onClick={() => { setSearchQuery(''); setFilterDifficulty('All'); setFilterTime('All'); }}
              className="mt-4 text-indigo-600 font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="space-y-6">
      <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
           <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
             <Newspaper className="w-6 h-6" /> Archive & Current Affairs
           </h2>
           <p className="text-indigo-200 text-sm mb-6 max-w-lg">
             Powered by Google Search Grounding. Travel back to 2014 or get today's updates.
           </p>
           
           <div className="flex flex-col md:flex-row gap-3">
             <select 
               value={newsYear} 
               onChange={(e) => setNewsYear(e.target.value)}
               className="bg-white/10 border border-indigo-400/30 rounded-lg px-4 py-3 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
             >
               {Array.from({length: 12}, (_, i) => 2025 - i).map(year => (
                 <option key={year} value={year} className="text-gray-900">{year}</option>
               ))}
             </select>
             <input 
               type="text" 
               value={newsTopic}
               onChange={(e) => setNewsTopic(e.target.value)}
               placeholder="Enter topic (e.g. Padma Awards, Elections)"
               className="flex-1 bg-white/10 border border-indigo-400/30 rounded-lg px-4 py-3 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
             />
             <button 
               onClick={handleNewsFetch}
               disabled={newsLoading}
               className="bg-yellow-400 text-indigo-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors shadow-lg flex items-center justify-center gap-2"
             >
               {newsLoading ? <div className="w-4 h-4 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
               Fetch Data
             </button>
           </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
           <Search className="w-64 h-64 -mb-12 -mr-12" />
        </div>
      </div>

      {newsResult && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4">
           {/* Summary Card */}
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
             <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
               AI Summary: {newsTopic} ({newsYear})
             </h3>
             <ReactMarkdown className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-gray-600 dark:text-gray-300">
               {newsResult.text}
             </ReactMarkdown>
           </div>

           {/* Sources */}
           {newsResult.sources.length > 0 && (
             <div>
               <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Verified Sources</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {newsResult.sources.map((source, idx) => (
                   <a 
                     key={idx} 
                     href={source.uri} 
                     target="_blank" 
                     rel="noreferrer"
                     className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors group"
                   >
                     <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                       <ExternalLink className="w-4 h-4" />
                     </div>
                     <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate flex-1">
                       {source.title}
                     </span>
                   </a>
                 ))}
               </div>
             </div>
           )}
        </div>
      )}
    </div>
  );

  const renderPlan = () => (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-4">
         <h2 className="text-3xl font-bold text-gray-800 dark:text-white">AI Personal Strategist</h2>
         <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
           Get a custom 12-week roadmap tailored to your weak areas and schedule.
         </p>
         <button 
           onClick={handleGeneratePlan}
           disabled={planLoading}
           className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
         >
           {planLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Zap className="w-5 h-5" />}
           Generate My Plan
         </button>
      </div>
      
      {studyPlan && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in-95">
           <ReactMarkdown className="prose dark:prose-invert max-w-none prose-headings:text-indigo-600 dark:prose-headings:text-indigo-400 prose-a:text-blue-500">
             {studyPlan}
           </ReactMarkdown>
        </div>
      )}
    </div>
  );

  // --- Main Render ---

  if (selectedTopic) return renderReader();

  return (
    <div className="space-y-6">
      {/* Top Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
         <button 
           onClick={() => setActiveTab('library')}
           className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors ${activeTab === 'library' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
         >
           <BookOpen className="w-4 h-4" /> Library
         </button>
         <button 
           onClick={() => setActiveTab('news')}
           className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors ${activeTab === 'news' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
         >
           <Newspaper className="w-4 h-4" /> Archive
         </button>
         <button 
           onClick={() => setActiveTab('plan')}
           className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors ${activeTab === 'plan' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
         >
           <Zap className="w-4 h-4" /> Study Plan
         </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'library' && renderLibrary()}
        {activeTab === 'news' && renderNews()}
        {activeTab === 'plan' && renderPlan()}
      </div>
    </div>
  );
};

export default StudyHub;