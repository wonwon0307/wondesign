import { style } from "@vanilla-extract/css";

const container = style({
  flex: 1,
  display: "flex",
  flexDirection: "row",
});

const sidebar = style({
  position: "sticky",
  top: "48px",
  left: 0,
  height: `calc(100vh - 64px)`,
});

const contents = style({
  flex: 1,
});

export const styles = { container, sidebar, contents };
