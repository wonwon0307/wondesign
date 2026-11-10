import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@wondesign/tokens";

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
