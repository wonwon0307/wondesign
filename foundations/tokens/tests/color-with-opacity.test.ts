import { colorWithOpacity } from "@/utils/color-with-opacity";

describe("color-with-opacity", () => {
  it("colorWithOpacity should return color with opacity", () => {
    const result = colorWithOpacity("#ff0000", 50);
    expect(result).toBe(
      "color-mix(in srgb, #ff0000 50%, light-dark(#ffffff, #000000))",
    );
  });
});
