---
"@wondesign/disclosure": minor
---

Add `usePresence` (`@wondesign/disclosure/presence`), a React hook that keeps closed content on the page until its closing animation ends, like a dialog fading out or a panel sliding away.

- Waits for every animation: CSS transitions and animations on the element and inside it are all waited for. Infinite ones, like a spinner, are skipped.
- Closes right away when nothing animates, like when animations are turned off for reduced motion.
- Handles reopening: opening the content again while it's closing cancels the close.
- Exposes the status: `"open"`, `"closing"` or `"closed"`, to change how the content behaves on its way out, like making it inert.
- Typed: `PresenceStatus` and `UsePresenceReturn` are exported.
