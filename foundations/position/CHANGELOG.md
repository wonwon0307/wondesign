# @wondesign/position

## 0.1.0

### Minor Changes

- [#107](https://github.com/wonwon0307/wondesign/pull/107) [`57bc082`](https://github.com/wonwon0307/wondesign/commit/57bc0822009067a9a0844e657ad693a491168857) Thanks [@wonwon0307](https://github.com/wonwon0307)! - Initial release of `@wondesign/position`, a React hook that places floating content and its arrow next to a trigger, flipping and staying on screen as needed.

  - **`useFloatingPosition`**: places floating content (tooltips, popovers, menus) next to its trigger, and points an arrow back at it
  - **Flips to opposite side**: when there isn't room, and keeps content insidce the viewport along the trigger
  - **Auto updates**: on scroll, resize and size changes, with `update` for anything else
  - **Refs**: returns refs to attach, typed for button and div by default and customisable through generics
