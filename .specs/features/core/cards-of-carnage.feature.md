# Feature: Cards of Carnage Exercise App

> A digital version of the "Deck of Death" style fitness card game where users draw cards to perform randomized bodyweight exercises.

## Overview

The Cards of Carnage app transforms a traditional deck of cards into a dynamic workout experience. Each card reveals an exercise and rep count. Users draw cards one by one, completing exercises until the deck is exhausted.

## User Stories

### As a fitness enthusiast
- I want to select a workout deck (Upper Body, Lower Body, Core & Cardio, or Full Body)
- So that I can target specific muscle groups or get a complete workout

### As a user starting a workout
- I want to see a shuffled deck of cards
- So that each workout feels fresh and unpredictable

### As a user during a workout
- I want to draw cards one at a time
- So that I can focus on one exercise before moving to the next

### As a user completing an exercise
- I want to mark the card as done and see my progress
- So that I know how much of the workout remains

### As a user tracking fitness
- I want to see my workout history and total reps completed
- So that I can track my progress over time

---

## Mockups

### Home Screen - Deck Selection
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│            💀 CARDS OF CARNAGE 💀                   │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│   Choose Your Deck                                  │
│                                                     │
│   ┌─────────────┐  ┌─────────────┐                  │
│   │   💪        │  │   🦵        │                  │
│   │             │  │             │                  │
│   │ UPPER BODY  │  │ LOWER BODY  │                  │
│   │             │  │             │                  │
│   │  7 exercises│  │  7 exercises│                  │
│   │  52 cards   │  │  52 cards   │                  │
│   └─────────────┘  └─────────────┘                  │
│                                                     │
│   ┌─────────────┐  ┌─────────────┐                  │
│   │   🔥        │  │   ⚡        │                  │
│   │             │  │             │                  │
│   │ CORE &      │  │ FULL BODY   │                  │
│   │ CARDIO      │  │             │                  │
│   │  8 exercises│  │ 14 exercises│                  │
│   │  52 cards   │  │  52 cards   │                  │
│   └─────────────┘  └─────────────┘                  │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [📊 History]                    [⚙️ Settings]      │
└─────────────────────────────────────────────────────┘
```

### Deck Preview - Before Starting Workout
```
┌─────────────────────────────────────────────────────┐
│  [← Back]         UPPER BODY              [Start]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌─────────────────────────────────────────┐       │
│   │                                         │       │
│   │         ┌───────────────────┐           │       │
│   │         │ ░░░░░░░░░░░░░░░░░ │           │       │
│   │         │ ░░░░░░░░░░░░░░░░░ │           │       │
│   │         │ ░░░ CARDS OF  ░░░ │           │       │
│   │         │ ░░░ CARNAGE   ░░░ │           │       │
│   │         │ ░░░░░░💀░░░░░░░░░ │           │       │
│   │         │ ░░░░░░░░░░░░░░░░░ │           │       │
│   │         │ ░░░░░░░░░░░░░░░░░ │           │       │
│   │         └───────────────────┘           │       │
│   │              52 cards                   │       │
│   └─────────────────────────────────────────┘       │
│                                                     │
│   Exercises in this deck:                           │
│   ───────────────────────────────────────────       │
│   ♠ Push-ups       ♥ Diamond Push-ups               │
│   ♦ Wide Push-ups  ♣ Decline Push-ups               │
│   ★ Dips           ☆ Staggered Push-ups             │
│   ● Clapping Push-ups                               │
│                                                     │
│   Total Reps: ~400                                  │
│   Est. Time: 20-30 min                              │
│                                                     │
├─────────────────────────────────────────────────────┤
│              [ 🎴 START WORKOUT ]                   │
└─────────────────────────────────────────────────────┘
```

### Active Workout - Card Drawn
```
┌─────────────────────────────────────────────────────┐
│  [✕ End]          UPPER BODY             12/52 🃏   │
├─────────────────────────────────────────────────────┤
│                                                     │
│           ┌─────────────────────────┐               │
│           │                         │               │
│           │    ♠        ♠          │               │
│           │                         │               │
│           │          8             │               │
│           │                         │               │
│           │       PUSH-UPS          │               │
│           │                         │               │
│           │    ♠        ♠          │               │
│           │                         │               │
│           └─────────────────────────┘               │
│                                                     │
│                  8 REPS                             │
│                                                     │
│   ┌─────────────────────────────────────────┐       │
│   │ [?] How to do Push-ups                  │       │
│   └─────────────────────────────────────────┘       │
│                                                     │
│   Progress: ████████░░░░░░░░░░░░░░░░ 23%            │
│   Reps Done: 87 / ~400                              │
│                                                     │
├─────────────────────────────────────────────────────┤
│              [ ✓ DONE - NEXT CARD ]                 │
└─────────────────────────────────────────────────────┘
```

### Active Workout - Joker/Wildcard
```
┌─────────────────────────────────────────────────────┐
│  [✕ End]          UPPER BODY             26/52 🃏   │
├─────────────────────────────────────────────────────┤
│                                                     │
│           ┌─────────────────────────┐               │
│           │  ╔═══════════════════╗  │               │
│           │  ║                   ║  │               │
│           │  ║     🃏 JOKER 🃏    ║  │               │
│           │  ║                   ║  │               │
│           │  ║     WILDCARD!     ║  │               │
│           │  ║                   ║  │               │
│           │  ║     BURPEES       ║  │               │
│           │  ║       x10         ║  │               │
│           │  ║                   ║  │               │
│           │  ╚═══════════════════╝  │               │
│           └─────────────────────────┘               │
│                                                     │
│              🔥 CHALLENGE CARD! 🔥                  │
│                                                     │
│   Progress: ████████████░░░░░░░░░░░░ 50%            │
│   Reps Done: 198 / ~400                             │
│                                                     │
├─────────────────────────────────────────────────────┤
│              [ ✓ DONE - NEXT CARD ]                 │
└─────────────────────────────────────────────────────┘
```

### Workout Complete Screen
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              🎉 WORKOUT COMPLETE! 🎉                │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│                     💀                              │
│              YOU SURVIVED THE                       │
│              CARDS OF CARNAGE                       │
│                                                     │
│   ┌─────────────────────────────────────────┐       │
│   │                                         │       │
│   │   Deck:           Upper Body            │       │
│   │   Time:           24:32                 │       │
│   │   Cards:          52/52                 │       │
│   │   Total Reps:     412                   │       │
│   │                                         │       │
│   │   ─────────────────────────────────     │       │
│   │                                         │       │
│   │   Push-ups:              78             │       │
│   │   Diamond Push-ups:      52             │       │
│   │   Wide Push-ups:         64             │       │
│   │   Decline Push-ups:      58             │       │
│   │   Dips:                  72             │       │
│   │   Staggered Push-ups:    48             │       │
│   │   Clapping Push-ups:     30             │       │
│   │   Burpees (Joker):       10             │       │
│   │                                         │       │
│   └─────────────────────────────────────────┘       │
│                                                     │
│   [ 🔄 New Workout ]     [ 🏠 Home ]                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Workout Paused / End Early Confirmation
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   ┌─────────────────────────────────────────┐       │
│   │                                         │       │
│   │         ⏸️ WORKOUT PAUSED               │       │
│   │                                         │       │
│   │   Progress will be saved.               │       │
│   │                                         │       │
│   │   Cards completed: 12/52                │       │
│   │   Reps so far: 87                       │       │
│   │                                         │       │
│   │   ─────────────────────────────────     │       │
│   │                                         │       │
│   │   [ ▶️ Resume ]    [ ✕ End Workout ]    │       │
│   │                                         │       │
│   └─────────────────────────────────────────┘       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### History Screen
```
┌─────────────────────────────────────────────────────┐
│  [← Back]           HISTORY                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│   📊 All-Time Stats                                 │
│   ┌─────────────────────────────────────────┐       │
│   │  Workouts: 47    Total Reps: 18,432     │       │
│   │  Time: 23h 14m   Decks Completed: 42    │       │
│   └─────────────────────────────────────────┘       │
│                                                     │
│   Recent Workouts                                   │
│   ───────────────────────────────────────────       │
│                                                     │
│   ┌─────────────────────────────────────────┐       │
│   │ Today, 8:32 AM                          │       │
│   │ Upper Body          ✓ Complete          │       │
│   │ 52 cards • 412 reps • 24:32             │       │
│   └─────────────────────────────────────────┘       │
│                                                     │
│   ┌─────────────────────────────────────────┐       │
│   │ Yesterday, 7:15 AM                      │       │
│   │ Lower Body          ✓ Complete          │       │
│   │ 52 cards • 398 reps • 28:14             │       │
│   └─────────────────────────────────────────┘       │
│                                                     │
│   ┌─────────────────────────────────────────┐       │
│   │ Jan 2, 6:45 PM                          │       │
│   │ Core & Cardio       ⚠ Partial           │       │
│   │ 31/52 cards • 186 reps • 15:22          │       │
│   └─────────────────────────────────────────┘       │
│                                                     │
│                    [Load More]                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Exercise Instructions Modal
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   ┌─────────────────────────────────────────┐       │
│   │                                    [×]  │       │
│   │         PUSH-UPS                        │       │
│   │                                         │       │
│   │   ┌─────────────────────────────────┐   │       │
│   │   │                                 │   │       │
│   │   │     [ Exercise Animation ]      │   │       │
│   │   │           or Image              │   │       │
│   │   │                                 │   │       │
│   │   └─────────────────────────────────┘   │       │
│   │                                         │       │
│   │   1. Start in plank position            │       │
│   │   2. Hands shoulder-width apart         │       │
│   │   3. Lower chest to the ground          │       │
│   │   4. Push back up to start              │       │
│   │   5. Keep core tight throughout         │       │
│   │                                         │       │
│   │   Muscles: Chest, Triceps, Shoulders    │       │
│   │                                         │       │
│   └─────────────────────────────────────────┘       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Settings Screen
```
┌─────────────────────────────────────────────────────┐
│  [← Back]          SETTINGS                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│   Workout Settings                                  │
│   ───────────────────────────────────────────       │
│                                                     │
│   Include Jokers (Wildcards)                        │
│   Adds 2 challenge cards to deck      [ ON  ◉ ]    │
│                                                     │
│   Face Card Value                                   │
│   J, Q, K rep count                   [ 10 ▼ ]     │
│                                                     │
│   Ace Value                                         │
│   Ace rep count                       [ 11 ▼ ]     │
│                                                     │
│   Sound Effects                       [ ON  ◉ ]    │
│                                                     │
│   Vibration on Card Draw              [ ON  ◉ ]    │
│                                                     │
│   ───────────────────────────────────────────       │
│   Data                                              │
│                                                     │
│   [ Export History ]                                │
│                                                     │
│   [ Clear All Data ]                                │
│                                                     │
│   ───────────────────────────────────────────       │
│   App                                               │
│                                                     │
│   Theme                               [ Dark ▼ ]   │
│                                                     │
│   Version 1.0.0                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Scenarios

### Feature: Deck Selection

```gherkin
Feature: Deck Selection
  As a user
  I want to choose which workout deck to use
  So that I can target specific muscle groups

  Background:
    Given I am on the home screen

  Scenario: View available decks
    Then I should see 4 deck options:
      | deck          | exercises |
      | Upper Body    | 7         |
      | Lower Body    | 7         |
      | Core & Cardio | 8         |
      | Full Body     | 14        |

  Scenario: Select a deck and preview exercises
    When I tap on "Upper Body" deck
    Then I should see the deck preview screen
    And I should see the list of exercises in the deck
    And I should see the estimated total reps
    And I should see "Start Workout" button

  Scenario: Navigate to workout history
    When I tap on "History"
    Then I should be on the history screen

  Scenario: Navigate to settings
    When I tap on "Settings"
    Then I should be on the settings screen
