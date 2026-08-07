import { defineProject, mergeConfig } from "vitest/config";

import { sharedConfig } from "@repo/vitest-config/shared";

const config = defineProject({
  test: {
    root: import.meta.dirname,
    environment: "node",
    setupFiles: ["tests/mocks.ts"],
  },
});

export default mergeConfig(sharedConfig, config);
