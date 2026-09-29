import { recipe } from "@vanilla-extract/recipes";
import { mediaQueries, tokens } from "@wondesign/tokens";

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
    padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
    borderRadius: `${tokens.radius.md} ${tokens.radius.md} 0 0`,
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
        borderBottom: `2px solid ${tokens.colors.primary}`,
        selectors: {
          "&:focus-visible": {
            textDecoration: "underline",
          },
        },
      },
      false: {
        borderBottom: `2px solid transparent`,
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
                borderBottom: `2px solid ${tokens.colors.border}`,
              },
            },
          },
        },
      },
    },
  },
});

export const styles = { list, link };
