import { useRef } from "react";
import { fireEvent, render } from "@testing-library/react";

import { PopoverProvider } from "@/Popover/Provider";
import { PopoverContent } from "@/Popover/Content";
import { PopoverTitle } from "@/Popover/Title";
import { PopoverClose } from "@/Popover/Close";
import { PopoverTrigger } from "@/Popover/Trigger";
import { TestComponent } from "./test-component";

describe("Popover - properties", () => {
  it("respects the `defaultOpen` prop", () => {
    const { getByTestId } = render(
      <TestComponent defaultOpen>Test Content</TestComponent>,
    );

    const content = getByTestId("popover-content");
    expect(content).toBeTruthy();
    expect(content.dataset.state).toBe("open");
  });

  it("respects the disableEscapeKey prop", () => {
    const { getByTestId } = render(
      <TestComponent disableEscapeKey>Test Content</TestComponent>,
    );

    const trigger = getByTestId("popover-trigger");
    fireEvent.click(trigger);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(trigger.dataset.state).toBe("open");
  });

  it("respects the initialFocusRef and returnFocusRef props", () => {
    const PopoverWithMultipleButtons = () => {
      const initialRef = useRef<HTMLButtonElement>(null);
      const nextRef = useRef<HTMLButtonElement>(null);

      return (
        <div>
          <TestComponent initialFocusRef={initialRef} returnFocusRef={nextRef}>
            <button>First Button</button>
            <button ref={initialRef}>Second Button</button>
          </TestComponent>
          <button ref={nextRef}>Next Button</button>
        </div>
      );
    };

    const { getByText } = render(<PopoverWithMultipleButtons />);

    const trigger = getByText("Trigger");
    const nextButton = getByText("Next Button");

    fireEvent.click(trigger);
    const closeButton = getByText("Close");
    const secondButton = getByText("Second Button");
    expect(document.activeElement).toBe(secondButton);

    fireEvent.click(closeButton);
    expect(document.activeElement).toBe(nextButton);
  });

  it("supports controlled mode", () => {
    const onOpenChange = vi.fn();
    const { getByTestId } = render(
      <TestComponent isOpen onOpenChange={onOpenChange}>
        Test Content
      </TestComponent>,
    );

    const content = getByTestId("popover-content");
    expect(content).toBeTruthy();
    expect(content.dataset.state).toBe("open");

    fireEvent.click(getByTestId("popover-button"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("keeps components mounted if keepMounted is true", () => {
    const { getByTestId } = render(
      <TestComponent keepMounted>Test Content</TestComponent>,
    );

    const content = getByTestId("popover-content");
    expect(content).toBeTruthy();
    expect(content.dataset.state).toBe("closed");
    expect(content.hidden).toBe(true);
  });

  it("supports the `asChild` prop", () => {
    const { getByTestId, getByText } = render(
      <PopoverProvider>
        <PopoverTrigger asChild>
          <button>Open</button>
        </PopoverTrigger>
        <PopoverContent asChild data-testid="popover-content">
          <div>
            <PopoverTitle asChild>
              <h4>Title</h4>
            </PopoverTitle>
            <PopoverClose asChild aria-label="Test Label">
              <button>Close</button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </PopoverProvider>,
    );

    const trigger = getByText("Open");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");

    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    const content = getByTestId("popover-content");
    expect(content).toBeTruthy();
    expect(content.tagName).toBe("DIV"); // instead of dialog

    const title = getByText("Title");
    expect(title).toBeTruthy();
    expect(title.tagName).toBe("H4"); // instead of h2

    const close = getByText("Close");
    expect(close).toBeTruthy();
    expect(close.tagName).toBe("BUTTON");
    expect(close.getAttribute("aria-label")).toBe("Test Label");
  });
});
