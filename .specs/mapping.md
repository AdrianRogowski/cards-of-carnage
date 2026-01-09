# Specs ↔ Tests ↔ Components Mapping

## Overview

This document maps feature specifications to their corresponding tests and implementation components.

## Design System

| Resource | Path | Purpose |
|----------|------|---------|
| Design System | `design/design-system.md` | Full design bible — colors, typography, spacing, motion |
| Design Rule | `.cursor/rules/design-system.mdc` | Always-applied quick reference |
| Design Review | `.cursor/commands/design-review.md` | Audit UI against tokens |

---

## Feature: Cards of Carnage App

### Spec → Test → Component Mapping

| Feature Area | Spec File | Test File | Component(s) |
|--------------|-----------|-----------|--------------|
| Deck Selection | `features/core/cards-of-carnage.feature.md` | - | TBD |
| Deck Generation | `features/core/cards-of-carnage.feature.md` | `src/lib/deck/__tests__/deck.test.ts` | `src/lib/deck/` |
| Workout Flow | `features/core/cards-of-carnage.feature.md` | `src/lib/workout/__tests__/workout.test.ts` | `src/lib/workout/` |
| Pause/Resume | `features/core/cards-of-carnage.feature.md` | `src/lib/workout/__tests__/workout.test.ts` | `src/lib/workout/` |
| History | `features/core/cards-of-carnage.feature.md` | `src/lib/history/__tests__/history.test.ts` | `src/lib/history/` |
| Settings | `features/core/cards-of-carnage.feature.md` | `src/lib/settings/__tests__/settings.test.ts` | `src/lib/settings/` |
| Card Logic | `features/core/cards-of-carnage.feature.md` | `src/lib/deck/__tests__/deck.test.ts` | `src/lib/deck/` |
| Workout Timer | `features/core/workout-timer-nav.feature.md` | `src/lib/time/__tests__/time.test.ts`, `src/screens/__tests__/WorkoutScreen.test.tsx` | `src/lib/time/`, `src/screens/WorkoutScreen.tsx` |
| Exit Navigation | `features/core/workout-timer-nav.feature.md` | `src/screens/__tests__/WorkoutScreen.test.tsx` | `src/screens/WorkoutScreen.tsx` |

---

## Test Coverage Summary

| Test File | Tests | Status |
|-----------|-------|--------|
| `deck.test.ts` | 14 | 🧪 Written |
| `workout.test.ts` | 15 | 🧪 Written |
| `history.test.ts` | 12 | 🧪 Written |
| `settings.test.ts` | 14 | 🧪 Written |
| `time.test.ts` | 6 | 🧪 Written |
| `WorkoutScreen.test.tsx` | 12 | 🧪 Written |
| **Total** | **73** | **Failing (TDD)** |

---

## Test Prefixes

| Prefix | Domain |
|--------|--------|
| DECK | Deck/Card logic |
| WRK | Workout flow |
| HIST | History & stats |
| SET | Settings |
| TMR | Time formatting utility |
| UI-TMR | Timer UI component |
| UI-NAV | Navigation UI component |
| UI | UI components (general) |

---

## Status Legend

- ✅ Implemented & Tested
- 🧪 Tests Written (Failing)
- 📝 Spec Only
- ⚠️ Needs Update

---

## Current Status

| Feature | Spec | Tests | Implementation |
|---------|------|-------|----------------|
| Deck Selection | 📝 | - | - |
| Deck Generation | 📝 | 🧪 DECK-001 to DECK-007 | - |
| Workout Flow | 📝 | 🧪 WRK-001 to WRK-012 | - |
| Pause/Resume | 📝 | 🧪 WRK-009 to WRK-011 | - |
| Workout History | 📝 | 🧪 HIST-001 to HIST-006 | - |
| Settings | 📝 | 🧪 SET-001 to SET-006 | - |
| Card Distribution | 📝 | 🧪 (in DECK tests) | - |
| Workout Timer | 📝 | 🧪 TMR-001 to TMR-006, UI-TMR-001 to UI-TMR-005 | - |
| Exit Navigation | 📝 | 🧪 UI-NAV-001 to UI-NAV-007 | - |

---

## Project Structure

```
cards-of-carnage/
├── .specs/
│   ├── features/core/
│   │   └── cards-of-carnage.feature.md    # Feature spec
│   ├── test-suites/core/
│   │   └── cards-of-carnage.tests.md      # Test documentation
│   ├── design/
│   │   └── design-system.md               # Design tokens
│   └── mapping.md                         # This file
├── src/
│   ├── lib/
│   │   ├── deck/
│   │   │   ├── __tests__/deck.test.ts     # 14 tests
│   │   │   ├── deck.ts                    # TBD
│   │   │   └── deck-definitions.ts        # TBD
│   │   ├── workout/
│   │   │   ├── __tests__/workout.test.ts  # 15 tests
│   │   │   └── workout.ts                 # TBD
│   │   ├── history/
│   │   │   ├── __tests__/history.test.ts  # 12 tests
│   │   │   └── history.ts                 # TBD
│   │   └── settings/
│   │       ├── __tests__/settings.test.ts # 14 tests
│   │       └── settings.ts                # TBD
│   ├── types/
│   │   └── index.ts                       # ✅ Complete
│   └── test/
│       └── setup.ts                       # ✅ Complete
├── package.json                           # ✅ Complete
├── tsconfig.json                          # ✅ Complete
└── vite.config.ts                         # ✅ Complete
```

---

## Notes

- Created: 2026-01-04
- App Name: **Cards of Carnage** 💀
- Tech stack: React + TypeScript + Vite + Vitest
- Primary spec: `.specs/features/core/cards-of-carnage.feature.md`
- 55 tests written, all failing (TDD phase)
- Next step: Implement `src/lib/` modules to make tests pass