```

### Feature: Workout Flow

```gherkin
Feature: Workout Flow
  As a user performing a workout
  I want to draw cards and complete exercises
  So that I can progress through my workout

  Background:
    Given I have selected the "Upper Body" deck
    And I have started a workout

  Scenario: Draw first card
    Then I should see a card with:
      | element     | present |
      | suit symbol | yes     |
      | card value  | yes     |
      | exercise    | yes     |
      | rep count   | yes     |
    And I should see progress "1/52"
    And I should see a "Done - Next Card" button

  Scenario: Complete a card and draw next
    Given I see a card showing "8 Push-ups"
    When I tap "Done - Next Card"
    Then I should see a new card drawn
    And the progress should update to "2/52"
    And the reps completed should increase

  Scenario: Draw a Joker wildcard
    Given jokers are enabled in settings
    When I draw a Joker card
    Then I should see "WILDCARD!" indicator
    And I should see a challenge exercise (e.g., "10 Burpees")
    And the card should have distinct styling

  Scenario: View exercise instructions during workout
    When I tap "How to do Push-ups"
    Then I should see an instructions modal
    And I should see step-by-step instructions
    And I can close the modal and continue

  Scenario: Complete all cards
    Given I have completed 51 cards
    When I complete the final card
    Then I should see the workout complete screen
    And I should see my total time
    And I should see total reps completed
    And I should see breakdown by exercise
