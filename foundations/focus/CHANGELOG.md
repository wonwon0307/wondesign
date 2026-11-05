# @wondesign/focus

## 0.2.1

### Patch Changes

- [#116](https://github.com/wonwon0307/wondesign/pull/116) [`a94eadb`](https://github.com/wonwon0307/wondesign/commit/a94eadbc7c828981d33246882f1c7087b12931d4) Thanks [@wonwon0307](https://github.com/wonwon0307)! - `useAutoFocus` returns focus to the element that had it before opening when `returnRef` is passed but empty, like a trigger that isn't rendered. Previously, focus was lost to `<body>`.

## 0.2.0

### Minor Changes

- [#111](https://github.com/wonwon0307/wondesign/pull/111) [`c71b311`](https://github.com/wonwon0307/wondesign/commit/c71b3110ee519a05c6fd61d5970d8d0d8904e1ff) Thanks [@wonwon0307](https://github.com/wonwon0307)! - Add `useBackgroundInert` (`@wondesign/focus/background-inert`), a React hook that makes everything on the page outside an element inert while it's open, so users can't click, focus or read the page behind modal content.

  - **Stacks safely**: several can be on at once, like an alert opened over a dialog. The page behind stays inert until the last one closes, whichever order they close in.
  - **Leaves existing inert alone**: elements that were inert before it turned on stay inert.
  - **Typed**: `UseBackgroundInertOptions` is exported.

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
