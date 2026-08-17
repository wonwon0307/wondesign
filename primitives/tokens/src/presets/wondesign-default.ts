import {
  convertToLightDark,
  wondesignDark,
  wondesignLight,
} from "@wondesign/colors";

import type { TextTokens } from "@/models/text";
import type { TypographyTokens } from "@/models/typography";
import { buildCssVariables } from "@/utils/css-variables";

const colors = convertToLightDark(wondesignLight, wondesignDark);

const typography: TypographyTokens = {
  fontSize: {
    headingSmall: "1.25rem",
    headingMedium: "1.5rem",
    headingLarge: "1.75rem",
    bodySmall: "0.875rem",
    bodyMedium: "1rem",
    bodyLarge: "1.125rem",
  },
  lineHeight: {
    headingSmall: "1.8rem",
    headingMedium: "2.1rem",
    headingLarge: "2.4rem",
    bodySmall: "1.25rem",
    bodyMedium: "1.5rem",
    bodyLarge: "1.5rem",
  },
  fontWeight: {
    regular: "400",
    semibold: "500",
    bold: "700",
  },
  fontFamily: {
    brand: '"Kalam", "Kalam Fallback"',
    normal: '"Google Sans", system-ui',
    code: '"JetBrains Mono", monospace',
    quote: '"Roboto Slab", serif',
  },
};

const text: TextTokens = {
  hero: `${typography.fontWeight.bold} ${typography.fontSize.headingLarge}/${typography.lineHeight.headingLarge} ${typography.fontFamily.brand}`,
  titleLarge: `${typography.fontWeight.bold} ${typography.fontSize.headingLarge}/${typography.lineHeight.headingLarge} ${typography.fontFamily.normal}`,
  titleMedium: `${typography.fontWeight.bold} ${typography.fontSize.headingMedium}/${typography.lineHeight.headingMedium} ${typography.fontFamily.normal}`,
  titleSmall: `${typography.fontWeight.bold} ${typography.fontSize.headingSmall}/${typography.lineHeight.headingSmall} ${typography.fontFamily.normal}`,
  bodyLarge: `${typography.fontWeight.regular} ${typography.fontSize.bodyLarge}/${typography.lineHeight.bodyLarge} ${typography.fontFamily.normal}`,
  bodyMedium: `${typography.fontWeight.regular} ${typography.fontSize.bodyMedium}/${typography.lineHeight.bodyMedium} ${typography.fontFamily.normal}`,
  bodySmall: `${typography.fontWeight.regular} ${typography.fontSize.bodySmall}/${typography.lineHeight.bodySmall} ${typography.fontFamily.normal}`,
  description: `${typography.fontWeight.regular} 0.75rem/1rem ${typography.fontFamily.normal}`,
  codeLarge: `${typography.fontWeight.regular} ${typography.fontSize.bodySmall}/${typography.fontSize.bodySmall} ${typography.fontFamily.code}`,
  codeSmall: `${typography.fontWeight.regular} 0.75rem/0.75rem ${typography.fontFamily.code}`,
  quoteLarge: `${typography.fontWeight.regular} ${typography.fontSize.bodyLarge}/${typography.lineHeight.bodyLarge} ${typography.fontFamily.quote}`,
  quoteSmall: `${typography.fontWeight.regular} ${typography.fontSize.bodySmall}/${typography.lineHeight.bodySmall} ${typography.fontFamily.quote}`,
};

// Use default tokens for other groups
export const wondesignDefault = buildCssVariables({
  colors,
  text,
  typography,
});
