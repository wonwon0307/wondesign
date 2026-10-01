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

export const defaultOpacityTokens: Record<keyof OpacityTokens, number> = {
  hide: 0,
  disabled: 0.4,
  pending: 0.6,
  normal: 1,
};

export const opacityTokens: OpacityTokens = {
  hide: `var(${opacityCssVariables.hide}, ${defaultOpacityTokens.hide})`,
  disabled: `var(${opacityCssVariables.disabled}, ${defaultOpacityTokens.disabled})`,
  pending: `var(${opacityCssVariables.pending}, ${defaultOpacityTokens.pending})`,
  normal: `var(${opacityCssVariables.normal}, ${defaultOpacityTokens.normal})`,
};
