import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const inlineCode = recipe({
  base: {
    padding: `0 ${tokens.spacing.sm}`,
    backgroundColor: tokens.colors.surface,
    color: tokens.colors.text,
    borderRadius: tokens.radius.sm,
    overflowWrap: "anywhere",
    boxDecorationBreak: "clone",
    WebkitBoxDecorationBreak: "clone",
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
