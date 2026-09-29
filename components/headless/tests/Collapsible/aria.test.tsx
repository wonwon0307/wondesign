import { fireEvent, render } from "@testing-library/react";

import { TestCollapsible } from "./test-component";

describe("Collapsible - aria attributes", () => {
  it("should have correct aria attributes when open and closed", () => {
    const { getByText, queryByText } = render(
      <TestCollapsible>Content</TestCollapsible>,
    );

    const toggleButton = getByText("Toggle");

    // Initially closed
    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    expect(queryByText("Content")).toBeNull();

    // Open the collapsible
    fireEvent.click(toggleButton);

    expect(toggleButton.getAttribute("aria-expanded")).toBe("true");
    expect(getByText("Content")).toBeTruthy(); // content should be visible when open

    // Close the collapsible again
    fireEvent.click(toggleButton);

    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    expect(queryByText("Content")).toBeNull();
  });

  it("should have correct aria attributes when role is 'group'", () => {
    const { getByText, queryByText } = render(
      <TestCollapsible role="group">Group Content</TestCollapsible>,
    );

    const toggleButton = getByText("Toggle");

    // Initially closed
    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    expect(queryByText("Group Content")).toBeNull();

    // Open the collapsible
    fireEvent.click(toggleButton);

    expect(toggleButton.getAttribute("aria-expanded")).toBe("true");
    expect(getByText("Group Content")).toBeTruthy();

    // Close the collapsible again
    fireEvent.click(toggleButton);

    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    expect(queryByText("Group Content")).toBeNull();
  });
});
