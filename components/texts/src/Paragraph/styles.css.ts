import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const paragraph = recipe({
  base: {
    margin: `${tokens.spacing.sm} 0`,
    maxWidth: "100%",
    textWrap: "pretty",
    lineHeight: tokens.typography.lineHeight.paragraph,
    fontWeight: tokens.typography.fontWeight.regular,
    fontFamily: tokens.typography.fontFamily.normal,
  },
  variants: {
    size: {
      small: { fontSize: tokens.typography.fontSize.bodySmall },
      medium: { fontSize: tokens.typography.fontSize.bodyMedium },
      large: { fontSize: tokens.typography.fontSize.bodyLarge },
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
