import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const pre = recipe({
  base: {
    margin: 0,
    padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
    color: tokens.colors.text,
    backgroundColor: tokens.colors.surface,
    border: `1px solid ${tokens.colors.borderMuted}`,
    borderRadius: tokens.radius.sm,
    overflowX: "auto",
    whiteSpace: "pre",
    tabSize: 2,
    scrollbarWidth: "thin",
  },
  variants: {
    size: {
      small: {
        font: tokens.text.codeSmall,
      },
      large: {
        font: tokens.text.codeLarge,
      },
    },
    horizontal: {
      wrap: {
        whiteSpace: "pre-wrap",
        overflowWrap: "anywhere",
      },
      scroll: {},
    },
    vertical: {
      full: {},
      scroll: {
        overflowY: "auto",
      },
    },
  },
});

const code = recipe({
  base: {},
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
            color: tokens.colors.textMuted,
            userSelect: "none",
          },
        },
      },
    },
  },
});

export const styles = { pre, code, line };
