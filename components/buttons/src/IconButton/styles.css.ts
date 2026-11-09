import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { mediaQueries, tokens } from "@wondesign/tokens";

const iconButton = recipe({
  base: {
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacing.sm,
    position: "relative",
    borderRadius: tokens.radius.sm,
    selectors: {
      "&[data-disabled]": {
        opacity: tokens.opacity.disabled,
      },
    },
  },
  variants: {
    variant: {
      filled: {
        color: tokens.colors.onPrimary,
        backgroundColor: tokens.colors.primary,
        border: `1px solid ${tokens.colors.primary}`,
        transition: "opacity 0.15s ease",
        "@media": {
          [mediaQueries.hoverable]: {
            selectors: {
              "&:not([data-disabled], [data-loading]):hover": {
                opacity: tokens.opacity.hover,
              },
            },
          },
        },
      },
      outlined: {
        color: tokens.colors.textMuted,
        backgroundColor: "transparent",
        border: `1px solid ${tokens.colors.border}`,
        transition: "background-color 0.15s ease",
        "@media": {
          [mediaQueries.hoverable]: {
            selectors: {
              "&:not([data-disabled], [data-loading]):hover": {
                backgroundColor: tokens.colors.backgroundHighlight,
              },
            },
          },
        },
      },
      ghost: {
        color: tokens.colors.text,
        backgroundColor: "transparent",
        border: `1px solid transparent`,
        transition: "background-color 0.15s ease, color 0.15s ease",
        "@media": {
          [mediaQueries.hoverable]: {
            selectors: {
              "&:not([data-disabled], [data-loading]):hover": {
                backgroundColor: tokens.colors.backgroundHighlight,
              },
            },
          },
        },
      },
    },
    rounded: {
      true: {
        borderRadius: tokens.radius.full,
      },
    },
    spacious: {
      true: {
        padding: tokens.spacing.md,
      },
    },
  },
});

const hide = style({
  opacity: tokens.opacity.hide,
});

const overlay = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  inset: 0,
});

export const styles = { iconButton, hide, overlay };
