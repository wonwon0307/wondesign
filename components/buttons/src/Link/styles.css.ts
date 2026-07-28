import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@wondesign/tokens";

const link = style({
  color: tokens.colors.primary,
  "@media": {
    [mediaQueries.hoverable]: {
      selectors: {
        "&:not([data-disabled]):hover": {
          textDecoration: "underline",
        },
      },
    },
  },
});

export const styles = { link };
