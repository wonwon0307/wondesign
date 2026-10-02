import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const pre = recipe({
  base: {
    tabSize: 2,
    lineHeight: tokens.typography.lineHeight.body,
    fontWeight: tokens.typography.fontWeight.medium,
    fontFamily: tokens.typography.fontFamily.code,
  },
  variants: {
    size: {
      small: {
        fontSize: tokens.typography.fontSize.bodyExtraSmall,
      },
      medium: {
        fontSize: tokens.typography.fontSize.bodySmall,
      },
      large: {
        fontSize: tokens.typography.fontSize.bodyMedium,
      },
    },
    vertical: {
      auto: {},
      scroll: {
        overflowY: "auto",
      },
    },
  },
});

const defaultButton = recipe({
  variants: {
    copied: {
      true: {
        color: tokens.colors.success,
      },
      false: {
        color: tokens.colors.textMuted,
      },
    },
  },
});

export const styles = { pre, defaultButton };
