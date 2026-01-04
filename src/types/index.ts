// === CARD TYPES ===

export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';
export type CardValue = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  id: string;
  suit: Suit;
  value: CardValue;
  exercise: Exercise;
  reps: number;
}

export interface JokerCard {
  id: string;
  type: 'joker';
  exercise: Exercise;
  reps: number;
}

export type PlayableCard = Card | JokerCard;

// === EXERCISE TYPES ===

export interface Exercise {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  muscles: string[];
}

// === DECK TYPES ===

export type DeckType = 'upper-body' | 'lower-body' | 'core-cardio' | 'full-body';

export interface DeckDefinition {
  id: DeckType;
  name: string;
  icon: string;
  exercises: Exercise[];
  wildcardExercises: Exercise[];
}

export interface ShuffledDeck {
  deckType: DeckType;
  cards: PlayableCard[];
  totalCards: number;
  estimatedReps: number;
}

// === WORKOUT TYPES ===

export type WorkoutStatus = 'in-progress' | 'completed' | 'partial';

export interface WorkoutState {
  id: string;
  deckType: DeckType;
  deck: PlayableCard[];
  currentCardIndex: number;
  completedCards: PlayableCard[];
  totalReps: number;
  repsByExercise: Record<string, number>;
  startTime: Date;
  endTime?: Date;
  status: WorkoutStatus;
}

export interface WorkoutSummary {
  id: string;
  deckType: DeckType;
  deckName: string;
  status: WorkoutStatus;
  cardsCompleted: number;
  totalCards: number;
  totalReps: number;
  repsByExercise: Record<string, number>;
  duration: number; // in seconds
  date: Date;
}

// === HISTORY TYPES ===

export interface AllTimeStats {
  totalWorkouts: number;
  totalReps: number;
  totalTimeSeconds: number;
  decksCompleted: number;
}

export interface WorkoutHistory {
  workouts: WorkoutSummary[];
  stats: AllTimeStats;
}

// === SETTINGS TYPES ===

export interface Settings {
  includeJokers: boolean;
  faceCardValue: number; // default: 10
  aceValue: number; // default: 11
  soundEffects: boolean;
  vibration: boolean;
  theme: 'dark' | 'light';
}

export const DEFAULT_SETTINGS: Settings = {
  includeJokers: true,
  faceCardValue: 10,
  aceValue: 11,
  soundEffects: true,
  vibration: true,
  theme: 'dark',
};
