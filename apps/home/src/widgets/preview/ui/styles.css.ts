import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/ui/tokens";

const preview = recipe({
  base: {
    display: "flex",
    padding: tokens.spacing.lg,
    borderRadius: tokens.radius.sm,
    backgroundColor: tokens.colors.backgroundMuted,
  },
  variants: {
    orientation: {
      horizontal: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      vertical: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
      },
    },
  },
});

export const styles = { preview };
