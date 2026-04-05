import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

const seedOnboardingCompleteState = () => {
  localStorage.setItem(
    'lawranker_progress',
    JSON.stringify({
      stats: {
        accuracy: 68,
        topicsMastered: 12,
        studyHours: 26,
        weakArea: 'Legal Aptitude',
        dailyStreak: 4,
        bestStreak: 7,
        totalTestsTaken: 3,
        perfectScores: 0
      },
      todos: [],
      testHistory: [],
      subjectMastery: {
        'Legal Aptitude': 60,
        'General Knowledge': 55,
        'Logical Reasoning': 72,
        English: 64,
        Mathematics: 48
      },
      achievements: [],
      lastActiveDate: '',
      learnerProfile: {
        name: 'Study User',
        targetCourse: 'MH CET Law 3-Year LLB',
        selectedExamId: 'mah-llb-3y',
        examYear: '2026',
        dailyStudyHoursGoal: 2,
        onboardingCompleted: true
      }
    })
  );
};

describe('study hub smoke test', () => {
  beforeEach(() => {
    localStorage.clear();
    seedOnboardingCompleteState();
    window.location.hash = '#/study';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });

  it('renders the enhanced study command center', async () => {
    render(<App />);

    expect(await screen.findByText(/Study Command Center/i, {}, { timeout: 12000 })).toBeInTheDocument();
    expect(screen.getAllByText(/Track Roadmap/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Next Module/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Strategy Card/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /Focus Filters/i })).toBeInTheDocument();
  }, 30000);
});
