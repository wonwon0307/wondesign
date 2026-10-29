import { render } from "@testing-library/react";

import { Keyboard } from "@/Keyboard";

describe("Keyboard", () => {
  it("renders the key label as a kbd element", () => {
    const { getByText } = render(<Keyboard>⌘</Keyboard>);
    expect(getByText("⌘")).toBeTruthy();
    expect(getByText("⌘").tagName).toBe("KBD");
  });

  it("applies size prop", () => {
    const { getByText } = render(<Keyboard size="large">Enter</Keyboard>);
    expect(getByText("Enter").tagName).toBe("KBD");
  });
});
