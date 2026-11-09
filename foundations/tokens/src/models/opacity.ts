export interface OpacityTokens {
  hide: string;
  disabled: string;
  pending: string;
  hover: string;
  normal: string;
}

export const opacityCssVariables: OpacityTokens = {
  hide: "--opacity-hide",
  disabled: "--opacity-disabled",
  pending: "--opacity-pending",
  hover: "--opacity-hover",
  normal: "--opacity-normal",
};

export const defaultOpacity: OpacityTokens = {
  hide: "0",
  disabled: "0.5",
  pending: "0.75",
  hover: "0.85",
  normal: "1",
};

export const opacityTokens: OpacityTokens = {
  hide: `var(${opacityCssVariables.hide}, ${defaultOpacity.hide})`,
  disabled: `var(${opacityCssVariables.disabled}, ${defaultOpacity.disabled})`,
  pending: `var(${opacityCssVariables.pending}, ${defaultOpacity.pending})`,
  hover: `var(${opacityCssVariables.hover}, ${defaultOpacity.hover})`,
  normal: `var(${opacityCssVariables.normal}, ${defaultOpacity.normal})`,
};
