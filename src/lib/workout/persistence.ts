import type { WorkoutState } from '@/types';

const WORKOUT_STORAGE_KEY = 'cards-of-carnage-in-progress-workout';

/**
 * Save in-progress workout to localStorage
 */
export function saveInProgressWorkout(workout: WorkoutState): void {
  try {
    // Only save if workout is in progress
    if (workout.status !== 'in-progress') {
      clearInProgressWorkout();
      return;
    }
    
    const serialized = {
      ...workout,
      startTime: workout.startTime.toISOString(),
    };
    localStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(serialized));
  } catch (error) {
    console.error('Failed to save in-progress workout:', error);
  }
}

/**
 * Load in-progress workout from localStorage
 */
export function loadInProgressWorkout(): WorkoutState | null {
  try {
    const saved = localStorage.getItem(WORKOUT_STORAGE_KEY);
    if (!saved) return null;
    
    const parsed = JSON.parse(saved);
    
    // Restore Date object
    return {
      ...parsed,
      startTime: new Date(parsed.startTime),
    };
  } catch (error) {
    console.error('Failed to load in-progress workout:', error);
    return null;
  }
}

/**
 * Clear in-progress workout from localStorage
 */
export function clearInProgressWorkout(): void {
  try {
    localStorage.removeItem(WORKOUT_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear in-progress workout:', error);
  }
}

/**
 * Check if there's an in-progress workout saved
 */
export function hasInProgressWorkout(): boolean {
  try {
    return localStorage.getItem(WORKOUT_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}