```

### Feature: Workout Pause and Resume

```gherkin
Feature: Workout Pause and Resume
  As a user
  I want to pause or end my workout early
  So that I can take breaks or stop if needed

  Background:
    Given I am in an active workout
    And I have completed 12 cards

  Scenario: Pause workout
    When I tap the "End" button
    Then I should see a pause modal
    And I should see my current progress
    And I should see "Resume" and "End Workout" options

  Scenario: Resume workout
    Given the workout is paused
    When I tap "Resume"
    Then I should return to the workout
    And I should see the same card I was on

  Scenario: End workout early
    Given the workout is paused
    When I tap "End Workout"
    Then I should see a partial workout summary
    And the workout should be saved to history as "Partial"
```

### Feature: Workout History

```gherkin
Feature: Workout History
  As a user
  I want to see my workout history
  So that I can track my fitness progress

  Background:
    Given I am on the history screen

  Scenario: View all-time stats
    Then I should see total workouts completed
    And I should see total reps completed
    And I should see total workout time
    And I should see decks completed count

  Scenario: View recent workouts
    Then I should see a list of recent workouts
    And each workout should show:
      | field         |
      | date and time |
      | deck name     |
      | status        |
      | cards done    |
      | reps done     |
      | duration      |

  Scenario: Distinguish complete vs partial workouts
    Given I have completed workouts and partial workouts
    Then complete workouts should show "✓ Complete"
    And partial workouts should show "⚠ Partial"

  Scenario: Load more history
    Given I have more than 10 workouts
    When I tap "Load More"
    Then I should see additional workout entries
