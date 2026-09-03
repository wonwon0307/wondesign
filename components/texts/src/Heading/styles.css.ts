import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const heading = recipe({
  variants: {
    level: {
      1: { font: tokens.text.titleLarge },
      2: { font: tokens.text.titleMedium },
      3: { font: tokens.text.titleSmall },
      4: { font: tokens.text.bodyLarge },
      5: { font: tokens.text.bodyMedium },
      6: { font: tokens.text.bodySmall },
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
    weight: {
      regular: { fontWeight: tokens.typography.fontWeight.regular },
      semibold: { fontWeight: tokens.typography.fontWeight.semibold },
      bold: { fontWeight: tokens.typography.fontWeight.bold },
    },
  },
});

export const styles = { heading };
