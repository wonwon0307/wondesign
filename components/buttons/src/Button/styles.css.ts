import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { mediaQueries, tokens } from "@wondesign/tokens";

const formButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacing.md,
    position: "relative",
    lineHeight: tokens.typography.lineHeight.body,
    fontWeight: tokens.typography.fontWeight.medium,
    fontFamily: tokens.typography.fontFamily.normal,
    borderRadius: tokens.radius.sm,
    transition: "all 0.3s ease",
    selectors: {
      "&[data-disabled]": {
        opacity: tokens.opacity.disabled,
      },
      "&[data-loading]": {
        opacity: tokens.opacity.pending,
      },
    },
    "@media": {
      [mediaQueries.hoverable]: {
        selectors: {
          "&:hover:not([data-disabled], [data-loading])": {
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

const hide = style({
  opacity: tokens.opacity.hide,
});

const overlay = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  inset: 0,
});

export const styles = { formButton, hide, overlay };
