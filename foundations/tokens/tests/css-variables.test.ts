import { buildCssVariables } from "@/css-variables";
import { wondesignDark, wondesignLight } from "@/models/colors/tokens";
import type { ColorTokens } from "@/models/colors/types";
import { mergeLightDark } from "@/models/colors/utils";
import { defaultSpacing, type SpacingTokens } from "@/models/spacing";
import { defaultTypography, type TypographyTokens } from "@/models/typography";
import { defaultZIndex, type ZIndexTokens } from "@/models/z-index";
import { wondesignTokenVariables } from "@/preset";

describe("css variables", () => {
  it("wondesignTokenVariables should be a string of CSS variables", () => {
    expect(wondesignTokenVariables).toBeDefined();

    // test one of each group
    expect(wondesignTokenVariables).toContain(
      "--color-primary: light-dark(#1647E8, #3B82F6)",
    );
    expect(wondesignTokenVariables).toContain(
      "--elevation-lv1: 0px 1px 3px rgba(127, 127, 127, 0.2)",
    );
    expect(wondesignTokenVariables).toContain("--radius-sm: 4px");
    expect(wondesignTokenVariables).toContain("--spacing-md: 8px");
    expect(wondesignTokenVariables).toContain("--font-size-heading-sm: 1.5rem");
  });

  it("buildCssVariables should name extended color roles after their key", () => {
    interface BrandColors extends ColorTokens {
      secondary: string;
      onSecondary: string;
    }

    const brandLight: BrandColors = {
      ...wondesignLight,
      secondary: "#7C3AED",
      onSecondary: "#FFFFFF",
    };
    const brandDark: BrandColors = {
      ...wondesignDark,
      secondary: "#A78BFA",
      onSecondary: "#000000",
    };

    const result = buildCssVariables({
      colors: mergeLightDark(brandLight, brandDark),
    });

    expect(result).toContain(
      "--color-secondary: light-dark(#7C3AED, #A78BFA);",
    );
    expect(result).toContain(
      "--color-on-secondary: light-dark(#FFFFFF, #000000);",
    );
    expect(result).not.toContain("undefined");
  });

  it("buildCssVariables should name extended tokens of every category after their key", () => {
    interface BrandSpacing extends SpacingTokens {
      layoutExtraLarge: string;
    }
    interface BrandZIndex extends ZIndexTokens {
      commandPalette: string;
    }
    interface BrandTypography extends TypographyTokens {
      fontSize: TypographyTokens["fontSize"] & { display: string };
      letterSpacing: { tight: string; wide: string };
    }

    const spacing: BrandSpacing = {
      ...defaultSpacing,
      layoutExtraLarge: "96px",
    };
    const zIndex: BrandZIndex = { ...defaultZIndex, commandPalette: "1100" };
    const typography: BrandTypography = {
      ...defaultTypography,
      fontSize: { ...defaultTypography.fontSize, display: "3rem" },
      letterSpacing: { tight: "-0.02em", wide: "0.04em" },
    };

    const result = buildCssVariables({ spacing, zIndex, typography });

    // flat categories
    expect(result).toContain("--spacing-layout-extra-large: 96px;");
    expect(result).toContain("--z-index-command-palette: 1100;");
    // new key in an existing typography group
    expect(result).toContain("--font-size-display: 3rem;");
    // new typography group
    expect(result).toContain("--letter-spacing-tight: -0.02em;");
    expect(result).toContain("--letter-spacing-wide: 0.04em;");
    expect(result).not.toContain("undefined");
  });
});
