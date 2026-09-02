import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@wondesign/ui";

const HEADER_HEIGHT = "48px";
const SIDEBAR_WIDTH = "280px";

const header = style({
  display: "grid",
  gridTemplateColumns: `${SIDEBAR_WIDTH} 1fr auto`,
  alignItems: "center",
  gap: tokens.spacing.layoutLarge,
  height: HEADER_HEIGHT,
  position: "sticky",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: tokens.colors.surface,
  boxShadow: tokens.elevation.lv1,
  zIndex: 1,
  overflow: "hidden",
  "@media": {
    [mediaQueries.breakpoints.small]: {
      gridTemplateColumns: `auto 1fr auto`,
      gap: tokens.spacing.layoutSmall,
    },
  },
});

const headerLeft = style({
  display: "flex",
  alignItems: "center",
  padding: `0 ${tokens.spacing.layoutSmall}`,
  "@media": {
    [mediaQueries.breakpoints.small]: {
      padding: `0 ${tokens.spacing.lg}`,
    },
  },
});

const tabs = style({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: `0 ${tokens.spacing.layoutSmall}`,
  gap: tokens.spacing.xl,
  height: "100%",
  overflow: "hidden",
  "@media": {
    [mediaQueries.breakpoints.small]: {
      padding: `0 ${tokens.spacing.lg}`,
    },
  },
});

const headerRight = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: `0 ${tokens.spacing.layoutSmall}`,
  gap: tokens.spacing.md,
  "@media": {
    [mediaQueries.breakpoints.small]: {
      padding: `0 ${tokens.spacing.lg}`,
    },
  },
});

const homeLink = style({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  padding: `0 ${tokens.spacing.md}`,
  gap: tokens.spacing.lg,
  color: tokens.colors.primary,
  borderRadius: tokens.radius.sm,
  whiteSpace: "nowrap",
});

const homeText = style({
  marginTop: tokens.spacing.md,
  "@media": {
    [mediaQueries.breakpoints.small]: {
      display: "none",
    },
  },
});

export const styles = {
  header,
  headerLeft,
  tabs,
  headerRight,
  homeLink,
  homeText,
};
