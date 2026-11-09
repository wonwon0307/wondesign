import { recipe } from "@vanilla-extract/recipes";
import { mediaQueries, tokens } from "@wondesign/tokens";

const link = recipe({
  base: {
    fontSize: "inherit",
    lineHeight: "inherit",
    fontWeight: tokens.typography.fontWeight.medium,
    fontFamily: "inherit",
    textDecoration: "none",
    selectors: {
      "&[data-disabled]": {
        opacity: tokens.opacity.disabled,
      },
    },
  },
  variants: {
    underline: {
      hover: {
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
      always: {
        textDecoration: "underline",
      },
      none: {},
    },
    appearance: {
      default: { color: "light-dark(#0B57D0, #8AB4F8)" },
      primary: { color: tokens.colors.primary },
      muted: { color: tokens.colors.textMuted },
      inherit: { color: "inherit" },
    },
  },
});

export const styles = { link };
