import { defineProject, mergeConfig } from "vitest/config";

import { sharedReactConfig } from "@repo/vitest-config/shared";

const config = defineProject({
  test: {
    root: import.meta.dirname,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
  },
});

export default mergeConfig(sharedReactConfig, config);
