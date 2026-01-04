import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createWorkout,
  getCurrentCard,
  completeCard,
  getProgress,
  isWorkoutComplete,
  getWorkoutSummary,
  pauseWorkout,
  resumeWorkout,
  endWorkoutEarly,
} from '../workout';
import type { WorkoutState, Settings, PlayableCard } from '@/types';

const defaultSettings: Settings = {
  includeJokers: false,
  faceCardValue: 10,
  aceValue: 11,
  soundEffects: true,
  vibration: true,
  theme: 'dark',
};

describe('Workout Creation', () => {
  /**
   * WRK-001: Start workout initializes with shuffled deck
   * Covers: Draw first card scenario
   */
  it('WRK-001: should create a workout with shuffled deck', () => {
    const workout = createWorkout('upper-body', defaultSettings);
    
    expect(workout).toBeDefined();
    expect(workout.id).toBeTruthy();
    expect(workout.deckType).toBe('upper-body');
    expect(workout.deck).toHaveLength(52);
    expect(workout.currentCardIndex).toBe(0);
    expect(workout.completedCards).toHaveLength(0);
    expect(workout.totalReps).toBe(0);
    expect(workout.status).toBe('in-progress');
    expect(workout.startTime).toBeInstanceOf(Date);
  });

  it('should create workout with jokers when enabled', () => {
    const settingsWithJokers = { ...defaultSettings, includeJokers: true };
    const workout = createWorkout('upper-body', settingsWithJokers);
    
    expect(workout.deck).toHaveLength(54);
  });
});

describe('Card Drawing', () => {
  let workout: WorkoutState;

  beforeEach(() => {
    workout = createWorkout('upper-body', defaultSettings);
  });

  /**
   * WRK-002: Draw card shows correct exercise and reps
   * Covers: Draw first card scenario
   */
  it('WRK-002: should return current card with exercise and reps', () => {
    const card = getCurrentCard(workout);
    
    expect(card).toBeDefined();
    expect(card?.exercise).toBeDefined();
    expect(card?.exercise.name).toBeTruthy();
    expect(card?.reps).toBeGreaterThan(0);
  });

  it('should return null when deck is exhausted', () => {
    // Move to end of deck
    const exhaustedWorkout = { ...workout, currentCardIndex: workout.deck.length };
    const card = getCurrentCard(exhaustedWorkout);
    
    expect(card).toBeNull();
  });
});

describe('Card Completion', () => {
  let workout: WorkoutState;

  beforeEach(() => {
    workout = createWorkout('upper-body', defaultSettings);
  });

  /**
   * WRK-003: Complete card advances to next
   * Covers: Complete a card and draw next scenario
   */
  it('WRK-003: should advance to next card when completing current', () => {
    const firstCard = getCurrentCard(workout)!;
    const updatedWorkout = completeCard(workout);
    
    expect(updatedWorkout.currentCardIndex).toBe(1);
    expect(updatedWorkout.completedCards).toHaveLength(1);
    expect(updatedWorkout.completedCards[0]).toEqual(firstCard);
  });

  /**
   * WRK-004: Progress counter updates correctly
   * Covers: Complete a card and draw next scenario
   */
  it('WRK-004: should update progress after completing cards', () => {
    const progress1 = getProgress(workout);
    expect(progress1.current).toBe(1);
    expect(progress1.total).toBe(52);
    expect(progress1.percentage).toBeCloseTo(1 / 52 * 100, 1);
    
    const afterOne = completeCard(workout);
    const progress2 = getProgress(afterOne);
    expect(progress2.current).toBe(2);
    expect(progress2.percentage).toBeCloseTo(2 / 52 * 100, 1);
  });

  /**
   * WRK-005: Rep counter accumulates correctly
   * Covers: Complete a card and draw next scenario
   */
  it('WRK-005: should accumulate reps after completing cards', () => {
    const firstCard = getCurrentCard(workout)!;
    const afterOne = completeCard(workout);
    
    expect(afterOne.totalReps).toBe(firstCard.reps);
    expect(afterOne.repsByExercise[firstCard.exercise.name]).toBe(firstCard.reps);
    
    const secondCard = getCurrentCard(afterOne)!;
    const afterTwo = completeCard(afterOne);
    
    expect(afterTwo.totalReps).toBe(firstCard.reps + secondCard.reps);
  });

  /**
   * WRK-006: Completing all cards shows summary
   * Covers: Complete all cards scenario
   */
  it('WRK-006: should mark workout complete when all cards done', () => {
    let currentWorkout = workout;
    
    // Complete all cards
    while (!isWorkoutComplete(currentWorkout)) {
      currentWorkout = completeCard(currentWorkout);
    }
    
    expect(currentWorkout.status).toBe('completed');
    expect(currentWorkout.completedCards).toHaveLength(52);
    expect(currentWorkout.currentCardIndex).toBe(52);
    expect(currentWorkout.endTime).toBeDefined();
    
    const summary = getWorkoutSummary(currentWorkout);
    expect(summary.status).toBe('completed');
    expect(summary.cardsCompleted).toBe(52);
    expect(summary.totalReps).toBeGreaterThan(0);
  });
});

describe('Joker Cards', () => {
  /**
   * WRK-007: Joker cards display wildcard styling
   * Covers: Draw a Joker wildcard scenario
   */
  it('WRK-007: should identify joker cards as wildcards', () => {
    const settingsWithJokers = { ...defaultSettings, includeJokers: true };
    const workout = createWorkout('upper-body', settingsWithJokers);
    
    // Find joker cards in the deck
    const jokers = workout.deck.filter(
      (card): card is PlayableCard & { type: 'joker' } => 'type' in card && card.type === 'joker'
    );
    
    expect(jokers).toHaveLength(2);
    
    jokers.forEach(joker => {
      expect(joker.exercise).toBeDefined();
      expect(joker.reps).toBeGreaterThan(0);
      // Joker exercises should be high-intensity
      const exerciseName = joker.exercise.name.toLowerCase();
      expect(
        exerciseName.includes('burpee') || 
        exerciseName.includes('wall sit') ||
        exerciseName.includes('plank')
      ).toBe(true);
    });
  });
});

