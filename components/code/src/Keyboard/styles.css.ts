import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const keyboard = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: tokens.typography.lineHeight.single,
    fontWeight: tokens.typography.fontWeight.medium,
    fontFamily: tokens.typography.fontFamily.code,
    color: tokens.colors.text,
    backgroundColor: tokens.colors.backgroundMuted,
    border: `1px solid ${tokens.colors.borderMuted}`,
    borderRadius: tokens.radius.sm,
  },
  variants: {
    size: {
      small: {
        fontSize: tokens.typography.fontSize.bodySmall,
        padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
      },
      medium: {
        fontSize: tokens.typography.fontSize.bodyMedium,
        padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      },
      large: {
        fontSize: tokens.typography.fontSize.bodyLarge,
        padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
      },
    },
  },
});

const keyboardGroup = style({
  display: "inline-flex",
  alignItems: "center",
  gap: tokens.spacing.xs,
});

export const styles = { keyboard, keyboardGroup };
