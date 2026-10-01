import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const formButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: tokens.radius.sm,
    transition: "all 0.3s ease",
    selectors: {
      "&[data-disabled]": {
        opacity: tokens.opacity.disabled,
      },
    },
  },
  variants: {
    size: {
      small: {
        padding: `${tokens.spacing.sm} 0`,
        gap: tokens.spacing.sm,
        font: tokens.text.bodySmall,
      },
      large: {
        padding: `${tokens.spacing.lg} 0`,
        gap: tokens.spacing.md,
        font: tokens.text.bodyLarge,
      },
      fill: {
        flex: 1,
        padding: `${tokens.spacing.lg} 0`,
        gap: tokens.spacing.md,
        font: tokens.text.bodyLarge,
      },
    },
    variant: {
      primary: {},
      secondary: {},
      destructive: {},
    },
    outlined: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: "primary",
        outlined: true,
      },
      style: {
        color: tokens.colors.primary,
        backgroundColor: tokens.colors.onPrimary,
        border: `1px solid ${tokens.colors.primary}`,
      },
    },
    {
      variants: {
        variant: "primary",
        outlined: false,
      },
      style: {
        color: tokens.colors.onPrimary,
        backgroundColor: tokens.colors.primary,
        border: `1px solid ${tokens.colors.primary}`,
      },
    },
    {
      variants: {
        variant: "secondary",
        outlined: true,
      },
      style: {
        color: tokens.colors.text,
        backgroundColor: tokens.colors.surface,
        border: `1px solid ${tokens.colors.border}`,
      },
    },
    {
      variants: {
        variant: "secondary",
        outlined: false,
      },
      style: {
        color: tokens.colors.surface,
        backgroundColor: tokens.colors.text,
        border: `1px solid ${tokens.colors.border}`,
      },
    },
    {
      variants: {
        variant: "destructive",
        outlined: true,
      },
      style: {
        color: tokens.colors.error,
        backgroundColor: tokens.colors.background,
        border: `1px solid ${tokens.colors.error}`,
      },
    },
    {
      variants: {
        variant: "destructive",
        outlined: false,
      },
      style: {
        color: tokens.colors.background,
        backgroundColor: tokens.colors.error,
        border: `1px solid ${tokens.colors.error}`,
      },
    },
  ],
});

export const styles = { formButton };
