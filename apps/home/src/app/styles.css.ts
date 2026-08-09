import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/ui";

const body = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: tokens.colors.background,
  color: tokens.colors.text,
  fontFamily: tokens.typography.fontFamily.normal,
});

const main = style({
  flex: 1,
});

export const styles = { body, main };
