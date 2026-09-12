import { defineProject, mergeConfig } from "vitest/config";

import { sharedReactConfig } from "@repo/vitest-config/shared";

const config = defineProject({
  test: {
    root: import.meta.dirname,
    environment: "jsdom",
    setupFiles: ["./tests/mocks.tsx"],
  },
});

export default mergeConfig(sharedReactConfig, config);
