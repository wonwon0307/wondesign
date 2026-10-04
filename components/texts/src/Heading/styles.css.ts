import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const heading = recipe({
  base: {
    margin: `${tokens.spacing.lg} 0`,
    lineHeight: tokens.typography.lineHeight.heading,
    fontFamily: tokens.typography.fontFamily.normal,
  },
  variants: {
    level: {
      1: {
        fontSize: tokens.typography.fontSize.headingLarge,
        fontWeight: tokens.typography.fontWeight.bold,
      },
      2: {
        fontSize: tokens.typography.fontSize.headingMedium,
        fontWeight: tokens.typography.fontWeight.bold,
      },
      3: {
        fontSize: tokens.typography.fontSize.headingSmall,
        fontWeight: tokens.typography.fontWeight.bold,
      },
      4: {
        fontSize: tokens.typography.fontSize.bodyExtraLarge,
        fontWeight: tokens.typography.fontWeight.semibold,
      },
      5: {
        fontSize: tokens.typography.fontSize.bodyLarge,
        fontWeight: tokens.typography.fontWeight.semibold,
      },
      6: {
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
