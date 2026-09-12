import { wondesignLight } from "@wondesign/colors";

import { colorCssVariables, colorTokens } from "@/models/colors";
import {
  defaultElevationTokens,
  elevationCssVariables,
  elevationTokens,
} from "@/models/elevation";
import {
  defaultRadiusTokens,
  radiusCssVariables,
  radiusTokens,
} from "@/models/radius";
import {
  defaultSpacingTokens,
  spacingCssVariables,
  spacingTokens,
} from "@/models/spacing";
import { defaultTextTokens, textCssVariables, textTokens } from "@/models/text";
import {
  defaultTypographyTokens,
  typographyCssVariables,
  typographyTokens,
} from "@/models/typography";
import { tokens, mediaQueries } from "@/tokens";

describe("tokens", () => {
  describe("color", () => {
    it("colorTokens values are css variables with colorCssVariables and defaults", () => {
      for (const key in colorCssVariables) {
        const tokenValue = colorTokens[key as keyof typeof colorTokens];
        const cssVariable =
          colorCssVariables[key as keyof typeof colorCssVariables];
        const defaultValue = wondesignLight[key as keyof typeof wondesignLight];
        expect(tokenValue).toBeDefined();
        expect(typeof tokenValue).toBe("string");
        expect(tokenValue).toBe(`var(${cssVariable}, ${defaultValue})`);
      }
    });
  });

  describe("elevation", () => {
    it("elevationTokens values are css variables with elevationCssVariables and defaults", () => {
      for (const key in elevationCssVariables) {
        const tokenValue = elevationTokens[key as keyof typeof elevationTokens];
        const cssVariable =
          elevationCssVariables[key as keyof typeof elevationCssVariables];
        const defaultValue =
          defaultElevationTokens[key as keyof typeof defaultElevationTokens];
        expect(tokenValue).toBeDefined();
        expect(typeof tokenValue).toBe("string");
        expect(tokenValue).toBe(`var(${cssVariable}, ${defaultValue})`);
      }
    });
  });

  describe("radius", () => {
    it("radiusTokens values are css variables with radiusCssVariables and defaults", () => {
      for (const key in radiusCssVariables) {
        const tokenValue = radiusTokens[key as keyof typeof radiusTokens];
        const cssVariable =
          radiusCssVariables[key as keyof typeof radiusCssVariables];
        const defaultValue =
          defaultRadiusTokens[key as keyof typeof defaultRadiusTokens];
        expect(tokenValue).toBeDefined();
        expect(typeof tokenValue).toBe("string");
        expect(tokenValue).toBe(`var(${cssVariable}, ${defaultValue})`);
      }
    });
  });

  describe("spacing", () => {
    it("spacingTokens values are css variables with spacingCssVariables and defaults", () => {
      for (const key in spacingCssVariables) {
        const tokenValue = spacingTokens[key as keyof typeof spacingTokens];
        const cssVariable =
          spacingCssVariables[key as keyof typeof spacingCssVariables];
        const defaultValue =
          defaultSpacingTokens[key as keyof typeof defaultSpacingTokens];
        expect(tokenValue).toBeDefined();
        expect(typeof tokenValue).toBe("string");
        expect(tokenValue).toBe(`var(${cssVariable}, ${defaultValue})`);
      }
    });
  });

  describe("text", () => {
    it("textTokens values are css variables with textCssVariables and defaults", () => {
      for (const key in textCssVariables) {
        const tokenValue = textTokens[key as keyof typeof textTokens];
        const cssVariable =
          textCssVariables[key as keyof typeof textCssVariables];
        const defaultValue =
          defaultTextTokens[key as keyof typeof defaultTextTokens];
        expect(tokenValue).toBeDefined();
        expect(typeof tokenValue).toBe("string");
        expect(tokenValue).toBe(`var(${cssVariable}, ${defaultValue})`);
      }
    });
  });

  describe("typography", () => {
    it("typographyTokens values are css variables with typographyCssVariables and defaults", () => {
      // typography tokens are differently structured: one more level of nesting (e.g. typographyTokens.heading1.fontSize)
      for (const key in typographyCssVariables) {
        const tokenValue =
          typographyTokens[key as keyof typeof typographyTokens];
        const cssVariable =
          typographyCssVariables[key as keyof typeof typographyCssVariables];
        const defaultValue =
          defaultTypographyTokens[key as keyof typeof defaultTypographyTokens];
        expect(tokenValue).toBeDefined();
        expect(typeof tokenValue).toBe("object");
        for (const subKey in cssVariable) {
          const subTokenValue = tokenValue[subKey as keyof typeof tokenValue];
          const subCssVariable =
            cssVariable[subKey as keyof typeof cssVariable];
          const subDefaultValue =
            defaultValue[subKey as keyof typeof defaultValue];
          expect(subTokenValue).toBeDefined();
          expect(typeof subTokenValue).toBe("string");
          expect(subTokenValue).toBe(
            `var(${subCssVariable}, ${subDefaultValue})`,
          );
        }
      }
    });
  });

  describe("design tokens", () => {
    it("tokens object should have all token categories with correct values", () => {
      expect(tokens).toBeDefined();
      expect(tokens.colors).toEqual(colorTokens);
      expect(tokens.elevation).toEqual(elevationTokens);
      expect(tokens.radius).toEqual(radiusTokens);
      expect(tokens.spacing).toEqual(spacingTokens);
      expect(tokens.text).toEqual(textTokens);
      expect(tokens.typography).toEqual(typographyTokens);
    });
  });

  describe("media queries", () => {
    it("mediaQueries should have breakpoints and hoverable", () => {
      expect(mediaQueries).toBeDefined();
      expect(mediaQueries.breakpoints).toBeDefined();
      expect(mediaQueries.hoverable).toBeDefined();
      expect(typeof mediaQueries.breakpoints).toBe("object");
      expect(typeof mediaQueries.hoverable).toBe("string");
    });
  });
});
