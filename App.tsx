import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { ProgressProvider } from './context/ProgressContext';

const Dashboard = lazy(() => import('./components/Dashboard'));
const StudyHub = lazy(() => import('./components/StudyHub'));
const TestArena = lazy(() => import('./components/TestArena'));
const AiMentor = lazy(() => import('./components/AiMentor'));
const Analytics = lazy(() => import('./components/Analytics'));
const CollegeHub = lazy(() => import('./components/CollegeHub'));
const PreviousYearPapers = lazy(() => import('./components/PreviousYearPapers'));
const Flashcards = lazy(() => import('./components/Flashcards'));
const DailyPractice = lazy(() => import('./components/DailyPractice'));
const StudyPlanner = lazy(() => import('./components/StudyPlanner'));
const QuickNotes = lazy(() => import('./components/QuickNotes'));
const QuickRevision = lazy(() => import('./components/QuickRevision'));
const LegalReasoning = lazy(() => import('./components/LegalReasoning'));
const ReadingComprehension = lazy(() => import('./components/ReadingComprehension'));
const FormulaSheet = lazy(() => import('./components/FormulaSheet'));
const StudyTips = lazy(() => import('./components/StudyTips'));
const WeakPointDestroyer = lazy(() => import('./components/WeakPointDestroyer'));
const ReelsHub = lazy(() => import('./components/ReelsHub'));
const LLB5SubjectHub = lazy(() => import('./components/LLB5SubjectHub'));
const ExamSubjectHub = lazy(() => import('./components/ExamSubjectHub'));

const RouteLoader: React.FC = () => (
  <div className="min-h-[40vh] flex items-center justify-center">
    <div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
  </div>
);

const App: React.FC = () => {
  return (
    <ProgressProvider>
      <HashRouter>
        <Layout>
          <Suspense fallback={<RouteLoader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/study" element={<StudyHub />} />
              <Route path="/practice" element={<TestArena />} />
              <Route path="/daily" element={<DailyPractice />} />
              <Route path="/planner" element={<StudyPlanner />} />
              <Route path="/notes" element={<QuickNotes />} />
              <Route path="/revision" element={<QuickRevision />} />
              <Route path="/legal-reasoning" element={<LegalReasoning />} />
              <Route path="/reading-comprehension" element={<ReadingComprehension />} />
              <Route path="/formulas" element={<FormulaSheet />} />
              <Route path="/study-tips" element={<StudyTips />} />
              <Route path="/weak-point" element={<WeakPointDestroyer />} />
              <Route path="/reels" element={<ReelsHub />} />
              <Route path="/llb5-subjects" element={<LLB5SubjectHub />} />
              <Route path="/exam-subjects" element={<ExamSubjectHub />} />
              <Route path="/pyq" element={<PreviousYearPapers />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/colleges" element={<CollegeHub />} />
              <Route path="/mentor" element={<AiMentor />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </HashRouter>
    </ProgressProvider>
  );
};

export default App;