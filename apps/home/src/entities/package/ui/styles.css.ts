import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/ui/tokens";

const callout = style({
  marginTop: tokens.spacing.layoutSmall,
});

const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const left = style({
  flex: 1,
});

const right = style({
  display: "flex",
  alignItems: "center",
  gap: tokens.spacing.md,
});

const report = style({
  color: tokens.colors.warning,
});

export const styles = { callout, header, left, right, report };
