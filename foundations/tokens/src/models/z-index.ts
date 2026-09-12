export type ZIndexTokens = {
  hidden: string;
  sticky: string;
  menu: string;
  dropdown: string;
  popover: string;
  tooltip: string;
  overlay: string;
  modal: string;
  toast: string;
  alert: string;
};

export const zIndexCssVariables: ZIndexTokens = {
  hidden: "--z-index-hidden",
  sticky: "--z-index-sticky",
  menu: "--z-index-menu",
  dropdown: "--z-index-dropdown",
  popover: "--z-index-popover",
  tooltip: "--z-index-tooltip",
  overlay: "--z-index-overlay",
  modal: "--z-index-modal",
  toast: "--z-index-toast",
  alert: "--z-index-alert",
};

export const defaultZIndexTokens: ZIndexTokens = {
  hidden: "-1",
  sticky: "100",
  menu: "200",
  dropdown: "200",
  popover: "200",
  tooltip: "300",
  overlay: "700",
  modal: "800",
  toast: "900",
  alert: "1000",
};

export const zIndexTokens: ZIndexTokens = {
  hidden: `var(${zIndexCssVariables.hidden}, ${defaultZIndexTokens.hidden})`,
  sticky: `var(${zIndexCssVariables.sticky}, ${defaultZIndexTokens.sticky})`,
  menu: `var(${zIndexCssVariables.menu}, ${defaultZIndexTokens.menu})`,
  dropdown: `var(${zIndexCssVariables.dropdown}, ${defaultZIndexTokens.dropdown})`,
  popover: `var(${zIndexCssVariables.popover}, ${defaultZIndexTokens.popover})`,
  tooltip: `var(${zIndexCssVariables.tooltip}, ${defaultZIndexTokens.tooltip})`,
  overlay: `var(${zIndexCssVariables.overlay}, ${defaultZIndexTokens.overlay})`,
  modal: `var(${zIndexCssVariables.modal}, ${defaultZIndexTokens.modal})`,
  toast: `var(${zIndexCssVariables.toast}, ${defaultZIndexTokens.toast})`,
  alert: `var(${zIndexCssVariables.alert}, ${defaultZIndexTokens.alert})`,
};
