import { tokens } from "@wondesign/tokens";
import { style } from "@vanilla-extract/css";

const line = "var(--wondesign-theme-break-line)";

const rule = style({
  alignSelf: "stretch",
  margin: `${tokens.spacing.xl} 0`,
  border: 0,
  borderTop: line,
});

export const styles = { rule };
