import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/ui";

const container = style({
  display: "flex",
  flexDirection: "column",
});

const header = style({});

const body = style({
  display: "flex",
  flexDirection: "row",
  gap: tokens.spacing.lg,
});

const contents = style({
  flex: 1,
});

export const styles = { container, header, body, contents };
