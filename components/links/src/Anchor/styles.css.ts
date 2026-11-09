import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/tokens";

const anchor = style({
  cursor: "pointer",
  selectors: {
    "&[data-disabled]": {
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      outline: `2px solid ${tokens.colors.primary}`,
    },
  },
});

export const styles = { anchor };
