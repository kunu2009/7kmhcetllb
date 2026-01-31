import React, { useState } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Award,
  BookOpen,
  Users,
  Building2,
  Phone,
  Globe,
  ChevronDown,
  ChevronUp,
  Target,
  Calculator,
  CheckCircle2,
  AlertCircle,
  Star,
  Clock,
  FileText,
  IndianRupee,
  Briefcase
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

// Types
interface College {
  id: string;
  name: string;
  shortName: string;
  location: string;
  established: number;
  type: 'Government' | 'Aided' | 'Unaided';
  courses: string[];
  website: string;
  image: string;
  description: string;
  highlights: string[];
  cutoffs: CutoffData[];
  fees: FeeStructure;
  facilities: string[];
  alumniNotable: string[];
}

interface CutoffData {
  year: number;
  course: string;
  general: number;
  obc: number;
  sc: number;
  st: number;
  vjnt: number;
  ews: number;
  tfws: number;
}

interface FeeStructure {
  tuition: number;
  other: number;
  total: number;
  hostel?: number;
}

// Mumbai Law Colleges Data
const COLLEGES: College[] = [
  {
    id: 'glc-mumbai',
    name: 'Government Law College, Mumbai',
    shortName: 'GLC Mumbai',
    location: 'Churchgate, Mumbai',
    established: 1855,
    type: 'Government',
    courses: ['BA-LL.B (5-Year)', 'LL.B (3-Year)'],
    website: 'https://glcmumbai.com',
    image: '🏛️',
    description: 'The oldest law school in Asia, Government Law College Mumbai is the most prestigious law institution in Maharashtra. Founded in 1855, it has produced some of India\'s finest legal minds including former Chief Justices, Senior Advocates, and prominent politicians.',
    highlights: [
      'Oldest Law School in Asia (Est. 1855)',
      'Most Affordable Government Fees',
      'Prime Location - Churchgate',
      'Excellent Placement Record',
      'Strong Alumni Network',
      'Best Moot Court Facilities',
      'Active Legal Aid Center'
    ],
    facilities: [
      'Moot Court Hall',
      'Law Library (50,000+ books)',
      'Computer Lab',
      'Legal Aid Clinic',
      'Seminar Hall',
      'Wi-Fi Campus'
    ],
    alumniNotable: [
      'Dr. B.R. Ambedkar (Constitution Architect)',
      'Lokmanya Tilak (Freedom Fighter)',
      'Fali Nariman (Senior Advocate)',
      'Ram Jethmalani (Senior Advocate)',
      'Kapil Sibal (Former Law Minister)'
    ],
    cutoffs: [
      { year: 2025, course: '5-Year', general: 143, obc: 134, sc: 95, st: 85, vjnt: 120, ews: 138, tfws: 140 },
      { year: 2025, course: '3-Year', general: 141, obc: 131, sc: 92, st: 82, vjnt: 118, ews: 135, tfws: 138 },
      { year: 2024, course: '5-Year', general: 142, obc: 133, sc: 93, st: 83, vjnt: 118, ews: 136, tfws: 139 },
      { year: 2024, course: '3-Year', general: 140, obc: 130, sc: 90, st: 80, vjnt: 116, ews: 133, tfws: 136 },
      { year: 2023, course: '5-Year', general: 141, obc: 132, sc: 92, st: 82, vjnt: 117, ews: 135, tfws: 138 },
      { year: 2023, course: '3-Year', general: 139, obc: 129, sc: 89, st: 79, vjnt: 115, ews: 132, tfws: 135 },
      { year: 2022, course: '5-Year', general: 140, obc: 131, sc: 91, st: 81, vjnt: 116, ews: 134, tfws: 137 },
      { year: 2022, course: '3-Year', general: 138, obc: 128, sc: 88, st: 78, vjnt: 114, ews: 131, tfws: 134 },
    ],
    fees: {
      tuition: 12000,
      other: 8000,
      total: 20000,
      hostel: 15000
    }
  },
  {
    id: 'kc-law',
    name: 'K.C. Law College',
    shortName: 'KC Law',
    location: 'Churchgate, Mumbai',
    established: 1958,
    type: 'Aided',
    courses: ['BA-LL.B (5-Year)', 'LL.B (3-Year)', 'LL.M'],
    website: 'https://kclawcollege.org',
    image: '📚',
    description: 'K.C. Law College is one of the premier law colleges in Mumbai, known for its academic excellence and strong industry connections.',
    highlights: [
      'Excellent Faculty',
      'Good Placement Record',
      'Central Location',
      'Strong Moot Court Tradition'
    ],
    facilities: ['Library', 'Moot Court', 'Computer Lab', 'Seminar Hall'],
    alumniNotable: ['Various High Court Judges', 'Senior Advocates'],
    cutoffs: [
      { year: 2025, course: '5-Year', general: 135, obc: 125, sc: 85, st: 75, vjnt: 110, ews: 128, tfws: 132 },
      { year: 2024, course: '5-Year', general: 133, obc: 123, sc: 83, st: 73, vjnt: 108, ews: 126, tfws: 130 },
    ],
    fees: {
      tuition: 45000,
      other: 15000,
      total: 60000
    }
  },
  {
    id: 'siddharth-law',
    name: 'Siddharth Law College',
    shortName: 'Siddharth',
    location: 'Fort, Mumbai',
    established: 1956,
    type: 'Aided',
    courses: ['BA-LL.B (5-Year)', 'LL.B (3-Year)'],
    website: 'https://siddharthlawcollege.com',
    image: '⚖️',
    description: 'A well-established law college with a focus on practical legal education.',
    highlights: [
      'Strong Criminal Law Faculty',
      'Active Legal Aid',
      'Central Mumbai Location'
    ],
    facilities: ['Library', 'Moot Court', 'Legal Aid Center'],
    alumniNotable: ['Various District Judges', 'Practicing Advocates'],
    cutoffs: [
      { year: 2025, course: '5-Year', general: 130, obc: 120, sc: 80, st: 70, vjnt: 105, ews: 123, tfws: 127 },
      { year: 2024, course: '5-Year', general: 128, obc: 118, sc: 78, st: 68, vjnt: 103, ews: 121, tfws: 125 },
    ],
    fees: {
      tuition: 35000,
      other: 12000,
      total: 47000
    }
  },
  {
    id: 'pravin-gandhi',
    name: 'Pravin Gandhi College of Law',
    shortName: 'Pravin Gandhi',
    location: 'Andheri, Mumbai',
    established: 2005,
    type: 'Unaided',
    courses: ['BLS-LL.B (5-Year)', 'LL.B (3-Year)'],
    website: 'https://pravingandhi.edu.in',
    image: '🎓',
    description: 'A modern law college with excellent infrastructure and corporate law focus.',
    highlights: [
      'Modern Infrastructure',
      'Corporate Law Focus',
      'Good Internship Opportunities'
    ],
    facilities: ['AC Classrooms', 'Digital Library', 'Moot Court', 'Cafeteria'],
    alumniNotable: ['Corporate Lawyers', 'Legal Consultants'],
    cutoffs: [
      { year: 2025, course: '5-Year', general: 125, obc: 115, sc: 75, st: 65, vjnt: 100, ews: 118, tfws: 122 },
      { year: 2024, course: '5-Year', general: 123, obc: 113, sc: 73, st: 63, vjnt: 98, ews: 116, tfws: 120 },
    ],
    fees: {
      tuition: 85000,
      other: 25000,
      total: 110000
    }
  }
];

