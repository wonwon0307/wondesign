import { style } from "@vanilla-extract/css";

const item = style({
  display: "grid",
  gridTemplateColumns: "20px 1fr auto",
  alignItems: "center",
});

export const styles = { item };
