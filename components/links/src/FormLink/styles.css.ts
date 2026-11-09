import { recipe } from "@vanilla-extract/recipes";
import { mediaQueries, tokens } from "@wondesign/tokens";

const formLink = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacing.md,
    lineHeight: tokens.typography.lineHeight.body,
    fontWeight: tokens.typography.fontWeight.medium,
    fontFamily: tokens.typography.fontFamily.normal,
    borderRadius: tokens.radius.sm,
    textDecoration: "none",
    transition: "opacity 0.3s ease",
    selectors: {
      "&[data-disabled]": {
        opacity: tokens.opacity.disabled,
      },
    },
    "@media": {
      [mediaQueries.hoverable]: {
        selectors: {
          "&:hover:not([data-disabled])": {
            opacity: tokens.opacity.hover,
          },
        },
      },
    },
  },
  variants: {
    size: {
      small: {
        padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
        fontSize: tokens.typography.fontSize.bodySmall,
      },
      medium: {
        padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
        fontSize: tokens.typography.fontSize.bodyMedium,
      },
      large: {
        padding: `${tokens.spacing.sm} ${tokens.spacing.xl}`,
        fontSize: tokens.typography.fontSize.bodyLarge,
      },
    },
    variant: {
      "primary-outlined": {
        color: tokens.colors.primary,
        backgroundColor: "transparent",
        border: `1px solid ${tokens.colors.primary}`,
      },
      "primary-filled": {
        color: tokens.colors.onPrimary,
        backgroundColor: tokens.colors.primary,
        border: `1px solid ${tokens.colors.primary}`,
      },
      "secondary-outlined": {
        color: tokens.colors.textMuted,
        backgroundColor: "transparent",
        border: `1px solid ${tokens.colors.textMuted}`,
      },
      "secondary-filled": {
        color: tokens.colors.text,
        backgroundColor: tokens.colors.backgroundMuted,
        border: `1px solid ${tokens.colors.backgroundMuted}`,
      },
      "destructive-outlined": {
        color: tokens.colors.error,
        backgroundColor: "transparent",
        border: `1px solid ${tokens.colors.error}`,
      },
      "destructive-filled": {
        color: tokens.colors.textInverted,
        backgroundColor: tokens.colors.error,
        border: `1px solid ${tokens.colors.error}`,
      },
    },
    fill: {
      true: {
        width: "100%",
      },
    },
  },
});

export const styles = { formLink };
