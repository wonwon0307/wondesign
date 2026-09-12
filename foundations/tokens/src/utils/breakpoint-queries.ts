type BreakpointTokens = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export type SimpleBreakpointQueries = {
  small: string;
  medium: string;
  large: string;
  notSmall: string;
  notLarge: string;
};

export function createSimpleBreakpointQueries({
  sm = "768px",
  lg = "1280px",
}: Partial<Pick<BreakpointTokens, "sm" | "lg">> = {}): SimpleBreakpointQueries {
  return {
    small: `screen and (max-width: ${sm})`,
    medium: `screen and (min-width: ${sm}) and (max-width: ${lg})`,
    large: `screen and (min-width: ${lg})`,
    notSmall: `screen and (min-width: ${sm})`,
    notLarge: `screen and (max-width: ${lg})`,
  };
}

type Variants = {
  only: string;
  andSmaller: string;
  andLarger: string;
};

export type BreakpointQueries = {
  // andSmaller equals to only, and andLarger equals everything, so omit
  mobilePortrait: Pick<Variants, "only">;
  mobileLandscape: Variants;
  tabletPortrait: Variants;
  tabletLandscape: Variants;
  laptop: Variants;
  // andSmaller equals everything, and andLarger equals to only, so omit
  desktop: Pick<Variants, "only">;
};

export function createBreakpointQueries({
  xs = "480px",
  sm = "768px",
  md = "1024px",
  lg = "1280px",
  xl = "1440px",
}: Partial<BreakpointTokens> = {}): BreakpointQueries {
  return {
    mobilePortrait: {
      only: `screen and (max-width: ${xs})`,
    },
    mobileLandscape: {
      only: `screen and ((min-width: ${xs}) and (max-width: ${sm}))`,
      andSmaller: `screen and (max-width: ${sm})`,
      andLarger: `screen and (min-width: ${xs})`,
    },
    tabletPortrait: {
      only: `screen and ((min-width: ${sm}) and (max-width: ${md}))`,
      andSmaller: `screen and (max-width: ${md})`,
      andLarger: `screen and (min-width: ${sm})`,
    },
    tabletLandscape: {
      only: `screen and ((min-width: ${md}) and (max-width: ${lg}))`,
      andSmaller: `screen and (max-width: ${lg})`,
      andLarger: `screen and (min-width: ${md})`,
    },
    laptop: {
      only: `screen and (min-width: ${lg}) and (max-width: ${xl})`,
      andSmaller: `screen and (max-width: ${xl})`,
      andLarger: `screen and (min-width: ${lg})`,
    },
    desktop: {
      only: `screen and (min-width: ${xl})`,
    },
  };
}
