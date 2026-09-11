import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colorWithOpacity, mediaQueries, tokens } from "@wondesign/tokens";

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
    font: tokens.text.bodyMedium,
    userSelect: "none",
    selectors: {
      "&:focus-visible": {
        backgroundColor: tokens.colors.backgroundHover,
        outline: `2px solid ${tokens.colors.primary}`,
        outlineOffset: "2px",
      },
    },
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
  variants: {
    isActive: {
      true: {
        color: tokens.colors.primary,
        fontWeight: tokens.typography.fontWeight.semibold,
        selectors: {
          "&:focus-visible": {
            backgroundColor: colorWithOpacity(tokens.colors.primary, 16),
          },
        },
        "@media": {
          [mediaQueries.hoverable]: {
            selectors: {
              "&:hover": {
                backgroundColor: colorWithOpacity(tokens.colors.primary, 12),
              },
            },
          },
        },
      },
    },
    isDisabled: {
      true: {
        opacity: 0.5,
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

const subitems = style({
  display: "flex",
  flexDirection: "column",
  paddingLeft: tokens.spacing.xl,
  gap: tokens.spacing.xs,
});

const toggle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const toggleIcon = style({
  transition: "transform 0.15s ease",
  selectors: {
    [`${toggle}[data-state='open'] &`]: {
      transform: "rotate(90deg)",
    },
  },
});

const linkWrapper = style({
  position: "relative",
});

const label = style({
  flex: 1,
});

const indicator = style({
  position: "absolute",
  left: 0,
  top: "25%",
  bottom: "25%",
  width: "2px",
  backgroundColor: tokens.colors.primary,
  zIndex: 1,
});

export const styles = {
  wrapper,
  item,
  subitems,
  toggle,
  toggleIcon,
  linkWrapper,
  label,
  indicator,
};
