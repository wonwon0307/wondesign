import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/components/*.ts", "src/css.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
    deps: {
      onlyBundle: false,
    },
    banner: "'use client';",
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
  {
    entry: ["src/theme.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
    banner: "'use client';",
  },
]);
