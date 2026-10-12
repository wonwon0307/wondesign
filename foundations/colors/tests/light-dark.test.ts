import { wondesignDark } from "@/presets/wondesign-dark";
import { wondesignLight } from "@/presets/wondesign-light";
import type { SemanticColors } from "@/types";
import { mergeLightDark } from "@/utils/light-dark";

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
    interface BrandColors extends SemanticColors {
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
