import { render } from "@testing-library/react";

import { InlineCode } from "@/InlineCode/InlineCode";

describe("InlineCode", () => {
  it("renders with default props correctly", () => {
    const { getByText } = render(<InlineCode>test</InlineCode>);

    const inlineCode = getByText("test");
    expect(inlineCode).toBeTruthy();
    expect(inlineCode.tagName).toBe("CODE");
    expect(inlineCode.className).toContain("small"); // default size is small
  });

  it("renders with large size correctly and passes ref", () => {
    const testRef = vi.fn();
    const { getByText } = render(
      <InlineCode size="large" ref={testRef}>
        test
      </InlineCode>,
    );

    const inlineCode = getByText("test");
    expect(inlineCode).toBeTruthy();
    expect(inlineCode.tagName).toBe("CODE");
    expect(inlineCode.className).toContain("large"); // size is large
    expect(testRef).toHaveBeenCalledWith(inlineCode); // ref is called with the DOM element
  });
});
