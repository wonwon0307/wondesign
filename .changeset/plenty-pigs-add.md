---
"@wondesign/key-events": minor
---

Initial release of `@wondesign/key-events`, React hooks for keyboard interactions on every platform.

- **Escape Key** (`@wondesign/key-events/escape-key`): `useEscapeKey` runs a callback when the user presses Escape, for example to close a dialog. Cancelling half-typed text with an input method (IME) doesn't count, except in Safari.
- **Shortkey** (`@wondesign/key-events/shortkey`): `useShortkey` runs a callback when the user presses a shortkey written as a plain string, like `Mod+K`, and
  returns the matching `aria-keyshortcuts` value. `Mod` means ⌘ on Apple devices and Ctrl everywhere else.
- **Safe while typing**: shortkeys without Ctrl or ⌘ don't fire while the user types in an input, and holding a shortkey down fires it once.
- **Forgiving callbacks**: inline functions work as they are, with no need to memoize them.
- **Customizable**: switch either hook off with `enabled`.
- **Typed**: shortkeys are checked by TypeScript, and `EscapeKeyOptions`, `ShortkeyOptions`, `ParsedShortkey` and the key types are exported. `parseShortkey` and
  `isApple` help display shortkeys.
