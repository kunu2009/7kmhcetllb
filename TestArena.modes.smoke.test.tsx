import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
        name: 'QA User',
        targetCourse: 'MH CET Law 3-Year LLB',
        selectedExamId: 'mah-llb-3y',
        examYear: '2026',
        dailyStudyHoursGoal: 2,
        onboardingCompleted: true
      }
    })
  );
};

describe('TestArena mode QA smoke', () => {
  beforeEach(() => {
    localStorage.clear();
    seedOnboardingCompleteState();
    window.location.hash = '#/practice';
  });

  it('renders all primary mode controls', async () => {
    render(<App />);

    expect(await screen.findByRole('button', { name: /Subject/i }, { timeout: 12000 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Topic/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Q-Bank/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Full Mock/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Mixed/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Exam/i })).toBeInTheDocument();
  }, 30000);

  it('switches between Q-Bank, Full Mock, and Exam modes without breaking', async () => {
    const user = userEvent.setup();
    render(<App />);

    const qBankButtons = await screen.findAllByRole('button', { name: /Q-Bank/i }, { timeout: 12000 });
    await user.click(qBankButtons[0]);
    expect(await screen.findByText(/questions available/i, {}, { timeout: 12000 })).toBeInTheDocument();

    const fullMockButtons = screen.getAllByRole('button', { name: /Full Mock/i });
    await user.click(fullMockButtons[0]);
    expect(await screen.findByText(/Select a Mock Test/i, {}, { timeout: 12000 })).toBeInTheDocument();

    const examButtons = screen.getAllByRole('button', { name: /Exam/i });
    await user.click(examButtons[0]);
    expect(await screen.findByText(/Exam Day Rules/i, {}, { timeout: 12000 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start Exam Now/i })).toBeInTheDocument();
  }, 45000);
});
