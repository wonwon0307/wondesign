import { defineProject, mergeConfig } from "vitest/config";

import { sharedReactConfig } from "@repo/vitest-config/shared";

const config = defineProject({
  test: {
    root: import.meta.dirname,
    environment: "jsdom",
  },
});

export default mergeConfig(sharedReactConfig, config);
