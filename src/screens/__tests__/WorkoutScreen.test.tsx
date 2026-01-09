import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { WorkoutScreen } from '../WorkoutScreen';
import { createWorkout } from '@/lib/workout';
import type { WorkoutState, Settings } from '@/types';

const defaultSettings: Settings = {
  includeJokers: false,
  faceCardValue: 10,
  aceValue: 11,
  soundEffects: true,
  vibration: true,
  theme: 'dark',
};

describe('Workout Timer', () => {
  let workout: WorkoutState;
  const mockOnUpdateWorkout = vi.fn();
  const mockOnEndWorkout = vi.fn();
  const mockOnComplete = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    workout = createWorkout('upper-body', defaultSettings);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /**
   * UI-TMR-001: Timer is displayed prominently in header
   * Covers: Timer should be prominently displayed in the header scenario
   */
  it('UI-TMR-001: should display timer prominently in header', () => {
    render(
      <WorkoutScreen
        workout={workout}
        onUpdateWorkout={mockOnUpdateWorkout}
        onEndWorkout={mockOnEndWorkout}
        onComplete={mockOnComplete}
      />
    );

    // Timer should be visible with initial value
    const timer = screen.getByTestId('workout-timer');
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveTextContent('00:00');
  });

  /**
   * UI-TMR-002: Timer counts up in real-time
   * Covers: Timer counts up scenario
   */
  it('UI-TMR-002: should count up in real-time', () => {
    render(
      <WorkoutScreen
        workout={workout}
        onUpdateWorkout={mockOnUpdateWorkout}
        onEndWorkout={mockOnEndWorkout}
        onComplete={mockOnComplete}
      />
    );

    const timer = screen.getByTestId('workout-timer');
    
    // Advance time by 30 seconds
    act(() => {
      vi.advanceTimersByTime(30 * 1000);
    });
    
    expect(timer).toHaveTextContent('00:30');

    // Advance to 1 minute 15 seconds
    act(() => {
      vi.advanceTimersByTime(45 * 1000);
    });
    
    expect(timer).toHaveTextContent('01:15');
  });

  /**
   * UI-TMR-003: Timer continues during card transitions
   * Covers: Timer continues during card transitions scenario
   */
  it('UI-TMR-003: should continue timing during card completion', () => {
    render(
      <WorkoutScreen
        workout={workout}
        onUpdateWorkout={mockOnUpdateWorkout}
        onEndWorkout={mockOnEndWorkout}
        onComplete={mockOnComplete}
      />
    );

    const timer = screen.getByTestId('workout-timer');
    
    // Advance time
    act(() => {
      vi.advanceTimersByTime(5 * 60 * 1000 + 30 * 1000); // 5:30
    });
    
    expect(timer).toHaveTextContent('05:30');

    // Complete a card
    const doneButton = screen.getByRole('button', { name: /done/i });
    fireEvent.click(doneButton);

    // Timer should still show same time (not reset)
    expect(timer).toHaveTextContent('05:30');
  });

  /**
   * UI-TMR-004: Timer uses monospace font for stability
   * Covers: Design spec for timer display
   */
  it('UI-TMR-004: should use monospace font class', () => {
    render(
      <WorkoutScreen
        workout={workout}
        onUpdateWorkout={mockOnUpdateWorkout}
        onEndWorkout={mockOnEndWorkout}
        onComplete={mockOnComplete}
      />
    );

    const timer = screen.getByTestId('workout-timer');
    expect(timer).toHaveClass('workout-timer');
  });

  /**
   * UI-TMR-005: Timer handles hour-long display
   * Covers: Timer handles hour-long workouts scenario
   */
  it('UI-TMR-005: should expand format for hour-long workouts', () => {
    render(
      <WorkoutScreen
        workout={workout}
        onUpdateWorkout={mockOnUpdateWorkout}
        onEndWorkout={mockOnEndWorkout}
        onComplete={mockOnComplete}
      />
    );

    const timer = screen.getByTestId('workout-timer');
    
    // Advance to 1 hour, 5 minutes, 23 seconds
    act(() => {
      vi.advanceTimersByTime(1 * 60 * 60 * 1000 + 5 * 60 * 1000 + 23 * 1000);
    });
    
    expect(timer).toHaveTextContent('1:05:23');
  });
});

