import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/tokens";

const nav = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  padding: `0 ${tokens.spacing.sm}`,
  gap: tokens.spacing.md,
  scrollbarWidth: "thin",
  scrollbarColor: `${tokens.colors.border} transparent`,
  scrollbarGutter: "auto",
  WebkitOverflowScrolling: "touch",
});

export const styles = { nav };
