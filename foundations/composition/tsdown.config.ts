import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/portal.tsx", "src/asChild.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
  },
]);
