export interface TypographyTokens {
  fontSize: {
    bodyExtraSmall: string;
    bodySmall: string;
    bodyMedium: string;
    bodyLarge: string;
    bodyExtraLarge: string;
    headingSmall: string;
    headingMedium: string;
    headingLarge: string;
  };
  lineHeight: {
    single: string;
    heading: string;
    title: string;
    body: string;
    paragraph: string;
  };
  fontWeight: {
    regular: string;
    medium: string;
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
    bodyExtraSmall: "--font-size-body-xs",
    bodySmall: "--font-size-body-sm",
    bodyMedium: "--font-size-body-md",
    bodyLarge: "--font-size-body-lg",
    bodyExtraLarge: "--font-size-body-xl",
    headingSmall: "--font-size-heading-sm",
    headingMedium: "--font-size-heading-md",
    headingLarge: "--font-size-heading-lg",
  },
  lineHeight: {
    single: "--line-height-single",
    heading: "--line-height-heading",
    title: "--line-height-title",
    body: "--line-height-body",
    paragraph: "--line-height-paragraph",
  },
  fontWeight: {
    regular: "--font-weight-regular",
    medium: "--font-weight-medium",
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
    bodyExtraSmall: "0.75rem",
    bodySmall: "0.875rem",
    bodyMedium: "1rem",
    bodyLarge: "1.125rem",
    bodyExtraLarge: "1.25rem",
    headingSmall: "1.5rem",
    headingMedium: "1.75rem",
    headingLarge: "2rem",
  },
  lineHeight: {
    single: "1",
    heading: "1.2",
    title: "1.35",
    body: "1.5",
    paragraph: "1.7",
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
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
    bodyExtraSmall: `var(${typographyCssVariables.fontSize.bodyExtraSmall}, ${defaultTypographyTokens.fontSize.bodyExtraSmall})`,
    bodySmall: `var(${typographyCssVariables.fontSize.bodySmall}, ${defaultTypographyTokens.fontSize.bodySmall})`,
    bodyMedium: `var(${typographyCssVariables.fontSize.bodyMedium}, ${defaultTypographyTokens.fontSize.bodyMedium})`,
    bodyLarge: `var(${typographyCssVariables.fontSize.bodyLarge}, ${defaultTypographyTokens.fontSize.bodyLarge})`,
    bodyExtraLarge: `var(${typographyCssVariables.fontSize.bodyExtraLarge}, ${defaultTypographyTokens.fontSize.bodyExtraLarge})`,
    headingSmall: `var(${typographyCssVariables.fontSize.headingSmall}, ${defaultTypographyTokens.fontSize.headingSmall})`,
    headingMedium: `var(${typographyCssVariables.fontSize.headingMedium}, ${defaultTypographyTokens.fontSize.headingMedium})`,
    headingLarge: `var(${typographyCssVariables.fontSize.headingLarge}, ${defaultTypographyTokens.fontSize.headingLarge})`,
  },
  lineHeight: {
    single: `var(${typographyCssVariables.lineHeight.single}, ${defaultTypographyTokens.lineHeight.single})`,
    heading: `var(${typographyCssVariables.lineHeight.heading}, ${defaultTypographyTokens.lineHeight.heading})`,
    title: `var(${typographyCssVariables.lineHeight.title}, ${defaultTypographyTokens.lineHeight.title})`,
    body: `var(${typographyCssVariables.lineHeight.body}, ${defaultTypographyTokens.lineHeight.body})`,
    paragraph: `var(${typographyCssVariables.lineHeight.paragraph}, ${defaultTypographyTokens.lineHeight.paragraph})`,
  },
  fontWeight: {
    regular: `var(${typographyCssVariables.fontWeight.regular}, ${defaultTypographyTokens.fontWeight.regular})`,
    medium: `var(${typographyCssVariables.fontWeight.medium}, ${defaultTypographyTokens.fontWeight.medium})`,
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
