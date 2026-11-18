import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colorWithOpacity, tokens } from "@wondesign/tokens";

const slideUpEnter = keyframes({
  from: { transform: "translateY(100%)", opacity: 0 },
  to: { transform: "translateY(0)", opacity: 1 },
});

const slideUpExit = keyframes({
  from: { transform: "translateY(0)", opacity: 1 },
  to: { transform: "translateY(100%)", opacity: 0 },
});

const slideDownEnter = keyframes({
  from: { transform: "translateY(-100%)", opacity: 0 },
  to: { transform: "translateY(0)", opacity: 1 },
});

const slideDownExit = keyframes({
  from: { transform: "translateY(0)", opacity: 1 },
  to: { transform: "translateY(-100%)", opacity: 0 },
});

const group = recipe({
  base: {
    display: "flex",
    gap: tokens.spacing.md,
    position: "fixed",
    zIndex: tokens.zIndex.toast,
  },
  variants: {
    position: {
      top: {
        flexDirection: "column-reverse",
        top: tokens.spacing.layoutSmall,
        left: "50%",
        transform: "translateX(-50%)",
      },
      bottom: {
        flexDirection: "column",
        bottom: tokens.spacing.layoutSmall,
        left: "50%",
        transform: "translateX(-50%)",
      },
      "top-right": {
        flexDirection: "column-reverse",
        top: tokens.spacing.layoutSmall,
        right: tokens.spacing.layoutSmall,
      },
      "bottom-right": {
        flexDirection: "column",
        bottom: tokens.spacing.layoutSmall,
        right: tokens.spacing.layoutSmall,
      },
    },
  },
});

const toast = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
    gap: tokens.spacing.lg,
    width: "360px",
    maxWidth: `calc(100vw - 2 * ${tokens.spacing.layoutSmall})`,
    borderRadius: tokens.radius.md,
    boxShadow: tokens.elevation.lv1,
    backdropFilter: "blur(12px) saturate(1.5)",
    transition: "background-color 0.2s ease",
  },
  variants: {
    type: {
      default: {
        color: tokens.colors.primary,
        backgroundColor: colorWithOpacity(tokens.colors.primary, 0.2),
        selectors: {
          "&[data-paused]": {
            backgroundColor: colorWithOpacity(tokens.colors.primary, 0.4),
          },
        },
      },
      info: {
        color: tokens.colors.text,
        backgroundColor: colorWithOpacity(tokens.colors.text, 0.2),
        selectors: {
          "&[data-paused]": {
            backgroundColor: colorWithOpacity(tokens.colors.text, 0.4),
          },
        },
      },
      success: {
        color: tokens.colors.success,
        backgroundColor: colorWithOpacity(tokens.colors.success, 0.2),
        selectors: {
          "&[data-paused]": {
            backgroundColor: colorWithOpacity(tokens.colors.success, 0.4),
          },
        },
      },
      warning: {
        color: tokens.colors.warning,
        backgroundColor: colorWithOpacity(tokens.colors.warning, 0.2),
        selectors: {
          "&[data-paused]": {
            backgroundColor: colorWithOpacity(tokens.colors.warning, 0.4),
          },
        },
      },
      error: {
        color: tokens.colors.error,
        backgroundColor: colorWithOpacity(tokens.colors.error, 0.2),
        selectors: {
          "&[data-paused]": {
            backgroundColor: colorWithOpacity(tokens.colors.error, 0.4),
          },
        },
      },
    },
    slideDirection: {
      up: {
        selectors: {
          "&[data-state='open']": {
            animation: `${slideUpEnter} 0.3s ease`,
          },
          "&[data-state='closed']": {
            animation: `${slideUpExit} 0.3s ease forwards`,
          },
        },
      },
      down: {
        selectors: {
          "&[data-state='open']": {
            animation: `${slideDownEnter} 0.3s ease`,
          },
          "&[data-state='closed']": {
            animation: `${slideDownExit} 0.3s ease forwards`,
          },
        },
      },
    },
  },
});

const textArea = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacing.sm,
});

const messageArea = style({
  display: "flex",
  alignItems: "center",
  gap: tokens.spacing.lg,
});

const message = style({
  margin: `${tokens.spacing.sm} 0`,
  fontSize: tokens.typography.fontSize.bodyMedium,
  fontWeight: tokens.typography.fontWeight.medium,
});

const emptySpace = style({
  height: 24,
  width: 24,
});

export const styles = {
  group,
  toast,
  textArea,
  messageArea,
  message,
  emptySpace,
};
