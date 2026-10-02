import { render } from "@testing-library/react";

import { InlineCode } from "@/InlineCode/InlineCode";

describe("InlineCode", () => {
  it("renders with default props correctly", () => {
    const { getByText } = render(<InlineCode>test</InlineCode>);

    const inlineCode = getByText("test");
    expect(inlineCode).toBeTruthy();
    expect(inlineCode.tagName).toBe("CODE");
  });

  it("passes ref correctly", () => {
    const testRef = vi.fn();
    const { getByText } = render(<InlineCode ref={testRef}>test</InlineCode>);

    const inlineCode = getByText("test");
    expect(inlineCode).toBeTruthy();
    expect(inlineCode.tagName).toBe("CODE");
    expect(testRef).toHaveBeenCalledWith(inlineCode); // ref is called with the DOM element
  });
});
