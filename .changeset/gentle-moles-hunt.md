---
"@wondesign/focus": patch
---

`useAutoFocus` no longer takes focus back on close when it has already moved outside the target, like to an input the user clicked outside a popover. Previously, focus jumped back to `returnRef` or the element that had it before, and the user had to click again.

- **Returns as before otherwise**: closing with a close button, <kbd>Esc</kbd>, or a click on empty space still returns focus to `returnRef`, or the element that had it before opening.
- **Respects your own focus**: focus moved elsewhere on close, like by an `onOpenChange` that focuses a field, is left where it is.
