import { useRef } from "react";
import { fireEvent, render } from "@testing-library/react";

import { useLongPress, type LongPressOptions } from "@/long-press/useLongPress";

const callback = vi.fn();

function TestComponent({
  disabled = false,
  onLongPress = callback,
  ...options
}: {
  disabled?: boolean;
  onLongPress?: () => void;
} & LongPressOptions) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLongPress(ref, onLongPress, {
    enabled: !disabled,
    threshold: 1000,
    ...options,
  });

  return (
    <div ref={ref} data-testid="test-component">
      Test Component
    </div>
  );
}

describe("useLongPress", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should call the callback when long touch is detected", () => {
    const { getByTestId } = render(<TestComponent />);

    const element = getByTestId("test-component");

    // Simulate long touch on the ref element
    fireEvent.touchStart(element);
    vi.advanceTimersByTime(1000);
    fireEvent.touchEnd(element);
    expect(callback).toHaveBeenCalledTimes(1);

    // movement within the move tolerance should trigger long press
    fireEvent.touchStart(element, {
      touches: [{ clientX: 0, clientY: 0 }],
    });
    fireEvent.touchMove(element, {
      touches: [{ clientX: 6, clientY: 6 }],
    });
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("should not call the callback when touch is shorter than threshold", () => {
    const { getByTestId } = render(<TestComponent />);

    const element = getByTestId("test-component");

    // Simulate short touch on the ref element
    fireEvent.touchStart(element);
    vi.advanceTimersByTime(500);
    fireEvent.touchEnd(element);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should not call the callback if the touch moves or cancels before the threshold", () => {
    const { getByTestId } = render(<TestComponent />);

    const element = getByTestId("test-component");

    // Simulate touch start on the ref element
    fireEvent.touchStart(element, {
      touches: [{ clientX: 0, clientY: 0 }],
    });
    vi.advanceTimersByTime(500); // Halfway to the threshold

    // Simulate touch move past the move tolerance before reaching the threshold
    fireEvent.touchMove(element, {
      touches: [{ clientX: 20, clientY: 0 }],
    });

    // Moving back after the press is cancelled shouldn't restart it
    fireEvent.touchMove(element, {
      touches: [{ clientX: 0, clientY: 0 }],
    });
    vi.advanceTimersByTime(600); // Move past the threshold
    fireEvent.touchEnd(element);
    expect(callback).not.toHaveBeenCalled();

    // Simulate touch start again
    fireEvent.touchStart(element);
    vi.advanceTimersByTime(500); // Halfway to the threshold

    // Simulate touch cancel before reaching the threshold
    fireEvent.touchCancel(element);
    vi.advanceTimersByTime(600); // Move past the threshold
    fireEvent.touchEnd(element);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should not call the callback when disabled", () => {
    const { getByTestId } = render(<TestComponent disabled />);

    const element = getByTestId("test-component");

    // Simulate long touch on the ref element
    fireEvent.touchStart(element);
    vi.advanceTimersByTime(1000);
    fireEvent.touchEnd(element);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should respect a custom move tolerance", () => {
    const { getByTestId } = render(<TestComponent moveTolerance={30} />);
    const element = getByTestId("test-component");

    fireEvent.touchStart(element, {
      touches: [{ clientX: 0, clientY: 0 }],
    });
    fireEvent.touchMove(element, {
      touches: [{ clientX: 20, clientY: 0 }],
    });
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should respect a custom threshold", () => {
    const { getByTestId } = render(<TestComponent threshold={200} />);
    const element = getByTestId("test-component");

    fireEvent.touchStart(element);
    vi.advanceTimersByTime(199);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call the callback when touched with more than one finger", () => {
    const { getByTestId } = render(<TestComponent />);
    const element = getByTestId("test-component");

    fireEvent.touchStart(element, {
      touches: [
        { clientX: 0, clientY: 0 },
        { clientX: 50, clientY: 50 },
      ],
    });
    vi.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should cancel the press when a second finger joins", () => {
    const { getByTestId } = render(<TestComponent />);
    const element = getByTestId("test-component");

    // first finger
    fireEvent.touchStart(element, {
      touches: [{ clientX: 0, clientY: 0 }],
    });
    vi.advanceTimersByTime(500);

    // second finger, then both lift
    fireEvent.touchStart(element, {
      touches: [
        { clientX: 0, clientY: 0 },
        { clientX: 50, clientY: 50 },
      ],
    });
    fireEvent.touchEnd(element);
    vi.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should not cancel a press in progress when the callback changes", () => {
    const first = vi.fn();
    const second = vi.fn();
    const { getByTestId, rerender } = render(
      <TestComponent onLongPress={first} />,
    );

    fireEvent.touchStart(getByTestId("test-component"));
    vi.advanceTimersByTime(500);

    rerender(<TestComponent onLongPress={second} />);
    vi.advanceTimersByTime(500);

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it("should not call the callback after unmount", () => {
    const { getByTestId, unmount } = render(<TestComponent />);

    fireEvent.touchStart(getByTestId("test-component"));
    vi.advanceTimersByTime(500);

    unmount();
    vi.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });
});
