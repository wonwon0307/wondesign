import { render } from "@testing-library/react";

import { Paragraph } from "@/Paragraph";

describe("Paragraph", () => {
  it("renders the paragraph with the correct content", () => {
    const { getByText } = render(<Paragraph>Some paragraph</Paragraph>);

    expect(getByText("Some paragraph")).toBeTruthy();
  });

  it("applies the 'as' prop correctly", () => {
    const { getByText } = render(
      <Paragraph as="span">Looks like a paragraph, but is a span</Paragraph>,
    );

    expect(getByText("Looks like a paragraph, but is a span").tagName).toBe(
      "SPAN",
    );
  });

  it("clamps to a single line by default", () => {
    const { getByText } = render(
      <Paragraph maxNumLines={1}>Clamped</Paragraph>,
    );

    expect(getByText("Clamped").style.webkitLineClamp).toBe("1");
  });
});
