# @wondesign/tokens

## 0.1.2

### Patch Changes

- [#123](https://github.com/wonwon0307/wondesign/pull/123) [`9f6f9c4`](https://github.com/wonwon0307/wondesign/commit/9f6f9c4e14e300d8398859ffdfa6c0359c6b6a74) Thanks [@wonwon0307](https://github.com/wonwon0307)! - Updates to the opacity tokens.

  - **`hover`**: A new opacity token for elements under the pointer, as `--opacity-hover`. Defaults to `0.85`.
  - **`disabled`**: Now defaults to `0.5`, up from `0.4`.

## 0.1.1

### Patch Changes

- [#121](https://github.com/wonwon0307/wondesign/pull/121) [`3e56e61`](https://github.com/wonwon0307/wondesign/commit/3e56e61a2f2718a009d85a32e5211fadbb9405ae) Thanks [@wonwon0307](https://github.com/wonwon0307)! - Updates to the opacity tokens.

  - **`hover`**: A new opacity token for elements under the pointer, as `--opacity-hover`. Defaults to `0.65`.
  - **`disabled`**: Now defaults to `0.75`, up from `0.4`.

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
