import type { DeckDefinition, DeckType, Exercise } from '@/types';

// === EXERCISE DEFINITIONS ===

const UPPER_BODY_EXERCISES: Exercise[] = [
  {
    id: 'push-ups',
    name: 'Push-ups',
    description: 'Standard push-ups',
    instructions: [
      'Start in plank position with hands shoulder-width apart',
      'Keep your body in a straight line from head to heels',
      'Lower your chest to the ground by bending your elbows',
      'Push back up to the starting position',
      'Keep your core tight throughout the movement',
    ],
    muscles: ['Chest', 'Triceps', 'Shoulders', 'Core'],
  },
  {
    id: 'diamond-push-ups',
    name: 'Diamond Push-ups',
    description: 'Hands form diamond shape',
    instructions: [
      'Start in plank position',
      'Place hands together under your chest, forming a diamond shape with thumbs and index fingers',
      'Lower your chest toward your hands',
      'Push back up to starting position',
      'Keep elbows close to your body',
    ],
    muscles: ['Triceps', 'Chest', 'Shoulders'],
  },
  {
    id: 'wide-push-ups',
    name: 'Wide Push-ups',
    description: 'Hands wider than shoulders',
    instructions: [
      'Start in plank position with hands wider than shoulder-width',
      'Lower your chest toward the ground',
      'Push back up to starting position',
      'Keep core engaged throughout',
    ],
    muscles: ['Chest', 'Shoulders', 'Triceps'],
  },
  {
    id: 'decline-push-ups',
    name: 'Decline Push-ups',
    description: 'Feet elevated',
    instructions: [
      'Place feet on an elevated surface (chair, bench, or stairs)',
      'Hands on the ground, shoulder-width apart',
      'Lower your chest toward the ground',
      'Push back up to starting position',
      'The higher your feet, the harder the exercise',
    ],
    muscles: ['Upper Chest', 'Shoulders', 'Triceps'],
  },
  {
    id: 'staggered-push-ups',
    name: 'Staggered Push-ups',
    description: 'One hand forward, one back',
    instructions: [
      'Start in push-up position',
      'Move one hand forward and one hand back',
      'Perform a push-up in this staggered position',
      'Switch hand positions for balance',
    ],
    muscles: ['Chest', 'Triceps', 'Core', 'Shoulders'],
  },
  {
    id: 'clapping-push-ups',
    name: 'Clapping Push-ups',
    description: 'Explosive with clap',
    instructions: [
      'Start in standard push-up position',
      'Lower your chest to the ground',
      'Push up explosively so hands leave the ground',
      'Clap your hands together',
      'Land softly and immediately go into next rep',
    ],
    muscles: ['Chest', 'Triceps', 'Shoulders', 'Core'],
  },
  {
    id: 'dips',
    name: 'Dips',
    description: 'Tricep dips on chair/bench',
    instructions: [
      'Sit on edge of a sturdy chair or bench',
      'Place hands next to hips, fingers forward',
      'Slide off the edge, supporting your weight with arms',
      'Lower your body by bending elbows to 90 degrees',
      'Push back up to starting position',
    ],
    muscles: ['Triceps', 'Chest', 'Shoulders'],
  },
];

const LOWER_BODY_EXERCISES: Exercise[] = [
  {
    id: 'squats',
    name: 'Squats',
    description: 'Standard bodyweight squats',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body as if sitting in a chair',
      'Keep your chest up and knees tracking over toes',
      'Lower until thighs are parallel to ground',
      'Push through heels to stand back up',
    ],
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
  },
  {
    id: 'lunges',
    name: 'Lunges',
    description: 'Forward lunges',
    instructions: [
      'Stand tall with feet hip-width apart',
      'Step forward with one leg',
      'Lower your body until both knees are at 90 degrees',
      'Push through front heel to return to standing',
      'Alternate legs',
    ],
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
  },
  {
    id: 'reverse-lunges',
    name: 'Reverse Lunges',
    description: 'Step backward into lunge',
    instructions: [
      'Stand tall with feet hip-width apart',
      'Step backward with one leg',
      'Lower your body until both knees are at 90 degrees',
      'Push through front heel to return to standing',
      'Alternate legs',
    ],
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
  },
  {
    id: 'side-lunges',
    name: 'Side Lunges',
    description: 'Lateral lunges',
    instructions: [
      'Stand with feet together',
      'Step out wide to one side',
      'Bend the stepping leg while keeping the other straight',
      'Push off the bent leg to return to center',
      'Alternate sides',
    ],
    muscles: ['Quadriceps', 'Glutes', 'Adductors', 'Abductors'],
  },
  {
    id: 'glute-bridges',
    name: 'Glute Bridges',
    description: 'Hip thrusts from floor',
    instructions: [
      'Lie on your back with knees bent and feet flat',
      'Arms at your sides, palms down',
      'Lift your hips toward the ceiling',
      'Squeeze your glutes at the top',
      'Lower back down with control',
    ],
    muscles: ['Glutes', 'Hamstrings', 'Core'],
  },
  {
    id: 'wall-sits',
    name: 'Wall Sits',
    description: 'Static hold against wall',
    instructions: [
      'Stand with back against a wall',
      'Slide down until thighs are parallel to ground',
      'Keep your back flat against the wall',
      'Hold this position for the required time',
      'Push through heels to stand back up',
    ],
    muscles: ['Quadriceps', 'Glutes', 'Core'],
  },
  {
    id: 'step-ups',
    name: 'Step-ups',
    description: 'Step up onto platform',
    instructions: [
      'Stand facing a sturdy step or platform',
      'Step up with one foot, pressing through heel',
      'Bring the other foot up to stand on the platform',
      'Step back down with control',
      'Alternate leading leg',
    ],
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
  },
];

