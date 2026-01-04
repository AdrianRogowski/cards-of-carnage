import type { WorkoutHistory, WorkoutSummary, AllTimeStats } from '@/types';

/**
 * Create a new empty history object
 */
export function createHistory(): WorkoutHistory {
  return {
    workouts: [],
    stats: {
      totalWorkouts: 0,
      totalReps: 0,
      totalTimeSeconds: 0,
      decksCompleted: 0,
    },
  };
}

/**
 * Add a workout to history and update stats
 */
export function addWorkoutToHistory(
  history: WorkoutHistory,
  workout: WorkoutSummary
): WorkoutHistory {
  const newWorkouts = [...history.workouts, workout];
  
  // Sort by date (newest first)
  newWorkouts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
  
  // Recalculate stats
  const stats = calculateStats(newWorkouts);
  
  return {
    workouts: newWorkouts,
    stats,
  };
}

/**
 * Calculate all-time stats from workout list
 */
function calculateStats(workouts: WorkoutSummary[]): AllTimeStats {
  return workouts.reduce(
    (stats, workout) => ({
      totalWorkouts: stats.totalWorkouts + 1,
      totalReps: stats.totalReps + workout.totalReps,
      totalTimeSeconds: stats.totalTimeSeconds + workout.duration,
      decksCompleted:
        stats.decksCompleted + (workout.status === 'completed' ? 1 : 0),
    }),
    {
      totalWorkouts: 0,
      totalReps: 0,
      totalTimeSeconds: 0,
      decksCompleted: 0,
    }
  );
}

/**
 * Get all-time stats from history
 */
export function getAllTimeStats(history: WorkoutHistory): AllTimeStats {
  return history.stats;
}

/**
 * Get recent workouts with pagination
 */
export function getRecentWorkouts(
  history: WorkoutHistory,
  limit: number
): WorkoutSummary[] {
  // Workouts are already sorted newest first
  return history.workouts.slice(0, limit);
}

/**
 * Load more workouts (pagination)
 */
export function loadMoreWorkouts(
  history: WorkoutHistory,
  limit: number,
  offset: number
): WorkoutSummary[] {
  return history.workouts.slice(offset, offset + limit);
}

/**
 * Clear all history data
 */
export function clearHistory(_history: WorkoutHistory): WorkoutHistory {
  return createHistory();
}

// === PERSISTENCE ===

const HISTORY_STORAGE_KEY = 'cards-of-carnage-history';

/**
 * Save history to localStorage
 */
export function saveHistory(history: WorkoutHistory): void {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
}

/**
 * Load history from localStorage
 */
export function loadHistory(): WorkoutHistory {
  try {
    const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure dates are Date objects
      parsed.workouts = parsed.workouts.map((w: WorkoutSummary) => ({
        ...w,
        date: new Date(w.date),
      }));
      return parsed;
    }
  } catch (error) {
    console.error('Failed to load history:', error);
  }
  return createHistory();
}
