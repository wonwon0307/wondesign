import { colorWithFade, colorWithOpacity } from "@/utils/color-mix";

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
