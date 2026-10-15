import { mediaQueries } from "@/queries";

describe("media queries", () => {
  it("mediaQueries should have breakpoints and hoverable", () => {
    expect(mediaQueries).toBeDefined();
    expect(mediaQueries.breakpoints).toBeDefined();
    expect(mediaQueries.hoverable).toBeDefined();
    expect(typeof mediaQueries.breakpoints).toBe("object");
    expect(typeof mediaQueries.hoverable).toBe("string");
  });
});
