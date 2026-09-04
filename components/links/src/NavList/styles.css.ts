import { recipe } from "@vanilla-extract/recipes";
import { colorWithOpacity, mediaQueries, tokens } from "@wondesign/tokens";

const list = recipe({
  base: {
    display: "flex",
    gap: tokens.spacing.md,
  },
  variants: {
    orientation: {
      vertical: {
        flexDirection: "column",
      },
      horizontal: {
        flexDirection: "row",
      },
    },
  },
});

const navLink = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
    borderRadius: tokens.radius.md,
    fontWeight: tokens.typography.fontWeight.semibold,
    whiteSpace: "nowrap",
    color: tokens.colors.textMuted,
    backgroundColor: "transparent",
    transition:
      "color 0.15s ease, background-color 0.15s ease, text-decoration-color 0.15s ease",
    "@media": {
      [mediaQueries.hoverable]: {
        selectors: {
          "&:not([data-disabled]):hover": {
            textDecoration: "underline",
            textDecorationColor: tokens.colors.primary,
          },
        },
      },
    },
  },
  variants: {
    isActive: {
      true: {
        color: tokens.colors.primary,
        "@media": {
          [mediaQueries.hoverable]: {
            selectors: {
              "&:hover": {
                backgroundColor: tokens.colors.backgroundHover,
              },
            },
          },
        },
      },
      false: {
        "@media": {
          [mediaQueries.hoverable]: {
            selectors: {
              "&:hover": {
                backgroundColor: colorWithOpacity(tokens.colors.primary, 15),
              },
            },
          },
        },
      },
    },
  },
});

export const styles = { list, navLink };
