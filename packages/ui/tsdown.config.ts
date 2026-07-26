import { defineConfig } from "tsdown";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";

export default defineConfig([
  {
    entry: ["src/components/*/index.ts", "src/index.ts"],
    plugins: [vanillaExtractPlugin()],
    format: ["esm"],
    dts: true,
    clean: false,
    banner: "'use client';",
    deps: {
      onlyBundle: false,
      neverBundle: [/^@justkits\//],
    },
    css: {
      fileName: "styles.css",
    },
  },
]);
