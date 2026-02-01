import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StudyHub from './components/StudyHub';
import TestArena from './components/TestArena';
import AiMentor from './components/AiMentor';
import Analytics from './components/Analytics';
import CollegeHub from './components/CollegeHub';
import PreviousYearPapers from './components/PreviousYearPapers';
import Flashcards from './components/Flashcards';
import DailyPractice from './components/DailyPractice';
import StudyPlanner from './components/StudyPlanner';
import QuickNotes from './components/QuickNotes';
import QuickRevision from './components/QuickRevision';
import LegalReasoning from './components/LegalReasoning';
import ReadingComprehension from './components/ReadingComprehension';
import FormulaSheet from './components/FormulaSheet';
import StudyTips from './components/StudyTips';
import { ProgressProvider } from './context/ProgressContext';

const App: React.FC = () => {
  return (
    <ProgressProvider>
      <HashRouter>
        <Layout>
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
            <Route path="/pyq" element={<PreviousYearPapers />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/colleges" element={<CollegeHub />} />
            <Route path="/mentor" element={<AiMentor />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ProgressProvider>
  );
};

export default App;