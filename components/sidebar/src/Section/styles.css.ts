import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const section = recipe({
  base: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    gap: tokens.spacing.sm,
    padding: `${tokens.spacing.lg} ${tokens.spacing.sm}`,
    overflow: "hidden",
  },
  variants: {
    collapsed: {
      true: {
        justifyContent: "center",
      },
      false: {
        justifyContent: "flex-start",
      },
    },
  },
});

export const styles = { section };
