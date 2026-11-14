import { fireEvent, render } from "@testing-library/react";

import { PopoverProvider } from "@/Popover/Provider";
import { PopoverContent } from "@/Popover/Content";
import { PopoverTrigger } from "@/Popover/Trigger";
import { TestComponent } from "./test-component";

describe("Popover - interactions", () => {
  it("should open and close on trigger clicks", () => {
    const { getByTestId, getByText, queryByText } = render(
      <TestComponent>Test Content</TestComponent>,
    );

    // initial state
    expect(queryByText("Test Content")).toBeNull();

    const trigger = getByTestId("popover-trigger");

    fireEvent.click(trigger);

    const content = getByText("Test Content");
    expect(content).toBeTruthy();
    expect(content.dataset.state).toBe("open");
    expect(trigger.dataset.state).toBe("open");

    fireEvent.click(trigger);
    expect(queryByText("Test Content")).toBeNull();
    expect(trigger.dataset.state).toBe("closed");
  });

  it("should close popover on close button click", () => {
    const onClose = vi.fn();
    // should only close
    const { getByTestId, queryByText } = render(
      <TestComponent onClose={onClose}>Test Content</TestComponent>,
    );

    const trigger = getByTestId("popover-trigger");
    fireEvent.click(trigger);
    expect(queryByText("Test Content")).toBeTruthy();

    fireEvent.click(getByTestId("popover-button"));
    expect(queryByText("Test Content")).toBeNull();
    expect(onClose).toHaveBeenCalled();
  });

  it("should not close the popover if e.preventDefault is called on click", () => {
    const onClick = (e: React.MouseEvent) => e.preventDefault();
    const { getByTestId, getByText, queryByText } = render(
      <TestComponent onClose={onClick}>Test Content</TestComponent>,
    );

    fireEvent.click(getByTestId("popover-trigger"));
    expect(getByText("Test Content")).toBeTruthy();

    fireEvent.click(getByTestId("popover-button"));
    expect(queryByText("Test Content")).toBeTruthy();
  });

  it("should close the popover on escape key press", () => {
    const { getByTestId, getByText, queryByText } = render(
      <TestComponent>Test Content</TestComponent>,
    );

    const trigger = getByTestId("popover-trigger");

    fireEvent.click(trigger);

    const content = getByText("Test Content");
    expect(content).toBeTruthy();

    // doesn't close when focus is outside the popover content
    fireEvent.focus(trigger);
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "Escape", code: "Escape" });
    expect(queryByText("Test Content")).toBeTruthy();

    // focuses the popover content before pressing escape
    fireEvent.focus(content);
    content.focus();
    fireEvent.keyDown(document.body, { key: "Escape", code: "Escape" });
    expect(queryByText("Test Content")).toBeNull();
  });

  it("should close the popover on outside click", () => {
    const { getByTestId, getByText, queryByText } = render(
      <TestComponent>Test Content</TestComponent>,
    );

    fireEvent.click(getByTestId("popover-trigger"));
    expect(getByText("Test Content")).toBeTruthy();

    fireEvent.pointerDown(document.body);
    fireEvent.pointerUp(document.body);
    expect(queryByText("Test Content")).toBeNull();
  });

  it("should not close the popover on content clicks", () => {
    const { getByTestId, getByText, queryByText } = render(
      <TestComponent>Test Content</TestComponent>,
    );

    fireEvent.click(getByTestId("popover-trigger"));
    expect(getByText("Test Content")).toBeTruthy();

    fireEvent.click(getByText("Test Content"));
    expect(queryByText("Test Content")).toBeTruthy();
    fireEvent.click(getByTestId("popover-title"));
    expect(queryByText("Test Content")).toBeTruthy();
  });

  it("should move focus into the popover content on open and return focus on close", () => {
    const { getByTestId, getByText } = render(
      <div>
        <TestComponent>Test Content</TestComponent>
        <button>Outside Button</button>
      </div>,
    );

    const outsideButton = getByText("Outside Button");

    fireEvent.focus(outsideButton);
    outsideButton.focus();
    expect(document.activeElement).toBe(outsideButton);

    const trigger = getByTestId("popover-trigger");
    fireEvent.click(trigger);
    const closeButton = getByTestId("popover-button");
    expect(document.activeElement).toBe(closeButton);

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(document.activeElement).toBe(trigger);
  });

  it("should move focus to the content on open when no focusable element is present", () => {
    const { getByText } = render(
      <PopoverProvider>
        <PopoverContent>Content</PopoverContent>
        <PopoverTrigger>Trigger</PopoverTrigger>
      </PopoverProvider>,
    );

    const trigger = getByText("Trigger");
    fireEvent.click(trigger);
    const content = getByText("Content");
    expect(document.activeElement).toBe(content);

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(document.activeElement).toBe(trigger);
  });
});
