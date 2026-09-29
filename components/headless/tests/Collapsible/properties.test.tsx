import { fireEvent, render } from "@testing-library/react";

import { TestCollapsible } from "./test-component";

describe("Collapsible - properties", () => {
  it("should handle disabled state correctly", () => {
    const { getByText, queryByText } = render(
      <TestCollapsible defaultOpen={false} isDisabled>
        Disabled Content
      </TestCollapsible>,
    );

    const toggleButton = getByText("Toggle");

    // The toggle should be disabled
    expect(toggleButton.getAttribute("aria-disabled")).toBe("true");
    // The content should be hidden
    expect(queryByText("Disabled Content")).toBeNull();

    // Clicking the toggle should not change the state
    fireEvent.click(toggleButton);
    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    expect(queryByText("Disabled Content")).toBeNull();
  });

  it("keepMounted - should NOT remove from DOM even if hidden", () => {
    const { getByText } = render(
      <TestCollapsible keepMounted>Content</TestCollapsible>,
    );

    const toggle = getByText("Toggle");

    // 초기에는 콘텐츠가 보이지 않아야 한다.
    expect(getByText("Content")).toBeTruthy();

    fireEvent.click(toggle);
    // 토글을 클릭하면 콘텐츠가 보여야 한다.
    expect(getByText("Content")).toBeTruthy();

    fireEvent.click(toggle);
    // 다시 클릭하면 콘텐츠가 숨겨져야 한다.
    expect(getByText("Content")).toBeTruthy();
  });
});
