import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colorWithOpacity, tokens } from "@wondesign/tokens";

const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacing.sm,
});

const link = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    gap: tokens.spacing.md,
    borderRadius: tokens.radius.sm,
    position: "relative",
    cursor: "pointer",
    userSelect: "none",
  },
  variants: {
    isActive: {
      true: {
        color: tokens.colors.primary,
        backgroundColor: colorWithOpacity(tokens.colors.primary, 12),
        selectors: {
          "&:hover, &:focus-visible": {
            backgroundColor: colorWithOpacity(tokens.colors.primary, 16),
          },
        },
      },
      false: {
        backgroundColor: "transparent",
        selectors: {
          "&:hover, &:focus-visible": {
            backgroundColor: tokens.colors.backgroundHover,
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
      false: {},
    },
    collapsed: {
      true: {
        justifyContent: "center",
        padding: tokens.spacing.sm,
      },
    },
  },
});

const linkOverlay = style({
  position: "absolute",
  inset: 0,
  borderRadius: "inherit",
  zIndex: 0,
});

const labelSlot = style({
  flex: 1,
  font: tokens.text.bodyMedium,
  selectors: {
    [`${link.classNames.base}[data-active='true'] &`]: {
      fontWeight: tokens.typography.fontWeight.semibold,
    },
  },
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
  height: "100%",
  borderRadius: tokens.radius.sm,
  position: "relative",
  zIndex: 1,
  cursor: "pointer",
  transition: "background-color 0.15s ease",
  selectors: {
    [`${link.classNames.base}:hover &, ${link.classNames.base}:focus-visible &`]:
      {
        backgroundColor: tokens.colors.backgroundHover,
      },
  },
});

const toggleIcon = style({
  transition: "transform 0.15s ease",
  selectors: {
    [`${toggle}[data-state='open'] &`]: {
      transform: "rotate(90deg)",
    },
  },
});

export const styles = {
  wrapper,
  link,
  linkOverlay,
  labelSlot,
  indicator,
  subitems,
  toggle,
  toggleIcon,
};
