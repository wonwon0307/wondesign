import { type Config as SvgrConfig } from "@svgr/core";

type FamilyEntry = {
  name?: string;
  srcDir: string;
  outDir: string;
};

type GroupConfig = {
  /**
   * Converter mode for generating boilerplates
   * @default "barrel"
   */
  mode: "barrel" | "facade" | "both";
  /**
   * Suffix to append to the icon component name
   * @default ""
   */
  suffix: string;
  /**
   * Suffix to append to the facade component name
   * @default "Icon"
   */
  facadeSuffix: string;
  /**
   * SVGR options for customizing the generated React components
   */
  svgrOptions: Omit<
    SvgrConfig,
    | "typescript"
    | "configFile"
    | "index"
    | "plugins"
    | "prettier"
    | "prettierConfig"
  >;
};

export type Config = Partial<GroupConfig> & {
  entry?: FamilyEntry | FamilyEntry[];
};

export type ResolvedConfig = Required<Omit<Config, "svgrOptions">> & {
  svgrOptions: SvgrConfig;
};

export type FamilyConfig = Omit<GroupConfig, "svgrOptions"> & {
  srcDir: string;
  outDir: string;
  svgrOptions: SvgrConfig;
};
