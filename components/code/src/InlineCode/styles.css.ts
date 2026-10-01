import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const inlineCode = recipe({
  base: {
    fontWeight: tokens.typography.fontWeight.medium,
    fontFamily: tokens.typography.fontFamily.code,
    lineHeight: tokens.typography.lineHeight.single,
    color: "inherit",
    backgroundColor: tokens.colors.backgroundMuted,
    borderRadius: tokens.radius.sm,
    boxShadow: tokens.elevation.lv1,
    overflowWrap: "anywhere",
    boxDecorationBreak: "clone",
    WebkitBoxDecorationBreak: "clone",
  },
  variants: {
    size: {
      small: {
        padding: tokens.spacing.xs,
        paddingBottom: 0,
        fontSize: tokens.typography.fontSize.bodyExtraSmall,
      },
      medium: {
        padding: tokens.spacing.sm,
        paddingBottom: tokens.spacing.xs,
        fontSize: tokens.typography.fontSize.bodySmall,
      },
      large: {
        padding: tokens.spacing.md,
        paddingBottom: tokens.spacing.sm,
        fontSize: tokens.typography.fontSize.bodyMedium,
      },
    },
  },
});

export const styles = { inlineCode };
