import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@wondesign/tokens";

const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacing.xs,
});

const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
  borderRadius: tokens.radius.md,
  font: tokens.text.bodySmall,
  fontWeight: tokens.typography.fontWeight.semibold,
  color: tokens.colors.textMuted,
  userSelect: "none",
  "@media": {
    [mediaQueries.hoverable]: {
      selectors: {
        "&:hover": {
          backgroundColor: tokens.colors.backgroundHover,
        },
      },
    },
  },
});

const headerLeft = style({
  display: "flex",
  alignItems: "center",
  gap: tokens.spacing.sm,
});

const headerRight = style({
  position: "relative",
  zIndex: 1,
  opacity: 0,
  transition: "opacity 0.15s ease",
  selectors: {
    [`${header}:focus-within &`]: {
      opacity: 1,
    },
  },
  "@media": {
    [mediaQueries.hoverable]: {
      selectors: {
        [`${header}:hover &`]: {
          opacity: 1,
        },
      },
    },
  },
});

const toggle = style({});

const icon = style({
  transition: "transform 200ms ease, opacity 200ms ease",
  opacity: 0,
  selectors: {
    [`${header}:focus-within &`]: {
      opacity: 1,
    },
    [`${header}:has(${toggle}[data-state="open"]) &`]: {
      transform: "rotate(90deg)",
    },
  },
  "@media": {
    [mediaQueries.hoverable]: {
      selectors: {
        [`${header}:hover &`]: {
          opacity: 1,
        },
      },
    },
  },
});

const subitems = style({
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacing.sm,
});

export const styles = {
  wrapper,
  header,
  headerLeft,
  headerRight,
  toggle,
  icon,
  subitems,
};
