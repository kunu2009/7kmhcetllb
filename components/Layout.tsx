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
  Building2
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

      {/* --- MOBILE RIGHT SIDEBAR (Right) --- */}
      <aside 
        className={`md:hidden fixed top-0 right-0 h-full w-16 bg-indigo-900 dark:bg-gray-950 z-50 flex flex-col items-center py-6 shadow-2xl border-l border-indigo-800 dark:border-gray-800 transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
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

        <div className="mt-auto flex flex-col gap-4 w-full px-2">
           <button 
            onClick={toggleTheme}
            className="p-3 rounded-xl text-indigo-300 hover:text-white bg-indigo-800 dark:bg-gray-800 flex justify-center"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button 
            onClick={() => setIsMobileOpen(false)}
            className="p-3 rounded-xl text-indigo-300 hover:text-white bg-indigo-800 dark:bg-gray-800 flex justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Floating Re-open Button for Mobile */}
      {!isMobileOpen && (
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-50 p-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full shadow-2xl hover:bg-indigo-700 transition-all animate-in fade-in zoom-in"
          aria-label="Open Menu"
        >
           <Menu className="w-6 h-6" />
        </button>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className={`flex-1 overflow-hidden flex flex-col transition-all duration-300 ${isMobileOpen ? 'mr-16' : 'mr-0'} md:mr-0`}>
        {/* Mobile Header Title */}
        <div className="md:hidden p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3 shadow-sm z-10">
            <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-yellow-400" />
            <span className="font-bold text-lg text-indigo-900 dark:text-white tracking-tight">LawRanker</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto min-h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;