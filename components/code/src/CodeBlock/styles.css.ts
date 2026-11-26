import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const pre = recipe({
  base: {
    boxSizing: "content-box",
    margin: 0,
    padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
    backgroundColor: tokens.colors.backgroundMuted,
    borderRadius: tokens.radius.sm,
    border: `1px solid ${tokens.colors.borderMuted}`,
    boxShadow: tokens.elevation.lv1,
    tabSize: 2,
    lineHeight: tokens.typography.lineHeight.body,
    fontWeight: tokens.typography.fontWeight.medium,
    fontFamily: tokens.typography.fontFamily.code,
    whiteSpace: "pre",
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "thin",
  },
  variants: {
    size: {
      small: {
        fontSize: tokens.typography.fontSize.bodyExtraSmall,
      },
      medium: {
        fontSize: tokens.typography.fontSize.bodySmall,
      },
      large: {
        fontSize: tokens.typography.fontSize.bodyMedium,
      },
    },
    vertical: {
      auto: {},
      scroll: {
        overflowY: "auto",
      },
    },
  },
});

const code = recipe({
  base: {
    fontFamily: tokens.typography.fontFamily.code,
  },
  variants: {
    showLineNumbers: {
      true: {
        counterReset: "line",
      },
    },
  },
});

const line = recipe({
  base: {
    display: "block",
  },
  variants: {
    showLineNumbers: {
      true: {
        selectors: {
          "&::before": {
            counterIncrement: "line",
            content: "counter(line)",
            display: "inline-block",
            minWidth: "2ch",
            marginRight: tokens.spacing.xl,
            textAlign: "right",
            userSelect: "none",
          },
        },
      },
    },
  },
});

export const styles = { pre, code, line };
