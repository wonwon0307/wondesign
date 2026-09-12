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

export const defaultRadiusTokens: RadiusTokens = {
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "50%",
};

export const radiusTokens: RadiusTokens = {
  xs: `var(${radiusCssVariables.xs}, ${defaultRadiusTokens.xs})`,
  sm: `var(${radiusCssVariables.sm}, ${defaultRadiusTokens.sm})`,
  md: `var(${radiusCssVariables.md}, ${defaultRadiusTokens.md})`,
  lg: `var(${radiusCssVariables.lg}, ${defaultRadiusTokens.lg})`,
  xl: `var(${radiusCssVariables.xl}, ${defaultRadiusTokens.xl})`,
  full: `var(${radiusCssVariables.full}, ${defaultRadiusTokens.full})`,
};
