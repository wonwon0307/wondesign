import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/ui/tokens";

const preview = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    padding: tokens.spacing.lg,
    gap: tokens.spacing.lg,
    borderRadius: tokens.radius.sm,
    border: `1px solid ${tokens.colors.border}`,
  },
  variants: {
    orientation: {
      horizontal: {
        flexDirection: "row",
        alignItems: "center",
      },
      vertical: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
  },
});

export const styles = { preview };
