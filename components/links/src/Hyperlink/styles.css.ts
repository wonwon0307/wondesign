import { recipe } from "@vanilla-extract/recipes";
import { mediaQueries, tokens } from "@wondesign/tokens";

const link = recipe({
  base: {
    "@media": {
      [mediaQueries.hoverable]: {
        selectors: {
          "&:not([data-disabled]):hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
  variants: {
    appearance: {
      default: { color: "blue" },
      primary: { color: tokens.colors.primary },
      muted: { color: tokens.colors.textMuted },
      inverted: { color: tokens.colors.onPrimary },
    },
  },
});

export const styles = { link };
