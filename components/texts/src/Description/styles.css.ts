import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const description = recipe({
  base: {
    lineHeight: tokens.typography.lineHeight.body,
    fontWeight: tokens.typography.fontWeight.regular,
    fontFamily: tokens.typography.fontFamily.normal,
  },
  variants: {
    size: {
      small: { fontSize: tokens.typography.fontSize.bodySmall },
      medium: { fontSize: tokens.typography.fontSize.bodyMedium },
      large: { fontSize: tokens.typography.fontSize.bodyLarge },
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
    tone: {
      default: { color: tokens.colors.text },
      muted: { color: tokens.colors.textMuted },
      danger: { color: tokens.colors.error },
      success: { color: tokens.colors.success },
    },
    wrap: {
      balance: { textWrap: "balance" },
      pretty: { textWrap: "pretty" },
    },
  },
});

export const styles = { description };
