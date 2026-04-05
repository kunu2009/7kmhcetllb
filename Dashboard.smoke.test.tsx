import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

const seedOnboardingCompleteState = () => {
  localStorage.setItem(
    'lawranker_progress',
    JSON.stringify({
      stats: {
        accuracy: 0,
        topicsMastered: 0,
        studyHours: 0,
        weakArea: 'None yet',
        dailyStreak: 0,
        bestStreak: 0,
        totalTestsTaken: 0,
        perfectScores: 0
      },
      todos: [],
      testHistory: [],
      subjectMastery: {
        'Legal Aptitude': 0,
        'General Knowledge': 0,
        'Logical Reasoning': 0,
        English: 0,
        Mathematics: 0
      },
      achievements: [],
      lastActiveDate: '',
      learnerProfile: {
        name: 'Dashboard User',
        targetCourse: 'MH CET Law 3-Year LLB',
        selectedExamId: 'mah-llb-3y',
        examYear: '2026',
        dailyStudyHoursGoal: 2,
        onboardingCompleted: true
      }
    })
  );
};

describe('dashboard smoke test', () => {
  beforeEach(() => {
    localStorage.clear();
    seedOnboardingCompleteState();
    window.location.hash = '#/';
  });

  it('renders the redesigned dashboard sections', async () => {
    render(<App />);

    expect((await screen.findAllByText(/LawRanker/i, {}, { timeout: 12000 })).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Dashboard/i).length).toBeGreaterThan(0);
  }, 30000);
});
