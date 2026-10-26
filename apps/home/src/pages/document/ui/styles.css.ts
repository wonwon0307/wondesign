import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@wondesign/ui/tokens";

const container = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  minHeight: "100vh",
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
  gap: tokens.spacing.layoutLarge,
  "@media": {
    [mediaQueries.breakpoints.large]: {
      padding: `0 ${tokens.spacing.layoutLarge}`,
    },
    [mediaQueries.breakpoints.notLarge]: {
      padding: `0 ${tokens.spacing.layoutMedium}`,
    },
  },
});

const contents = style({
  flex: 4,
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  gap: tokens.spacing.md,
});

const h1 = style({
  marginTop: tokens.spacing.layoutMedium,
  // root header is sticky at 48px; offset anchor-scroll target so it isn't hidden underneath
  scrollMarginTop: "64px",
});

const heading = style({
  marginTop: tokens.spacing.xl,
  // root header is sticky at 48px; offset anchor-scroll target so it isn't hidden underneath
  scrollMarginTop: "64px",
});

const separator = style({
  marginTop: tokens.spacing.xl,
});

const codeBlock = style({
  margin: `${tokens.spacing.md} 0`,
});

const callout = style({
  margin: `${tokens.spacing.md} 0`,
});

const list = style({
  display: "flex",
  flexDirection: "column",
  marginBottom: tokens.spacing.lg,
  gap: tokens.spacing.md,
});

const listItem = style({
  marginLeft: tokens.spacing.md,
});

export const styles = {
  container,
  header,
  description,
  body,
  contents,
  h1,
  heading,
  separator,
  codeBlock,
  callout,
  list,
  listItem,
};
