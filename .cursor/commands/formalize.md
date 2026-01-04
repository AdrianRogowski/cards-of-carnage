# Formalize Prototype

Convert a prototype into production-ready code with full specs and tests.

## When to Use

After a `/prototype` exploration is approved and should become real code.

## Workflow (TDD Flow)

```
SPEC → TEST → IMPLEMENT
 ▲      │        │
 │      │        │
 └──────┴────────┘ (loop until tests pass)
```

### 1. Review Prototype
- Identify what works and should be kept
- Note what needs to change for production
- Find all `// TODO: Add specs and tests` comments

### 2. Create Feature Spec
- **Create ASCII mockups** based on prototype UI
- Write Gherkin scenarios based on prototype behavior
- Add edge cases the prototype might have skipped
- Document in `.specs/features/`

### 3. Write Tests (Should Fail)
- Cover all Gherkin scenarios
- Add edge case tests
- Tests should FAIL initially (prototype code isn't production-ready yet)
- Document in `.specs/test-suites/`
- Update `.specs/mapping.md`

### 4. Implement to Production Standards
- Remove hardcoded/mock data
- Add proper error handling
- Follow existing code patterns and conventions
- Add TypeScript types if missing
- Integrate properly with existing code
- Loop: implement → run tests → fix → repeat
- Done when ALL tests pass

### 5. Verify & Clean Up
- Run all tests (should pass now)
- Check for linting errors
- Verify integration with existing features
- Remove prototype TODO comments
- Update `.specs/mapping.md` with final production file paths (replace any prototype paths)

## Before Starting

I'll ask:
1. "What parts of the prototype should be kept vs. changed?"
2. "Any new requirements discovered during prototyping?"
3. "What edge cases should we handle?"

## Example Usage

User: "/formalize the deal velocity chart"

I will:
1. Review the prototype chart component
2. Ask about any changes needed
3. Create `.specs/features/deals/deal-velocity-chart.feature.md` with:
   - ASCII mockups showing chart states (loading, data, empty, error)
   - Gherkin scenarios for all behaviors
4. Write failing tests covering all scenarios
5. Create `.specs/test-suites/components/DealVelocityChart.tests.md`
6. Update mapping (initial)
7. Refactor component to production standards (until tests pass)
8. Remove prototype TODO comments
9. Finalize mapping with production file paths

### Example ASCII Mockup for Chart

```
### Chart - With Data
┌─────────────────────────────────────────────┐
│ Deal Velocity                     [⚙️ ▼]   │
├─────────────────────────────────────────────┤
│ ▲                                           │
│ │    ╭──╮                                   │
│ │ ╭──╯  ╰──╮     ╭──╮                       │
│ │─╯        ╰─────╯  ╰──────                 │
│ └──────────────────────────────────────▶    │
│   Jan   Feb   Mar   Apr   May   Jun         │
├─────────────────────────────────────────────┤
│ Avg: 12 days │ Total: 45 deals │ ↑ 15%     │
└─────────────────────────────────────────────┘

### Chart - Empty State
┌─────────────────────────────────────────────┐
│ Deal Velocity                     [⚙️ ▼]   │
├─────────────────────────────────────────────┤
│                                             │
│        📊 No deals in this period           │
│        Select a different date range        │
│                                             │
└─────────────────────────────────────────────┘
```
