import { useRef, useState } from "react";
import { fireEvent, render } from "@testing-library/react";

import { useAutoFocus } from "@/auto-focus/useAutoFocus";

function TestComponent({
  returnTo,
  withFocusableElements = false,
}: {
  returnTo?: "next" | "empty";
  withFocusableElements?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const emptyRef = useRef<HTMLElement | null>(null);

  const returnRef =
    returnTo === "next" ? nextRef : returnTo === "empty" ? emptyRef : undefined;

  useAutoFocus(contentRef, {
    enabled: isOpen,
    returnRef,
  });

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <button data-testid="trigger" onClick={toggle} />
      {isOpen && (
        <div ref={contentRef} data-testid="content" tabIndex={-1}>
          Content
          {withFocusableElements && (
            <button data-testid="button">Button</button>
          )}
        </div>
      )}
      <div ref={nextRef} data-testid="next" tabIndex={-1} />
    </div>
  );
}

describe("useAutoFocus", () => {
  it("handles with no returnRef", () => {
    const { getByTestId } = render(<TestComponent />);

    const trigger = getByTestId("trigger");

    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    const content = getByTestId("content");
    expect(document.activeElement).toBe(content);

    fireEvent.click(trigger);
    expect(document.activeElement).toBe(trigger);
  });

  it("handles with returnRef", () => {
    const { getByTestId } = render(<TestComponent returnTo="next" />);

    const trigger = getByTestId("trigger");
    const next = getByTestId("next");

    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    const content = getByTestId("content");
    expect(document.activeElement).toBe(content);

    fireEvent.click(trigger);
    expect(document.activeElement).toBe(next);
  });

  it("handles with focusable elements", () => {
    const { getByTestId } = render(<TestComponent withFocusableElements />);

    const trigger = getByTestId("trigger");

    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    const button = getByTestId("button");
    expect(document.activeElement).toBe(button);

    fireEvent.click(trigger);
    expect(document.activeElement).toBe(trigger);
  });

  it("falls back to the previous active element if returnRef is empty", () => {
    const { getByTestId } = render(<TestComponent returnTo="empty" />);

    const trigger = getByTestId("trigger");
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    fireEvent.click(trigger);
    const content = getByTestId("content");
    expect(document.activeElement).toBe(content);

    fireEvent.click(trigger);
    expect(document.activeElement).toBe(trigger);
  });
});