```

### Feature: Settings

```gherkin
Feature: Settings
  As a user
  I want to customize my workout experience
  So that it matches my preferences and fitness level

  Background:
    Given I am on the settings screen

  Scenario: Toggle jokers
    When I toggle "Include Jokers" off
    And I start a new workout
    Then the deck should have 52 cards (no jokers)

  Scenario: Toggle jokers on
    When I toggle "Include Jokers" on
    And I start a new workout
    Then the deck should have 54 cards (with jokers)

  Scenario: Change face card value
    When I set "Face Card Value" to 12
    And I draw a King card
    Then the rep count should be 12

  Scenario: Change ace value
    When I set "Ace Value" to 14
    And I draw an Ace card
    Then the rep count should be 14

  Scenario: Toggle sound effects
    When I toggle "Sound Effects" off
    Then card draws should not play sounds

  Scenario: Change theme
    When I set theme to "Light"
    Then the app should use light theme colors
```

### Feature: Card Distribution Logic

```gherkin
Feature: Card Distribution Logic
  As a system
  I want to distribute exercises across card suits
  So that workouts are balanced and varied

  Scenario: Standard 52-card deck distribution
    Given a deck with 4 exercises
    Then each suit (13 cards) should map to 1 exercise
    And cards 2-10 should have reps equal to face value
    And Jack, Queen, King should have reps equal to face card setting
    And Ace should have reps equal to ace setting

  Scenario: Deck with more exercises than suits
    Given the "Upper Body" deck has 7 exercises
    Then exercises should rotate through card values
    And distribution should be approximately even

  Scenario: Deck shuffle is random
    Given I start workout A
    And I note the first 5 cards
    And I start workout B with the same deck
    Then the first 5 cards should likely be different

  Scenario: Jokers are wildcards
    Given jokers are enabled
    Then both jokers should trigger challenge exercises
    And joker exercises should be high-intensity (e.g., burpees)
