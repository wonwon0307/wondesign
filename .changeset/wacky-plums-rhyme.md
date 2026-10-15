---
"@wondesign/tokens": minor
---

Initial release of `@wondesign/tokens`, a framework-agnostic token foundation for design systems.

- **Design tokens**: a semantic vocabulary across seven categories (colors, elevation, opacity, radius, spacing, typography and z-index), exposed as CSS variables
  with built-in fallbacks and mirrored by the typed `tokens` object.
- **`wondesignTokenVariables`**: the WonDesign preset stylesheet, with light/dark color pairs and the WonDesign web fonts.
- **`buildCssVariables`**: builds a stylesheet from your own values, scoped to any selector. Any category can be extended with keys of your own.
- **Default values**: `wondesignLight`, `wondesignDark`, `defaultElevation`, `defaultOpacity`, `defaultRadius`, `defaultSpacing`, `defaultTypography` and
  `defaultZIndex`, to build your own values from.
- **Color helpers**: `mergeLightDark` merges two palettes into `light-dark()` pairs; `colorWithFade` and `colorWithOpacity` derive tints and translucent colors with
  `color-mix()`, in any color space.
- **Media queries**: `mediaQueries` provides ready-made breakpoint and hover queries; `createSimpleBreakpointQueries` and `createBreakpointQueries` build
  breakpoints from your own widths.
