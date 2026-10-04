import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colorWithFade, tokens } from "@wondesign/tokens";

const callout = recipe({
  base: {
    display: "grid",
    gap: `0 ${tokens.spacing.lg}`,
    padding: `${tokens.spacing.sm} ${tokens.spacing.xl}`,
    borderRadius: tokens.radius.md,
  },
  variants: {
    variant: {
      info: {
        color: tokens.colors.text,
        backgroundColor: colorWithFade(tokens.colors.text, 0.12),
      },
      warning: {
        color: tokens.colors.warning,
        backgroundColor: colorWithFade(tokens.colors.warning, 0.12),
      },
      error: {
        color: tokens.colors.error,
        backgroundColor: colorWithFade(tokens.colors.error, 0.12),
      },
      success: {
        color: tokens.colors.success,
        backgroundColor: colorWithFade(tokens.colors.success, 0.12),
      },
    },
    size: {
      small: {
        gridTemplateColumns: "1.5rem 1fr",
      },
      medium: {
        gridTemplateColumns: "2rem 1fr",
      },
      large: {
        gridTemplateColumns: "2.5rem 1fr",
      },
    },
  },
});

const icon = style({
  gridArea: "1 / 1",
  marginTop: tokens.spacing.lg,
});

const title = style({
  gridArea: "1 / 2",
});

const main = style({
  gridArea: "2 / 2",
  marginBottom: tokens.spacing.md,
});

export const styles = { callout, icon, title, main };
