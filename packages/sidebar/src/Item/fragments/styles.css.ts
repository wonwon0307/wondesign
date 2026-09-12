import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const wrapper = style({
  display: "flex",
  flexDirection: "column",
});

const header = style({
  position: "relative",
});

const baseInteractive = recipe({
  base: {
    cursor: "pointer",
  },
  variants: {
    stretch: {
      true: {
        position: "absolute",
        borderRadius: "inherit",
        inset: 0,
        zIndex: 0,
      },
      false: {
        zIndex: 1,
      },
    },
  },
});

const subitems = style({
  display: "flex",
  flexDirection: "column",
  selectors: {
    "&[data-state='closed']": {
      display: "none",
    },
  },
});

export const styles = { wrapper, header, baseInteractive, subitems };
