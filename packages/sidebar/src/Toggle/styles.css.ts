import { keyframes, style } from "@vanilla-extract/css";
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
      backgroundColor: tokens.colors.backgroundHighlight,
      color: tokens.colors.text,
    },
  },
});

const sidebarIcon = style({
  display: "flex",
  transition: "opacity 0.15s ease",
  opacity: tokens.opacity.normal,
  selectors: {
    [`${toggle}:hover &`]: { opacity: tokens.opacity.hide },
  },
});

const arrowIcon = style({
  position: "absolute",
  display: "flex",
  opacity: tokens.opacity.hide,
  transition: "opacity 0.15s ease, transform 0.2s ease",
  selectors: {
    [`${toggle}:hover &`]: { opacity: tokens.opacity.normal },
    [`${toggle}[data-side="left"][data-open="true"] &`]: {
      transform: "scaleX(-1)",
    },
    [`${toggle}[data-side="right"][data-open="false"] &`]: {
      transform: "scaleX(-1)",
    },
  },
});

const swapContainer = style({
  display: "grid",
  placeItems: "center",
});

const fadeIn = keyframes({
  from: { opacity: tokens.opacity.hide },
  to: { opacity: tokens.opacity.normal },
});

const collapsedIcon = style({
  gridArea: "1 / 1",
  opacity: tokens.opacity.normal,
  transition: "opacity 200ms ease",
  selectors: {
    [`${swapContainer}:hover &, ${swapContainer}:focus-within &`]: {
      opacity: tokens.opacity.hide,
      pointerEvents: "none",
    },
  },
});

const swapToggle = style({
  gridArea: "1 / 1",
  opacity: tokens.opacity.hide,
  cursor: "pointer",
  pointerEvents: "none",
  animation: `${fadeIn} 200ms ease`,
  animationPlayState: "paused",
  selectors: {
    [`${swapContainer}:hover &, ${swapContainer}:focus-within &`]: {
      opacity: tokens.opacity.normal,
      pointerEvents: "auto",
      animationPlayState: "running",
    },
  },
});

export const styles = {
  toggle,
  sidebarIcon,
  arrowIcon,
  swapContainer,
  collapsedIcon,
  swapToggle,
};
