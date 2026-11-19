import { keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { mediaQueries } from "@wondesign/tokens";

const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const spinner = recipe({
  base: {
    flexShrink: 0,
    animationName: rotate,
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
  },
  variants: {
    speed: {
      slow: {
        animationDuration: "1.5s",
        "@media": {
          [mediaQueries.reducedMotion]: {
            animationDuration: "3.75s",
          },
        },
      },
      normal: {
        animationDuration: "1s",
        "@media": {
          [mediaQueries.reducedMotion]: {
            animationDuration: "2.5s",
          },
        },
      },
      fast: {
        animationDuration: "0.5s",
        "@media": {
          [mediaQueries.reducedMotion]: {
            animationDuration: "1.25s",
          },
        },
      },
    },
  },
});

export const styles = { spinner };
