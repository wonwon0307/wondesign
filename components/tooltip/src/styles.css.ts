import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/tokens";

const trigger = style({
  cursor: "pointer",
});

const baseContent = style({
  position: "fixed",
  left: 0,
  top: 0,
  selectors: { "&[data-state='closed']": { display: "none" } },
  zIndex: tokens.zIndex.tooltip,
});

const content = style({
  display: "inline-flex",
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  gap: tokens.spacing.sm,
  width: "max-content",
  borderRadius: tokens.radius.sm,
  font: tokens.text.bodySmall,
  color: tokens.colors.textInverted,
  backgroundColor: tokens.colors.backgroundInverted,
});

const text = style({
  whiteSpace: "normal",
  wordBreak: "break-word",
  textAlign: "center",
});

const baseArrow = style({
  position: "absolute",
  left: 0,
  top: 0,
});

const arrow = style({
  width: 8,
  height: 8,
  lineHeight: 0,
});

const arrowIcon = style({
  display: "block",
  width: 8,
  height: 8,
  minWidth: 8,
  minHeight: 8,
  maxWidth: 8,
  maxHeight: 8,
  fill: tokens.colors.backgroundInverted,
});

export const styles = {
  trigger,
  baseContent,
  content,
  text,
  baseArrow,
  arrow,
  arrowIcon,
};
