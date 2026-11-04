---
"@wondesign/disclosure": minor
---

Add `useScrollLock` (`@wondesign/disclosure/scroll-lock`), a React hook that stops the page from scrolling while something is open, like a dialog, alert or drawer.

**Breaking:** `useOpenState` moved to its own entry.

Update your imports:

```diff
  - import { useOpenState } from "@wondesign/disclosure";
  + import { useOpenState } from "@wondesign/disclosure/open-state";
```

- Locks the whole page by default: pass targetRef to lock one element instead, like a <main> that scrolls on its own.
- Stacks safely: several can be on at once, like an alert opened over a dialog. The page stays locked until the last one turns off, whichever order they turn off in.
- Restores what was there: the page scrolls the way it did before once the last lock turns off.
- Typed: UseScrollLockOptions is exported.
