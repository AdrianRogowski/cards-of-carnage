# Feature: Workout Screen Timer and Navigation

> Enhance the workout screen with a clear, prominent elapsed timer and clean, minimal exit navigation.

## Overview

During an active workout, users need to quickly see how long they've been exercising. The current UI lacks a visible timer and the exit navigation is cluttered. This feature adds a prominent elapsed timer and simplifies the exit button for a cleaner, more focused workout experience.

## User Stories

### As a user during a workout
- I want to see how long I've been exercising
- So that I can pace myself and track my workout duration

### As a user who needs to exit
- I want a clean, obvious but unobtrusive exit button
- So that I can pause/end my workout without visual clutter

---

## Mockups

### Current State (Before)
```
┌─────────────────────────────────────────────────────┐
│  [✕ End]          UPPER BODY            12/52 🃏   │
├─────────────────────────────────────────────────────┤
│                                                     │
│           ┌─────────────────────────┐               │
│           │                         │               │
│           │       [CARD]            │               │
│           │                         │               │
│           └─────────────────────────┘               │
│                                                     │
│                  8 REPS                             │
│                                                     │
│   [?] How to do Push-ups                            │
│                                                     │
│   Progress: ████████░░░░░░░░░░░░░░░░ 23%            │
│   Reps Done: 87 / ~380                              │
│                                                     │
├─────────────────────────────────────────────────────┤
│              [ ✓ DONE - NEXT CARD ]                 │
└─────────────────────────────────────────────────────┘
```

### Proposed State (After)
```
┌─────────────────────────────────────────────────────┐
│  [×]              12:34               12/52 🃏      │
│                  ▲ elapsed time                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│                 UPPER BODY                          │
│                                                     │
│           ┌─────────────────────────┐               │
│           │                         │               │
│           │       [CARD]            │               │
│           │                         │               │
│           └─────────────────────────┘               │
│                                                     │
│                  8 REPS                             │
│                                                     │
│   [?] How to do Push-ups                            │
│                                                     │
│   Progress: ████████░░░░░░░░░░░░░░░░ 23%            │
│   Reps Done: 87 / ~380                              │
│                                                     │
├─────────────────────────────────────────────────────┤
│              [ ✓ DONE - NEXT CARD ]                 │
└─────────────────────────────────────────────────────┘
```

### Detailed Header Layout
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   ┌───┐                                    ┌──────┐ │
│   │ × │         12:34                      │12/52 │ │
│   └───┘         ▲ timer                    │ 🃏   │ │
│                 (hero text)                └──────┘ │
│        --color-text-tertiary              secondary │
│        ghost button                        info     │
│        44×44px touch target                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Timer States

#### Fresh Start
```
     00:00
     ↑ tertiary color, starts counting
```

#### Active Workout
```
     12:34
     ↑ primary color, prominent display
```

#### Long Workout (1+ hour)
```
    1:05:23
    ↑ format expands gracefully
```

### Exit Button Design
```
┌─────┐
│  ×  │   ← Single character, no text
│     │   ← Ghost button style (no background)
└─────┘   ← 44×44px minimum touch target
          ← Color: --color-text-secondary
          ← Hover: --color-text-primary + --color-bg-surface
```

---

## Scenarios

```gherkin
Feature: Workout Timer
  As a user performing a workout
  I want to see an elapsed timer
  So that I can track my workout duration

  Background:
    Given I have started a workout

  Scenario: Timer starts at zero
    When the workout begins
    Then I should see the timer displaying "00:00"
    And the timer should be prominently displayed in the header

  Scenario: Timer counts up
    Given I have been working out for 30 seconds
    Then the timer should display "00:30"

  Scenario: Timer shows minutes correctly
    Given I have been working out for 2 minutes and 15 seconds
    Then the timer should display "02:15"

  Scenario: Timer handles hour-long workouts
    Given I have been working out for 1 hour, 5 minutes, and 23 seconds
    Then the timer should display "1:05:23"

  Scenario: Timer continues during card transitions
    Given the timer shows "05:30"
    When I complete a card and draw the next
    Then the timer should continue counting from "05:30"
    And the timer should not reset

  Scenario: Timer pauses when workout is paused
    Given the timer shows "10:00"
    When I tap the exit button
    And the pause modal appears
    Then the timer should pause
    When I tap "Resume"
    Then the timer should continue from "10:00"

  Scenario: Final time is recorded
    Given I complete all cards
    When I see the workout complete screen
    Then the displayed time should match the elapsed timer

Feature: Clean Exit Navigation
  As a user
  I want a minimal exit button
  So that the workout screen is not cluttered

  Scenario: Exit button is icon-only
    When I am on the workout screen
    Then I should see an "×" button in the top-left
    And the button should NOT contain the word "End"
    And the button should have a 44×44px touch target

  Scenario: Exit button shows pause modal
    When I tap the "×" button
    Then I should see the pause modal
    And I should see "Resume" and "End Workout" options

  Scenario: Exit button is accessible
    When I focus on the exit button via keyboard
    Then it should have a visible focus ring
    And it should have appropriate aria-label for screen readers
```

---

## Design Specifications

### Timer Display

| Property | Value |
|----------|-------|
| Font size | `--text-title-lg` (28px) |
| Font weight | `--font-weight-semibold` (600) |
| Color | `--color-text-primary` |
| Font family | `--font-family-mono` (for tabular figures) |
| Letter spacing | 0 (monospace is already spaced) |

### Exit Button

| Property | Value |
|----------|-------|
| Size | 44×44px minimum |
| Background | transparent (ghost) |
| Border | none |
| Icon color | `--color-text-secondary` |
| Hover background | `--color-bg-surface` |
| Hover icon color | `--color-text-primary` |
| Border radius | `--radius-sm` (6px) |
| Transition | `var(--duration-fast) var(--ease-out)` |
| Focus ring | `2px solid var(--color-accent-primary)` |
| Aria label | "End workout" |

### Header Layout Changes

| Element | Position | Notes |
|---------|----------|-------|
| Exit button (×) | Left | Icon-only, ghost style |
| Timer | Center | Prominent, monospace font |
| Card count | Right | Existing style |

### Deck Name

Since the timer takes the header center position, the deck name moves below the header:

| Property | Value |
|----------|-------|
| Font size | `--text-caption` (14px) |
| Font weight | `--font-weight-medium` (500) |
| Color | `--color-text-tertiary` |
| Letter spacing | 1px |
| Text transform | uppercase |
| Margin bottom | `--space-3` |

---

## Implementation Notes

### Timer Logic

```typescript
// Use startTime from WorkoutState to calculate elapsed time
const elapsed = Date.now() - workout.startTime;

// Format as MM:SS or H:MM:SS for 1+ hour
function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}
```

### Timer Updates

- Use `useEffect` with `setInterval` at 1000ms intervals
- Clear interval on unmount
- Pause interval when modal is open (optional optimization)

### Accessibility

- Exit button must have `aria-label="End workout"`
- Timer should be in a `<time>` element with `aria-live="polite"` or similar
- Consider `aria-atomic="false"` to prevent announcing every second

---

## Out of Scope

- Countdown timers (rest between exercises)
- Target time goals
- Split times per card
- Pause/resume timer with dedicated button (uses modal)
