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
  position: "fixed",
  left: "var(--wds-tooltip-content-x, 0px)",
  top: "var(--wds-tooltip-content-y, 0px)",
  borderRadius: tokens.radius.sm,
  color: tokens.colors.textInverted,
  backgroundColor: tokens.colors.backgroundInverted,
  zIndex: tokens.zIndex.tooltip,
  selectors: { "&[data-state='closed']": { display: "none" } },
});

const text = style({
  whiteSpace: "normal",
  wordBreak: "break-word",
  textAlign: "center",
});

const arrow = style({
  position: "absolute",
  left: "var(--wds-tooltip-arrow-x, 0px)",
  top: "var(--wds-tooltip-arrow-y, 0px)",
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

export const styles = { trigger, content, text, arrow, arrowIcon };
