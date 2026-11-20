import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/entries/*.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
    outDir: "dist/entries",
  },
  {
    entry: ["src/css.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
    deps: {
      alwaysBundle: [/^@wondesign\/theme\//],
    },
    css: {
      fileName: "styles.css",
    },
  },
]);
