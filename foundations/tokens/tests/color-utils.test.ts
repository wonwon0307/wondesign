import { wondesignLight, wondesignDark } from "@/models/colors/tokens";
import {
  colorWithFade,
  colorWithOpacity,
  mergeLightDark,
} from "@/models/colors/utils";
import type { ColorTokens } from "@/models/colors/types";

describe("color-with-fade", () => {
  it("colorWithFade should return color with fade", () => {
    const result = colorWithFade("#ff0000", 0.5);
    expect(result).toBe(
      "color-mix(in srgb, #ff0000 50%, light-dark(#ffffff, #000000))",
    );
  });

  it("should clamp the ratio between 0 and 1", () => {
    const resultLow = colorWithFade("#ff0000", -0.5);
    expect(resultLow).toBe(
      "color-mix(in srgb, #ff0000 0%, light-dark(#ffffff, #000000))",
    );

    const resultHigh = colorWithFade("#ff0000", 1.5);
    expect(resultHigh).toBe(
      "color-mix(in srgb, #ff0000 100%, light-dark(#ffffff, #000000))",
    );
  });
});

describe("color-with-opacity", () => {
  it("colorWithOpacity should return color with opacity", () => {
    const result = colorWithOpacity("#ff0000", 0.5);
    expect(result).toBe("color-mix(in srgb, #ff0000 50%, transparent)");
  });
});

describe("light-dark", () => {
  it("mergeLightDark should return light-dark colors", () => {
    const result = mergeLightDark(wondesignLight, wondesignDark);

    for (const key in wondesignLight) {
      const lightValue = wondesignLight[key as keyof typeof wondesignLight];
      const darkValue = wondesignDark[key as keyof typeof wondesignDark];
      const expectedValue = `light-dark(${lightValue}, ${darkValue})`;

      expect(result[key as keyof typeof result]).toBe(expectedValue);
    }
  });

  it("mergeLightDark should keep extended roles", () => {
    interface BrandColors extends ColorTokens {
      secondary: string;
    }

    const brandLight: BrandColors = { ...wondesignLight, secondary: "#7C3AED" };
    const brandDark: BrandColors = { ...wondesignDark, secondary: "#A78BFA" };

    const result = mergeLightDark(brandLight, brandDark);

    expect(result.secondary).toBe("light-dark(#7C3AED, #A78BFA)");
    expect(result.primary).toBe(
      `light-dark(${wondesignLight.primary}, ${wondesignDark.primary})`,
    );
  });
});
