import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/**/*.ts", "!src/css.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
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
