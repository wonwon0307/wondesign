import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/ui";

const tabs = style({
  display: "flex",
  flexDirection: "row",
  gap: tokens.spacing.md,
});

export const styles = { tabs };
