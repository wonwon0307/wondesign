import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const pre = style({
  overflowX: "auto",
  whiteSpace: "pre",
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
            userSelect: "none",
          },
        },
      },
    },
  },
});

export const styles = { pre, code, line };
