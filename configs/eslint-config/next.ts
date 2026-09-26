import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import reactRefresh from "eslint-plugin-react-refresh";

import { reactPackageEslintConfig } from "./react";

export const nextEslintConfig = defineConfig([
  {
    extends: [reactPackageEslintConfig],
  },
  {
    files: ["**/src/**/*.{ts,tsx}"],
    extends: [reactRefresh.configs.next],
    rules: {
      "react-refresh/only-export-components": "error",
    },
  },
  ...nextVitals,
  ...nextTs,
  {
    settings: {
      // eslint-config-next sets this to "detect", which crashes under ESLint v10
      // (eslint-plugin-react calls context.getFilename(), removed from the context API).
      react: {
        version: "19.3.0",
      },
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
