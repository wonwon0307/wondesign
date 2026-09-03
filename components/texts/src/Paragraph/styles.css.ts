import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const paragraph = recipe({
  base: {
    maxWidth: "100%",
    textWrap: "pretty",
  },
  variants: {
    size: {
      small: { font: tokens.text.bodySmall },
      medium: { font: tokens.text.bodyMedium },
      large: { font: tokens.text.bodyLarge },
    },
    tone: {
      default: { color: tokens.colors.text },
      muted: { color: tokens.colors.textMuted },
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

export const styles = { paragraph };
