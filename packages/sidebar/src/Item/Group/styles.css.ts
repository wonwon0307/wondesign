import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { mediaQueries, tokens } from "@wondesign/tokens";

const group = style({
  display: "flex",
  flexDirection: "column",
});

const header = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
    position: "relative",
    borderRadius: tokens.radius.sm,
    fontSize: tokens.typography.fontSize.bodySmall,
    fontWeight: tokens.typography.fontWeight.semibold,
    color: tokens.colors.textMuted,
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
    hide: {
      true: {
        display: "none",
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
  zIndex: 1,
  opacity: tokens.opacity.hide,
  transition: "opacity 0.15s ease",
  selectors: {
    [`${header.classNames.base}:focus-within &`]: {
      opacity: tokens.opacity.normal,
    },
  },
  "@media": {
    [mediaQueries.hoverable]: {
      selectors: {
        [`${header.classNames.base}:hover &`]: {
          opacity: tokens.opacity.normal,
        },
      },
    },
  },
});

const overlayToggle = style({
  position: "absolute",
  borderRadius: "inherit",
  inset: 0,
  zIndex: 0,
  cursor: "pointer",
  selectors: {
    "&:focus-visible": {
      outlineOffset: "-2px",
    },
  },
});

const icon = style({
  transition: "transform 200ms ease, opacity 200ms ease",
  opacity: tokens.opacity.hide,
  selectors: {
    [`${header.classNames.base}:focus-within &`]: {
      opacity: tokens.opacity.normal,
    },
    [`${header.classNames.base}:has(${overlayToggle}[data-state="open"]) &`]: {
      transform: "rotate(90deg)",
    },
  },
  "@media": {
    [mediaQueries.hoverable]: {
      selectors: {
        [`${header.classNames.base}:hover &`]: {
          opacity: tokens.opacity.normal,
        },
      },
    },
    [mediaQueries.reducedMotion]: {
      transition: "none",
    },
  },
});

const wrapper = style({
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
  paddingLeft: tokens.spacing.md,
  gap: tokens.spacing.md,
  overflow: "hidden",
  transition: "padding-top 200ms ease",
  selectors: {
    [`${wrapper}[data-state='closed'] &`]: {
      paddingTop: 0,
    },
  },
  "@media": {
    [mediaQueries.reducedMotion]: {
      transition: "none",
    },
  },
});

export const styles = {
  group,
  header,
  headerLeft,
  headerRight,
  overlayToggle,
  icon,
  wrapper,
  subitems,
};
