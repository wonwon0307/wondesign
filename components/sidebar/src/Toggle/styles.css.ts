import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/tokens";

const toggle = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  padding: tokens.spacing.md,
  borderRadius: tokens.radius.md,
  color: tokens.colors.textMuted,
  selectors: {
    "&:hover": {
      backgroundColor: tokens.colors.backgroundHover,
      color: tokens.colors.text,
    },
  },
});

const sidebarIcon = style({
  display: "flex",
  transition: "opacity 0.15s ease",
  selectors: {
    [`${toggle}:hover &`]: { opacity: 0 },
  },
});

const arrowIcon = style({
  position: "absolute",
  display: "flex",
  opacity: 0,
  transition: "opacity 0.15s ease, transform 0.2s ease",
  selectors: {
    [`${toggle}:hover &`]: { opacity: 1 },
    [`${toggle}[data-side="left"][data-expanded="true"] &`]: {
      transform: "scaleX(-1)",
    },
    [`${toggle}[data-side="right"][data-expanded="false"] &`]: {
      transform: "scaleX(-1)",
    },
  },
});

export const styles = { toggle, sidebarIcon, arrowIcon };