```

---

## Exercise Data

### Upper Body Deck
| Exercise | Description |
|----------|-------------|
| Push-ups | Standard push-ups |
| Diamond Push-ups | Hands form diamond shape |
| Wide Push-ups | Hands wider than shoulders |
| Decline Push-ups | Feet elevated |
| Staggered Push-ups | One hand forward, one back |
| Clapping Push-ups | Explosive with clap |
| Dips | Tricep dips on chair/bench |

### Lower Body Deck
| Exercise | Description |
|----------|-------------|
| Squats | Standard bodyweight squats |
| Lunges | Forward lunges |
| Reverse Lunges | Step backward into lunge |
| Side Lunges | Lateral lunges |
| Glute Bridges | Hip thrusts from floor |
| Wall Sits | Static hold against wall |
| Step-ups | Step up onto platform |

### Core & Cardio Deck
| Exercise | Description |
|----------|-------------|
| Sit-ups | Standard sit-ups |
| Russian Twists | Seated rotational twists |
| Bicycle Crunches | Alternating elbow to knee |
| Leg Lifts | Lying leg raises |
| Flutter Kicks | Alternating small leg kicks |
| Mountain Climbers | Running in plank position |
| Burpees | Full body explosive movement |
| Jumping Jacks | Standard jumping jacks |

### Wildcard Exercises (Jokers)
| Exercise | Reps |
|----------|------|
| Burpees | 10 |
| Wall Sit | 30 sec |

---

## Edge Cases

1. **App closed during workout** - Should save progress and offer to resume
2. **Very fast card completion** - Minimum time between cards (prevent accidental double-tap)
3. **All exercises skipped** - Track skipped cards separately
4. **No history data** - Show empty state with motivational message
5. **Deck with only 1 exercise** - Should still work (custom deck future feature)
6. **Settings changed mid-workout** - Should not affect current workout

---

## Technical Notes

### Data Persistence
- Workout history should persist locally (localStorage or SQLite)
- Settings should persist locally
- In-progress workout state should persist (survive app reload)

### Card Generation Algorithm
```
1. Create array of 52 cards (or 54 with jokers)
2. Assign suits: ♠ ♥ ♦ ♣
3. Assign values: 2-10, J, Q, K, A
4. Map exercises to suits (or rotate for >4 exercises)
5. Fisher-Yates shuffle
6. Serve cards sequentially
```

### Rep Calculation
- Cards 2-10: face value
- J, Q, K: configurable (default 10)
- Ace: configurable (default 11)
- Joker: fixed per wildcard exercise

---

## Out of Scope (v1)

- Custom deck builder
- Multiplayer/social features
- Cloud sync
- Exercise videos (just text instructions)
- Rest timers between cards
- Audio coaching
- Apple Watch / wearable integration
