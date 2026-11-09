import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@wondesign/tokens";

const pressable = style({
  whiteSpace: "nowrap",
  selectors: {
    "&[data-disabled]": {
      cursor: "not-allowed",
    },
    "&[data-loading]": {
      cursor: "progress",
    },
    "&:focus-visible": {
      outline: `2px solid ${tokens.colors.primary}`,
    },
  },
  "@media": {
    [mediaQueries.hoverable]: {
      selectors: {
        "&:not([data-disabled], [data-loading]):hover": {
          cursor: "pointer",
        },
      },
    },
  },
});

export const styles = { pressable };