describe('Exercise Instructions', () => {
  /**
   * WRK-008: Exercise instructions modal opens/closes
   * Covers: View exercise instructions during workout scenario
   */
  it('WRK-008: should provide exercise instructions for current card', () => {
    const workout = createWorkout('upper-body', defaultSettings);
    const card = getCurrentCard(workout)!;
    
    expect(card.exercise.instructions).toBeDefined();
    expect(Array.isArray(card.exercise.instructions)).toBe(true);
    expect(card.exercise.instructions.length).toBeGreaterThan(0);
    expect(card.exercise.muscles).toBeDefined();
    expect(card.exercise.muscles.length).toBeGreaterThan(0);
  });
});

describe('Workout Pause/Resume', () => {
  let workout: WorkoutState;

  beforeEach(() => {
    workout = createWorkout('upper-body', defaultSettings);
    // Complete a few cards
    workout = completeCard(workout);
    workout = completeCard(workout);
    workout = completeCard(workout);
  });

  /**
   * WRK-009: Pause button shows confirmation modal
   * Covers: Pause workout scenario
   */
  it('WRK-009: should track workout state when paused', () => {
    const pausedWorkout = pauseWorkout(workout);
    
    expect(pausedWorkout.currentCardIndex).toBe(3);
    expect(pausedWorkout.completedCards).toHaveLength(3);
    expect(pausedWorkout.status).toBe('in-progress');
    // Progress should be preserved
    const progress = getProgress(pausedWorkout);
    expect(progress.current).toBe(4); // Next card to draw
  });

  /**
   * WRK-010: Resume returns to current card
   * Covers: Resume workout scenario
   */
  it('WRK-010: should resume at the same card after pause', () => {
    const cardBeforePause = getCurrentCard(workout);
    const pausedWorkout = pauseWorkout(workout);
    const resumedWorkout = resumeWorkout(pausedWorkout);
    const cardAfterResume = getCurrentCard(resumedWorkout);
    
    expect(cardAfterResume).toEqual(cardBeforePause);
    expect(resumedWorkout.currentCardIndex).toBe(workout.currentCardIndex);
  });

  /**
   * WRK-011: End early saves partial workout
   * Covers: End workout early scenario
   */
  it('WRK-011: should save partial workout when ended early', () => {
    const endedWorkout = endWorkoutEarly(workout);
    
    expect(endedWorkout.status).toBe('partial');
    expect(endedWorkout.endTime).toBeDefined();
    expect(endedWorkout.completedCards).toHaveLength(3);
    
    const summary = getWorkoutSummary(endedWorkout);
    expect(summary.status).toBe('partial');
    expect(summary.cardsCompleted).toBe(3);
    expect(summary.totalCards).toBe(52);
  });
});

describe('Workout Persistence', () => {
  /**
   * WRK-012: In-progress workout persists on app refresh
   * Covers: App closed during workout edge case
   */
  it('WRK-012: should serialize workout state for persistence', () => {
    const workout = createWorkout('upper-body', defaultSettings);
    const afterCards = completeCard(completeCard(completeCard(workout)));
    
    // Serialize (as if saving to localStorage)
    const serialized = JSON.stringify(afterCards);
    
    // Deserialize (as if restoring from localStorage)
    const restored = JSON.parse(serialized);
    
    // Key state should be preserved
    expect(restored.id).toBe(afterCards.id);
    expect(restored.deckType).toBe(afterCards.deckType);
    expect(restored.currentCardIndex).toBe(afterCards.currentCardIndex);
    expect(restored.completedCards).toHaveLength(3);
    expect(restored.totalReps).toBe(afterCards.totalReps);
    expect(restored.status).toBe('in-progress');
  });
});

describe('Workout Summary', () => {
  it('should generate complete summary with all required fields', () => {
    let workout = createWorkout('upper-body', defaultSettings);
    
    // Complete some cards
    for (let i = 0; i < 10; i++) {
      workout = completeCard(workout);
    }
    workout = endWorkoutEarly(workout);
    
    const summary = getWorkoutSummary(workout);
    
    expect(summary.id).toBe(workout.id);
    expect(summary.deckType).toBe('upper-body');
    expect(summary.deckName).toBe('Upper Body');
    expect(summary.status).toBe('partial');
    expect(summary.cardsCompleted).toBe(10);
    expect(summary.totalCards).toBe(52);
    expect(summary.totalReps).toBeGreaterThan(0);
    expect(summary.repsByExercise).toBeDefined();
    expect(summary.duration).toBeGreaterThanOrEqual(0);
    expect(summary.date).toBeDefined();
  });

  it('should calculate duration correctly', () => {
    vi.useFakeTimers();
    const startTime = new Date('2026-01-04T10:00:00');
    vi.setSystemTime(startTime);
    
    let workout = createWorkout('upper-body', defaultSettings);
    
    // Advance time by 5 minutes
    vi.advanceTimersByTime(5 * 60 * 1000);
    
    workout = endWorkoutEarly(workout);
    const summary = getWorkoutSummary(workout);
    
    expect(summary.duration).toBe(5 * 60); // 300 seconds
    
    vi.useRealTimers();
  });
});
