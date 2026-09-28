import { style } from "@vanilla-extract/css";

const wrapper = style({
  display: "flex",
  flexDirection: "column",
});

const anchor = style({
  cursor: "pointer",
});

const overlayLink = style({
  position: "absolute",
  borderRadius: "inherit",
  inset: 0,
  zIndex: 0,
});

const link = style({
  position: "relative",
});

const label = style({
  flex: 1,
});

const toggle = style({
  zIndex: 1,
});

const defaultIcon = style({
  transition: "transform 0.15s ease",
  selectors: {
    [`${toggle}[data-state='open'] &`]: {
      transform: "rotate(90deg)",
    },
  },
});

export const styles = {
  wrapper,
  anchor,
  overlayLink,
  link,
  label,
  toggle,
  defaultIcon,
};
