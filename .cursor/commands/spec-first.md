# Spec-First Mode (TDD Flow)

Create the feature specification without implementing anything. This is step 1 of the TDD flow:

```
SPEC → TEST → IMPLEMENT
 ▲      │        │
 │      │        │
 └──────┴────────┘ (loop until tests pass)
```

## Behavior

1. **Create/update** the feature spec in `.specs/features/`
2. **For UI features**: Reference `.specs/design/design-system.md` for visual decisions
3. **Create ASCII mockups** for UI components showing:
   - Default/collapsed state
   - Expanded/active states
   - Loading, error, and empty states
   - Interactive element positions
4. **Write detailed Gherkin scenarios** covering:
   - Happy path
   - Edge cases
   - Error states
5. **Do NOT** write any implementation code
6. **Do NOT** write tests yet (that's step 2)
7. **Identify** any questions or ambiguities
8. **List** suggested test cases
9. **For UI**: Note which design tokens apply (colors, spacing, typography)

## Output Format

After creating the spec, I will provide:

```
## Summary

**Feature**: [Name]
**Spec File**: .specs/features/{domain}/{feature}.feature.md

### ASCII Mockups Created
- Default state
- [State 2]
- [State 3]

### Scenarios Documented
1. [Scenario 1]
2. [Scenario 2]
...

### Edge Cases Identified
- [Edge case 1]
- [Edge case 2]

### Open Questions
- [Question 1]?
- [Question 2]?

### Suggested Test Cases
- [ ] Test for scenario 1
- [ ] Test for scenario 2
...

---

**Does the mockup and spec look right? Ready to write tests?**
```

## ASCII Mockup Guidelines

For UI features, include a `## Mockups` section with ASCII art showing:

```
### Default State
┌─────────────────────────────────────────────┐
│ Component Header                    [Action]│
├─────────────────────────────────────────────┤
│                                             │
│   Main content area                         │
│                                             │
├─────────────────────────────────────────────┤
│ Footer / Actions                            │
└─────────────────────────────────────────────┘

### Loading State
┌─────────────────────────────────────────────┐
│ Component Header                            │
├─────────────────────────────────────────────┤
│                                             │
│           ◐ Loading...                      │
│                                             │
└─────────────────────────────────────────────┘
```

### Mockup Conventions

| Symbol | Meaning |
|--------|---------|
| `┌┐└┘│─` | Box drawing for containers |
| `[...]` | Buttons, clickable elements |
| `(○) (●)` | Radio buttons |
| `[x] [ ]` | Checkboxes |
| `<...>` | Input fields |
| `▼ ▶` | Dropdowns, expandable |
| `×` | Close button |
| `+` | Add button |
| `⋮` | More options |
| `◐` | Loading spinner |

## Next Steps After Approval

When user says "go" or approves:
1. **Write failing tests** that cover all Gherkin scenarios
2. Document tests in `.specs/test-suites/`
3. Update `.specs/mapping.md`
4. Ask: "Tests written (failing). Ready to implement?"

When user approves implementation:
1. Implement feature incrementally
2. Run tests frequently
3. Loop until all tests pass

## Example Usage

User: "/spec-first user authentication with email and password"

I will:
1. Create `.specs/features/auth/login.feature.md`
2. Create ASCII mockups for:
   - Login form (default state)
   - Loading state during authentication
   - Error states (invalid credentials, network error)
   - Success/redirect state
3. Write Gherkin scenarios for login, validation, errors, etc.
4. Identify edge cases (invalid credentials, network errors, etc.)
5. List questions (password requirements? rate limiting?)
6. Wait for approval → then write failing tests → then implement

### Example ASCII Mockup Output

```
## Mockups

### Login Form - Default
┌─────────────────────────────────────────────┐
│               🔐 Login                      │
├─────────────────────────────────────────────┤
│                                             │
│  Email                                      │
│  ┌─────────────────────────────────────┐    │
│  │ <email@example.com>                 │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  Password                                   │
│  ┌─────────────────────────────────────┐    │
│  │ <••••••••>                     👁   │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  [        Sign In        ]                  │
│                                             │
│  ─────────── or ───────────                 │
│                                             │
│  Forgot password?          Create account   │
└─────────────────────────────────────────────┘

### Login Form - Error State
┌─────────────────────────────────────────────┐
│               🔐 Login                      │
├─────────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐    │
│  │ ⚠ Invalid email or password         │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  Email                                      │
│  ┌─────────────────────────────────────┐    │
│  │ <email@example.com>          ⚠      │    │
│  └─────────────────────────────────────┘    │
│  ...                                        │
└─────────────────────────────────────────────┘
```

