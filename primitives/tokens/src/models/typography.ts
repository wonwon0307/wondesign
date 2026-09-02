export interface TypographyTokens {
  fontSize: {
    headingSmall: string;
    headingMedium: string;
    headingLarge: string;
    bodySmall: string;
    bodyMedium: string;
    bodyLarge: string;
  };
  lineHeight: {
    headingSmall: string;
    headingMedium: string;
    headingLarge: string;
    bodySmall: string;
    bodyMedium: string;
    bodyLarge: string;
  };
  fontWeight: {
    regular: string;
    semibold: string;
    bold: string;
  };
  fontFamily: {
    brand: string;
    normal: string;
    code: string;
    quote: string;
  };
}

export const typographyCssVariables: TypographyTokens = {
  fontSize: {
    headingSmall: "--font-size-heading-sm",
    headingMedium: "--font-size-heading-md",
    headingLarge: "--font-size-heading-lg",
    bodySmall: "--font-size-body-sm",
    bodyMedium: "--font-size-body-md",
    bodyLarge: "--font-size-body-lg",
  },
  lineHeight: {
    headingSmall: "--line-height-heading-sm",
    headingMedium: "--line-height-heading-md",
    headingLarge: "--line-height-heading-lg",
    bodySmall: "--line-height-body-sm",
    bodyMedium: "--line-height-body-md",
    bodyLarge: "--line-height-body-lg",
  },
  fontWeight: {
    regular: "--font-weight-regular",
    semibold: "--font-weight-semibold",
    bold: "--font-weight-bold",
  },
  fontFamily: {
    brand: "--font-family-brand",
    normal: "--font-family-normal",
    code: "--font-family-code",
    quote: "--font-family-quote",
  },
};

export const defaultTypographyTokens: TypographyTokens = {
  fontSize: {
    headingSmall: "1.25rem",
    headingMedium: "1.5rem",
    headingLarge: "1.75rem",
    bodySmall: "0.75rem",
    bodyMedium: "0.875rem",
    bodyLarge: "1rem",
  },
  lineHeight: {
    headingSmall: "1.75rem",
    headingMedium: "2rem",
    headingLarge: "2.5rem",
    bodySmall: "1.25rem",
    bodyMedium: "1.375rem",
    bodyLarge: "1.5rem",
  },
  fontWeight: {
    regular: "400, normal",
    semibold: "600, bold",
    bold: "800, bold",
  },
  fontFamily: {
    brand: "Brush Script, cursive",
    normal: "Arial, sans-serif",
    code: "'Courier New', monospace",
    quote: "'Georgia', serif",
  },
};

export const typographyTokens: TypographyTokens = {
  fontSize: {
    headingSmall: `var(${typographyCssVariables.fontSize.headingSmall}, ${defaultTypographyTokens.fontSize.headingSmall})`,
    headingMedium: `var(${typographyCssVariables.fontSize.headingMedium}, ${defaultTypographyTokens.fontSize.headingMedium})`,
    headingLarge: `var(${typographyCssVariables.fontSize.headingLarge}, ${defaultTypographyTokens.fontSize.headingLarge})`,
    bodySmall: `var(${typographyCssVariables.fontSize.bodySmall}, ${defaultTypographyTokens.fontSize.bodySmall})`,
    bodyMedium: `var(${typographyCssVariables.fontSize.bodyMedium}, ${defaultTypographyTokens.fontSize.bodyMedium})`,
    bodyLarge: `var(${typographyCssVariables.fontSize.bodyLarge}, ${defaultTypographyTokens.fontSize.bodyLarge})`,
  },
  lineHeight: {
    headingSmall: `var(${typographyCssVariables.lineHeight.headingSmall}, ${defaultTypographyTokens.lineHeight.headingSmall})`,
    headingMedium: `var(${typographyCssVariables.lineHeight.headingMedium}, ${defaultTypographyTokens.lineHeight.headingMedium})`,
    headingLarge: `var(${typographyCssVariables.lineHeight.headingLarge}, ${defaultTypographyTokens.lineHeight.headingLarge})`,
    bodySmall: `var(${typographyCssVariables.lineHeight.bodySmall}, ${defaultTypographyTokens.lineHeight.bodySmall})`,
    bodyMedium: `var(${typographyCssVariables.lineHeight.bodyMedium}, ${defaultTypographyTokens.lineHeight.bodyMedium})`,
    bodyLarge: `var(${typographyCssVariables.lineHeight.bodyLarge}, ${defaultTypographyTokens.lineHeight.bodyLarge})`,
  },
  fontWeight: {
    regular: `var(${typographyCssVariables.fontWeight.regular}, ${defaultTypographyTokens.fontWeight.regular})`,
    semibold: `var(${typographyCssVariables.fontWeight.semibold}, ${defaultTypographyTokens.fontWeight.semibold})`,
    bold: `var(${typographyCssVariables.fontWeight.bold}, ${defaultTypographyTokens.fontWeight.bold})`,
  },
  fontFamily: {
    brand: `var(${typographyCssVariables.fontFamily.brand}, ${defaultTypographyTokens.fontFamily.brand})`,
    normal: `var(${typographyCssVariables.fontFamily.normal}, ${defaultTypographyTokens.fontFamily.normal})`,
    code: `var(${typographyCssVariables.fontFamily.code}, ${defaultTypographyTokens.fontFamily.code})`,
    quote: `var(${typographyCssVariables.fontFamily.quote}, ${defaultTypographyTokens.fontFamily.quote})`,
  },
};
