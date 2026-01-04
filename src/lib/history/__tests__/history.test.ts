import { describe, it, expect, beforeEach } from 'vitest';
import {
  createHistory,
  addWorkoutToHistory,
  getRecentWorkouts,
  getAllTimeStats,
  clearHistory,
  loadMoreWorkouts,
} from '../history';
import type { WorkoutSummary, WorkoutHistory } from '@/types';

// Factory for creating test workout summaries
function createTestWorkout(overrides: Partial<WorkoutSummary> = {}): WorkoutSummary {
  return {
    id: `workout-${Math.random().toString(36).slice(2)}`,
    deckType: 'upper-body',
    deckName: 'Upper Body',
    status: 'completed',
    cardsCompleted: 52,
    totalCards: 52,
    totalReps: 400,
    repsByExercise: { 'Push-ups': 100, 'Dips': 100, 'Wide Push-ups': 100, 'Diamond Push-ups': 100 },
    duration: 1500, // 25 minutes
    date: new Date(),
    ...overrides,
  };
}

describe('Workout History', () => {
  let history: WorkoutHistory;

  beforeEach(() => {
    history = createHistory();
  });

  /**
   * HIST-001: Completed workout saved to history
   * Covers: Workout complete scenario
   */
  it('HIST-001: should save completed workout to history', () => {
    const workout = createTestWorkout({ status: 'completed' });
    const updatedHistory = addWorkoutToHistory(history, workout);
    
    expect(updatedHistory.workouts).toHaveLength(1);
    expect(updatedHistory.workouts[0]).toEqual(workout);
    expect(updatedHistory.stats.totalWorkouts).toBe(1);
    expect(updatedHistory.stats.decksCompleted).toBe(1);
  });

  /**
   * HIST-002: Partial workout saved with status
   * Covers: End workout early scenario
   */
  it('HIST-002: should save partial workout with correct status', () => {
    const partialWorkout = createTestWorkout({
      status: 'partial',
      cardsCompleted: 26,
      totalReps: 200,
    });
    const updatedHistory = addWorkoutToHistory(history, partialWorkout);
    
    expect(updatedHistory.workouts).toHaveLength(1);
    expect(updatedHistory.workouts[0].status).toBe('partial');
    expect(updatedHistory.stats.totalWorkouts).toBe(1);
    // Partial workouts don't count as decks completed
    expect(updatedHistory.stats.decksCompleted).toBe(0);
  });

  /**
   * HIST-003: All-time stats calculate correctly
   * Covers: View all-time stats scenario
   */
  it('HIST-003: should calculate all-time stats correctly', () => {
    let currentHistory = history;
    
    // Add multiple workouts
    currentHistory = addWorkoutToHistory(currentHistory, createTestWorkout({
      totalReps: 400,
      duration: 1500, // 25 min
      status: 'completed',
    }));
    
    currentHistory = addWorkoutToHistory(currentHistory, createTestWorkout({
      totalReps: 350,
      duration: 1200, // 20 min
      status: 'completed',
    }));
    
    currentHistory = addWorkoutToHistory(currentHistory, createTestWorkout({
      totalReps: 200,
      duration: 900, // 15 min
      status: 'partial',
      cardsCompleted: 26,
    }));
    
    const stats = getAllTimeStats(currentHistory);
    
    expect(stats.totalWorkouts).toBe(3);
    expect(stats.totalReps).toBe(950); // 400 + 350 + 200
    expect(stats.totalTimeSeconds).toBe(3600); // 1500 + 1200 + 900
    expect(stats.decksCompleted).toBe(2); // Only completed workouts
  });

  /**
   * HIST-004: History loads in reverse chronological order
   * Covers: View recent workouts scenario
   */
  it('HIST-004: should return workouts in reverse chronological order', () => {
    let currentHistory = history;
    
    const workout1 = createTestWorkout({ 
      id: 'oldest',
      date: new Date('2026-01-01T10:00:00'),
    });
    const workout2 = createTestWorkout({ 
      id: 'middle',
      date: new Date('2026-01-02T10:00:00'),
    });
    const workout3 = createTestWorkout({ 
      id: 'newest',
      date: new Date('2026-01-03T10:00:00'),
    });
    
    // Add in random order
    currentHistory = addWorkoutToHistory(currentHistory, workout2);
    currentHistory = addWorkoutToHistory(currentHistory, workout1);
    currentHistory = addWorkoutToHistory(currentHistory, workout3);
    
    const recent = getRecentWorkouts(currentHistory, 10);
    
    expect(recent[0].id).toBe('newest');
    expect(recent[1].id).toBe('middle');
    expect(recent[2].id).toBe('oldest');
  });

  /**
   * HIST-005: Empty history shows placeholder
   * Covers: No history data edge case
   */
  it('HIST-005: should handle empty history gracefully', () => {
    const emptyHistory = createHistory();
    
    expect(emptyHistory.workouts).toHaveLength(0);
    
    const stats = getAllTimeStats(emptyHistory);
    expect(stats.totalWorkouts).toBe(0);
    expect(stats.totalReps).toBe(0);
    expect(stats.totalTimeSeconds).toBe(0);
    expect(stats.decksCompleted).toBe(0);
    
    const recent = getRecentWorkouts(emptyHistory, 10);
    expect(recent).toHaveLength(0);
  });

  /**
   * HIST-006: Load more pagination works
   * Covers: Load more history scenario
   */
  it('HIST-006: should paginate history with load more', () => {
    let currentHistory = history;
    
    // Add 25 workouts
    for (let i = 0; i < 25; i++) {
      currentHistory = addWorkoutToHistory(currentHistory, createTestWorkout({
        id: `workout-${i}`,
        date: new Date(`2026-01-${String(i + 1).padStart(2, '0')}T10:00:00`),
      }));
    }
    
    // Get first page (10 items)
    const page1 = getRecentWorkouts(currentHistory, 10);
    expect(page1).toHaveLength(10);
    
    // Load more (next 10)
    const page2 = loadMoreWorkouts(currentHistory, 10, 10);
    expect(page2).toHaveLength(10);
    
    // Load more (remaining 5)
    const page3 = loadMoreWorkouts(currentHistory, 10, 20);
    expect(page3).toHaveLength(5);
    
    // Verify no overlap
    const page1Ids = new Set(page1.map(w => w.id));
    const page2Ids = new Set(page2.map(w => w.id));
    
    page2Ids.forEach(id => {
      expect(page1Ids.has(id)).toBe(false);
    });
  });
});

