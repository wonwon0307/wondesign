import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/*.ts", "src/*.tsx"],
    format: ["esm"],
    dts: true,
    clean: false,
    deps: {
      onlyBundle: false,
    },
  },
]);
