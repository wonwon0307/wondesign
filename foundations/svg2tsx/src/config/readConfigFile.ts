import { createJiti } from "jiti";
import jsxPlugin from "@svgr/plugin-jsx";
import svgoPlugin from "@svgr/plugin-svgo";

import { logger } from "@/lib/logger";
import type { Config, ResolvedConfig } from "./types";

export async function readConfigFile(
  filePath: string | null,
): Promise<ResolvedConfig[]> {
  if (!filePath) {
    logger.info(`No config file... Processing with default config.`);

    return [defaultOptions];
  }

  const jiti = createJiti(import.meta.url);

  try {
    const raw = await jiti.import(filePath, { default: true });
    const result = raw as Config | Config[]; // NOSONAR
    const configs = Array.isArray(result) ? result : [result];

    return configs.map((config) => resolveConfig(config));
  } catch (error) {
    throw new Error(`Failed to load config from ${filePath}: ${error}`, {
      cause: error,
    });
  }
}

function resolveConfig(config: Config = {}): ResolvedConfig {
  return {
    ...defaultOptions,
    ...config,
    entry: config.entry ?? defaultOptions.entry,
    svgrOptions: config.svgrOptions
      ? {
          ...defaultOptions.svgrOptions,
          ...config.svgrOptions,
          plugins: [svgoPlugin, jsxPlugin],
          typescript: true,
        }
      : defaultOptions.svgrOptions,
  };
}

const defaultOptions: ResolvedConfig = {
  mode: "barrel",
  suffix: "",
  facadeSuffix: "Icon",
  entry: {
    name: "app",
    srcDir: "assets",
    outDir: "src",
  },
  svgrOptions: {
    icon: true,
    typescript: true,
    native: false,
    jsxRuntime: "automatic",
    expandProps: "start",
    svgProps: {
      width: "{size}",
      height: "{size}",
    },
    plugins: [svgoPlugin, jsxPlugin],
    svgo: true,
    svgoConfig: {
      plugins: [
        {
          name: "preset-default",
          params: { overrides: { removeViewBox: false } },
        },
        {
          name: "convertColors",
          params: { currentColor: true },
        },
        "prefixIds",
        "removeDimensions",
      ],
    },
    exportType: "named",
    template: (variables, { tpl }) => {
      return tpl`
      import type { IconProps } from "@wondesign/svg2tsx";

      export function ${variables.componentName}({ size = "1em",...props }: Readonly<IconProps>) {
        return (${variables.jsx});
      }
    `;
    },
  },
};
