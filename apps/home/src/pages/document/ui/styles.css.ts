import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@wondesign/ui/tokens";

const container = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  minHeight: "100vh",
  gap: tokens.spacing.layoutSmall,
  backgroundColor: tokens.colors.background,
});

const header = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: tokens.colors.backgroundMuted,
  "@media": {
    [mediaQueries.breakpoints.large]: {
      padding: `${tokens.spacing.layoutMedium} ${tokens.spacing.layoutLarge} 0 ${tokens.spacing.layoutLarge}`,
    },
    [mediaQueries.breakpoints.notLarge]: {
      padding: `${tokens.spacing.layoutMedium} ${tokens.spacing.layoutMedium} 0 ${tokens.spacing.layoutMedium}`,
    },
  },
});

const description = style({
  marginBottom: tokens.spacing.layoutMedium,
});

const body = style({
  display: "flex",
  flexDirection: "row",
  "@media": {
    [mediaQueries.breakpoints.large]: {
      padding: `0 ${tokens.spacing.layoutLarge}`,
      gap: tokens.spacing.layoutLarge,
    },
    [mediaQueries.breakpoints.notLarge]: {
      padding: `0 ${tokens.spacing.layoutMedium}`,
      gap: tokens.spacing.layoutSmall,
    },
  },
});

const contents = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minWidth: 0,
  gap: tokens.spacing.md,
});

const heading = style({
  // root header is sticky at 48px; offset anchor-scroll target so it isn't hidden underneath
  scrollMarginTop: "64px",
});

export const styles = {
  container,
  header,
  description,
  body,
  contents,
  heading,
};
