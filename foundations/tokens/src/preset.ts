import { wondesignDark, wondesignLight } from "./models/colors/tokens";
import { mergeLightDark } from "./models/colors/utils";
import { defaultTypography } from "./models/typography";
import { buildCssVariables } from "./css-variables";

const colors = mergeLightDark(wondesignLight, wondesignDark);

const typography = {
  ...defaultTypography,
  fontFamily: {
    brand: '"Kalam", "Kalam Fallback"',
    normal: '"Google Sans", system-ui',
    code: '"JetBrains Mono", monospace',
    quote: '"Roboto Slab", serif',
  },
};

export const wondesignTokenVariables = buildCssVariables({
  colors,
  typography,
});
