import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/components/*.ts", "src/index.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
    banner: "'use client';",
    deps: {
      onlyBundle: false,
    },
    css: {
      fileName: "styles.css",
    },
  },
  {
    entry: ["src/tokens.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
  },
]);
