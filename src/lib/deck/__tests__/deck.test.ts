import { describe, it, expect } from 'vitest';
import { createDeck, shuffleDeck, calculateReps } from '../deck';
import { DECKS } from '../deck-definitions';
import type { Settings, Card, JokerCard, PlayableCard } from '@/types';

const defaultSettings: Settings = {
  includeJokers: false,
  faceCardValue: 10,
  aceValue: 11,
  soundEffects: true,
  vibration: true,
  theme: 'dark',
};

describe('Deck Generation', () => {
  /**
   * DECK-001: Generate 52-card deck with correct distribution
   * Covers: Standard 52-card deck distribution scenario
   */
  it('DECK-001: should generate a 52-card deck without jokers', () => {
    const deck = createDeck('upper-body', { ...defaultSettings, includeJokers: false });
    
    expect(deck.cards).toHaveLength(52);
    expect(deck.totalCards).toBe(52);
    
    // Verify no jokers
    const jokers = deck.cards.filter((card): card is JokerCard => 'type' in card && card.type === 'joker');
    expect(jokers).toHaveLength(0);
  });

  /**
   * DECK-002: Generate 54-card deck when jokers enabled
   * Covers: Toggle jokers on scenario
   */
  it('DECK-002: should generate a 54-card deck with jokers enabled', () => {
    const deck = createDeck('upper-body', { ...defaultSettings, includeJokers: true });
    
    expect(deck.cards).toHaveLength(54);
    expect(deck.totalCards).toBe(54);
    
    // Verify exactly 2 jokers
    const jokers = deck.cards.filter((card): card is JokerCard => 'type' in card && card.type === 'joker');
    expect(jokers).toHaveLength(2);
  });

  /**
   * DECK-003: Shuffle produces different order each time
   * Covers: Deck shuffle is random scenario
   */
  it('DECK-003: should shuffle deck to produce different order', () => {
    const deck1 = createDeck('upper-body', defaultSettings);
    const deck2 = createDeck('upper-body', defaultSettings);
    
    // Get the first 10 card IDs from each deck
    const first10Deck1 = deck1.cards.slice(0, 10).map(c => c.id);
    const first10Deck2 = deck2.cards.slice(0, 10).map(c => c.id);
    
    // They should not be identical (statistically near-impossible)
    // Note: There's a 1 in 52! chance they're the same, which is negligible
    expect(first10Deck1).not.toEqual(first10Deck2);
  });

  /**
   * DECK-004: Exercise mapping covers all suits
   * Covers: Each suit should map to exercises
   */
  it('DECK-004: should map exercises across all four suits', () => {
    const deck = createDeck('upper-body', defaultSettings);
    
    const regularCards = deck.cards.filter((card): card is Card => !('type' in card));
    
    // Group cards by suit
    const cardsBySuit = {
      spades: regularCards.filter(c => c.suit === 'spades'),
      hearts: regularCards.filter(c => c.suit === 'hearts'),
      diamonds: regularCards.filter(c => c.suit === 'diamonds'),
      clubs: regularCards.filter(c => c.suit === 'clubs'),
    };
    
    // Each suit should have 13 cards
    expect(cardsBySuit.spades).toHaveLength(13);
    expect(cardsBySuit.hearts).toHaveLength(13);
    expect(cardsBySuit.diamonds).toHaveLength(13);
    expect(cardsBySuit.clubs).toHaveLength(13);
    
    // Each card should have an exercise assigned
    regularCards.forEach(card => {
      expect(card.exercise).toBeDefined();
      expect(card.exercise.name).toBeTruthy();
    });
  });

  /**
   * DECK-005: Face cards have configurable rep count
   * Covers: Change face card value scenario
   */
  it('DECK-005: should use configured face card value for J, Q, K', () => {
    const customSettings: Settings = {
      ...defaultSettings,
      faceCardValue: 12,
    };
    
    const deck = createDeck('upper-body', customSettings);
    const regularCards = deck.cards.filter((card): card is Card => !('type' in card));
    
    // Find all face cards (J, Q, K)
    const faceCards = regularCards.filter(card => 
      card.value === 'J' || card.value === 'Q' || card.value === 'K'
    );
    
    // There should be 12 face cards (3 per suit × 4 suits)
    expect(faceCards).toHaveLength(12);
    
    // All face cards should have the configured rep count
    faceCards.forEach(card => {
      expect(card.reps).toBe(12);
    });
  });

  /**
   * DECK-006: Ace has configurable rep count
   * Covers: Change ace value scenario
   */
  it('DECK-006: should use configured ace value', () => {
    const customSettings: Settings = {
      ...defaultSettings,
      aceValue: 14,
    };
    
    const deck = createDeck('upper-body', customSettings);
    const regularCards = deck.cards.filter((card): card is Card => !('type' in card));
    
    // Find all aces
    const aces = regularCards.filter(card => card.value === 'A');
    
    // There should be 4 aces (one per suit)
    expect(aces).toHaveLength(4);
    
    // All aces should have the configured rep count
    aces.forEach(card => {
      expect(card.reps).toBe(14);
    });
  });

  /**
   * DECK-007: Cards 2-10 have face value reps
   * Covers: Standard 52-card deck distribution scenario
   */
  it('DECK-007: should use face value for numbered cards 2-10', () => {
    const deck = createDeck('upper-body', defaultSettings);
    const regularCards = deck.cards.filter((card): card is Card => !('type' in card));
    
    // Check each numbered card
    const numberedCards = regularCards.filter(card => 
      typeof card.value === 'number'
    );
    
    // There should be 36 numbered cards (9 values × 4 suits)
    expect(numberedCards).toHaveLength(36);
    
    // Each numbered card should have reps equal to its value
    numberedCards.forEach(card => {
      expect(card.reps).toBe(card.value);
    });
  });
});

