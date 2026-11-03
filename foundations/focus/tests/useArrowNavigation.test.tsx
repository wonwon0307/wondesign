import { useRef } from "react";
import { fireEvent, render } from "@testing-library/react";

import { useArrowNavigation } from "@/arrow-navigation/useArrowNavigation";
import type { UseArrowNavigationOptions } from "@/arrow-navigation/types";

function TestComponent({
  children,
  orientation,
  loop,
  enabled,
}: Partial<UseArrowNavigationOptions & { children?: React.ReactNode }>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useArrowNavigation(containerRef, {
    itemSelector: '[role="item"]:not([aria-disabled="true"])',
    orientation,
    loop,
    enabled,
  });

  return (
    <div data-testid="list" ref={containerRef}>
      {children ?? (
        <>
          <button role="item" data-testid="item1">
            Item 1
          </button>
          <button role="item" aria-disabled="true" data-testid="item2">
            Item 2
          </button>
          <button role="item" data-testid="item3">
            Item 3
          </button>
        </>
      )}
    </div>
  );
}

describe("useArrowNavigation", () => {
  it("handles key navigation in horizontal orientation correctly", () => {
    const { getByTestId } = render(<TestComponent enabled />);

    const item1 = getByTestId("item1");
    const item3 = getByTestId("item3");

    item1.focus();
    fireEvent.keyDown(item1, { key: "ArrowRight" });
    // item2 is disabled and excluded, so focus skips straight to item3
    expect(document.activeElement).toBe(item3);
    // should not loop
    fireEvent.keyDown(item3, { key: "ArrowRight" });
    expect(document.activeElement).toBe(item3);

    fireEvent.keyDown(item3, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(item1);
    // should not loop
    fireEvent.keyDown(item1, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(item1);

    // should jump to first/last item on Home/End
    fireEvent.keyDown(item1, { key: "End" });
    expect(document.activeElement).toBe(item3);

    fireEvent.keyDown(item3, { key: "Home" });
    expect(document.activeElement).toBe(item1);

    // does nothing on up/down keys
    fireEvent.keyDown(item1, { key: "ArrowDown" });
    expect(document.activeElement).toBe(item1);
    fireEvent.keyDown(item1, { key: "ArrowUp" });
    expect(document.activeElement).toBe(item1);
  });

  it("handles key navigation in vertical orientation correctly", () => {
    const { getByTestId } = render(
      <TestComponent orientation="vertical" enabled />,
    );

    const item1 = getByTestId("item1");
    const item3 = getByTestId("item3");

    item1.focus();
    fireEvent.keyDown(item1, { key: "ArrowDown" });
    expect(document.activeElement).toBe(item3);

    fireEvent.keyDown(item3, { key: "ArrowUp" });
    expect(document.activeElement).toBe(item1);

    // horizontal keys should be ignored in vertical orientation
    fireEvent.keyDown(item1, { key: "ArrowRight" });
    expect(document.activeElement).toBe(item1);
    fireEvent.keyDown(item1, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(item1);

    // does nothing on Home/End keys in vertical orientation
    fireEvent.keyDown(item1, { key: "Home" });
    expect(document.activeElement).toBe(item1);
    fireEvent.keyDown(item1, { key: "End" });
    expect(document.activeElement).toBe(item3);

    // does nothing on left/right keys
    fireEvent.keyDown(item3, { key: "ArrowRight" });
    expect(document.activeElement).toBe(item3);
    fireEvent.keyDown(item3, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(item3);
  });

  it("wraps around at the ends when loop is true", () => {
    const { getByTestId } = render(<TestComponent loop enabled />);

    const item1 = getByTestId("item1");
    const item3 = getByTestId("item3");

    item3.focus();
    fireEvent.keyDown(item3, { key: "ArrowRight" });
    expect(document.activeElement).toBe(item1);

    fireEvent.keyDown(item1, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(item3);
  });

  it("does nothing when disabled", () => {
    const { getByTestId } = render(<TestComponent />);

    const item1 = getByTestId("item1");

    item1.focus();
    fireEvent.keyDown(item1, { key: "ArrowRight" });
    expect(document.activeElement).toBe(item1);
  });

  it("ignores keys pressed with Alt, Ctrl or Meta", () => {
    const { getByTestId } = render(<TestComponent enabled />);

    const item1 = getByTestId("item1");

    item1.focus();
    fireEvent.keyDown(item1, { key: "ArrowRight", altKey: true });
    expect(document.activeElement).toBe(item1);
    fireEvent.keyDown(item1, { key: "ArrowRight", ctrlKey: true });
    expect(document.activeElement).toBe(item1);
    fireEvent.keyDown(item1, { key: "End", metaKey: true });
    expect(document.activeElement).toBe(item1);
  });

  it("ignores silently when no items are present", () => {
    const { getByTestId } = render(
      <TestComponent enabled>No Items</TestComponent>,
    );

    const list = getByTestId("list");

    fireEvent.keyDown(list, { key: "ArrowRight" });
  });

  it("ignores silently if current item is not focusable", () => {
    const { getByTestId } = render(
      <TestComponent enabled>
        <button role="item" aria-disabled="true" data-testid="item1">
          Item 1
        </button>
        <button role="item" data-testid="item2">
          Item 2
        </button>
      </TestComponent>,
    );

    const item1 = getByTestId("item1");

    item1.focus();
    fireEvent.keyDown(item1, { key: "ArrowRight" });
    expect(document.activeElement).toBe(item1);
  });
});