const CORE_CARDIO_EXERCISES: Exercise[] = [
  {
    id: 'sit-ups',
    name: 'Sit-ups',
    description: 'Standard sit-ups',
    instructions: [
      'Lie on your back with knees bent',
      'Place hands behind your head or crossed on chest',
      'Engage your core and lift your torso toward your knees',
      'Lower back down with control',
      'Avoid pulling on your neck',
    ],
    muscles: ['Abs', 'Hip Flexors'],
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    description: 'Seated rotational twists',
    instructions: [
      'Sit with knees bent and feet flat (or elevated for more challenge)',
      'Lean back slightly, keeping your back straight',
      'Twist your torso to one side',
      'Return to center and twist to the other side',
      'Keep your core engaged throughout',
    ],
    muscles: ['Obliques', 'Abs', 'Hip Flexors'],
  },
  {
    id: 'bicycle-crunches',
    name: 'Bicycle Crunches',
    description: 'Alternating elbow to knee',
    instructions: [
      'Lie on your back with hands behind head',
      'Lift your shoulders off the ground',
      'Bring one knee toward chest while extending the other leg',
      'Twist to bring opposite elbow toward the bent knee',
      'Alternate sides in a pedaling motion',
    ],
    muscles: ['Abs', 'Obliques', 'Hip Flexors'],
  },
  {
    id: 'leg-lifts',
    name: 'Leg Lifts',
    description: 'Lying leg raises',
    instructions: [
      'Lie flat on your back with legs straight',
      'Place hands under your glutes for support',
      'Lift both legs toward the ceiling',
      'Lower legs back down without touching the floor',
      'Keep your lower back pressed into the ground',
    ],
    muscles: ['Lower Abs', 'Hip Flexors'],
  },
  {
    id: 'flutter-kicks',
    name: 'Flutter Kicks',
    description: 'Alternating small leg kicks',
    instructions: [
      'Lie flat on your back',
      'Lift both legs slightly off the ground',
      'Kick legs up and down in small, rapid movements',
      'Keep your core tight and lower back pressed down',
      'Continue alternating legs',
    ],
    muscles: ['Lower Abs', 'Hip Flexors', 'Quadriceps'],
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    description: 'Running in plank position',
    instructions: [
      'Start in a high plank position',
      'Drive one knee toward your chest',
      'Quickly switch legs, extending the first leg back',
      'Continue alternating at a rapid pace',
      'Keep your hips level and core engaged',
    ],
    muscles: ['Core', 'Shoulders', 'Hip Flexors', 'Quadriceps'],
  },
  {
    id: 'burpees',
    name: 'Burpees',
    description: 'Full body explosive movement',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Drop into a squat and place hands on the floor',
      'Jump feet back into a plank position',
      'Perform a push-up (optional)',
      'Jump feet forward and explosively jump up with arms overhead',
    ],
    muscles: ['Full Body', 'Core', 'Legs', 'Chest', 'Shoulders'],
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    description: 'Standard jumping jacks',
    instructions: [
      'Stand with feet together and arms at sides',
      'Jump feet out wide while raising arms overhead',
      'Jump feet back together while lowering arms',
      'Continue at a steady pace',
      'Land softly on the balls of your feet',
    ],
    muscles: ['Full Body', 'Calves', 'Shoulders'],
  },
];

// Wildcard exercises for Jokers
const WILDCARD_EXERCISES: Exercise[] = [
  {
    id: 'wildcard-burpees',
    name: 'Burpees',
    description: 'High-intensity full body challenge',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Drop into a squat and place hands on the floor',
      'Jump feet back into a plank position',
      'Perform a push-up',
      'Jump feet forward and explosively jump up with arms overhead',
    ],
    muscles: ['Full Body'],
  },
  {
    id: 'wildcard-wall-sit',
    name: 'Wall Sit',
    description: '30 second hold challenge',
    instructions: [
      'Stand with back against a wall',
      'Slide down until thighs are parallel to ground',
      'Hold for 30 seconds',
      'Keep your back flat against the wall',
    ],
    muscles: ['Quadriceps', 'Glutes'],
  },
];

// === DECK DEFINITIONS ===

export const DECKS: Record<DeckType, DeckDefinition> = {
  'upper-body': {
    id: 'upper-body',
    name: 'Upper Body',
    icon: '💪',
    exercises: UPPER_BODY_EXERCISES,
    wildcardExercises: WILDCARD_EXERCISES,
  },
  'lower-body': {
    id: 'lower-body',
    name: 'Lower Body',
    icon: '🦵',
    exercises: LOWER_BODY_EXERCISES,
    wildcardExercises: WILDCARD_EXERCISES,
  },
  'core-cardio': {
    id: 'core-cardio',
    name: 'Core & Cardio',
    icon: '🔥',
    exercises: CORE_CARDIO_EXERCISES,
    wildcardExercises: WILDCARD_EXERCISES,
  },
  'full-body': {
    id: 'full-body',
    name: 'Full Body',
    icon: '⚡',
    exercises: [...UPPER_BODY_EXERCISES, ...LOWER_BODY_EXERCISES],
    wildcardExercises: WILDCARD_EXERCISES,
  },
};

export function getDeckDefinition(deckType: DeckType): DeckDefinition {
  return DECKS[deckType];
}
