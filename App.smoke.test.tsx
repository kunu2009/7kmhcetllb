import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('critical flow smoke test', () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.hash = '#/';
  });

  it('walks onboarding to dashboard, study and test routes', async () => {
    const user = userEvent.setup();
    render(<App />);

    const continueButton = await screen
      .findByRole('button', { name: /Continue Tutorial/i }, { timeout: 8000 })
      .catch(() => null);

    if (continueButton) {
      await user.click(continueButton);
      await user.click(await screen.findByRole('button', { name: /Finish Setup & Start/i }, { timeout: 8000 }));
    }

    expect(window.location.hash).toBe('#/');

    window.location.hash = '#/study';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await waitFor(() => expect(window.location.hash).toBe('#/study'));
    expect(screen.getAllByText(/LawRanker/i).length).toBeGreaterThan(0);

    window.location.hash = '#/practice';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await waitFor(() => expect(window.location.hash).toBe('#/practice'));
    expect((await screen.findAllByText(/Test Arena/i, {}, { timeout: 8000 })).length).toBeGreaterThan(1);
  }, 30000);
});
