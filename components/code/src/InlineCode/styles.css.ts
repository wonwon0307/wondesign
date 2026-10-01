import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const inlineCode = recipe({
  base: {
    padding: `${tokens.spacing.sm} ${tokens.spacing.sm} ${tokens.spacing.xs} ${tokens.spacing.sm}`,
    backgroundColor: tokens.colors.backgroundMuted,
    color: tokens.colors.text,
    borderRadius: tokens.radius.sm,
    boxShadow: tokens.elevation.lv1,
    overflowWrap: "anywhere",
    boxDecorationBreak: "clone",
    WebkitBoxDecorationBreak: "clone",
    selectors: {
      "a &": {
        color: "inherit",
      },
    },
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
  },
});

export const styles = { inlineCode };
