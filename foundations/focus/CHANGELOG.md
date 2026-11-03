# @wondesign/focus

## 0.1.0

### Minor Changes

- [#109](https://github.com/wonwon0307/wondesign/pull/109) [`b640b90`](https://github.com/wonwon0307/wondesign/commit/b640b90ad9916b5930d1d3e43c819528b14efea8) Thanks [@wonwon0307](https://github.com/wonwon0307)! - Initial release of `@wondesign/focus`, React hooks that move and hold keyboard focus for tabs, menus, dialogs and other grouped or opened content.

  - **Arrow Navigation** (`@wondesign/focus/arrow-navigation`): `useArrowNavigation` moves focus between items in a group with the arrow keys, Home and End, for
    example between tabs or toolbar buttons. Pick the items with `itemSelector`, and switch to up and down with `orientation: "vertical"`. Browser shortcuts like
    Alt+Left are left alone.
  - **Auto Focus** (`@wondesign/focus/auto-focus`): `useAutoFocus` moves focus into content when it opens, and back to where it was when it closes. Pass
    `returnRef` to send it somewhere else.
  - **Focus Trap** (`@wondesign/focus/trap`): `useFocusTrap` keeps Tab and Shift+Tab inside content, like a dialog, while it's open.
  - **Skips what can't be focused**: auto focus and the trap leave out disabled, hidden and inert elements.
  - **Customizable**: switch any hook on with `enabled`, and let arrow navigation wrap around at the ends with `loop`.
  - **Typed**: `UseArrowNavigationOptions`, `UseAutoFocusOptions` and `UseFocusTrapOptions` are exported.
