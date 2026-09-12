import { wondesignDark } from "@/presets/wondesign-dark";
import { wondesignLight } from "@/presets/wondesign-light";
import { convertToLightDark } from "@/utils/light-dark";

describe("light-dark", () => {
  it("convertToLightDark should return light-dark colors", () => {
    const result = convertToLightDark(wondesignLight, wondesignDark);

    for (const key in wondesignLight) {
      const lightValue = wondesignLight[key as keyof typeof wondesignLight];
      const darkValue = wondesignDark[key as keyof typeof wondesignDark];
      const expectedValue = `light-dark(${lightValue}, ${darkValue})`;

      expect(result[key as keyof typeof result]).toBe(expectedValue);
    }
  });
});
