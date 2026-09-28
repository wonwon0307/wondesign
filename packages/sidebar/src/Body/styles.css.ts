import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const sidebar = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    padding: `${tokens.spacing.lg} 0`,
    flexShrink: 0,
    overflow: "hidden",
    backgroundColor: tokens.colors.background,
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
        width: "280px",
      },
      collapsed: {
        width: "56px",
      },
      closed: {
        width: "0px",
      },
    },
  },
});

export const styles = { sidebar };
