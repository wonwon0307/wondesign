import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const pre = recipe({
  base: {
    tabSize: 2,
  },
  variants: {
    size: {
      small: {
        font: tokens.text.codeSmall,
      },
      large: {
        font: tokens.text.codeLarge,
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
