import { defineConfig } from "tsdown";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";

export default defineConfig([
  {
    entry: ["src/InlineCode/index.ts", "src/Keyboard/index.ts"],
    plugins: [vanillaExtractPlugin()],
    format: ["esm"],
    dts: true,
    clean: false,
  },
  {
    entry: ["src/CodeBlock/index.ts", "src/CodeWindow/index.ts"],
    plugins: [vanillaExtractPlugin()],
    format: ["esm"],
    dts: true,
    clean: false,
    banner: {
      js: '"use client";',
    },
  },
]);
