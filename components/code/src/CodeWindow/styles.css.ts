import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const wrapper = style({
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

const pre = recipe({
  base: {
    margin: 0,
    padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
    border: `1px solid ${tokens.colors.borderMuted}`,
    boxShadow: tokens.elevation.lv1,
    scrollbarWidth: "thin",
  },
  variants: {
    hasChildren: {
      true: {
        borderRadius: `0 0 ${tokens.radius.sm} ${tokens.radius.sm}`,
      },
      false: {
        borderRadius: tokens.radius.sm,
      },
    },
  },
});

const codeCopy = style({
  position: "absolute",
  top: tokens.spacing.md,
  right: tokens.spacing.md,
});

export const styles = { wrapper, pre, codeCopy };
