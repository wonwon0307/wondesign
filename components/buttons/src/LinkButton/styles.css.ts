import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@wondesign/tokens";

const link = style({
  color: tokens.colors.primary,
  selectors: {
    "&[data-disabled]": {
      opacity: tokens.opacity.disabled,
    },
    "&[data-loading]": {
      opacity: tokens.opacity.pending,
    },
  },
  "@media": {
    [mediaQueries.hoverable]: {
      selectors: {
        "&:not([data-disabled], [data-loading]):hover": {
          textDecoration: "underline",
        },
      },
    },
  },
});

export const styles = { link };
