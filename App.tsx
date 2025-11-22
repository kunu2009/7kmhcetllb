import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StudyHub from './components/StudyHub';
import TestArena from './components/TestArena';
import AiMentor from './components/AiMentor';
import Analytics from './components/Analytics';
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