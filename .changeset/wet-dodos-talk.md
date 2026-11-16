---
"@wondesign/focus": patch
---

Add `initialRef` to `useAutoFocus`, to choose which element inside takes focus when it opens.

- **Falls back gracefully**: an `initialRef` that's outside the target or can't take focus is ignored, and focus moves to the first focusable element as before.
- **`returnRef` is read on close**: it used to be read when focus moved in. If the element it points at is replaced while open, focus now returns to the new one.
- **`useFocusTrap` recovers lost focus**: if the focused element inside is removed or hidden, the next Tab moves focus back to the first focusable element, or the target itself. Focus held by something else, like another trap, is left alone.
