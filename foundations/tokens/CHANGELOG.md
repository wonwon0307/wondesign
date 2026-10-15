# @wondesign/tokens

## 0.1.0

### Minor Changes

- [#83](https://github.com/wonwon0307/wondesign/pull/83) [`7046028`](https://github.com/wonwon0307/wondesign/commit/70460286fcef6d4fe96799e214d6f4570da30212) Thanks [@wonwon0307](https://github.com/wonwon0307)! - Initial release of `@wondesign/tokens`, a framework-agnostic token foundation for design systems.

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
