import { defineProject, mergeConfig } from "vitest/config";

import { sharedReactConfig } from "@repo/vitest-config/shared";

const config = defineProject({
  test: {
    root: import.meta.dirname,
    setupFiles: ["./tests/mocks.ts"],
  },
});

export default mergeConfig(sharedReactConfig, config);
