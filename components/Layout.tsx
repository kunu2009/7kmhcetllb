import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  BrainCircuit, 
  Swords, 
  BarChart3,
  GraduationCap
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/study', label: 'Study Hub', icon: BookOpen },
    { path: '/practice', label: 'Test Arena', icon: Swords },
    { path: '/mentor', label: 'AI Mentor', icon: BrainCircuit },
    { path: '/analytics', label: 'Performance', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white hidden md:flex flex-col shadow-xl z-10">
        <div className="p-6 border-b border-indigo-800 flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-yellow-400" />
          <div>
            <h1 className="font-bold text-xl tracking-tight">LawRanker</h1>
            <p className="text-xs text-indigo-300">MHCET LLB 5-Year</p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-indigo-700 text-white shadow-md translate-x-1' 
                    : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-yellow-400' : 'group-hover:text-white'}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-indigo-800">
          <div className="bg-indigo-800 rounded-lg p-4">
            <p className="text-xs text-indigo-300 mb-1">Target Rank</p>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-yellow-400">AIR 1</span>
            </div>
            <div className="w-full bg-indigo-900 h-1.5 rounded-full mt-2">
              <div className="bg-yellow-400 h-1.5 rounded-full w-3/4"></div>
            </div>
            <p className="text-[10px] text-right text-indigo-300 mt-1">75% Prepared</p>
          </div>
        </div>
      </aside>

      {/* Mobile Nav Header (Visible only on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-indigo-900 z-20 flex items-center px-4 justify-between">
         <div className="flex items-center gap-2 text-white">
          <GraduationCap className="w-6 h-6 text-yellow-400" />
          <span className="font-bold text-lg">LawRanker</span>
         </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 md:ml-0 mt-16 md:mt-0">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;