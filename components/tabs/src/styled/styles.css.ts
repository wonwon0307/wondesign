import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { mediaQueries, tokens } from "@wondesign/tokens";

const container = recipe({
  base: {
    display: "flex",
  },
  variants: {
    vertical: {
      true: {
        flexDirection: "row",
      },
      false: {
        flexDirection: "column",
      },
    },
  },
});

const list = recipe({
  base: {
    display: "flex",
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    gap: tokens.spacing.sm,
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.sm,
  },
  variants: {
    vertical: {
      true: {
        flexDirection: "column",
      },
      false: {
        flexDirection: "row",
      },
    },
  },
});

const tab = recipe({
  base: {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
    borderRadius: tokens.radius.md,
    fontWeight: tokens.typography.fontWeight.semibold,
    whiteSpace: "nowrap",
    color: tokens.colors.textMuted,
    backgroundColor: "transparent",
    transition: "color 0.15s ease, background-color 0.15s ease",
    cursor: "pointer",
    selectors: {
      "&:focus-visible": {
        color: tokens.colors.text,
        outline: `1px solid ${tokens.colors.primary}`,
        outlineOffset: "2px",
      },
      "&[data-state='active']": {
        color: tokens.colors.primary,
        backgroundColor: tokens.colors.background,
      },
      "&[data-disabled='true']": {
        cursor: "not-allowed",
        color: tokens.colors.textMuted,
        backgroundColor: "transparent",
      },
    },
    "@media": {
      [mediaQueries.hoverable]: {
        selectors: {
          "&:not([data-state='active']):hover": {
            color: tokens.colors.text,
            backgroundColor: tokens.colors.backgroundHover,
          },
        },
      },
    },
  },
  variants: {
    iconSide: {
      left: {},
      right: { flexDirection: "row-reverse" },
    },
  },
});

const panel = style({
  flex: 1,
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  backgroundColor: tokens.colors.background,
  borderRadius: tokens.radius.sm,
  border: `1px solid ${tokens.colors.border}`,
});

export const styles = { container, list, tab, panel };
