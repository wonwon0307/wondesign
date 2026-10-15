import { colorCssVariables, wondesignLight } from "./models/colors/tokens";
import { defaultElevation, elevationCssVariables } from "./models/elevation";
import { defaultOpacity, opacityCssVariables } from "./models/opacity";
import { defaultRadius, radiusCssVariables } from "./models/radius";
import { defaultSpacing, spacingCssVariables } from "./models/spacing";
import {
  defaultTypography,
  typographyCssVariables,
  type TypographyTokens,
} from "./models/typography";
import { defaultZIndex, zIndexCssVariables } from "./models/z-index";
import type { DesignTokens } from "./tokens";

function toKebabCase(value: string) {
  return value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}

// keys missing from cssVars (extended tokens) are named `--${prefix}-${key}`
function flatEntries(
  cssVars: object,
  values: object,
  prefix: string,
): [string, string][] {
  return Object.entries(values).map(([key, value]) => [
    (cssVars as Record<string, string>)[key] ??
      `--${prefix}-${toKebabCase(key)}`,
    value as string,
  ]);
}

export type ThemeInput = Partial<DesignTokens>;

export function buildCssVariables<T extends ThemeInput>(
  {
    colors = wondesignLight,
    elevation = defaultElevation,
    opacity = defaultOpacity,
    radius = defaultRadius,
    spacing = defaultSpacing,
    typography = defaultTypography,
    zIndex = defaultZIndex,
  }: T = {} as T,
  selector = ":root",
): string {
  const entries: [string, string][] = [
    ...flatEntries(colorCssVariables, colors, "color"),
    ...flatEntries(elevationCssVariables, elevation, "elevation"),
    ...flatEntries(opacityCssVariables, opacity, "opacity"),
    ...flatEntries(radiusCssVariables, radius, "radius"),
    ...flatEntries(spacingCssVariables, spacing, "spacing"),
    ...flatEntries(zIndexCssVariables, zIndex, "z-index"),
  ];

  // typography is grouped; extended groups are prefixed by their own key (e.g. letterSpacing → --letter-spacing-*)
  for (const [group, values] of Object.entries(typography)) {
    entries.push(
      ...flatEntries(
        group in typographyCssVariables
          ? typographyCssVariables[group as keyof TypographyTokens]
          : {},
        values,
        toKebabCase(group),
      ),
    );
  }

  const declarations = entries
    .map(([cssVar, value]) => `  ${cssVar}: ${value};`)
    .join("\n");
  return `${selector} {\n${declarations}\n}`;
}