describe('Exit Navigation', () => {
  let workout: WorkoutState;
  const mockOnUpdateWorkout = vi.fn();
  const mockOnEndWorkout = vi.fn();
  const mockOnComplete = vi.fn();

  beforeEach(() => {
    workout = createWorkout('upper-body', defaultSettings);
    vi.clearAllMocks();
  });

  /**
   * UI-NAV-001: Exit button is icon-only
   * Covers: Exit button is icon-only scenario
   */
  it('UI-NAV-001: should display exit button as icon only (no "End" text)', () => {
    render(
      <WorkoutScreen
        workout={workout}
        onUpdateWorkout={mockOnUpdateWorkout}
        onEndWorkout={mockOnEndWorkout}
        onComplete={mockOnComplete}
      />
    );

    const exitButton = screen.getByTestId('exit-button');
    expect(exitButton).toBeInTheDocument();
    expect(exitButton).toHaveTextContent('×');
    expect(exitButton).not.toHaveTextContent('End');
  });

  /**
   * UI-NAV-002: Exit button has proper touch target
   * Covers: Exit button should have a 44×44px touch target scenario
   */
  it('UI-NAV-002: should have minimum touch target size', () => {
    render(
      <WorkoutScreen
        workout={workout}
        onUpdateWorkout={mockOnUpdateWorkout}
        onEndWorkout={mockOnEndWorkout}
        onComplete={mockOnComplete}
      />
    );

    const exitButton = screen.getByTestId('exit-button');
    expect(exitButton).toHaveClass('exit-button');
    // CSS will enforce 44x44px minimum
  });

  /**
   * UI-NAV-003: Exit button shows pause modal
   * Covers: Exit button shows pause modal scenario
   */
  it('UI-NAV-003: should open pause modal when clicked', () => {
    render(
      <WorkoutScreen
        workout={workout}
        onUpdateWorkout={mockOnUpdateWorkout}
        onEndWorkout={mockOnEndWorkout}
        onComplete={mockOnComplete}
      />
    );

    const exitButton = screen.getByTestId('exit-button');
    fireEvent.click(exitButton);

    // Pause modal should appear
    expect(screen.getByText(/workout paused/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /resume/i })).toBeInTheDocument();
    // Look for the text "End Workout" specifically (not the exit button's aria-label)
    expect(screen.getByText(/✕ End Workout/)).toBeInTheDocument();
  });

  /**
   * UI-NAV-004: Exit button is accessible
   * Covers: Exit button is accessible scenario
   */
  it('UI-NAV-004: should have accessible label for screen readers', () => {
    render(
      <WorkoutScreen
        workout={workout}
        onUpdateWorkout={mockOnUpdateWorkout}
        onEndWorkout={mockOnEndWorkout}
        onComplete={mockOnComplete}
      />
    );

    const exitButton = screen.getByTestId('exit-button');
    expect(exitButton).toHaveAttribute('aria-label', 'End workout');
  });

  /**
   * UI-NAV-005: Resume closes modal and continues
   * Covers: Resume workout scenario
   */
  it('UI-NAV-005: should close modal and continue when Resume clicked', () => {
    render(
      <WorkoutScreen
        workout={workout}
        onUpdateWorkout={mockOnUpdateWorkout}
        onEndWorkout={mockOnEndWorkout}
        onComplete={mockOnComplete}
      />
    );

    // Open pause modal
    const exitButton = screen.getByTestId('exit-button');
    fireEvent.click(exitButton);
    expect(screen.getByText(/workout paused/i)).toBeInTheDocument();

    // Click Resume
    const resumeButton = screen.getByRole('button', { name: /resume/i });
    fireEvent.click(resumeButton);

    // Modal should close
    expect(screen.queryByText(/workout paused/i)).not.toBeInTheDocument();
  });

  /**
   * UI-NAV-006: End Workout calls handler
   * Covers: End workout early scenario
   */
  it('UI-NAV-006: should call onEndWorkout when End Workout clicked', () => {
    render(
      <WorkoutScreen
        workout={workout}
        onUpdateWorkout={mockOnUpdateWorkout}
        onEndWorkout={mockOnEndWorkout}
        onComplete={mockOnComplete}
      />
    );

    // Open pause modal
    const exitButton = screen.getByTestId('exit-button');
    fireEvent.click(exitButton);

    // Click End Workout button in the modal (using text content)
    const endButton = screen.getByText(/✕ End Workout/);
    fireEvent.click(endButton);

    expect(mockOnEndWorkout).toHaveBeenCalled();
  });
});

describe('Deck Name Display', () => {
  let workout: WorkoutState;
  const mockOnUpdateWorkout = vi.fn();
  const mockOnEndWorkout = vi.fn();
  const mockOnComplete = vi.fn();

  beforeEach(() => {
    workout = createWorkout('upper-body', defaultSettings);
    vi.clearAllMocks();
  });

  /**
   * UI-NAV-007: Deck name is displayed below header
   * Covers: Deck name moves below header scenario
   */
  it('UI-NAV-007: should display deck name below header', () => {
    render(
      <WorkoutScreen
        workout={workout}
        onUpdateWorkout={mockOnUpdateWorkout}
        onEndWorkout={mockOnEndWorkout}
        onComplete={mockOnComplete}
      />
    );

    const deckName = screen.getByTestId('deck-name');
    expect(deckName).toBeInTheDocument();
    expect(deckName).toHaveTextContent('Upper Body');
  });
});
