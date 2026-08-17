import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const EXPANDED_WIDTH = "240px";
const ICON_WIDTH = "56px";

const sidebar = recipe({
  base: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto 1fr auto",
    height: "100vh",
    padding: `${tokens.spacing.lg} 0`,
    flexShrink: 0,
    overflow: "hidden",
    backgroundColor: tokens.colors.surface,
    transition: "width 0.3s ease-in-out",
  },
  variants: {
    appearance: {
      default: {
        boxShadow: tokens.elevation.lv1,
      },
      floating: {
        borderRadius: tokens.radius.lg,
        boxShadow: tokens.elevation.lv2,
        margin: tokens.spacing.md,
        height: `calc(100vh - 2 * ${tokens.spacing.md})`,
      },
      inset: {
        height: "100%",
        borderRadius: tokens.radius.md,
        border: `1px solid ${tokens.colors.border}`,
      },
    },
    state: {
      expanded: {
        width: EXPANDED_WIDTH,
      },
      collapsed: {
        width: ICON_WIDTH,
      },
      closed: {
        width: 0,
      },
    },
  },
});

export const styles = { sidebar };
