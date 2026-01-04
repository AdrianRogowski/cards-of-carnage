# Cards of Carnage

## Overview
A React-based fitness workout app using playing card decks to determine exercises. Users can choose from different deck types (Upper Body, Lower Body, Core & Cardio, Full Body) to start a workout session.

## Tech Stack
- React 18
- TypeScript
- Vite (build tool)
- Vitest (testing)

## Project Structure
```
src/
├── components/     # Reusable UI components (Button, Modal, PlayingCard, etc.)
├── lib/            # Core business logic
│   ├── deck/       # Deck definitions and card handling
│   ├── history/    # Workout history tracking
│   ├── settings/   # App settings management
│   └── workout/    # Workout session logic
├── screens/        # Application screens/pages
├── styles/         # Global styles and design tokens
├── test/           # Test setup
└── types/          # TypeScript type definitions
```

## Development
- Dev server: `npm run dev` (runs on port 5000)
- Build: `npm run build`
- Tests: `npm test`

## Deployment
- Static site deployment
- Build command: `npm run build`
- Output directory: `dist`
