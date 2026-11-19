import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@wondesign/ui/tokens";

const body = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  maxWidth: "100vw",
  backgroundColor: tokens.colors.background,
  color: tokens.colors.text,
  fontFamily: tokens.typography.fontFamily.normal,
  transition: "background-color 0.3s ease, color 0.3s ease",

  "@media": {
    [mediaQueries.reducedMotion]: {
      transition: "none",
    },
  },
});

const main = style({
  flex: 1,
});

export const styles = { body, main };
