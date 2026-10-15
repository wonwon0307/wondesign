export interface ZIndexTokens {
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
}

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

export const defaultZIndex: ZIndexTokens = {
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
  hidden: `var(${zIndexCssVariables.hidden}, ${defaultZIndex.hidden})`,
  sticky: `var(${zIndexCssVariables.sticky}, ${defaultZIndex.sticky})`,
  menu: `var(${zIndexCssVariables.menu}, ${defaultZIndex.menu})`,
  dropdown: `var(${zIndexCssVariables.dropdown}, ${defaultZIndex.dropdown})`,
  popover: `var(${zIndexCssVariables.popover}, ${defaultZIndex.popover})`,
  tooltip: `var(${zIndexCssVariables.tooltip}, ${defaultZIndex.tooltip})`,
  overlay: `var(${zIndexCssVariables.overlay}, ${defaultZIndex.overlay})`,
  modal: `var(${zIndexCssVariables.modal}, ${defaultZIndex.modal})`,
  toast: `var(${zIndexCssVariables.toast}, ${defaultZIndex.toast})`,
  alert: `var(${zIndexCssVariables.alert}, ${defaultZIndex.alert})`,
};
