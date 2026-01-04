# Test Suite: Cards of Carnage

> Documentation for tests covering the Cards of Carnage app functionality.

## Status: 🧪 Tests Written (Failing)

Tests are written and ready. Implementation pending.

---

## Test Files

| Test File | Coverage Area | Test Count |
|-----------|---------------|------------|
| `src/lib/deck/__tests__/deck.test.ts` | Deck generation, shuffle, rep calculation | 14 |
| `src/lib/workout/__tests__/workout.test.ts` | Workout flow, pause/resume, completion | 15 |
| `src/lib/history/__tests__/history.test.ts` | History storage, stats, pagination | 12 |
| `src/lib/settings/__tests__/settings.test.ts` | Settings persistence, validation | 14 |

**Total: 55 tests**

---

## Test Prefixes

| Prefix | Meaning |
|--------|---------|
| DECK- | Deck/card logic tests |
| WRK- | Workout flow tests |
| HIST- | History & stats tests |
| SET- | Settings tests |

---

## Test Cases by Category

### Deck Logic (DECK-)

| ID | Test | Status | File |
|----|------|--------|------|
| DECK-001 | Generate 52-card deck with correct distribution | 🧪 | deck.test.ts |
| DECK-002 | Generate 54-card deck when jokers enabled | 🧪 | deck.test.ts |
| DECK-003 | Shuffle produces different order each time | 🧪 | deck.test.ts |
| DECK-004 | Exercise mapping covers all suits | 🧪 | deck.test.ts |
| DECK-005 | Face cards have configurable rep count | 🧪 | deck.test.ts |
| DECK-006 | Ace has configurable rep count | 🧪 | deck.test.ts |
| DECK-007 | Cards 2-10 have face value reps | 🧪 | deck.test.ts |

**Additional deck tests:**
- Rep calculation for number cards
- Rep calculation for face cards
- Rep calculation for aces
- Deck definitions (Upper Body, Lower Body, Core & Cardio, Full Body)
- Wildcard exercises for jokers
- Estimated reps calculation
- Exercise distribution evenness

### Workout Flow (WRK-)

| ID | Test | Status | File |
|----|------|--------|------|
| WRK-001 | Start workout initializes with shuffled deck | 🧪 | workout.test.ts |
| WRK-002 | Draw card shows correct exercise and reps | 🧪 | workout.test.ts |
| WRK-003 | Complete card advances to next | 🧪 | workout.test.ts |
| WRK-004 | Progress counter updates correctly | 🧪 | workout.test.ts |
| WRK-005 | Rep counter accumulates correctly | 🧪 | workout.test.ts |
| WRK-006 | Completing all cards shows summary | 🧪 | workout.test.ts |
| WRK-007 | Joker cards display wildcard styling | 🧪 | workout.test.ts |
| WRK-008 | Exercise instructions modal opens/closes | 🧪 | workout.test.ts |
| WRK-009 | Pause button shows confirmation modal | 🧪 | workout.test.ts |
| WRK-010 | Resume returns to current card | 🧪 | workout.test.ts |
| WRK-011 | End early saves partial workout | 🧪 | workout.test.ts |
| WRK-012 | In-progress workout persists on app refresh | 🧪 | workout.test.ts |

**Additional workout tests:**
- Create workout with jokers
- Return null when deck exhausted
- Workout summary generation
- Duration calculation

### History (HIST-)

| ID | Test | Status | File |
|----|------|--------|------|
| HIST-001 | Completed workout saved to history | 🧪 | history.test.ts |
| HIST-002 | Partial workout saved with status | 🧪 | history.test.ts |
| HIST-003 | All-time stats calculate correctly | 🧪 | history.test.ts |
| HIST-004 | History loads in reverse chronological order | 🧪 | history.test.ts |
| HIST-005 | Empty history shows placeholder | 🧪 | history.test.ts |
| HIST-006 | Load more pagination works | 🧪 | history.test.ts |

**Additional history tests:**
- History serialization for localStorage
- Clear history data
- Track reps by exercise across workouts
- Status indicators (complete vs partial)

### Settings (SET-)

| ID | Test | Status | File |
|----|------|--------|------|
| SET-001 | Joker toggle persists | 🧪 | settings.test.ts |
| SET-002 | Face card value persists | 🧪 | settings.test.ts |
| SET-003 | Ace value persists | 🧪 | settings.test.ts |
| SET-004 | Sound toggle works | 🧪 | settings.test.ts |
| SET-005 | Theme toggle works | 🧪 | settings.test.ts |
| SET-006 | Reset settings to defaults | 🧪 | settings.test.ts |

**Additional settings tests:**
- Load settings from localStorage
- Return defaults when no saved settings
- Handle corrupted localStorage data
- Merge partial saved settings with defaults
- Validate face card value is positive
- Validate ace value is positive
- Valid theme values only
- Vibration toggle

---

## Running Tests

```bash
# Run all tests
npm test

# Run tests once (CI mode)
npm run test:run

# Run with coverage
npm run test:coverage

# Run specific test file
npm test deck.test.ts

# Run tests matching pattern
npm test -- -t "DECK-001"
```

---

## Test Structure

```
src/
├── lib/
│   ├── deck/
│   │   └── __tests__/
│   │       └── deck.test.ts        # Deck generation tests
│   ├── workout/
│   │   └── __tests__/
│   │       └── workout.test.ts     # Workout flow tests
│   ├── history/
│   │   └── __tests__/
│   │       └── history.test.ts     # History/stats tests
│   └── settings/
│       └── __tests__/
│           └── settings.test.ts    # Settings tests
├── types/
│   └── index.ts                    # Type definitions
└── test/
    └── setup.ts                    # Test setup
```

---

## Coverage Goals

| Category | Target | Current |
|----------|--------|---------|
| Deck Logic | 100% | - |
| Workout Flow | 100% | - |
| History | 100% | - |
| Settings | 100% | - |
| UI Components | 80% | - |

---

## Notes

- All tests are currently **failing** (TDD - no implementation yet)
- Tests use Vitest with React Testing Library
- Mock localStorage for settings/history persistence tests
- Mock timers for duration calculation tests
- Types defined in `src/types/index.ts`

---

*Last updated: 2026-01-04*
