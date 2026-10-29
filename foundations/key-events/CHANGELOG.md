# @wondesign/key-events

## 0.2.0

### Minor Changes

- [#101](https://github.com/wonwon0307/wondesign/pull/101) [`eb0097e`](https://github.com/wonwon0307/wondesign/commit/eb0097e43cd8568b6f03e1d9e795f0323a1f5ccc) Thanks [@wonwon0307](https://github.com/wonwon0307)! - Initial release of `@wondesign/key-events`, React hooks for keyboard interactions on every platform.

  - **Escape Key** (`@wondesign/key-events/escape-key`): `useEscapeKey` runs a callback when the user presses Escape, for example to close a dialog. Holding Escape
    down fires it once, and cancelling half-typed text with an input method (IME) doesn't count, except in Safari.
  - **Shortkey** (`@wondesign/key-events/shortkey`): `useShortkey` runs a callback when the user presses a shortkey written as a plain string, like `Mod+K`.
    `Mod` means ⌘ on Apple devices and Ctrl everywhere else.
  - **Shortkey Display**: `useShortkeyDisplay` gives a shortkey's keys for the user's platform, a label for screen readers and the `aria-keyshortcuts` value, without listening for it.
  - **Safe while typing**: shortkeys without Ctrl or ⌘ don't fire while the user types in an input, and holding a shortkey down fires it once.
  - **Forgiving callbacks**: inline functions work as they are, with no need to memoize them.
  - **Customizable**: switch either hook off with `enabled`.
  - **Typed**: shortkeys are checked by TypeScript, and `EscapeKeyOptions`, `ShortkeyOptions`, `ShortkeyDisplay` and the shortkey types are exported.
