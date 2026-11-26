import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const line = "var(--wondesign-divider-line)";

const horizontal = recipe({
  base: {
    flexShrink: 0,
    alignSelf: "stretch",
  },
  variants: {
    withLabel: {
      true: {
        display: "flex",
        alignItems: "center",
        gap: tokens.spacing.md,
        color: tokens.colors.textMuted,
        fontWeight: tokens.typography.fontWeight.medium,
        lineHeight: tokens.typography.lineHeight.single,
        fontSize: tokens.typography.fontSize.bodyMedium,
        textAlign: "center",
        selectors: {
          "&::before, &::after": {
            content: '""',
            flex: 1,
            borderTop: line,
          },
        },
      },
      false: {
        borderTop: line,
      },
    },
    labelAlign: {
      start: { selectors: { "&::before": { display: "none" } } },
      center: {},
      end: { selectors: { "&::after": { display: "none" } } },
    },
  },
});

const vertical = recipe({
  base: {
    flexShrink: 0,
    alignSelf: "stretch",
  },
  variants: {
    withLabel: {
      true: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: tokens.spacing.md,
        color: tokens.colors.textMuted,
        fontWeight: tokens.typography.fontWeight.medium,
        lineHeight: tokens.typography.lineHeight.single,
        fontSize: tokens.typography.fontSize.bodyMedium,
        textAlign: "center",
        selectors: {
          "&::before, &::after": {
            content: '""',
            flex: 1,
            borderLeft: line,
          },
        },
      },
      false: {
        borderLeft: line,
      },
    },
    labelAlign: {
      start: { selectors: { "&::before": { display: "none" } } },
      center: {},
      end: { selectors: { "&::after": { display: "none" } } },
    },
  },
});

export const styles = { horizontal, vertical };
