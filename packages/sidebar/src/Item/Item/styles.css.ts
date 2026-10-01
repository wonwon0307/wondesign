import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  colorWithFade,
  colorWithOpacity,
  mediaQueries,
  tokens,
} from "@wondesign/tokens";

const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacing.sm,
});

const item = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    gap: tokens.spacing.md,
    borderRadius: tokens.radius.sm,
    position: "relative",
    font: tokens.text.bodyLarge,
    backgroundColor: "transparent",
    userSelect: "none",
    selectors: {
      "&:focus-visible": {
        backgroundColor: tokens.colors.backgroundHighlight,
        outline: `1px solid ${tokens.colors.primary}`,
        outlineOffset: "2px",
      },
    },
    "@media": {
      [mediaQueries.hoverable]: {
        selectors: {
          "&:hover": {
            backgroundColor: tokens.colors.backgroundHighlight,
          },
        },
      },
    },
  },
  variants: {
    isActive: {
      true: {
        color: tokens.colors.primary,
        fontWeight: tokens.typography.fontWeight.semibold,
        backgroundColor: colorWithFade(tokens.colors.primary, 0.12),
        selectors: {
          "&:focus-visible": {
            backgroundColor: colorWithOpacity(tokens.colors.primary, 0.24),
          },
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: "25%",
            bottom: "25%",
            width: "2px",
            backgroundColor: tokens.colors.primary,
            zIndex: 1,
          },
        },
        "@media": {
          [mediaQueries.hoverable]: {
            selectors: {
              "&:hover": {
                backgroundColor: colorWithOpacity(tokens.colors.primary, 0.24),
              },
            },
          },
        },
      },
    },
    isDisabled: {
      true: {
        color: colorWithOpacity(tokens.colors.text, 0.5),
        pointerEvents: "none",
        cursor: "not-allowed",
      },
    },
    collapsed: {
      true: {
        justifyContent: "center",
        padding: tokens.spacing.sm,
      },
    },
  },
});

const subitems = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: tokens.spacing.xl,
    gap: tokens.spacing.xs,
    selectors: {
      "&[data-state='closed']:not([data-force-visible])": {
        display: "none",
      },
    },
  },
  variants: {
    hide: {
      true: {
        display: "none",
      },
    },
  },
});

export const styles = { wrapper, item, subitems };
