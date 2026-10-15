export interface SpacingTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  layoutSmall: string;
  layoutMedium: string;
  layoutLarge: string;
}

export const spacingCssVariables: SpacingTokens = {
  xs: "--spacing-xs",
  sm: "--spacing-sm",
  md: "--spacing-md",
  lg: "--spacing-lg",
  xl: "--spacing-xl",
  layoutSmall: "--spacing-layout-sm",
  layoutMedium: "--spacing-layout-md",
  layoutLarge: "--spacing-layout-lg",
};

export const defaultSpacing: SpacingTokens = {
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  layoutSmall: "24px",
  layoutMedium: "48px",
  layoutLarge: "15%",
};

export const spacingTokens: SpacingTokens = {
  xs: `var(${spacingCssVariables.xs}, ${defaultSpacing.xs})`,
  sm: `var(${spacingCssVariables.sm}, ${defaultSpacing.sm})`,
  md: `var(${spacingCssVariables.md}, ${defaultSpacing.md})`,
  lg: `var(${spacingCssVariables.lg}, ${defaultSpacing.lg})`,
  xl: `var(${spacingCssVariables.xl}, ${defaultSpacing.xl})`,
  layoutSmall: `var(${spacingCssVariables.layoutSmall}, ${defaultSpacing.layoutSmall})`,
  layoutMedium: `var(${spacingCssVariables.layoutMedium}, ${defaultSpacing.layoutMedium})`,
  layoutLarge: `var(${spacingCssVariables.layoutLarge}, ${defaultSpacing.layoutLarge})`,
};
