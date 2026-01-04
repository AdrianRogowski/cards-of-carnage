# Cards of Carnage — Design System

> "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs

This document is the single source of truth for all visual and interaction design decisions in Cards of Carnage.

---

## Philosophy

### Core Principles

1. **Reduction** — Remove everything that isn't essential. If a pixel doesn't serve a purpose, delete it.

2. **Clarity** — Every element must be immediately understood. No ambiguity.

3. **Deference** — The UI should recede and let the content (the workout) be the hero.

4. **Depth** — Use subtle layers and shadows to create hierarchy, not decoration.

5. **Physicality** — Cards should feel like real objects. Weight, momentum, tactility.

### Design Mantras

- "When in doubt, leave it out"
- "One action per screen"
- "Make the important things obvious, the unimportant things invisible"
- "Whitespace is not empty — it's breathing room"
- "Animation should explain, not decorate"

---

## Color System

### Philosophy
A deliberately constrained palette. Two accent colors maximum. Let darkness create drama.

### Semantic Tokens

```css
/* === BACKGROUND LAYERS === */
--color-bg-base:        #0A0A0B;      /* Deepest black - app background */
--color-bg-elevated:    #141416;      /* Cards, modals, sheets */
--color-bg-surface:     #1C1C1E;      /* Interactive surfaces */
--color-bg-hover:       #2C2C2E;      /* Hover states */

/* === TEXT === */
--color-text-primary:   #FFFFFF;      /* High emphasis - headings, key info */
--color-text-secondary: #A1A1A6;      /* Medium emphasis - labels, descriptions */
--color-text-tertiary:  #636366;      /* Low emphasis - hints, disabled */
--color-text-inverse:   #0A0A0B;      /* Text on light/accent backgrounds */

/* === BRAND / ACCENT === */
--color-accent-primary:   #FF3B30;    /* Carnage Red - primary actions, brand */
--color-accent-secondary: #FF9500;    /* Fire Orange - wildcards, highlights */
--color-accent-glow:      rgba(255, 59, 48, 0.4);  /* Red glow for emphasis */

/* === SUITS (Card Colors) === */
--color-suit-spades:    #FFFFFF;      /* ♠ White */
--color-suit-hearts:    #FF3B30;      /* ♥ Red */
--color-suit-diamonds:  #FF3B30;      /* ♦ Red */
--color-suit-clubs:     #FFFFFF;      /* ♣ White */

/* === SEMANTIC STATES === */
--color-success:        #30D158;      /* Completion, positive */
--color-warning:        #FF9F0A;      /* Caution, partial */
--color-error:          #FF453A;      /* Error, destructive */

/* === BORDERS & DIVIDERS === */
--color-border-subtle:  rgba(255, 255, 255, 0.08);
--color-border-medium:  rgba(255, 255, 255, 0.15);
--color-border-strong:  rgba(255, 255, 255, 0.25);
```

### Usage Rules

| Context | Token |
|---------|-------|
| App background | `--color-bg-base` |
| Card background | `--color-bg-elevated` |
| Button background | `--color-bg-surface` |
| Primary button | `--color-accent-primary` |
| Headings | `--color-text-primary` |
| Body text | `--color-text-secondary` |
| Labels/hints | `--color-text-tertiary` |
| Borders | `--color-border-subtle` |

