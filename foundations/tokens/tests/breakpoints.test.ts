import {
  createBreakpointQueries,
  createSimpleBreakpointQueries,
} from "@/models/breakpoints/queries";

describe("breakpoint-queries", () => {
  it("createSimpleBreakpointQueries should return simple breakpoint queries", () => {
    const result = createSimpleBreakpointQueries({
      sm: "600px",
      lg: "1024px",
    });
    expect(result).toEqual({
      small: "screen and (width < 600px)",
      medium: "screen and (600px <= width < 1024px)",
      large: "screen and (width >= 1024px)",
      notSmall: "screen and (width >= 600px)",
      notLarge: "screen and (width < 1024px)",
    });
  });

  it("createSimpleBreakpointQueries should return default simple breakpoint queries", () => {
    const result = createSimpleBreakpointQueries();
    expect(result).toEqual({
      small: "screen and (width < 768px)",
      medium: "screen and (768px <= width < 1280px)",
      large: "screen and (width >= 1280px)",
      notSmall: "screen and (width >= 768px)",
      notLarge: "screen and (width < 1280px)",
    });
  });

  it("createBreakpointQueries should return breakpoint queries", () => {
    const result = createBreakpointQueries({
      xs: "480px",
      sm: "600px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    });
    expect(result).toEqual({
      mobilePortrait: {
        only: "screen and (width < 480px)",
      },
      mobileLandscape: {
        only: "screen and (480px <= width < 600px)",
        andSmaller: "screen and (width < 600px)",
        andLarger: "screen and (width >= 480px)",
      },
      tabletPortrait: {
        only: "screen and (600px <= width < 768px)",
        andSmaller: "screen and (width < 768px)",
        andLarger: "screen and (width >= 600px)",
      },
      tabletLandscape: {
        only: "screen and (768px <= width < 1024px)",
        andSmaller: "screen and (width < 1024px)",
        andLarger: "screen and (width >= 768px)",
      },
      laptop: {
        only: "screen and (1024px <= width < 1280px)",
        andSmaller: "screen and (width < 1280px)",
        andLarger: "screen and (width >= 1024px)",
      },
      desktop: {
        only: "screen and (width >= 1280px)",
      },
    });
  });

  it("createBreakpointQueries should return default breakpoint queries", () => {
    const result = createBreakpointQueries();
    expect(result).toEqual({
      mobilePortrait: {
        only: "screen and (width < 480px)",
      },
      mobileLandscape: {
        only: "screen and (480px <= width < 768px)",
        andSmaller: "screen and (width < 768px)",
        andLarger: "screen and (width >= 480px)",
      },
      tabletPortrait: {
        only: "screen and (768px <= width < 1024px)",
        andSmaller: "screen and (width < 1024px)",
        andLarger: "screen and (width >= 768px)",
      },
      tabletLandscape: {
        only: "screen and (1024px <= width < 1280px)",
        andSmaller: "screen and (width < 1280px)",
        andLarger: "screen and (width >= 1024px)",
      },
      laptop: {
        only: "screen and (1280px <= width < 1440px)",
        andSmaller: "screen and (width < 1440px)",
        andLarger: "screen and (width >= 1280px)",
      },
      desktop: {
        only: "screen and (width >= 1440px)",
      },
    });
  });
});
