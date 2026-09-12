export type SpacingTokens = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  layoutSmall: string;
  layoutMedium: string;
  layoutLarge: string;
};

export const spacingCssVariables: SpacingTokens = {
  xs: "--spacing-xs",
  sm: "--spacing-sm",
  md: "--spacing-md",
  lg: "--spacing-lg",
  xl: "--spacing-xl",
  layoutSmall: "--spacing-layouts-sm",
  layoutMedium: "--spacing-layouts-md",
  layoutLarge: "--spacing-layouts-lg",
};

export const defaultSpacingTokens: SpacingTokens = {
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  layoutSmall: "24px",
  layoutMedium: "36px",
  layoutLarge: "48px",
};

export const spacingTokens: SpacingTokens = {
  xs: `var(${spacingCssVariables.xs}, ${defaultSpacingTokens.xs})`,
  sm: `var(${spacingCssVariables.sm}, ${defaultSpacingTokens.sm})`,
  md: `var(${spacingCssVariables.md}, ${defaultSpacingTokens.md})`,
  lg: `var(${spacingCssVariables.lg}, ${defaultSpacingTokens.lg})`,
  xl: `var(${spacingCssVariables.xl}, ${defaultSpacingTokens.xl})`,
  layoutSmall: `var(${spacingCssVariables.layoutSmall}, ${defaultSpacingTokens.layoutSmall})`,
  layoutMedium: `var(${spacingCssVariables.layoutMedium}, ${defaultSpacingTokens.layoutMedium})`,
  layoutLarge: `var(${spacingCssVariables.layoutLarge}, ${defaultSpacingTokens.layoutLarge})`,
};
