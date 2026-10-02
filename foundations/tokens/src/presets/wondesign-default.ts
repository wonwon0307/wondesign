import {
  convertToLightDark,
  wondesignDark,
  wondesignLight,
} from "@wondesign/colors";

import {
  defaultTypographyTokens,
  type TypographyTokens,
} from "@/models/typography";
import { buildCssVariables } from "@/utils/css-variables";

const colors = convertToLightDark(wondesignLight, wondesignDark);

// WonDesign에서는 typography와 text는 별도의 토큰을 사용한다.
const typography: TypographyTokens = {
  ...defaultTypographyTokens,
  fontFamily: {
    brand: '"Kalam", "Kalam Fallback"',
    normal: '"Google Sans", system-ui',
    code: '"JetBrains Mono", monospace',
    quote: '"Roboto Slab", serif',
  },
};

// Use default tokens for other groups
export const wondesignDefault = buildCssVariables({
  colors,
  typography,
});
