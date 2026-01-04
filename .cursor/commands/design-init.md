# Design Init

Bootstrap a design system for this project. Run this **once** after you have initial feature specs but **before** implementation.

## When To Run

```
/spec-init          ← Project setup
/spec-first         ← Create feature specs with ASCII mockups
/design-init        ← YOU ARE HERE: Create design system
[write tests]
[implement]
/design-review      ← Audit implementation
```

## Behavior

1. **Review existing specs** to understand what UI components are needed
2. **Ask key questions** about aesthetic direction:
   - Dark mode, light mode, or both?
   - Brand colors (if any)?
   - Aesthetic vibe (minimal, playful, corporate, etc.)?
   - Reference apps or styles?
3. **Generate** `.specs/design/design-system.md` with:
   - Color palette (semantic tokens)
   - Typography scale
   - Spacing system
   - Border radius scale
   - Shadow/elevation system
   - Animation timing/easing
   - Component patterns for the specs
4. **Create CSS token files** (optional, if tech stack is known)

## Output Format

After gathering requirements, I will create:

```
.specs/design/
└── design-system.md    # Complete design system spec

src/styles/tokens/      # (Optional, if requested)
├── colors.css
├── typography.css
├── spacing.css
└── animation.css
```

Then provide a summary:

```
## Design System Created

**File**: .specs/design/design-system.md

### Aesthetic Direction
- Theme: [Dark/Light/Both]
- Vibe: [Description]
- Primary Accent: [Color + hex]

### Tokens Defined
- X color tokens
- X typography levels
- X spacing values
- X shadow levels
- X animation timings

### Component Patterns
- [Component 1]
- [Component 2]
- ...

### Next Steps
1. Review the design system
2. Start implementation with `/spec-first` → tests → code
3. Run `/design-review` after building UI components
```

## Questions I'll Ask

If not provided upfront, I'll ask:

1. **Theme preference?**
   - Dark mode (modern, dramatic)
   - Light mode (clean, airy)
   - Both (system preference)

2. **Brand colors?**
   - Existing brand colors to incorporate?
   - Or should I propose a palette?

3. **Aesthetic references?**
   - Any apps, websites, or styles you like?
   - (e.g., "Apple-minimal", "Stripe-clean", "Discord-playful")

4. **Tech stack?**
   - Web (CSS custom properties)?
   - React Native (StyleSheet)?
   - Flutter (ThemeData)?
   - Other?

## Example Usage

User: "/design-init dark mode, aggressive/intense vibe, red accent"

I will:
1. Read existing feature specs for context
2. Create a dark theme design system with red accents
3. Define tokens that match the "intense" aesthetic
4. Generate `.specs/design/design-system.md`
5. Optionally create CSS token files

## Notes

- Run this command **once** per project
- The design system can evolve, but start with a solid foundation
- If you already have a design system, use `/design-review` instead
