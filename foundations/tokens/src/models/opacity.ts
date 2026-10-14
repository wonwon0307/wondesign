export interface OpacityTokens {
  hide: string;
  disabled: string;
  pending: string;
  normal: string;
}

export const opacityCssVariables: OpacityTokens = {
  hide: "--opacity-hide",
  disabled: "--opacity-disabled",
  pending: "--opacity-pending",
  normal: "--opacity-normal",
};

export const defaultOpacity: OpacityTokens = {
  hide: "0",
  disabled: "0.4",
  pending: "0.6",
  normal: "1",
};

export const opacityTokens: OpacityTokens = {
  hide: `var(${opacityCssVariables.hide}, ${defaultOpacity.hide})`,
  disabled: `var(${opacityCssVariables.disabled}, ${defaultOpacity.disabled})`,
  pending: `var(${opacityCssVariables.pending}, ${defaultOpacity.pending})`,
  normal: `var(${opacityCssVariables.normal}, ${defaultOpacity.normal})`,
};
