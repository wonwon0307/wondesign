import { ConfigManager } from "@/config/manager";
import { defineConfig } from "@/config/defineConfig";
import { readConfigFile } from "@/config/readConfigFile";

describe("config module - corner cases", () => {
  it("ConfigManager - throws if getConfig() is called with an invalid key", () => {
    const configManager = new ConfigManager();
    expect(() => configManager.getConfig("invalidKey")).toThrow(
      `Config for family "invalidKey" not found.`,
    );
  });

  it("defineConfig - should return the same config object passed to it", () => {
    const config = {
      mode: "barrel" as const,
      suffix: "Icon",
      srcDir: "assets",
      outDir: "src",
    };

    const result = defineConfig(config);

    expect(result).toEqual(config);
    expect(result).toBe(config);
  });

  it("defineConfig - should work with empty config object", () => {
    const config = {};

    const result = defineConfig(config);

    expect(result).toEqual({});
  });

  it("COVERAGE - the default svgr template should be defined correctly", async () => {
    const configArray = await readConfigFile(null);
    const template = configArray[0].svgrOptions.template;
    const variables = {
      componentName: "TestIcon",
      jsx: "<svg></svg>",
      interfaces: [],
      props: [],
      imports: [],
      exports: [],
    };
    const result = template?.(variables, {
      tpl: (strings: TemplateStringsArray) => strings[0],
      options: { state: { componentName: variables.componentName } },
    });
    expect(result).toContain(
      'import type { IconProps } from "@wondesign/svg2tsx";',
    );
  });
});
