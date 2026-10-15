export interface RadiusTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export const radiusCssVariables: RadiusTokens = {
  xs: "--radius-xs",
  sm: "--radius-sm",
  md: "--radius-md",
  lg: "--radius-lg",
  xl: "--radius-xl",
  full: "--radius-full",
};

export const defaultRadius: RadiusTokens = {
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px",
};

export const radiusTokens: RadiusTokens = {
  xs: `var(${radiusCssVariables.xs}, ${defaultRadius.xs})`,
  sm: `var(${radiusCssVariables.sm}, ${defaultRadius.sm})`,
  md: `var(${radiusCssVariables.md}, ${defaultRadius.md})`,
  lg: `var(${radiusCssVariables.lg}, ${defaultRadius.lg})`,
  xl: `var(${radiusCssVariables.xl}, ${defaultRadius.xl})`,
  full: `var(${radiusCssVariables.full}, ${defaultRadius.full})`,
};