// Admission Timeline 2026
const ADMISSION_TIMELINE = [
  { date: 'February 2026', event: 'MH CET Law Application Form Release', status: 'upcoming' },
  { date: 'March 2026', event: 'Application Deadline', status: 'upcoming' },
  { date: 'April 2026', event: 'Admit Card Download', status: 'upcoming' },
  { date: 'May 2026', event: 'MH CET Law Examination', status: 'upcoming' },
  { date: 'June 2026', event: 'Result Declaration', status: 'upcoming' },
  { date: 'July 2026', event: 'CAP Round 1 Registration', status: 'upcoming' },
  { date: 'July 2026', event: 'CAP Round 1 Allotment', status: 'upcoming' },
  { date: 'August 2026', event: 'CAP Round 2 & 3', status: 'upcoming' },
  { date: 'August 2026', event: 'Classes Commence', status: 'upcoming' },
];

// Documents Required
const DOCUMENTS_REQUIRED = [
  { name: 'SSC Mark Sheet', mandatory: true },
  { name: 'HSC Mark Sheet', mandatory: true },
  { name: 'Graduation Mark Sheets (for 3-Year)', mandatory: true },
  { name: 'MH CET Law Score Card', mandatory: true },
  { name: 'Domicile Certificate', mandatory: true },
  { name: 'Caste Certificate (if applicable)', mandatory: false },
  { name: 'Caste Validity Certificate', mandatory: false },
  { name: 'Non-Creamy Layer Certificate (OBC)', mandatory: false },
  { name: 'EWS Certificate', mandatory: false },
  { name: 'Gap Certificate (if any)', mandatory: false },
  { name: 'Migration Certificate', mandatory: true },
  { name: 'Passport Size Photos (8)', mandatory: true },
  { name: 'Aadhar Card', mandatory: true },
];

