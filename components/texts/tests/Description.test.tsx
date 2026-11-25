import { render } from "@testing-library/react";

import { Description } from "@/Description";

describe("Description", () => {
  it("renders the description with the correct content", () => {
    const { getByText } = render(<Description>Some description</Description>);

    expect(getByText("Some description")).toBeTruthy();
  });

  it("applies the 'as' prop correctly", () => {
    const { getByText } = render(
      <Description as="span">
        Looks like a paragraph, but is a span
      </Description>,
    );

    expect(getByText("Looks like a paragraph, but is a span").tagName).toBe(
      "SPAN",
    );
  });

  it("clamps to a single line by default", () => {
    const { getByText } = render(
      <Description maxNumLines={1}>Clamped</Description>,
    );

    expect(getByText("Clamped").style.webkitLineClamp).toBe("1");
  });

  it("handles the lineLength prop correctly", () => {
    const { getByText } = render(
      <>
        <Description>Default length</Description>
        <Description lineLength={10}>Limited length</Description>
        <Description lineLength={0}>Unlimited length</Description>
      </>,
    );

    expect(getByText("Default length").style.maxWidth).toBe("60ch");
    expect(getByText("Limited length").style.maxWidth).toBe("10ch");
    expect(getByText("Unlimited length").style.maxWidth).toBe("100%");
  });
});
