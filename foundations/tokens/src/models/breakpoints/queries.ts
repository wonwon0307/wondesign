import type {
  BreakpointQueries,
  BreakpointTokens,
  SimpleBreakpointQueries,
} from "./types";

export function createSimpleBreakpointQueries({
  sm = "768px",
  lg = "1280px",
}: Partial<Pick<BreakpointTokens, "sm" | "lg">> = {}): SimpleBreakpointQueries {
  return {
    small: `screen and (width < ${sm})`,
    medium: `screen and (${sm} <= width < ${lg})`,
    large: `screen and (width >= ${lg})`,
    notSmall: `screen and (width >= ${sm})`,
    notLarge: `screen and (width < ${lg})`,
  };
}

export function createBreakpointQueries({
  xs = "480px",
  sm = "768px",
  md = "1024px",
  lg = "1280px",
  xl = "1440px",
}: Partial<BreakpointTokens> = {}): BreakpointQueries {
  return {
    mobilePortrait: {
      only: `screen and (width < ${xs})`,
    },
    mobileLandscape: {
      only: `screen and (${xs} <= width < ${sm})`,
      andSmaller: `screen and (width < ${sm})`,
      andLarger: `screen and (width >= ${xs})`,
    },
    tabletPortrait: {
      only: `screen and (${sm} <= width < ${md})`,
      andSmaller: `screen and (width < ${md})`,
      andLarger: `screen and (width >= ${sm})`,
    },
    tabletLandscape: {
      only: `screen and (${md} <= width < ${lg})`,
      andSmaller: `screen and (width < ${lg})`,
      andLarger: `screen and (width >= ${md})`,
    },
    laptop: {
      only: `screen and (${lg} <= width < ${xl})`,
      andSmaller: `screen and (width < ${xl})`,
      andLarger: `screen and (width >= ${lg})`,
    },
    desktop: {
      only: `screen and (width >= ${xl})`,
    },
  };
}