const CollegeHub: React.FC = () => {
  const { stats } = useProgress();
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [activeTab, setActiveTab] = useState<'colleges' | 'predictor' | 'timeline' | 'documents'>('colleges');
  const [predictorScore, setPredictorScore] = useState<string>('');
  const [predictorCategory, setPredictorCategory] = useState<string>('general');
  const [predictorCourse, setPredictorCourse] = useState<string>('5-Year');
  const [showCutoffDetails, setShowCutoffDetails] = useState<string | null>(null);

  // Cutoff Predictor Logic
  const getPrediction = () => {
    const score = parseInt(predictorScore);
    if (isNaN(score) || score < 0 || score > 150) return null;

    const predictions: { college: College; chance: 'high' | 'medium' | 'low' | 'unlikely' }[] = [];

    COLLEGES.forEach(college => {
      const latestCutoff = college.cutoffs.find(c => c.course === predictorCourse);
      if (!latestCutoff) return;

      const cutoffScore = latestCutoff[predictorCategory as keyof CutoffData] as number;
      
      if (score >= cutoffScore + 5) {
        predictions.push({ college, chance: 'high' });
      } else if (score >= cutoffScore) {
        predictions.push({ college, chance: 'medium' });
      } else if (score >= cutoffScore - 5) {
        predictions.push({ college, chance: 'low' });
      } else {
        predictions.push({ college, chance: 'unlikely' });
      }
    });

    return predictions.sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2, unlikely: 3 };
      return order[a.chance] - order[b.chance];
    });
  };

  const predictions = predictorScore ? getPrediction() : null;

  const getChanceColor = (chance: string) => {
    switch (chance) {
      case 'high': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'medium': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'low': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    }
  };

  const getChanceIcon = (chance: string) => {
    switch (chance) {
      case 'high': return <CheckCircle2 className="w-5 h-5" />;
      case 'medium': return <Target className="w-5 h-5" />;
      case 'low': return <AlertCircle className="w-5 h-5" />;
      default: return <TrendingDown className="w-5 h-5" />;
    }
  };

  // Render College Detail View
  if (selectedCollege) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button 
          onClick={() => setSelectedCollege(null)}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          ← Back to Colleges
        </button>

        {/* College Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 rounded-2xl p-8 text-white">
          <div className="flex items-start gap-6">
            <div className="text-6xl">{selectedCollege.image}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedCollege.type === 'Government' ? 'bg-emerald-500' :
                  selectedCollege.type === 'Aided' ? 'bg-blue-500' : 'bg-purple-500'
                }`}>
                  {selectedCollege.type}
                </span>
                <span className="text-indigo-200 text-sm">Est. {selectedCollege.established}</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{selectedCollege.name}</h1>
              <div className="flex items-center gap-4 text-indigo-200">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {selectedCollege.location}
                </span>
                <a href={selectedCollege.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white">
                  <Globe className="w-4 h-4" /> Website
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* About */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" /> About
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {selectedCollege.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" /> Highlights
            </h3>
            <ul className="space-y-2">
              {selectedCollege.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Courses & Fees */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-emerald-500" /> Courses & Fees
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Courses Offered:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCollege.courses.map((c, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Annual Fees (Approx):</p>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  ₹{selectedCollege.fees.total.toLocaleString()}
                  <span className="text-sm font-normal text-gray-500">/year</span>
                </div>
                {selectedCollege.fees.hostel && (
                  <p className="text-sm text-gray-500 mt-1">Hostel: ₹{selectedCollege.fees.hostel.toLocaleString()}/year</p>
                )}
              </div>
            </div>
          </div>

          {/* Notable Alumni */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" /> Notable Alumni
            </h3>
            <ul className="space-y-2">
              {selectedCollege.alumniNotable.map((a, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Users className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cutoff History */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" /> Cutoff History (Out of 150)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Year</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Course</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">General</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">OBC</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">SC</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">ST</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">EWS</th>
                </tr>
              </thead>
              <tbody>
                {selectedCollege.cutoffs.map((c, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 px-4 font-medium text-gray-800 dark:text-white">{c.year}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{c.course}</td>
                    <td className="py-3 px-4 text-center font-bold text-indigo-600 dark:text-indigo-400">{c.general}</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">{c.obc}</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">{c.sc}</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">{c.st}</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">{c.ews}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Mumbai Law Colleges</h1>
          <p className="text-gray-500 dark:text-gray-400">Your complete guide to top law colleges in Mumbai</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'colleges', label: 'Colleges', icon: Building2 },
          { id: 'predictor', label: 'Cutoff Predictor', icon: Calculator },
          { id: 'timeline', label: 'Admission Timeline', icon: Calendar },
          { id: 'documents', label: 'Documents', icon: FileText },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Colleges Tab */}
      {activeTab === 'colleges' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COLLEGES.map(college => (
            <div 
              key={college.id}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => setSelectedCollege(college)}
            >
              <div className={`p-6 ${
                college.type === 'Government' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                college.type === 'Aided' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                'bg-gradient-to-r from-purple-500 to-pink-500'
              } text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded">
                      {college.type}
                    </span>
                    <h3 className="text-xl font-bold mt-2">{college.name}</h3>
                    <p className="text-white/80 flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" /> {college.location}
                    </p>
                  </div>
                  <div className="text-5xl opacity-80 group-hover:scale-110 transition-transform">
                    {college.image}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {college.courses.map((c, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Latest Cutoff (General)</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {college.cutoffs[0]?.general || 'N/A'}<span className="text-sm text-gray-500">/150</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Annual Fees</p>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      ₹{college.fees.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cutoff Predictor Tab */}
      {activeTab === 'predictor' && (
        <div className="space-y-6">
          {/* Input Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-500" /> Check Your Admission Chances
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Expected Score (Out of 150)
                </label>
                <input
                  type="number"
                  min="0"
                  max="150"
                  value={predictorScore}
                  onChange={(e) => setPredictorScore(e.target.value)}
                  placeholder="Enter score"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={predictorCategory}
                  onChange={(e) => setPredictorCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="general">General / Open</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                  <option value="vjnt">VJ/NT</option>
                  <option value="ews">EWS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Course
                </label>
                <select
                  value={predictorCourse}
                  onChange={(e) => setPredictorCourse(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="5-Year">BA-LL.B (5-Year)</option>
                  <option value="3-Year">LL.B (3-Year)</option>
                </select>
              </div>
              <div className="flex items-end">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-xl p-4 w-full text-center">
                  <p className="text-xs text-indigo-600 dark:text-indigo-400">Your Score</p>
                  <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">
                    {predictorScore || '—'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Predictions */}
          {predictions && predictions.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">Your Admission Chances</h3>
              {predictions.map((pred, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{pred.college.image}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">{pred.college.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Cutoff: {pred.college.cutoffs.find(c => c.course === predictorCourse)?.[predictorCategory as keyof CutoffData] || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium ${getChanceColor(pred.chance)}`}>
                    {getChanceIcon(pred.chance)}
                    {pred.chance === 'high' ? 'High Chance' :
                     pred.chance === 'medium' ? 'Good Chance' :
                     pred.chance === 'low' ? 'Low Chance' : 'Unlikely'}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Motivational Message */}
          {predictorScore && parseInt(predictorScore) < 130 && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">📈 Don't Worry, Keep Practicing!</h3>
              <p className="text-amber-100">
                Even toppers started from lower scores. With consistent practice using this app, you can improve by 20-30 marks in just 2 months. Stay focused! 💪
              </p>
            </div>
          )}
        </div>
      )}

      {/* Timeline Tab */}
      {activeTab === 'timeline' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-500" /> MH CET Law 2026 - Important Dates
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200 dark:bg-indigo-800"></div>
            
            {/* Timeline Items */}
            <div className="space-y-6">
              {ADMISSION_TIMELINE.map((item, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 z-10">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 flex-1">
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{item.date}</p>
                    <p className="font-semibold text-gray-800 dark:text-white">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" /> Documents Required for Admission
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOCUMENTS_REQUIRED.map((doc, i) => (
              <div 
                key={i}
                className={`flex items-center gap-3 p-4 rounded-xl ${
                  doc.mandatory 
                    ? 'bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800' 
                    : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600'
                }`}
              >
                {doc.mandatory ? (
                  <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{doc.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {doc.mandatory ? 'Mandatory' : 'If Applicable'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pro Tips */}
          <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">💡 Pro Tips</h4>
            <ul className="text-sm text-indigo-600 dark:text-indigo-400 space-y-1">
              <li>• Keep multiple photocopies of all documents</li>
              <li>• Get documents attested by Gazetted Officer</li>
              <li>• Domicile should be of Maharashtra only for state quota</li>
              <li>• Caste Validity is MANDATORY for reserved categories</li>
              <li>• EWS certificate should be of current financial year</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeHub;