### Color Don'ts
- ❌ Never use pure white (#FFFFFF) for large surfaces
- ❌ Never use more than 2 accent colors on one screen
- ❌ Never use color alone to convey meaning (add icons/text)
- ❌ Never use gradients for backgrounds (solid colors only)
- ✅ Gradients allowed only for special emphasis (joker cards)

---

## Typography

### Philosophy
System fonts for performance and native feel. Limited scale for consistency.

### Font Stack

```css
--font-family-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display", 
                    "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

--font-family-mono: "SF Mono", SFMono-Regular, ui-monospace, 
                    Menlo, Monaco, "Cascadia Mono", monospace;
```

### Type Scale

| Token | Size | Weight | Line Height | Use Case |
|-------|------|--------|-------------|----------|
| `--text-hero` | 64px | 700 | 1.0 | Card rep numbers |
| `--text-display` | 40px | 700 | 1.1 | Workout complete title |
| `--text-title-lg` | 28px | 600 | 1.2 | Screen titles |
| `--text-title` | 22px | 600 | 1.3 | Section headers |
| `--text-body-lg` | 18px | 400 | 1.5 | Exercise names |
| `--text-body` | 16px | 400 | 1.5 | Primary body text |
| `--text-caption` | 14px | 400 | 1.4 | Secondary info, labels |
| `--text-micro` | 12px | 500 | 1.3 | Badges, tags, hints |

### Typography Rules

- **One weight per hierarchy level** — Don't mix weights within the same element
- **Maximum 3 sizes per screen** — Hero, body, caption
- **All caps sparingly** — Only for very short labels (2-3 words max)
- **Letter spacing** — Add +0.5px tracking for all-caps text
- **Numbers** — Use tabular/monospace figures for stats and timers

---

## Spacing System

### Philosophy
A mathematical scale creates visual rhythm. 4px base unit.

### Spacing Scale

```css
--space-0:   0px;
--space-1:   4px;     /* Tight: icon padding, inline elements */
--space-2:   8px;     /* Compact: between related items */
--space-3:   12px;    /* Default: form fields, list items */
--space-4:   16px;    /* Comfortable: card padding */
--space-5:   24px;    /* Relaxed: section gaps */
--space-6:   32px;    /* Spacious: between sections */
--space-7:   48px;    /* Generous: major section breaks */
--space-8:   64px;    /* Expansive: screen padding top/bottom */
--space-9:   96px;    /* Dramatic: hero sections */
```

### Spacing Rules

| Context | Token |
|---------|-------|
| Inside buttons | `--space-3` vertical, `--space-4` horizontal |
| Card padding | `--space-4` to `--space-5` |
| Between list items | `--space-3` |
| Between sections | `--space-6` to `--space-7` |
| Screen edge margins | `--space-4` (mobile), `--space-6` (tablet+) |
| Between icon and label | `--space-2` |

### The "Squint Test"
If you squint at the screen, you should see clear blocks of content separated by obvious whitespace. If it looks like a wall of text, add more space.

---

## Border Radius

### Scale

```css
--radius-none:  0px;
--radius-sm:    6px;      /* Buttons, inputs, small cards */
--radius-md:    12px;     /* Cards, modals */
--radius-lg:    20px;     /* Large cards, sheets */
--radius-xl:    28px;     /* Hero elements */
--radius-full:  9999px;   /* Pills, circular buttons */
```

### Rules
- Playing cards: `--radius-md` (12px)
- Buttons: `--radius-sm` (6px)
- Modals: `--radius-lg` (20px)
- Icon buttons: `--radius-full`

---

## Shadows & Elevation

### Philosophy
Shadows create hierarchy. Use sparingly. Dark mode = subtle shadows.

### Elevation Scale

```css
/* Level 0: Flush with surface */
--shadow-none: none;

/* Level 1: Slightly raised (buttons, inputs) */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3),
             0 1px 3px rgba(0, 0, 0, 0.15);

/* Level 2: Cards, elevated surfaces */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3),
             0 2px 4px rgba(0, 0, 0, 0.2);

/* Level 3: Modals, popovers */
--shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.4),
             0 6px 6px rgba(0, 0, 0, 0.3);

/* Level 4: Dramatic (drawn card) */
--shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.5),
             0 15px 12px rgba(0, 0, 0, 0.3);

/* Glow effects (accent emphasis) */
--shadow-glow-red: 0 0 30px var(--color-accent-glow);
```

### Usage
| Element | Shadow |
|---------|--------|
| Base surfaces | `--shadow-none` |
| Buttons | `--shadow-sm` |
| Cards (at rest) | `--shadow-md` |
| Cards (drawn/active) | `--shadow-xl` |
| Modals | `--shadow-lg` |
| Joker card | `--shadow-xl` + `--shadow-glow-red` |

---

## Motion & Animation

### Philosophy
Animation should feel **inevitable** — like physics, not decoration. Every animation must answer: "What is this teaching the user?"

### Timing

```css
--duration-instant:  50ms;    /* Micro-feedback (button press) */
--duration-fast:     150ms;   /* Quick transitions (hover, focus) */
--duration-normal:   250ms;   /* Standard transitions */
--duration-slow:     400ms;   /* Deliberate movements (card flip) */
--duration-dramatic: 600ms;   /* Major transitions (screen change) */
```

### Easing

```css
/* Default: Smooth deceleration (entering elements) */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);

/* Quick start, smooth end (most UI transitions) */
--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);

/* Symmetric (looping animations) */
--ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);

/* Spring-like bounce (playful feedback) */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Animation Catalog

| Action | Duration | Easing | Description |
|--------|----------|--------|-------------|
| Button press | `instant` | `ease-out` | Scale to 0.97, subtle |
| Card draw | `slow` | `ease-out-expo` | Slide up + fade in |
| Card flip | `slow` | `ease-out` | 3D Y-axis rotation |
| Modal open | `normal` | `ease-out-expo` | Scale from 0.95 + fade |
| Modal close | `fast` | `ease-out` | Fade out |
| Progress bar | `normal` | `ease-out` | Width transition |
| Screen transition | `dramatic` | `ease-out-expo` | Slide + fade |
| Success celebration | `dramatic` | `ease-spring` | Scale bounce |

### Animation Rules

- ❌ Never animate more than 2 properties simultaneously
- ❌ Never use animations longer than 600ms
- ❌ Never use bounce/spring on error states
- ✅ Reduce motion: respect `prefers-reduced-motion`
- ✅ Stagger lists: 30-50ms delay between items

---

## Component Patterns

### Cards (Playing Cards)

```
┌─────────────────────────────┐
│                             │
│   Suit     Value      Suit  │   ← Top row: small suits + value
│                             │
│                             │
│           VALUE             │   ← Center: large value (hero text)
│                             │
│         EXERCISE            │   ← Exercise name
│                             │
│                             │
│   Suit     Value      Suit  │   ← Bottom row (inverted)
│                             │
└─────────────────────────────┘
```

**Specs:**
- Aspect ratio: 2.5:3.5 (standard playing card)
- Background: `--color-bg-elevated`
- Border: `1px solid --color-border-subtle`
- Border radius: `--radius-md`
- Shadow: `--shadow-md` at rest, `--shadow-xl` when drawn
- Suit colors: Use `--color-suit-*` tokens

### Buttons

**Primary (Accent)**
```
Background: --color-accent-primary
Text: --color-text-inverse
Padding: --space-3 vertical, --space-5 horizontal
Border radius: --radius-sm
Font: --text-body, weight 600
Shadow: --shadow-sm
Hover: brightness(1.1)
Active: scale(0.97)
```

**Secondary (Ghost)**
```
Background: transparent
Border: 1px solid --color-border-medium
Text: --color-text-primary
Hover: --color-bg-surface
```

### Progress Bar

```
┌──────────────────────────────────────────┐
│████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
└──────────────────────────────────────────┘
```

**Specs:**
- Height: 8px
- Background (track): `--color-bg-surface`
- Fill: `--color-accent-primary`
- Border radius: `--radius-full`
- Animation: width with `--duration-normal`, `--ease-out`

### Deck Selection Cards

```
┌─────────────────────┐
│                     │
│        💪          │   ← Emoji icon (48px)
│                     │
│     UPPER BODY      │   ← Title (--text-title)
│                     │
│     7 exercises     │   ← Subtitle (--text-caption)
│     52 cards        │
│                     │
└─────────────────────┘
```

**Specs:**
- Background: `--color-bg-elevated`
- Hover: `--color-bg-surface`
- Border: `1px solid --color-border-subtle`
- Border radius: `--radius-md`
- Padding: `--space-5`
- Min-width: 160px

---

## Iconography

### Philosophy
Icons should be simple, monoline, and instantly recognizable. Prefer emoji for playful contexts.

### Icon Sizing

```css
--icon-xs:  16px;   /* Inline with text */
--icon-sm:  20px;   /* Buttons, lists */
--icon-md:  24px;   /* Standard UI */
--icon-lg:  32px;   /* Emphasis */
--icon-xl:  48px;   /* Hero/decorative */
```

### Icon Rules
- Stroke width: 1.5-2px
- Use SF Symbols style (rounded caps, consistent weight)
- Color: inherit from text color
- Touch target: minimum 44×44px

### Emoji Usage
- Deck icons: 💪 🦵 🔥 ⚡ (allowed)
- Completion: 🎉 💀 (allowed)
- In-app status: Use proper icons, not emoji

---

## Layout

### Breakpoints

```css
--breakpoint-sm:  640px;   /* Large phones landscape */
--breakpoint-md:  768px;   /* Tablets */
--breakpoint-lg:  1024px;  /* Desktop */
--breakpoint-xl:  1280px;  /* Large desktop */
```

### Container

```css
--container-max-width: 480px;  /* Mobile-first, single column */
--container-padding: var(--space-4);
```

### Grid
- Mobile: Single column, full width
- Tablet+: 2-column grid for deck selection
- Max content width: 480px (centered)

---

## Accessibility

### Contrast Requirements
- Text on backgrounds: minimum 4.5:1 ratio
- Large text (24px+): minimum 3:1 ratio
- Interactive elements: visible focus ring (2px, accent color)

### Focus States
```css
outline: 2px solid var(--color-accent-primary);
outline-offset: 2px;
```

### Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Touch Targets
- Minimum: 44×44px
- Recommended: 48×48px

---

## Implementation Checklist

When implementing any UI component:

- [ ] Uses only design system color tokens
- [ ] Uses only design system spacing tokens
- [ ] Uses only design system typography scale
- [ ] Has appropriate shadow for elevation
- [ ] Animations use defined durations and easings
- [ ] Touch targets are 44px minimum
- [ ] Focus states are visible
- [ ] Respects reduced motion preference
- [ ] Passes contrast requirements

---

## File Organization

```
src/
├── styles/
│   ├── tokens/
│   │   ├── colors.css       # Color variables
│   │   ├── typography.css   # Font sizes, weights
│   │   ├── spacing.css      # Spacing scale
│   │   ├── shadows.css      # Elevation
│   │   └── animation.css    # Timing, easing
│   ├── base/
│   │   ├── reset.css        # CSS reset
│   │   └── global.css       # Base styles
│   └── components/
│       ├── button.css
│       ├── card.css
│       └── ...
```

---

*Last updated: 2026-01-04*
*Version: 1.0.0*
