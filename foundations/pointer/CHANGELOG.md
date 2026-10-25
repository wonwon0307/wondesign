# @wondesign/pointer

## 0.1.0

### Minor Changes

- [#94](https://github.com/wonwon0307/wondesign/pull/94) [`81603cb`](https://github.com/wonwon0307/wondesign/commit/81603cb96d13180804e935630fd32e4c91124540) Thanks [@wonwon0307](https://github.com/wonwon0307)! - Initial release of `@wondesign/pointer`, React hooks for pointer interactions on mouse, touch and pen alike.

  - **Click Outside** (`@wondesign/pointer/click-outside`): `useClickOutside` runs a callback when the user clicks or taps outside an element. Only a press that
    both starts and ends outside counts, so dragging out of an element, like selecting text, doesn't close anything. Pass `excludeRef` to leave out a trigger.
  - **Long Press** (`@wondesign/pointer/long-press`): `useLongPress` runs a callback when the user holds a finger on an element, for example to show a tooltip on
    touch screens. A slightly shaky finger doesn't cancel the press, and a second finger, like a pinch-zoom, does.
  - **Forgiving callbacks**: inline functions work as they are, with no need to memoize them.
  - **Customizable**: switch either hook off with `enabled`, and set `threshold` and `moveTolerance` for long presses.
  - **Typed**: `ClickOutsideOptions` and `LongPressOptions` are exported for typing your own wrappers.
  - Requires React 19.2 or later.
