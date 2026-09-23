import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@wondesign/ui/tokens";

const container = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  minHeight: "100vh",
  gap: tokens.spacing.layoutMedium,
  backgroundColor: tokens.colors.background,
});

const header = style({
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacing.lg,
  backgroundColor: tokens.colors.surface,
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
  flex: 1,
  minWidth: 0,
});

const heading = style({
  margin: `${tokens.spacing.xl} 0`,
  // root header is sticky at 48px; offset anchor-scroll target so it isn't hidden underneath
  scrollMarginTop: tokens.spacing.layoutLarge,
});

const paragraph = style({
  margin: `${tokens.spacing.md} 0`,
});

export const styles = {
  container,
  header,
  description,
  body,
  contents,
  heading,
  paragraph,
};
