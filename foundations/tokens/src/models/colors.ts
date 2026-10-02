import { type SemanticColors, wondesignLight } from "@wondesign/colors";

export type { SemanticColors as ColorTokens } from "@wondesign/colors";

export const colorCssVariables: SemanticColors = {
  primary: "--color-primary",
  onPrimary: "--color-primary-foreground",
  error: "--color-alert-danger",
  warning: "--color-alert-warning",
  success: "--color-alert-success",
  background: "--color-background-default",
  backgroundHighlight: "--color-background-highlight",
  backgroundMuted: "--color-background-muted",
  backgroundInverted: "--color-background-inverted",
  surface: "--color-background-surface",
  overlay: "--color-background-overlay",
  text: "--color-text-default",
  textMuted: "--color-text-muted",
  textInverted: "--color-text-inverted",
  border: "--color-border-default",
  borderHighlight: "--color-border-highlight",
  borderMuted: "--color-border-muted",
  borderInverted: "--color-border-inverted",
};

export const colorTokens: SemanticColors = {
  primary: `var(${colorCssVariables.primary}, ${wondesignLight.primary})`,
  onPrimary: `var(${colorCssVariables.onPrimary}, ${wondesignLight.onPrimary})`,
  error: `var(${colorCssVariables.error}, ${wondesignLight.error})`,
  warning: `var(${colorCssVariables.warning}, ${wondesignLight.warning})`,
  success: `var(${colorCssVariables.success}, ${wondesignLight.success})`,
  background: `var(${colorCssVariables.background}, ${wondesignLight.background})`,
  backgroundHighlight: `var(${colorCssVariables.backgroundHighlight}, ${wondesignLight.backgroundHighlight})`,
  backgroundMuted: `var(${colorCssVariables.backgroundMuted}, ${wondesignLight.backgroundMuted})`,
  backgroundInverted: `var(${colorCssVariables.backgroundInverted}, ${wondesignLight.backgroundInverted})`,
  surface: `var(${colorCssVariables.surface}, ${wondesignLight.surface})`,
  overlay: `var(${colorCssVariables.overlay}, ${wondesignLight.overlay})`,
  text: `var(${colorCssVariables.text}, ${wondesignLight.text})`,
  textMuted: `var(${colorCssVariables.textMuted}, ${wondesignLight.textMuted})`,
  textInverted: `var(${colorCssVariables.textInverted}, ${wondesignLight.textInverted})`,
  border: `var(${colorCssVariables.border}, ${wondesignLight.border})`,
  borderHighlight: `var(${colorCssVariables.borderHighlight}, ${wondesignLight.borderHighlight})`,
  borderMuted: `var(${colorCssVariables.borderMuted}, ${wondesignLight.borderMuted})`,
  borderInverted: `var(${colorCssVariables.borderInverted}, ${wondesignLight.borderInverted})`,
};
