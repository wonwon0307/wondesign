import { style, keyframes } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@wondesign/tokens";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const backdrop = style({
  position: "fixed",
  inset: 0,
  backgroundColor: tokens.colors.overlay,
  backdropFilter: "blur(4px)",
  zIndex: tokens.zIndex.overlay,
});

const alert = style({
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacing.md,
  padding: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
  maxWidth: "640px",
  position: "fixed",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: tokens.colors.surface,
  borderRadius: tokens.radius.lg,
  zIndex: tokens.zIndex.alert,
  selectors: {
    "&[data-state='open']": {
      animation: `${fadeIn} 0.3s ease`,
    },
    "&[data-state='closed']": {
      animation: `${fadeOut} 0.3s ease`,
    },
  },
  "@media": {
    [mediaQueries.breakpoints.small]: {
      width: "90%",
    },
    [mediaQueries.breakpoints.notSmall]: {
      width: "50%",
    },
  },
});

const buttons = style({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: tokens.spacing.lg,
  gap: tokens.spacing.md,
});

export const styles = { backdrop, alert, buttons };
