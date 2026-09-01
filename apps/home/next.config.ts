import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { createWonDocs } from "@wondocs/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: "on" },
});

const withWonDocs = createWonDocs({
  contentsDir: ["./docs/components", "./docs/primitives"],
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withWonDocs(withVanillaExtract(nextConfig));
