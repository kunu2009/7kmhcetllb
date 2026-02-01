import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  BrainCircuit, 
  Swords, 
  BarChart3,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Building2,
  FileText,
  Layers,
  Zap,
  CalendarDays,
  StickyNote,
  ListChecks,
  Scale,
  BookText,
  Calculator,
  Lightbulb
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(true);

  // Initialize Theme
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/study', label: 'Study Hub', icon: BookOpen },
    { path: '/practice', label: 'Test Arena', icon: Swords },
    { path: '/daily', label: 'Daily Challenge', icon: Zap },
    { path: '/planner', label: 'Study Planner', icon: CalendarDays },
    { path: '/notes', label: 'Quick Notes', icon: StickyNote },
    { path: '/revision', label: 'Quick Revision', icon: ListChecks },
    { path: '/legal-reasoning', label: 'Legal Reasoning', icon: Scale },
    { path: '/reading-comprehension', label: 'Reading Comp', icon: BookText },
    { path: '/formulas', label: 'Math Formulas', icon: Calculator },
    { path: '/study-tips', label: 'Study Tips', icon: Lightbulb },
    { path: '/pyq', label: 'PYQ Papers', icon: FileText },
    { path: '/flashcards', label: 'Flashcards', icon: Layers },
    { path: '/colleges', label: 'Colleges', icon: Building2 },
    { path: '/mentor', label: 'AI Mentor', icon: BrainCircuit },
    { path: '/analytics', label: 'Performance', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      
      {/* --- DESKTOP SIDEBAR (Left) --- */}
      <aside 
        className={`hidden md:flex flex-col bg-indigo-900 dark:bg-gray-950 text-white shadow-xl z-20 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Header */}
        <div className={`p-6 border-b border-indigo-800 dark:border-gray-800 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} transition-all`}>
          <div className="bg-indigo-800 p-2 rounded-lg">
             <GraduationCap className="w-8 h-8 text-yellow-400 flex-shrink-0" />
          </div>
          {!isCollapsed && (
            <div className="animate-in fade-in duration-200 overflow-hidden whitespace-nowrap">
              <h1 className="font-bold text-xl tracking-tight">LawRanker</h1>
              <p className="text-xs text-indigo-300">MHCET LLB Prep</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.label : ''}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-indigo-700 dark:bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                    : 'text-indigo-200 hover:bg-indigo-800 dark:hover:bg-gray-800 hover:text-white'
                } ${isCollapsed ? 'justify-center px-2' : ''}`}
              >
                <Icon className={`w-6 h-6 flex-shrink-0 ${isActive ? 'text-yellow-400' : 'group-hover:text-white'} transition-colors`} />
                {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                
                {/* Active Indicator Strip for Collapsed Mode */}
                {isCollapsed && isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-r-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-indigo-800 dark:border-gray-800 flex flex-col gap-2">
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleTheme}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-indigo-200 hover:bg-indigo-800 dark:hover:bg-gray-800 transition-colors ${isCollapsed ? 'justify-center px-0' : ''}`}
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {!isCollapsed && <span className="text-sm font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          {/* Collapse Toggle */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-indigo-200 hover:bg-indigo-800 dark:hover:bg-gray-800 transition-colors ${isCollapsed ? 'justify-center px-0 bg-indigo-800' : ''}`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
            {!isCollapsed && <span className="text-sm font-medium">Collapse Menu</span>}
          </button>
        </div>
      </aside>

      {/* --- MOBILE BOTTOM NAVIGATION BAR --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 shadow-lg safe-area-bottom">
        <div className="flex justify-around items-center h-16 px-1">
          {/* Main 5 navigation items for mobile */}
          {[
            navItems[0], // Dashboard
            navItems[1], // Study Hub
            navItems[2], // Test Arena
            navItems[3], // Daily Challenge
          ].map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
                  isActive 
                    ? 'text-indigo-600 dark:text-yellow-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-indigo-600 dark:text-yellow-400' : ''}`}>
                  {item.label.split(' ')[0]}
                </span>
              </Link>
            );
          })}
          
          {/* More Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
              isMobileOpen ? 'text-indigo-600 dark:text-yellow-400' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile "More" Menu Drawer */}
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
            onClick={() => setIsMobileOpen(false)}
          />
          
          {/* Drawer */}
          <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-900 z-50 rounded-t-2xl shadow-2xl border-t border-gray-200 dark:border-gray-800 animate-in slide-in-from-bottom duration-300 max-h-[70vh] overflow-y-auto">
            <div className="p-4">
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">All Features</h3>
              
              <div className="grid grid-cols-4 gap-3">
                {navItems.slice(4).map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-yellow-400' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-6 h-6 mb-1" />
                      <span className="text-[10px] font-medium text-center leading-tight">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
              
              {/* Theme Toggle */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button 
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-hidden flex flex-col md:mr-0 pb-20 md:pb-0">
        {/* Mobile Header Title */}
        <div className="md:hidden p-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between shadow-sm z-10 sticky top-0">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-yellow-400" />
            <span className="font-bold text-lg text-indigo-900 dark:text-white tracking-tight">LawRanker</span>
          </div>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto min-h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;