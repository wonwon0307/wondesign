import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { mediaQueries, tokens } from "@wondesign/ui/tokens";

const toc = style({
  display: "flex",
  flexDirection: "column",
  alignSelf: "flex-start",
  padding: tokens.spacing.sm,
  gap: tokens.spacing.md,
  position: "sticky",
  top: "128px",
  borderLeft: `1px solid ${tokens.colors.border}`,
  "@media": {
    [mediaQueries.breakpoints.large]: {
      width: "240px",
    },
    [mediaQueries.breakpoints.medium]: {
      width: "140px",
    },
    [mediaQueries.breakpoints.small]: {
      // mobile 환경에서는 toc를 숨긴다
      display: "none",
    },
  },
});

const heading = style({
  padding: `0 ${tokens.spacing.md}`,
  font: tokens.text.bodyMedium,
  fontWeight: tokens.typography.fontWeight.bold,
});

const list = style({
  display: "flex",
  flexDirection: "column",
  padding: `0 ${tokens.spacing.lg}`,
  gap: tokens.spacing.md,
});

const link = recipe({
  base: {
    display: "block",
    font: tokens.text.bodyMedium,
    fontWeight: tokens.typography.fontWeight.semibold,
    selectors: {
      '&[aria-current="location"]': {
        color: tokens.colors.primary,
        fontWeight: tokens.typography.fontWeight.bold,
      },
    },
  },
  variants: {
    depth: {
      1: {},
      2: {},
      3: {
        paddingLeft: tokens.spacing.lg,
      },
      4: {
        paddingLeft: tokens.spacing.xl,
      },
      5: {},
      6: {},
    },
  },
});

export const styles = { toc, heading, list, link };
