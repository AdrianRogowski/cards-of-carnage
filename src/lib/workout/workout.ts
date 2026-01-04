import type {
  WorkoutState,
  WorkoutSummary,
  PlayableCard,
  DeckType,
  Settings,
} from '@/types';
import { createDeck, DECKS } from '@/lib/deck';

/**
 * Create a new workout with a shuffled deck
 */
export function createWorkout(deckType: DeckType, settings: Settings): WorkoutState {
  const deck = createDeck(deckType, settings);
  
  return {
    id: `workout-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    deckType,
    deck: deck.cards,
    currentCardIndex: 0,
    completedCards: [],
    totalReps: 0,
    repsByExercise: {},
    startTime: new Date(),
    status: 'in-progress',
  };
}

/**
 * Get the current card to be performed
 * Returns null if deck is exhausted
 */
export function getCurrentCard(workout: WorkoutState): PlayableCard | null {
  if (workout.currentCardIndex >= workout.deck.length) {
    return null;
  }
  return workout.deck[workout.currentCardIndex];
}

/**
 * Complete the current card and advance to the next
 */
export function completeCard(workout: WorkoutState): WorkoutState {
  const currentCard = getCurrentCard(workout);
  
  if (!currentCard) {
    return workout;
  }
  
  const exerciseName = currentCard.exercise.name;
  const newRepsByExercise = {
    ...workout.repsByExercise,
    [exerciseName]: (workout.repsByExercise[exerciseName] || 0) + currentCard.reps,
  };
  
  const newCompletedCards = [...workout.completedCards, currentCard];
  const newCurrentIndex = workout.currentCardIndex + 1;
  const isComplete = newCurrentIndex >= workout.deck.length;
  
  return {
    ...workout,
    currentCardIndex: newCurrentIndex,
    completedCards: newCompletedCards,
    totalReps: workout.totalReps + currentCard.reps,
    repsByExercise: newRepsByExercise,
    status: isComplete ? 'completed' : 'in-progress',
    endTime: isComplete ? new Date() : undefined,
  };
}

/**
 * Get workout progress information
 */
export function getProgress(workout: WorkoutState): {
  current: number;
  total: number;
  percentage: number;
} {
  const current = workout.currentCardIndex + 1; // 1-indexed for display
  const total = workout.deck.length;
  const percentage = (current / total) * 100;
  
  return { current, total, percentage };
}

/**
 * Check if workout is complete
 */
export function isWorkoutComplete(workout: WorkoutState): boolean {
  return workout.status === 'completed' || 
         workout.currentCardIndex >= workout.deck.length;
}

/**
 * Pause the workout (maintains state for UI purposes)
 * In a real app, this might trigger a save to persistence
 */
export function pauseWorkout(workout: WorkoutState): WorkoutState {
  // The workout state is already maintained, this is just a semantic function
  // Could be used to trigger side effects like saving to localStorage
  return workout;
}

/**
 * Resume a paused workout
 */
export function resumeWorkout(workout: WorkoutState): WorkoutState {
  // The workout state is already maintained
  return workout;
}

/**
 * End workout early and mark as partial
 */
export function endWorkoutEarly(workout: WorkoutState): WorkoutState {
  return {
    ...workout,
    status: 'partial',
    endTime: new Date(),
  };
}

/**
 * Generate a workout summary for history/display
 */
export function getWorkoutSummary(workout: WorkoutState): WorkoutSummary {
  const deckDefinition = DECKS[workout.deckType];
  const endTime = workout.endTime || new Date();
  const duration = Math.floor(
    (endTime.getTime() - workout.startTime.getTime()) / 1000
  );
  
  return {
    id: workout.id,
    deckType: workout.deckType,
    deckName: deckDefinition.name,
    status: workout.status,
    cardsCompleted: workout.completedCards.length,
    totalCards: workout.deck.length,
    totalReps: workout.totalReps,
    repsByExercise: workout.repsByExercise,
    duration,
    date: workout.startTime,
  };
}
