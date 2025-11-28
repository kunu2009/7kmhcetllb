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
  PanelLeftOpen
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    { path: '/mentor', label: 'AI Mentor', icon: BrainCircuit },
    { path: '/analytics', label: 'Performance', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* --- DESKTOP SIDEBAR (Left) --- */}
      <aside 
        className={`hidden md:flex flex-col bg-indigo-900 dark:bg-gray-950 text-white shadow-xl z-20 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Header */}
        <div className={`p-6 border-b border-indigo-800 dark:border-gray-800 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <GraduationCap className="w-8 h-8 text-yellow-400 flex-shrink-0" />
          {!isCollapsed && (
            <div className="animate-in fade-in duration-200">
              <h1 className="font-bold text-xl tracking-tight">LawRanker</h1>
              <p className="text-xs text-indigo-300">MHCET LLB</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.label : ''}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-indigo-700 dark:bg-indigo-600 text-white shadow-md' 
                    : 'text-indigo-200 hover:bg-indigo-800 dark:hover:bg-gray-800 hover:text-white'
                } ${isCollapsed ? 'justify-center px-2' : ''}`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-yellow-400' : 'group-hover:text-white'}`} />
                {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-indigo-800 dark:border-gray-800 flex flex-col gap-2">
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleTheme}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-indigo-200 hover:bg-indigo-800 dark:hover:bg-gray-800 transition-colors ${isCollapsed ? 'justify-center px-2' : ''}`}
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {!isCollapsed && <span className="text-sm font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          {/* Collapse Toggle */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-indigo-200 hover:bg-indigo-800 dark:hover:bg-gray-800 transition-colors ${isCollapsed ? 'justify-center px-2' : ''}`}
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
            {!isCollapsed && <span className="text-sm font-medium">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* --- MOBILE RIGHT SIDEBAR (Right) --- */}
      <aside className="md:hidden fixed top-0 right-0 h-full w-16 bg-indigo-900 dark:bg-gray-950 z-50 flex flex-col items-center py-6 shadow-2xl border-l border-indigo-800 dark:border-gray-800">
        <div className="mb-8">
           <GraduationCap className="w-8 h-8 text-yellow-400" />
        </div>
        
        <nav className="flex-1 flex flex-col gap-6 w-full px-2">
           {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`p-3 rounded-xl flex justify-center transition-all ${
                  isActive 
                    ? 'bg-indigo-700 dark:bg-indigo-600 text-yellow-400 shadow-lg' 
                    : 'text-indigo-300 hover:text-white'
                }`}
              >
                <Icon className="w-6 h-6" />
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
           <button 
            onClick={toggleTheme}
            className="p-3 rounded-xl text-indigo-300 hover:text-white bg-indigo-800 dark:bg-gray-800"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 mr-16 md:mr-0">
        {/* Mobile Header Title (since nav is on right now) */}
        <div className="md:hidden p-4 pb-0 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-yellow-400" />
            <span className="font-bold text-lg text-indigo-900 dark:text-white">LawRanker</span>
        </div>
        
        <div className="p-4 md:p-8 pb-8 max-w-7xl mx-auto h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;