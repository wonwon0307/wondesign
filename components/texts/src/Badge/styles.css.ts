import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const badge = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacing.sm,
    borderRadius: tokens.radius.sm,
  },
  variants: {
    size: {
      small: {
        padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
        fontSize: tokens.typography.fontSize.bodyExtraSmall,
      },
      medium: {
        padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
        fontSize: tokens.typography.fontSize.bodySmall,
      },
      large: {
        padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
        fontSize: tokens.typography.fontSize.bodyMedium,
      },
    },
    bold: {
      false: {
        fontWeight: tokens.typography.fontWeight.regular,
      },
      true: {
        fontWeight: tokens.typography.fontWeight.semibold,
      },
    },
  },
});

export const styles = { badge };
