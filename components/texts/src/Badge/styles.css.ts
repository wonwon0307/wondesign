import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/tokens";

const badge = style({
  display: "inline-block",
  alignItems: "center",
  justifyContent: "center",
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  gap: tokens.spacing.sm,
  fontSize: tokens.typography.fontSize.bodyExtraSmall,
  fontWeight: tokens.typography.fontWeight.regular,
  borderRadius: tokens.radius.sm,
});

export const styles = { badge };
