import { style } from "@vanilla-extract/css";
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

const iconGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: tokens.spacing.md,
});

const iconBox = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: tokens.spacing.md,
  gap: tokens.spacing.sm,
  borderRadius: tokens.radius.md,
  backgroundColor: tokens.colors.backgroundMuted,
});

export const styles = { preview, iconGrid, iconBox };
