import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colorWithFade, tokens } from "@wondesign/tokens";

const callout = recipe({
  base: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "auto 1fr",
    padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
    gap: `0 ${tokens.spacing.xl}`,
    borderRadius: tokens.radius.md,
  },
  variants: {
    variant: {
      info: {
        color: tokens.colors.text,
        backgroundColor: colorWithFade(tokens.colors.text, 0.15),
      },
      warning: {
        color: tokens.colors.warning,
        backgroundColor: colorWithFade(tokens.colors.warning, 0.15),
      },
      error: {
        color: tokens.colors.error,
        backgroundColor: colorWithFade(tokens.colors.error, 0.15),
      },
      success: {
        color: tokens.colors.success,
        backgroundColor: colorWithFade(tokens.colors.success, 0.15),
      },
    },
  },
});

const icon = recipe({
  base: {
    gridColumn: "1 / 2",
    gridRow: "1 / 2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    size: {
      small: {
        fontSize: tokens.typography.fontSize.bodyMedium,
      },
      medium: {
        fontSize: tokens.typography.fontSize.bodyLarge,
      },
      large: {
        fontSize: tokens.typography.fontSize.bodyExtraLarge,
      },
    },
    hasTitle: {
      false: { maxHeight: "2.4rem" },
    },
  },
});

const title = style({
  gridColumn: "2 / 3",
  gridRow: "1 / 2",
});

const paragraph = recipe({
  variants: {
    hasTitle: {
      true: {
        gridColumn: "2 / 3",
        gridRow: "2 / 3",
      },
      false: {
        gridColumn: "2 / 3",
        gridRow: "1 / 2",
      },
    },
  },
});

export const styles = { callout, icon, title, paragraph };
