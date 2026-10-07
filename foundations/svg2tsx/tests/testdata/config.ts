import type { Config } from "@/config/types";

export const testOptions: Config = {
  mode: "barrel",
  suffix: "Icon",
  facadeSuffix: "Icon",
  entry: {
    srcDir: "testsrc",
    outDir: "testout",
  },
  svgrOptions: {},
};

export const testOptionsMulti: Config[] = [
  testOptions,
  {
    mode: "facade",
    suffix: "Icon2",
    facadeSuffix: "Icon2",
    entry: {
      srcDir: "testsrc2",
      outDir: "testout2",
    },
    svgrOptions: {},
  },
];
