import { recipe } from "@vanilla-extract/recipes";
import { colorWithOpacity, mediaQueries, tokens } from "@wondesign/tokens";

const list = recipe({
  base: {
    display: "flex",
    gap: tokens.spacing.md,
  },
  variants: {
    orientation: {
      horizontal: {
        flexDirection: "row",
      },
      vertical: {
        flexDirection: "column",
      },
    },
  },
});

const link = recipe({
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
  },
  variants: {
    isActive: {
      true: {
        color: tokens.colors.primary,
        selectors: {
          "&:focus-visible": {
            textDecoration: "underline",
          },
        },
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
      false: {
        selectors: {
          "&:focus-visible": {
            color: tokens.colors.text,
            textDecoration: "underline",
          },
        },
        "@media": {
          [mediaQueries.hoverable]: {
            selectors: {
              "&:not([data-disabled]):hover": {
                color: tokens.colors.text,
                backgroundColor: tokens.colors.backgroundHover,
              },
            },
          },
        },
      },
    },
  },
});

export const styles = { list, link };
