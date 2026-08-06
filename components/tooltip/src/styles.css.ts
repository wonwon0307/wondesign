import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/tokens";

const trigger = style({
  cursor: "pointer",
});

const content = style({
  display: "inline-flex",
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  gap: tokens.spacing.sm,
  width: "max-content",
  borderRadius: tokens.radius.sm,
  color: tokens.colors.textInverted,
  backgroundColor: tokens.colors.backgroundInverted,
});

const arrow = style({
  width: 8,
  height: 8,
  minWidth: 8,
  minHeight: 8,
  maxWidth: 8,
  maxHeight: 8,
  fill: tokens.colors.backgroundInverted,
});

export const styles = { trigger, content, arrow };
