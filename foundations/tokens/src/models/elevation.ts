export interface ElevationTokens {
  lv1: string;
  lv2: string;
  lv3: string;
}

export const elevationCssVariables: ElevationTokens = {
  lv1: "--elevation-lv1",
  lv2: "--elevation-lv2",
  lv3: "--elevation-lv3",
};

export const defaultElevationTokens: ElevationTokens = {
  lv1: "0px 1px 3px rgba(127, 127, 127, 0.2)",
  lv2: "0px 1px 3px rgba(127, 127, 127, 0.2), 0px 1px 1px rgba(127, 127, 127, 0.14), 0px 2px 1px rgba(127, 127, 127, 0.12)",
  lv3: "0px 3px 5px rgba(127, 127, 127, 0.2), 0px 6px 10px rgba(127, 127, 127, 0.14), 0px 1px 18px rgba(127, 127, 127, 0.12)",
};

export const elevationTokens: ElevationTokens = {
  lv1: `var(${elevationCssVariables.lv1}, ${defaultElevationTokens.lv1})`,
  lv2: `var(${elevationCssVariables.lv2}, ${defaultElevationTokens.lv2})`,
  lv3: `var(${elevationCssVariables.lv3}, ${defaultElevationTokens.lv3})`,
};
