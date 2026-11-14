import { fireEvent, render } from "@testing-library/react";

import { PopoverProvider } from "@/Popover/Provider";
import { PopoverContent } from "@/Popover/Content";
import { PopoverTitle } from "@/Popover/Title";
import { PopoverTrigger } from "@/Popover/Trigger";
import { TestComponent } from "./test-component";

describe("Popover - aria attributes", () => {
  it("should have correct aria attributes", () => {
    const { getByTestId } = render(<TestComponent>Test Content</TestComponent>);

    const trigger = getByTestId("popover-trigger");
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    // content가 마운트 되기 전까지 aria-controls는 없다
    expect(trigger.getAttribute("aria-controls")).toBeNull();

    fireEvent.click(trigger);

    const content = getByTestId("popover-content");
    const title = getByTestId("popover-title");
    const arrow = getByTestId("popover-arrow");

    // trigger
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("aria-controls")).toBe(content.id);

    // content
    expect(content.getAttribute("role")).toBe("dialog");
    expect(content.getAttribute("aria-labelledby")).toBe(title.id);
    expect(content.getAttribute("aria-label")).toBeNull();

    // arrow
    expect(arrow.getAttribute("aria-hidden")).toBe("true");
  });

  it("should apply default aria-label when title is not provided", () => {
    const { getByText } = render(
      <PopoverProvider isOpen>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </PopoverProvider>,
    );

    expect(getByText("Content").getAttribute("aria-label")).toBe(
      "Popover Content",
    );
  });

  it("should apply consumer set aria-label when title is not provided", () => {
    const { getByText } = render(
      <PopoverProvider isOpen>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent aria-label="Custom Aria Label">Content</PopoverContent>
      </PopoverProvider>,
    );

    expect(getByText("Content").getAttribute("aria-label")).toBe(
      "Custom Aria Label",
    );
  });

  it("should not apply consumer set aria-label when title is provided", () => {
    const { getByTestId, getByText } = render(
      <PopoverProvider isOpen>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent aria-label="Custom Aria Label" data-testid="content">
          <PopoverTitle>Content</PopoverTitle>
        </PopoverContent>
      </PopoverProvider>,
    );

    const title = getByText("Content");
    expect(getByTestId("content").getAttribute("aria-label")).toBeNull();
    expect(getByTestId("content").getAttribute("aria-labelledby")).toBe(
      title.id,
    );
  });
});
