import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WonDesign",
  description: "A design system for React applications",
  applicationName: "WonDesign",
  authors: [{ name: "WonWon" }],
};

export { RootLayout as default } from "@/_app/RootLayout";
