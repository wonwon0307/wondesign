---
"@wondesign/position": minor
---

Initial release of `@wondesign/position`, a React hook that places floating content and its arrow next to a trigger, flipping and staying on screen as needed.

- **`useFloatingPosition`**: places floating content (tooltips, popovers, menus) next to its trigger, and points an arrow back at it
- **Flips to opposite side**: when there isn't room, and keeps content insidce the viewport along the trigger
- **Auto updates**: on scroll, resize and size changes, with `update` for anything else
- **Refs**: returns refs to attach, typed for button and div by default and customisable through generics
