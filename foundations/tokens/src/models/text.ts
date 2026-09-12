export interface TextTokens {
  // headings
  hero: string;
  titleLarge: string;
  titleMedium: string;
  titleSmall: string;
  // body
  bodyLarge: string;
  bodyMedium: string;
  bodySmall: string;
  description: string;
  // others
  codeLarge: string;
  codeSmall: string;
  quoteLarge: string;
  quoteSmall: string;
}

export const textCssVariables: TextTokens = {
  hero: "--text-hero",
  titleLarge: "--text-title-large",
  titleMedium: "--text-title-medium",
  titleSmall: "--text-title-small",
  bodyLarge: "--text-body-large",
  bodyMedium: "--text-body-medium",
  bodySmall: "--text-body-small",
  description: "--text-description",
  codeLarge: "--text-code-large",
  codeSmall: "--text-code-small",
  quoteLarge: "--text-quote-large",
  quoteSmall: "--text-quote-small",
};

export const defaultTextTokens: TextTokens = {
  hero: "800 3rem/3.6rem Brush Script, cursive",
  titleLarge: "600 2.5rem/2.7rem Arial, sans-serif",
  titleMedium: "600 2rem/2.4rem Arial, sans-serif",
  titleSmall: "600 1.5rem/1.8rem Arial, sans-serif",
  bodyLarge: "400 1.125rem/1.5rem Arial, sans-serif",
  bodyMedium: "400 1rem/1.5rem Arial, sans-serif",
  bodySmall: "400 0.875rem/1.25rem Arial, sans-serif",
  description: "400 0.75rem/1rem Arial, sans-serif",
  codeLarge: "400 1.125rem/1.5rem 'Courier New', monospace",
  codeSmall: "400 0.875rem/1.25rem 'Courier New', monospace",
  quoteLarge: "400 1.125rem/1.5rem 'Georgia', serif",
  quoteSmall: "400 0.875rem/1.25rem 'Georgia', serif",
};

export const textTokens: TextTokens = {
  hero: `var(${textCssVariables.hero}, ${defaultTextTokens.hero})`,
  titleLarge: `var(${textCssVariables.titleLarge}, ${defaultTextTokens.titleLarge})`,
  titleMedium: `var(${textCssVariables.titleMedium}, ${defaultTextTokens.titleMedium})`,
  titleSmall: `var(${textCssVariables.titleSmall}, ${defaultTextTokens.titleSmall})`,
  bodyLarge: `var(${textCssVariables.bodyLarge}, ${defaultTextTokens.bodyLarge})`,
  bodyMedium: `var(${textCssVariables.bodyMedium}, ${defaultTextTokens.bodyMedium})`,
  bodySmall: `var(${textCssVariables.bodySmall}, ${defaultTextTokens.bodySmall})`,
  description: `var(${textCssVariables.description}, ${defaultTextTokens.description})`,
  codeLarge: `var(${textCssVariables.codeLarge}, ${defaultTextTokens.codeLarge})`,
  codeSmall: `var(${textCssVariables.codeSmall}, ${defaultTextTokens.codeSmall})`,
  quoteLarge: `var(${textCssVariables.quoteLarge}, ${defaultTextTokens.quoteLarge})`,
  quoteSmall: `var(${textCssVariables.quoteSmall}, ${defaultTextTokens.quoteSmall})`,
};