describe('Rep Calculation', () => {
  it('should calculate reps for number cards using face value', () => {
    expect(calculateReps(5, defaultSettings)).toBe(5);
    expect(calculateReps(10, defaultSettings)).toBe(10);
    expect(calculateReps(2, defaultSettings)).toBe(2);
  });

  it('should calculate reps for face cards using faceCardValue setting', () => {
    expect(calculateReps('J', defaultSettings)).toBe(10);
    expect(calculateReps('Q', defaultSettings)).toBe(10);
    expect(calculateReps('K', defaultSettings)).toBe(10);
    
    const customSettings = { ...defaultSettings, faceCardValue: 15 };
    expect(calculateReps('J', customSettings)).toBe(15);
  });

  it('should calculate reps for aces using aceValue setting', () => {
    expect(calculateReps('A', defaultSettings)).toBe(11);
    
    const customSettings = { ...defaultSettings, aceValue: 1 };
    expect(calculateReps('A', customSettings)).toBe(1);
  });
});

describe('Deck Definitions', () => {
  it('should have Upper Body deck with 7 exercises', () => {
    const upperBody = DECKS['upper-body'];
    expect(upperBody).toBeDefined();
    expect(upperBody.exercises).toHaveLength(7);
    expect(upperBody.name).toBe('Upper Body');
  });

  it('should have Lower Body deck with 7 exercises', () => {
    const lowerBody = DECKS['lower-body'];
    expect(lowerBody).toBeDefined();
    expect(lowerBody.exercises).toHaveLength(7);
    expect(lowerBody.name).toBe('Lower Body');
  });

  it('should have Core & Cardio deck with 8 exercises', () => {
    const coreCardio = DECKS['core-cardio'];
    expect(coreCardio).toBeDefined();
    expect(coreCardio.exercises).toHaveLength(8);
    expect(coreCardio.name).toBe('Core & Cardio');
  });

  it('should have Full Body deck with 14 exercises', () => {
    const fullBody = DECKS['full-body'];
    expect(fullBody).toBeDefined();
    expect(fullBody.exercises).toHaveLength(14);
    expect(fullBody.name).toBe('Full Body');
  });

  it('should have wildcard exercises for jokers', () => {
    const upperBody = DECKS['upper-body'];
    expect(upperBody.wildcardExercises.length).toBeGreaterThan(0);
    
    // Wildcard exercises should include high-intensity options
    const wildcardNames = upperBody.wildcardExercises.map(e => e.name.toLowerCase());
    expect(wildcardNames.some(name => name.includes('burpee') || name.includes('wall sit'))).toBe(true);
  });
});

describe('Estimated Reps Calculation', () => {
  it('should calculate estimated total reps for a deck', () => {
    const deck = createDeck('upper-body', defaultSettings);
    
    // Expected calculation:
    // Numbers 2-10: (2+3+4+5+6+7+8+9+10) × 4 suits = 54 × 4 = 216
    // Face cards: 10 × 12 = 120
    // Aces: 11 × 4 = 44
    // Total: 216 + 120 + 44 = 380
    expect(deck.estimatedReps).toBe(380);
  });

  it('should include joker reps in estimated total when enabled', () => {
    const deckWithoutJokers = createDeck('upper-body', { ...defaultSettings, includeJokers: false });
    const deckWithJokers = createDeck('upper-body', { ...defaultSettings, includeJokers: true });
    
    // Jokers add extra reps (e.g., 10 burpees each = 20 extra)
    expect(deckWithJokers.estimatedReps).toBeGreaterThan(deckWithoutJokers.estimatedReps);
  });
});

describe('Exercise Distribution', () => {
  it('should distribute exercises approximately evenly across cards', () => {
    const deck = createDeck('upper-body', { ...defaultSettings, includeJokers: false });
    const regularCards = deck.cards.filter((card): card is Card => !('type' in card));
    
    // Count cards per exercise
    const exerciseCounts: Record<string, number> = {};
    regularCards.forEach(card => {
      const name = card.exercise.name;
      exerciseCounts[name] = (exerciseCounts[name] || 0) + 1;
    });
    
    const counts = Object.values(exerciseCounts);
    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);
    
    // With 7 exercises and 52 cards, distribution should be 7-8 cards per exercise
    // Allow some variance but ensure it's roughly balanced
    expect(maxCount - minCount).toBeLessThanOrEqual(2);
  });
});
