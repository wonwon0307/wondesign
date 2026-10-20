import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/ui/tokens";

const body = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  maxWidth: "100vw",
  backgroundColor: tokens.colors.background,
  color: tokens.colors.text,
  fontFamily: tokens.typography.fontFamily.normal,

  "@media": {
    "(prefers-reduced-motion: no-preference)": {
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
  },
});

const main = style({
  flex: 1,
});

export const styles = { body, main };
