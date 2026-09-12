import { buildCssVariables, type ThemeInput } from "./css-variables";

const STYLE_TAG_ID = "wondesign-tokens";

export function applyTokens(theme: ThemeInput = {}, selector = ":root"): void {
  const css = buildCssVariables(theme, selector);
  let style = document.getElementById(STYLE_TAG_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_TAG_ID;
    document.head.appendChild(style);
  }
  style.textContent = css;
}
