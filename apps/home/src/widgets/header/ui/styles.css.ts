import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@wondesign/ui/tokens";

const HEADER_HEIGHT = "48px";
const SIDEBAR_WIDTH = "280px";

const header = style({
  display: "flex",
  alignItems: "center",
  height: HEADER_HEIGHT,
  padding: `0 ${tokens.spacing.layoutSmall}`,
  gap: tokens.spacing.layoutLarge,
  position: "sticky",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: tokens.colors.background,
  boxShadow: tokens.elevation.lv1,
  zIndex: 1,
  overflow: "hidden",
  "@media": {
    [mediaQueries.breakpoints.small]: {
      padding: `0 ${tokens.spacing.lg}`,
    },
  },
});

const headerLeft = style({
  display: "flex",
  alignItems: "center",
  width: `calc(${SIDEBAR_WIDTH} - ${tokens.spacing.layoutSmall})`,
});

const headerRight = style({
  display: "flex",
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  "@media": {
    [mediaQueries.breakpoints.notLarge]: {
      justifyContent: "flex-end",
      gap: tokens.spacing.layoutMedium,
    },
  },
});

const tabs = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: tokens.spacing.xl,
  height: "100%",
  overflow: "hidden",
  transform: "translateY(2px)",
});

const links = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: tokens.spacing.md,
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
  font: tokens.text.hero,
  "@media": {
    [mediaQueries.breakpoints.small]: {
      display: "none",
    },
  },
});

export const styles = {
  header,
  headerLeft,
  headerRight,
  tabs,
  links,
  homeLink,
  homeText,
};
