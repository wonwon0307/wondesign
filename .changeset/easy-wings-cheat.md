---
"@wondesign/theme": minor
---

Initial release of `@wondesign/theme`, a persisted theme switching, synced across tabs with no first-paint flash.

- **Light-Dark** (`@wondesign/theme/light-dark`): `LightDarkProvider` and `useLightDark` for a light / dark / system switch that follows the OS setting live. Supports one or more themes per side, and `disableSystem` for a light / dark only switch.
- **Named Themes** (`@wondesign/theme`): `ThemeProvider` and `useTheme` for a flat list of themes, none of them tied to light or dark.
- **No first-paint flash**: `LightDarkScript` and `ThemeScript` (from the `/server` entries) apply the saved theme in the `<head>`, before the page is painted. Both accept a `nonce` for nonce-based Content
  Security Policies.
- **Persistence and cross-tab sync**: the user's choice is saved, used again on every visit, and followed by other open tabs right away.
- **Plain CSS hooks**: the theme is written to `<html>` as `data-theme`, plus `data-color-scheme` and `color-scheme` for Light-Dark, so `light-dark()` colors and attribute selectors follow it.
