# @wondesign/disclosure

## 0.2.0

### Minor Changes

- [#113](https://github.com/wonwon0307/wondesign/pull/113) [`fbf59f7`](https://github.com/wonwon0307/wondesign/commit/fbf59f7dc77e1102dbf2654325470d4ae20f78cd) Thanks [@wonwon0307](https://github.com/wonwon0307)! - Add `useScrollLock` (`@wondesign/disclosure/scroll-lock`), a React hook that stops the page from scrolling while something is open, like a dialog, alert or drawer.

  **Breaking:** `useOpenState` moved to its own entry.

  Update your imports:

  ```diff
    - import { useOpenState } from "@wondesign/disclosure";
    + import { useOpenState } from "@wondesign/disclosure/open-state";
  ```

  - Locks the whole page by default: pass targetRef to lock one element instead, like a <main> that scrolls on its own.
  - Stacks safely: several can be on at once, like an alert opened over a dialog. The page stays locked until the last one turns off, whichever order they turn off in.
  - Restores what was there: the page scrolls the way it did before once the last lock turns off.
  - Typed: UseScrollLockOptions is exported.

## 0.1.0

### Minor Changes

- [#92](https://github.com/wonwon0307/wondesign/pull/92) [`d2fc262`](https://github.com/wonwon0307/wondesign/commit/d2fc2628ed5e27eab530973b854a451cb7c0841d) Thanks [@wonwon0307](https://github.com/wonwon0307)! - Initial release of `@wondesign/disclosure`, React hooks for the open / closed state of anything that shows and hides.

  - **`useOpenState`**: One hook for the open / closed state, with `isOpen`, `show`, `hide` and `toggle`.
  - **Uncontrolled by default**: Call it with no options, and it keeps the state for you, starting closed. Pass `initialState` to start open.
  - **Controlled when you need it**: Pass `controlledOpen` and `setControlledOpen` to keep the state anywhere, like a parent, a store or the URL.
  - **Built for reusable components**: Wire it to `isOpen`, `onOpenChange` and `defaultOpen` props, so whoever renders the component picks the mode.
  - **Stable callbacks**: `show` and `hide` are safe to pass down or use in effects.
  - **Typed**: `UseOpenStateOptions` and `UseOpenStateReturn` are exported for typing your own wrappers.
