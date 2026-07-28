import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@wondesign/tokens";

const anchor = style({
  whiteSpace: "nowrap",
  cursor: "pointer",
  selectors: {
    "&[data-disabled]": {
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      textDecoration: "underline",
      textDecorationColor: tokens.colors.primary,
    },
  },
  "@media": {
    [mediaQueries.hoverable]: {
      selectors: {
        "&:not([data-disabled]):hover": {
          textDecorationColor: tokens.colors.primary,
        },
      },
    },
  },
});

export const styles = { anchor };