describe('History Persistence', () => {
  it('should serialize history for localStorage', () => {
    let history = createHistory();
    history = addWorkoutToHistory(history, createTestWorkout());
    history = addWorkoutToHistory(history, createTestWorkout());
    
    const serialized = JSON.stringify(history);
    const restored = JSON.parse(serialized);
    
    expect(restored.workouts).toHaveLength(2);
    expect(restored.stats.totalWorkouts).toBe(2);
  });

  it('should clear all history data', () => {
    let history = createHistory();
    history = addWorkoutToHistory(history, createTestWorkout());
    history = addWorkoutToHistory(history, createTestWorkout());
    
    const cleared = clearHistory(history);
    
    expect(cleared.workouts).toHaveLength(0);
    expect(cleared.stats.totalWorkouts).toBe(0);
    expect(cleared.stats.totalReps).toBe(0);
  });
});

describe('Stats Display', () => {
  it('should track reps by exercise across workouts', () => {
    let history = createHistory();
    
    history = addWorkoutToHistory(history, createTestWorkout({
      repsByExercise: { 'Push-ups': 100, 'Dips': 80 },
    }));
    
    history = addWorkoutToHistory(history, createTestWorkout({
      repsByExercise: { 'Push-ups': 90, 'Wide Push-ups': 70 },
    }));
    
    // Individual workout stats should be preserved
    expect(history.workouts[0].repsByExercise['Push-ups']).toBeDefined();
    expect(history.workouts[1].repsByExercise['Push-ups']).toBeDefined();
  });

  it('should show correct status indicators', () => {
    let history = createHistory();
    
    history = addWorkoutToHistory(history, createTestWorkout({ status: 'completed' }));
    history = addWorkoutToHistory(history, createTestWorkout({ status: 'partial' }));
    
    const workouts = getRecentWorkouts(history, 10);
    
    const completed = workouts.filter(w => w.status === 'completed');
    const partial = workouts.filter(w => w.status === 'partial');
    
    expect(completed).toHaveLength(1);
    expect(partial).toHaveLength(1);
  });
});
