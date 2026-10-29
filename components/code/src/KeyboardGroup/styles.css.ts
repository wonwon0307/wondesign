import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/tokens";

const keyboardGroup = style({
  display: "inline-flex",
  alignItems: "center",
  gap: tokens.spacing.xs,
});

export const styles = { keyboardGroup };
