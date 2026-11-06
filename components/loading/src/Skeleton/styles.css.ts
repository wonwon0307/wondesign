import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const pulse = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.4 },
});

const wave = keyframes({
  "0%": { transform: "translateX(-100%)" },
  "80%, 100%": { transform: "translateX(100%)" },
});

const lines = style({
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacing.sm,
  width: "100%",
});

const skeleton = recipe({
  base: {
    display: "block",
    width: "100%",
    height: "1em",
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.colors.border,
  },
  variants: {
    circle: {
      true: {
        flexShrink: 0,
        width: "40px",
        height: "40px",
        aspectRatio: "1 / 1",
        borderRadius: tokens.radius.full,
      },
      false: {},
    },
    animation: {
      pulse: {
        animation: `${pulse} 1.5s ease-in-out infinite`,
        "@media": {
          ["(prefers-reduced-motion: reduce)"]: { animationDuration: "3s" },
        },
      },
      wave: {
        position: "relative",
        overflow: "hidden",
        selectors: {
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "150%",
            background: `linear-gradient(105deg, transparent 10%, ${tokens.colors.border} 50%, transparent 90%)`,
            transform: "translateX(-100%)",
            animation: `${wave} 2s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
          },
        },
        "@media": {
          "(prefers-reduced-motion: reduce)": {
            selectors: {
              "&::after": {
                display: "none",
              },
            },
            animation: `${pulse} 3s ease-in-out infinite`,
          },
        },
      },
      none: {},
    },
  },
});

export const styles = { lines, skeleton };
