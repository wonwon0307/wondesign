import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/ui/tokens";

const callout = style({
  marginTop: tokens.spacing.layoutMedium,
  padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
  gap: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
});

const header = style({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const right = style({
  display: "flex",
  alignItems: "center",
  gap: tokens.spacing.md,
});

const report = style({
  color: tokens.colors.warning,
});

export const styles = { callout, header, right, report };
