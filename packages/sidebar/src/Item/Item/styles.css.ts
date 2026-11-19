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
});

const item = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    gap: tokens.spacing.md,
    borderRadius: tokens.radius.sm,
    position: "relative",
    fontSize: tokens.typography.fontSize.bodySmall,
    lineHeight: tokens.typography.lineHeight.body,
    backgroundColor: "transparent",
    userSelect: "none",
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
        fontWeight: tokens.typography.fontWeight.medium,
        backgroundColor: colorWithFade(tokens.colors.primary, 0.12),
        selectors: {
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

const subitemsWrapper = style({
  display: "grid",
  gridTemplateRows: "1fr",
  transition: "grid-template-rows 200ms ease, opacity 200ms ease",
  opacity: 1,
  selectors: {
    "&[data-state='closed']": {
      gridTemplateRows: "0fr",
      opacity: 0,
    },
    "&[hidden]": {
      visibility: "hidden",
    },
  },
  "@media": {
    [mediaQueries.reducedMotion]: {
      transition: "none",
    },
  },
});

const subitems = style({
  display: "flex",
  flexDirection: "column",
  paddingTop: tokens.spacing.md,
  paddingLeft: tokens.spacing.xl,
  gap: tokens.spacing.md,
  overflow: "hidden",
  transition: "padding-top 200ms ease",
  selectors: {
    [`${subitemsWrapper}[data-state='closed'] &`]: {
      paddingTop: 0,
    },
  },
  "@media": {
    [mediaQueries.reducedMotion]: {
      transition: "none",
    },
  },
});

export const styles = { wrapper, item, subitemsWrapper, subitems };
