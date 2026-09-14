import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const keyboard = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colors.surface,
    color: tokens.colors.text,
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radius.sm,
  },
  variants: {
    size: {
      small: {
        font: tokens.text.codeSmall,
        padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
      },
      large: {
        font: tokens.text.codeLarge,
        padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      },
    },
  },
});

const keyboardGroup = style({
  display: "inline-flex",
  alignItems: "center",
  gap: tokens.spacing.xs,
});

export const styles = { keyboard, keyboardGroup };
