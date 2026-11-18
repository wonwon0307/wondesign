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

  it("should set aria-labelledby to the toggle button id when role is 'region'", () => {
    const { getByText } = render(
      <TestCollapsible isOpen role="region">
        Region Content
      </TestCollapsible>,
    );

    const content = getByText("Region Content");
    const toggle = getByText("Toggle");
    expect(content.getAttribute("aria-labelledby")).toBe(toggle.id);
  });

  it("should have set aria-labelledby to undefined when role is 'group'", () => {
    const { getByText } = render(
      <TestCollapsible isOpen role="group">
        Group Content
      </TestCollapsible>,
    );

    const content = getByText("Group Content");
    expect(content.getAttribute("aria-labelledby")).toBeNull();
  });
});
