import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@wondesign/ui";

const container = style({
  display: "flex",
  flexDirection: "column",
});

const header = style({});

const body = style({
  display: "flex",
  flexDirection: "row",
  gap: tokens.spacing.lg,
});

const contents = style({
  flex: 1,
});

const toc = style({
  display: "flex",
  flexDirection: "column",
  alignSelf: "flex-start",
  padding: tokens.spacing.sm,
  gap: tokens.spacing.sm,
  width: "200px",
  position: "sticky",
  top: "48px",
  ["@media"]: {
    [mediaQueries.breakpoints.small]: {
      // mobile 환경에서는 toc를 숨긴다ㅁ
      display: "none",
    },
  },
});

export const styles = { container, header, body, contents, toc };
