import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/tokens";

const inlineCode = style({
  padding: `${tokens.spacing.sm} ${tokens.spacing.sm} ${tokens.spacing.xs} ${tokens.spacing.sm}`,
  fontSize: "inherit",
  lineHeight: "inherit",
  fontWeight: tokens.typography.fontWeight.medium,
  fontFamily: tokens.typography.fontFamily.code,
  color: "inherit",
  backgroundColor: tokens.colors.backgroundMuted,
  borderRadius: tokens.radius.sm,
  boxShadow: tokens.elevation.lv1,
  overflowWrap: "anywhere",
  boxDecorationBreak: "clone",
  WebkitBoxDecorationBreak: "clone",
});

export const styles = { inlineCode };
