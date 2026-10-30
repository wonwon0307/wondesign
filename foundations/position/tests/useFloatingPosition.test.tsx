import { fireEvent, render } from "@testing-library/react";

import { useFloatingPosition } from "@/useFloatingPosition";
import { UseFloatingPositionOptions } from "@/types";

vi.stubGlobal(
  "ResizeObserver",
  class ResizeObserver {
    observe() {
      // No-op for testing environment
    }
    unobserve() {
      // No-op for testing environment
    }
    disconnect() {
      // No-op for testing environment
    }
  },
);

function TestComponent({
  options = {},
  noArrow = false,
}: {
  options?: UseFloatingPositionOptions;
  noArrow?: boolean;
}) {
  const { triggerRef, floatingRef, arrowRef, placement, content, arrow } =
    useFloatingPosition(options);

  return (
    <div>
      <button ref={triggerRef}>Trigger</button>
      <div ref={floatingRef}>
        placement: {placement}, x: {content.x}, y: {content.y}
        {!noArrow && (
          <div ref={arrowRef}>
            Arrow (x: {arrow.x}, y: {arrow.y})
          </div>
        )}
      </div>
    </div>
  );
}

function NoFloatingRefComponent() {
  const { triggerRef, isPositioned, update } = useFloatingPosition();

  return (
    <div>
      <button ref={triggerRef} onClick={update}>
        Trigger
      </button>
      <div>isPositioned: {String(isPositioned)}</div>
    </div>
  );
}

describe("useFloatingPosition", () => {
  it("should update positions when the window resizes correctly", () => {
    const { getByText } = render(<TestComponent />);

    // default values
    expect(getByText("placement: bottom, x: 0, y: 0")).toBeTruthy();
    expect(getByText("Arrow (x: 0, y: 0)")).toBeTruthy();
  });

  it("should do nothing if enabled is false", () => {
    const { getByText } = render(
      <TestComponent options={{ enabled: false }} />,
    );

    // default values
    expect(getByText("placement: bottom, x: 0, y: 0")).toBeTruthy();
    expect(getByText("Arrow (x: 0, y: 0)")).toBeTruthy();
  });

  it("should handle no arrow ref gracefully", () => {
    const { getByText } = render(<TestComponent noArrow />);

    // default values
    expect(getByText("placement: bottom, x: 0, y: 0")).toBeTruthy();
  });

  it("should not update position if trigger or floating ref is null", () => {
    const { getByText } = render(<NoFloatingRefComponent />);

    // effect의 early return뿐만 아니라, update()를 직접 호출해도 계산하지 않아야 한다
    fireEvent.click(getByText("Trigger"));

    expect(getByText("isPositioned: false")).toBeTruthy();
  });
});
