# Design Review

Audit UI code against the design system at `.specs/design/design-system.md`.

## Behavior

1. **Read** the design system spec
2. **Scan** the specified file(s) for UI code
3. **Check** against design system rules
4. **Report** violations with specific fixes

## What I Check

### Color Usage
- [ ] Using semantic color tokens (not raw hex values)
- [ ] Correct token for context (bg-base vs bg-elevated)
- [ ] Accent colors used sparingly (≤2 per screen)
- [ ] Text contrast meets accessibility requirements

### Spacing
- [ ] All spacing from the 4px scale (4, 8, 12, 16, 24, 32, 48, 64)
- [ ] No arbitrary values like `13px` or `22px`
- [ ] Consistent padding patterns in similar components

### Typography
- [ ] Using defined type scale (not arbitrary sizes)
- [ ] Maximum 3 type sizes per component
- [ ] Correct weight for hierarchy (600 for titles, 400 for body)

### Animation
- [ ] Duration within limits (50-600ms)
- [ ] Using defined easing curves
- [ ] Animation serves a purpose (not decorative)
- [ ] Respects `prefers-reduced-motion`

### Components
- [ ] Border radius uses tokens (6px, 12px, 20px, etc.)
- [ ] Shadows use elevation scale
- [ ] Touch targets ≥ 44px
- [ ] Focus states visible

## Output Format

```
## Design Review: [filename]

### ✅ Passes
- Using color tokens correctly
- Spacing is consistent
- ...

### ⚠️ Warnings
- [Line X]: Consider using `--space-4` instead of `--space-3` for card padding
- ...

### ❌ Violations
- [Line X]: Raw color `#333` should be `--color-bg-surface`
- [Line X]: Font size `15px` not in type scale, use `--text-body` (16px)
- [Line X]: Animation `1s` exceeds 600ms limit
- ...

### Suggested Fixes

\`\`\`css
/* Before */
padding: 15px;
background: #1C1C1E;

/* After */
padding: var(--space-4);
background: var(--color-bg-surface);
\`\`\`

---

**Summary**: X passes, X warnings, X violations
```

## Example Usage

User: "/design-review src/components/Card.tsx"

I will:
1. Read the design system from `.specs/design/design-system.md`
2. Read the specified file
3. Check all styling against design tokens
4. Report findings with line numbers
5. Suggest fixes for violations

## When to Use

- After implementing a new component
- Before code review
- When refactoring UI code
- When something "doesn't look right"
