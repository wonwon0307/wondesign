import { useRef } from "react";
import { fireEvent, render } from "@testing-library/react";

import { useLongPress } from "@/long-press/useLongPress";

const callback = vi.fn();

function TestComponent({ disabled = false }: { disabled?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLongPress(ref, callback, !disabled, 1000);

  return (
    <div ref={ref} data-testid="inner">
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

    const innerElement = getByTestId("inner");

    // Simulate long touch on the ref element
    fireEvent.touchStart(innerElement);
    vi.advanceTimersByTime(1000);
    fireEvent.touchEnd(innerElement);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call the callback when touch is shorter than threshold", () => {
    const { getByTestId } = render(<TestComponent />);

    const innerElement = getByTestId("inner");

    // Simulate short touch on the ref element
    fireEvent.touchStart(innerElement);
    vi.advanceTimersByTime(500);
    fireEvent.touchEnd(innerElement);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should not call the callback if the touch moves or cancels before the threshold", () => {
    const { getByTestId } = render(<TestComponent />);

    const innerElement = getByTestId("inner");

    // Simulate touch start on the ref element
    fireEvent.touchStart(innerElement);
    vi.advanceTimersByTime(500); // Halfway to the threshold

    // Simulate touch move before reaching the threshold
    fireEvent.touchMove(innerElement);
    vi.advanceTimersByTime(600); // Move past the threshold
    fireEvent.touchEnd(innerElement);
    expect(callback).not.toHaveBeenCalled();

    // Simulate touch start again
    fireEvent.touchStart(innerElement);
    vi.advanceTimersByTime(500); // Halfway to the threshold

    // Simulate touch cancel before reaching the threshold
    fireEvent.touchCancel(innerElement);
    vi.advanceTimersByTime(600); // Move past the threshold
    fireEvent.touchEnd(innerElement);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should not call the callback when disabled", () => {
    const { getByTestId } = render(<TestComponent disabled />);

    const innerElement = getByTestId("inner");

    // Simulate long touch on the ref element
    fireEvent.touchStart(innerElement);
    vi.advanceTimersByTime(1000);
    fireEvent.touchEnd(innerElement);
    expect(callback).not.toHaveBeenCalled();
  });
});
