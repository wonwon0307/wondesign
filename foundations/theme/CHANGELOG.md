# @wondesign/theme

## 0.1.0

### Minor Changes

- [#86](https://github.com/wonwon0307/wondesign/pull/86) [`7315282`](https://github.com/wonwon0307/wondesign/commit/7315282e442fb8685eaf37ac3306b2ebcee60ede) Thanks [@wonwon0307](https://github.com/wonwon0307)! - Initial release of `@wondesign/theme`, a persisted theme switching, synced across tabs with no first-paint flash.

  - **Light-Dark** (`@wondesign/theme/light-dark`): `LightDarkProvider` and `useLightDark` for a light / dark / system switch that follows the OS setting live. Supports one or more themes per side, and `disableSystem` for a light / dark only switch.
  - **Named Themes** (`@wondesign/theme`): `ThemeProvider` and `useTheme` for a flat list of themes, none of them tied to light or dark.
  - **No first-paint flash**: `LightDarkScript` and `ThemeScript` (from the `/server` entries) apply the saved theme in the `<head>`, before the page is painted. Both accept a `nonce` for nonce-based Content
    Security Policies.
  - **Persistence and cross-tab sync**: the user's choice is saved, used again on every visit, and followed by other open tabs right away.
  - **Plain CSS hooks**: the theme is written to `<html>` as `data-theme`, plus `data-color-scheme` and `color-scheme` for Light-Dark, so `light-dark()` colors and attribute selectors follow it.
