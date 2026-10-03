import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const horizontal = recipe({
  base: {
    alignSelf: "stretch",
    width: "100%",
    backgroundColor: tokens.colors.borderMuted,
  },
  variants: {
    bold: {
      true: {
        height: "2px",
      },
      false: {
        height: "1px",
      },
    },
  },
});

const vertical = recipe({
  base: {
    alignSelf: "stretch",
    backgroundColor: tokens.colors.borderMuted,
  },
  variants: {
    bold: {
      true: {
        width: "2px",
      },
      false: {
        width: "1px",
      },
    },
  },
});

export const styles = { horizontal, vertical };
