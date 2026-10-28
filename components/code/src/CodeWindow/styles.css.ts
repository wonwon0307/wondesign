import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/tokens";

const wrapper = style({
  position: "relative",
  borderRadius: tokens.radius.sm,
  border: `1px solid ${tokens.colors.borderMuted}`,
  boxShadow: tokens.elevation.lv1,
  overflow: "hidden",
});

const pre = style({
  margin: 0,
  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  backgroundColor: tokens.colors.backgroundMuted,
  scrollbarWidth: "thin",
});

const codeCopy = style({
  position: "absolute",
  top: tokens.spacing.md,
  right: tokens.spacing.md,
});

export const styles = { wrapper, pre, codeCopy };
