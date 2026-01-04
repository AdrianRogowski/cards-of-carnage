import type {
  Card,
  JokerCard,
  PlayableCard,
  ShuffledDeck,
  DeckType,
  Suit,
  CardValue,
  Settings,
  Exercise,
} from '@/types';
import { DECKS } from './deck-definitions';

// All possible suits
const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];

// All possible card values
const CARD_VALUES: CardValue[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

/**
 * Calculate the number of reps for a given card value based on settings
 */
export function calculateReps(value: CardValue, settings: Settings): number {
  if (typeof value === 'number') {
    return value;
  }
  
  if (value === 'J' || value === 'Q' || value === 'K') {
    return settings.faceCardValue;
  }
  
  if (value === 'A') {
    return settings.aceValue;
  }
  
  return 10; // Fallback
}

/**
 * Fisher-Yates shuffle algorithm
 * Returns a new shuffled array without modifying the original
 */
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Distribute exercises across cards as evenly as possible
 * For decks with more exercises than suits, exercises rotate through card values
 */
function assignExerciseToCard(
  suit: Suit,
  value: CardValue,
  exercises: Exercise[],
  cardIndex: number
): Exercise {
  // Use card index to cycle through exercises evenly
  const exerciseIndex = cardIndex % exercises.length;
  return exercises[exerciseIndex];
}

/**
 * Create a standard 52-card deck (plus optional jokers)
 */
export function createDeck(deckType: DeckType, settings: Settings): ShuffledDeck {
  const deckDefinition = DECKS[deckType];
  const cards: PlayableCard[] = [];
  let cardIndex = 0;
  
  // Create 52 standard cards
  for (const suit of SUITS) {
    for (const value of CARD_VALUES) {
      const exercise = assignExerciseToCard(
        suit,
        value,
        deckDefinition.exercises,
        cardIndex
      );
      const reps = calculateReps(value, settings);
      
      const card: Card = {
        id: `${suit}-${value}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        suit,
        value,
        exercise,
        reps,
      };
      
      cards.push(card);
      cardIndex++;
    }
  }
  
  // Add jokers if enabled
  if (settings.includeJokers) {
    const wildcardExercises = deckDefinition.wildcardExercises;
    
    // First joker - burpees
    const joker1: JokerCard = {
      id: `joker-1-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type: 'joker',
      exercise: wildcardExercises[0], // Burpees
      reps: 10,
    };
    
    // Second joker - wall sit or another wildcard
    const joker2: JokerCard = {
      id: `joker-2-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type: 'joker',
      exercise: wildcardExercises[1] || wildcardExercises[0],
      reps: 10,
    };
    
    cards.push(joker1, joker2);
  }
  
  // Shuffle the deck
  const shuffledCards = shuffle(cards);
  
  // Calculate estimated total reps
  const estimatedReps = calculateEstimatedReps(shuffledCards);
  
  return {
    deckType,
    cards: shuffledCards,
    totalCards: shuffledCards.length,
    estimatedReps,
  };
}

/**
 * Calculate the estimated total reps for a deck
 */
function calculateEstimatedReps(cards: PlayableCard[]): number {
  return cards.reduce((total, card) => total + card.reps, 0);
}

/**
 * Shuffle an existing deck (for re-shuffling)
 */
export function shuffleDeck(deck: ShuffledDeck): ShuffledDeck {
  return {
    ...deck,
    cards: shuffle(deck.cards),
  };
}

export { DECKS };
