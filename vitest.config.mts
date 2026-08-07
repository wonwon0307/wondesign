import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["apps/*", "components/*", "primitives/*"],
    coverage: {
      exclude: [
        "**/index.ts",
        "**/cli.ts",
        "**/*.css.ts",
        "**/*/tests/*",
        "**/dist/*",
        "**/node_modules/*",
      ],
      provider: "v8",
      reporter: [["text", { skipFull: true }]],
    },
  },
});
