import { createSimpleBreakpointQueries } from "./models/breakpoints/queries";

export const mediaQueries = {
  breakpoints: createSimpleBreakpointQueries(),
  hoverable: "(hover: hover) and (pointer: fine)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
};
