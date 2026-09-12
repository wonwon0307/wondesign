import { wondesignLight } from "@wondesign/colors";

import { colorCssVariables } from "@/models/colors";
import {
  elevationCssVariables,
  defaultElevationTokens,
} from "@/models/elevation";
import { radiusCssVariables, defaultRadiusTokens } from "@/models/radius";
import { spacingCssVariables, defaultSpacingTokens } from "@/models/spacing";
import { textCssVariables, defaultTextTokens } from "@/models/text";
import {
  typographyCssVariables,
  defaultTypographyTokens,
} from "@/models/typography";
import { zIndexCssVariables, defaultZIndexTokens } from "@/models/z-index";

import { type DesignTokens } from "@/tokens";

function flatEntries(cssVars: object, values: object): [string, string][] {
  return Object.entries(values).map(([key, value]) => [
    (cssVars as Record<string, string>)[key],
    value as string,
  ]);
}

export type ThemeInput = Partial<DesignTokens>;

export function buildCssVariables(
  {
    colors = wondesignLight,
    elevation = defaultElevationTokens,
    radius = defaultRadiusTokens,
    spacing = defaultSpacingTokens,
    text = defaultTextTokens,
    typography = defaultTypographyTokens,
    zIndex = defaultZIndexTokens,
  }: Partial<DesignTokens> = {},
  selector = ":root",
): string {
  const entries: [string, string][] = [
    ...flatEntries(colorCssVariables, colors),
    ...flatEntries(elevationCssVariables, elevation),
    ...flatEntries(radiusCssVariables, radius),
    ...flatEntries(spacingCssVariables, spacing),
    ...flatEntries(textCssVariables, text),
    ...flatEntries(typographyCssVariables, typography),
    ...flatEntries(zIndexCssVariables, zIndex),
  ];

  for (const group of [
    "fontSize",
    "lineHeight",
    "fontWeight",
    "fontFamily",
  ] as const) {
    entries.push(
      ...flatEntries(typographyCssVariables[group], typography[group]),
    );
  }

  const declarations = entries
    .map(([cssVar, value]) => `  ${cssVar}: ${value};`)
    .join("\n");
  return `${selector} {\n${declarations}\n}`;
}
