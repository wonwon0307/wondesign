import { style } from "@vanilla-extract/css";
import { tokens } from "@wondesign/ui/tokens";

const item = style({
  display: "grid",
  gridTemplateColumns: "24px 1fr auto",
  gap: tokens.spacing.lg,
});

const toggle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `${tokens.spacing.xs} 0`,
  height: "100%",
  borderRadius: tokens.radius.sm,
  transition: "background-color 0.15s ease",
  selectors: {
    [`&:hover,  &:focus-visible`]: {
      backgroundColor: tokens.colors.backgroundHighlight,
    },
  },
});

const toggleIcon = style({
  transition: "transform 0.15s ease",
  selectors: {
    [`${toggle}[data-state='open'] &`]: {
      transform: "rotate(90deg)",
    },
  },
});

export const styles = { item, toggle, toggleIcon };
