import { defineConfig } from "tsdown";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";

export default defineConfig([
  {
    entry: ["src/*/index.ts"],
    plugins: [vanillaExtractPlugin()],
    format: ["esm"],
    dts: true,
    clean: false,
    banner: "'use client';",
    deps: {
      onlyBundle: false,
    },
  },
]);
