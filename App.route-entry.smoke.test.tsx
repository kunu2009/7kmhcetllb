import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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
        name: 'Smoke User',
        targetCourse: 'MH CET Law 3-Year LLB',
        selectedExamId: 'mah-llb-3y',
        examYear: '2026',
        dailyStudyHoursGoal: 2,
        onboardingCompleted: true
      }
    })
  );
};

describe('route-entry smoke tests', () => {
  beforeEach(() => {
    localStorage.clear();
    seedOnboardingCompleteState();
  });

  it('opens study route directly from hash URL', async () => {
    window.location.hash = '#/study';
    render(<App />);

    await waitFor(() => expect(window.location.hash).toBe('#/study'));
    expect(screen.getAllByText(/LawRanker/i).length).toBeGreaterThan(0);
  }, 30000);

  it('opens test arena route directly from hash URL', async () => {
    window.location.hash = '#/practice';
    render(<App />);

    expect(await screen.findByRole('button', { name: /Q-Bank/i }, { timeout: 10000 })).toBeInTheDocument();
  }, 30000);
});
