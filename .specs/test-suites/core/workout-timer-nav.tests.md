# Test Suite: Workout Timer and Navigation

> Documentation for tests covering the workout screen timer and exit navigation UI.

## Status: 🧪 Tests Written (Failing)

Tests are written and ready. Implementation pending.

---

## Test Files

| Test File | Coverage Area | Test Count |
|-----------|---------------|------------|
| `src/lib/time/__tests__/time.test.ts` | Time formatting utility | 6 |
| `src/screens/__tests__/WorkoutScreen.test.tsx` | Timer display, exit navigation UI | 12 |

**Total: 18 tests**

---

## Test Prefixes

| Prefix | Meaning |
|--------|---------|
| TMR- | Time formatting utility tests |
| UI-TMR- | Timer UI component tests |
| UI-NAV- | Exit navigation UI tests |

---

## Test Cases by Category

### Time Formatting (TMR-)

| ID | Test | Status | File |
|----|------|--------|------|
| TMR-001 | Display "00:00" at start | 🧪 | time.test.ts |
| TMR-002 | Display seconds correctly | 🧪 | time.test.ts |
| TMR-003 | Display minutes and seconds correctly | 🧪 | time.test.ts |
| TMR-004 | Display hours for long workouts | 🧪 | time.test.ts |
| TMR-005 | Handle edge cases (59:59 → 1:00:00) | 🧪 | time.test.ts |
| TMR-006 | Round down partial seconds | 🧪 | time.test.ts |

### Timer UI (UI-TMR-)

| ID | Test | Status | File |
|----|------|--------|------|
| UI-TMR-001 | Timer displayed prominently in header | 🧪 | WorkoutScreen.test.tsx |
| UI-TMR-002 | Timer counts up in real-time | 🧪 | WorkoutScreen.test.tsx |
| UI-TMR-003 | Timer continues during card transitions | 🧪 | WorkoutScreen.test.tsx |
| UI-TMR-004 | Timer uses monospace font class | 🧪 | WorkoutScreen.test.tsx |
| UI-TMR-005 | Timer expands format for hour-long workouts | 🧪 | WorkoutScreen.test.tsx |

### Exit Navigation UI (UI-NAV-)

| ID | Test | Status | File |
|----|------|--------|------|
| UI-NAV-001 | Exit button is icon only (no "End" text) | 🧪 | WorkoutScreen.test.tsx |
| UI-NAV-002 | Exit button has minimum touch target | 🧪 | WorkoutScreen.test.tsx |
| UI-NAV-003 | Exit button opens pause modal | 🧪 | WorkoutScreen.test.tsx |
| UI-NAV-004 | Exit button has accessible label | 🧪 | WorkoutScreen.test.tsx |
| UI-NAV-005 | Resume closes modal and continues | 🧪 | WorkoutScreen.test.tsx |
| UI-NAV-006 | End Workout calls handler | 🧪 | WorkoutScreen.test.tsx |
| UI-NAV-007 | Deck name displayed below header | 🧪 | WorkoutScreen.test.tsx |

---

## Feature Spec Reference

These tests implement scenarios from:
- `.specs/features/core/workout-timer-nav.feature.md`

---

## Running Tests

```bash
# Run timer tests only
npm test time.test.ts

# Run WorkoutScreen tests only
npm test WorkoutScreen.test.tsx

# Run all timer-related tests
npm test -- -t "Timer"

# Run all navigation tests
npm test -- -t "NAV"
```

---

## Design System Compliance

Tests verify adherence to design tokens from `.specs/design/design-system.md`:

| Element | Token | Test |
|---------|-------|------|
| Timer font | `--font-family-mono` | UI-TMR-004 |
| Timer size | `--text-title-lg` | Verified via CSS |
| Exit button size | 44×44px min | UI-NAV-002 |
| Exit button color | `--color-text-secondary` | Verified via CSS |

---

## Notes

- All tests are currently **failing** (TDD - no implementation yet)
- Timer tests use `vi.useFakeTimers()` for time control
- Component tests use React Testing Library
- Accessibility verified via aria-label attributes

---

*Created: 2026-01-09*
