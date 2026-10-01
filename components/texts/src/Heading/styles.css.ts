import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const heading = recipe({
  base: {
    lineHeight: tokens.typography.lineHeight.heading,
    fontFamily: tokens.typography.fontFamily.normal,
  },
  variants: {
    level: {
      1: {
        margin: `${tokens.spacing.lg} 0`,
        fontSize: tokens.typography.fontSize.headingLarge,
        fontWeight: tokens.typography.fontWeight.bold,
      },
      2: {
        margin: `${tokens.spacing.lg} 0`,
        fontSize: tokens.typography.fontSize.headingMedium,
        fontWeight: tokens.typography.fontWeight.bold,
      },
      3: {
        margin: `${tokens.spacing.lg} 0`,
        fontSize: tokens.typography.fontSize.headingSmall,
        fontWeight: tokens.typography.fontWeight.bold,
      },
      4: {
        margin: `${tokens.spacing.md} 0`,
        fontSize: tokens.typography.fontSize.bodyExtraLarge,
        fontWeight: tokens.typography.fontWeight.semibold,
      },
      5: {
        margin: `${tokens.spacing.md} 0`,
        fontSize: tokens.typography.fontSize.bodyLarge,
        fontWeight: tokens.typography.fontWeight.semibold,
      },
      6: {
        margin: `${tokens.spacing.md} 0`,
        fontSize: tokens.typography.fontSize.bodyMedium,
        fontWeight: tokens.typography.fontWeight.semibold,
      },
    },
    clamped: {
      true: {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        minWidth: 0,
        overflowWrap: "anywhere",
        textOverflow: "ellipsis",
      },
    },
  },
});

export const styles = { heading };
