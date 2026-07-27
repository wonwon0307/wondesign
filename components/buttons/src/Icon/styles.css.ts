import { recipe } from "@vanilla-extract/recipes";
import { mediaQueries, tokens } from "@wondesign/tokens";

const iconButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacing.sm,

    borderRadius: tokens.radius.sm,
    backgroundColor: "transparent",
    transition: "all 0.3s ease",
    selectors: {
      "&[data-disabled]": {
        color: tokens.colors.textMuted,
      },
    },
    "@media": {
      [mediaQueries.hoverable]: {
        selectors: {
          "&:not(:disabled):hover": {
            backgroundColor: tokens.colors.backgroundHover,
          },
        },
      },
    },
  },
  variants: {
    ghost: {
      true: {
        backgroundColor: "transparent",
      },
    },
    rounded: {
      true: {
        borderRadius: tokens.radius.full,
      },
    },
    size: {
      small: {},
      medium: {},
      large: {},
    },
  },
});

export const styles = { iconButton };
