import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@wondesign/tokens";

const group = style({
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacing.xs,
});

const header = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
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

const toggle = style({
  position: "absolute",
  inset: 0,
  zIndex: 0,
  cursor: "pointer",
});

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
  gap: tokens.spacing.xs,
});

export const styles = {
  group,
  header,
  headerLeft,
  headerRight,
  toggle,
  icon,
  subitems,
};
