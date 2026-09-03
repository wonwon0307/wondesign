import { render } from "@testing-library/react";

import { Heading } from "@/Heading";

describe("Heading", () => {
  it("renders the heading with the correct content", () => {
    const { getByText } = render(<Heading level={1}>Hello World</Heading>);
    expect(getByText("Hello World")).toBeTruthy();
  });

  it("maps the level to the matching heading tag", () => {
    const { getByText } = render(<Heading level={3}>Section</Heading>);
    expect(getByText("Section").tagName).toBe("H3");
  });

  it("applies the 'as' prop correctly", () => {
    const { getByText } = render(
      <Heading as="h6" level={1}>
        Looks big, semantically small
      </Heading>,
    );
    expect(getByText("Looks big, semantically small").tagName).toBe("H6");
  });

  it("clamps to a single line by default", () => {
    const { getByText } = render(<Heading level={1}>Clamped</Heading>);
    expect(getByText("Clamped").style.webkitLineClamp).toBe("1");
  });

  it("clamps to the requested number of lines", () => {
    const { getByText } = render(
      <Heading level={1} maxNumLines={3}>
        Clamped
      </Heading>,
    );
    expect(getByText("Clamped").style.webkitLineClamp).toBe("3");
  });

  it("does not clamp when maxNumLines is 0", () => {
    const { getByText } = render(
      <Heading level={1} maxNumLines={0}>
        Not clamped
      </Heading>,
    );
    expect(getByText("Not clamped").style.webkitLineClamp).toBe("");
  });

  it("merges a caller-provided style with the clamp", () => {
    const { getByText } = render(
      <Heading level={1} style={{ color: "red" }}>
        Styled
      </Heading>,
    );
    const el = getByText("Styled");
    expect(el.style.color).toBe("red");
    expect(el.style.webkitLineClamp).toBe("1");
  });
});
