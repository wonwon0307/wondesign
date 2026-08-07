import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/ui";

const HEADER_HEIGHT = "48px";
const SIDEBAR_WIDTH = "280px";

const header = style({
  display: "grid",
  gridTemplateColumns: `${SIDEBAR_WIDTH} 1fr auto`,
  alignItems: "center",
  gap: tokens.spacing.layoutLarge,
  height: HEADER_HEIGHT,
  backgroundColor: tokens.colors.surface,
  boxShadow: tokens.elevation.lv1,
  overflow: "hidden",
});

const headerLeft = style({
  display: "flex",
  alignItems: "center",
  padding: `0 ${tokens.spacing.layoutSmall}`,
});

const tabs = style({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: `0 ${tokens.spacing.layoutSmall}`,
  gap: tokens.spacing.xl,
  height: "100%",
});

const headerRight = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: `0 ${tokens.spacing.layoutSmall}`,
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
});

export const styles = {
  header,
  headerLeft,
  tabs,
  headerRight,
  homeLink,
  homeText,
};
