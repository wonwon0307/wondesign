import { defineConfig } from "tsdown";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";

export default defineConfig([
  {
    entry: ["src/base/index.ts", "src/index.ts"],
    plugins: [vanillaExtractPlugin()],
    format: ["esm"],
    dts: true,
    clean: false,
    banner: {
      js: '"use client";',
    },
  },
]);
