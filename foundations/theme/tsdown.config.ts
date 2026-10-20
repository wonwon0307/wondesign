import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/*/index.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
    banner: {
      js: '"use client";',
    },
  },
  {
    entry: ["src/*/server.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
  },
]);
