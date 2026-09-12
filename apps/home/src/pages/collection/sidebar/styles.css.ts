import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colorWithOpacity, mediaQueries, tokens } from "@wondesign/ui/tokens";

const item = recipe({
  base: {
    display: "grid",
    gridTemplateColumns: "20px 1fr auto",
    alignItems: "center",
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    gap: tokens.spacing.md,
    borderRadius: tokens.radius.sm,
    font: tokens.text.bodyMedium,
    userSelect: "none",
    selectors: {
      "&:focus-visible": {
        backgroundColor: tokens.colors.backgroundHover,
        outline: `2px solid ${tokens.colors.primary}`,
        outlineOffset: "2px",
      },
    },
    "@media": {
      [mediaQueries.hoverable]: {
        selectors: {
          "&:hover": {
            backgroundColor: tokens.colors.backgroundHover,
          },
        },
      },
    },
  },
  variants: {
    isActive: {
      true: {
        color: tokens.colors.primary,
        fontWeight: tokens.typography.fontWeight.semibold,
        backgroundColor: colorWithOpacity(tokens.colors.primary, 12),
        selectors: {
          "&:focus-visible": {
            backgroundColor: colorWithOpacity(tokens.colors.primary, 24),
          },
        },
        "@media": {
          [mediaQueries.hoverable]: {
            selectors: {
              "&:hover": {
                backgroundColor: colorWithOpacity(tokens.colors.primary, 24),
              },
            },
          },
        },
      },
    },
    isDisabled: {
      true: {
        color: colorWithOpacity(tokens.colors.text, 50),
        pointerEvents: "none",
        cursor: "not-allowed",
      },
    },
  },
});

const subitems = style({
  display: "flex",
  flexDirection: "column",
  paddingLeft: tokens.spacing.xl,
  gap: tokens.spacing.xs,
});

const toggle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  borderRadius: tokens.radius.sm,
  transition: "background-color 0.15s ease",
  selectors: {
    [`${item.classNames.base}:hover &, ${item.classNames.base}:focus-visible &`]:
      {
        backgroundColor: tokens.colors.backgroundHover,
      },
  },
});

const toggleIcon = style({
  transition: "transform 0.15s ease",
  selectors: {
    [`${toggle}[data-state='open'] &`]: {
      transform: "rotate(90deg)",
    },
  },
});

export const styles = { item, subitems, toggle, toggleIcon };
