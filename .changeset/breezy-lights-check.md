---
"@wondesign/focus": minor
---

Add `useBackgroundInert` (`@wondesign/focus/background-inert`), a React hook that makes everything on the page outside an element inert while it's open, so users can't click, focus or read the page behind modal content.

- **Stacks safely**: several can be on at once, like an alert opened over a dialog. The page behind stays inert until the last one closes, whichever order they close in.
- **Leaves existing inert alone**: elements that were inert before it turned on stay inert.
- **Typed**: `UseBackgroundInertOptions` is exported.
