import { mediaQueries } from "@/queries";

describe("media queries", () => {
  it("mediaQueries should have breakpoints, hoverable and reducedMotion", () => {
    expect(mediaQueries).toBeDefined();
    expect(mediaQueries.breakpoints).toBeDefined();
    expect(mediaQueries.hoverable).toBeDefined();
    expect(mediaQueries.reducedMotion).toBeDefined();
    expect(typeof mediaQueries.breakpoints).toBe("object");
    expect(typeof mediaQueries.hoverable).toBe("string");
    expect(typeof mediaQueries.reducedMotion).toBe("string");
  });
});
