import { render } from "@testing-library/react";

import { Hyperlink } from "@/Hyperlink/Hyperlink";

describe("Hyperlink", () => {
  it("renders all appearances correctly", () => {
    const { getByText } = render(
      <>
        <Hyperlink>Default Hyperlink</Hyperlink>
        <Hyperlink appearance="primary">Primary Hyperlink</Hyperlink>
        <Hyperlink appearance="muted">Muted Hyperlink</Hyperlink>
        <Hyperlink appearance="inherit">Inherit Hyperlink</Hyperlink>
      </>,
    );

    const defaultLink = getByText("Default Hyperlink");
    expect(defaultLink.className).toContain("default");

    const primary = getByText("Primary Hyperlink");
    expect(primary.className).toContain("primary");

    const muted = getByText("Muted Hyperlink");
    expect(muted.className).toContain("muted");

    const inherit = getByText("Inherit Hyperlink");
    expect(inherit.className).toContain("inherit");
  });

  it("renders all variants of underline correctly", () => {
    const { getByText } = render(
      <>
        <Hyperlink>Hover</Hyperlink>
        <Hyperlink underline="always">Always</Hyperlink>
        <Hyperlink underline="none">Never</Hyperlink>
      </>,
    );

    const hover = getByText("Hover");
    expect(hover.className).toContain("hover");

    const always = getByText("Always");
    expect(always.className).toContain("always");

    const none = getByText("Never");
    expect(none.className).toContain("none");
  });

  it("forces always underline on inherit", () => {
    const { getByText } = render(
      <Hyperlink appearance="inherit" underline="none">
        Inherit
      </Hyperlink>,
    );

    const inherit = getByText("Inherit");
    expect(inherit.className).not.toContain("none");
    expect(inherit.className).not.toContain("hover");
    expect(inherit.className).toContain("always");
  });
});
