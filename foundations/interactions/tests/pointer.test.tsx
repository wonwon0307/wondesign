import { useRef } from "react";
import { fireEvent, render } from "@testing-library/react";

import { useClickOutside } from "@/pointer/useClickOutside";
import { useLongTouch } from "@/pointer/useLongTouch";

const callback = vi.fn();

function TestComponent({ disabled = false }: { disabled?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const exceptionRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, callback, !disabled, exceptionRef);
  useLongTouch(ref, callback, !disabled, 1000);

  return (
    <div>
      <div ref={ref} data-testid="inner">
        Test Component
      </div>
      <div data-testid="outside">
        Outside
        <div ref={exceptionRef} data-testid="exception">
          Exception
        </div>
      </div>
    </div>
  );
}

describe("useClickOutside", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call the callback when clicing outside the ref element", () => {
    const { getByTestId } = render(<TestComponent />);

    const innerElement = getByTestId("inner");
    const outsideElement = getByTestId("outside");

    // Simulate clicking inside the ref element
    fireEvent.pointerDown(innerElement);
    fireEvent.pointerUp(innerElement);
    expect(callback).not.toHaveBeenCalled();

    // Simulate clicking on the exception element
    const exceptionElement = getByTestId("exception");
    fireEvent.pointerDown(exceptionElement);
    fireEvent.pointerUp(exceptionElement);
    expect(callback).not.toHaveBeenCalled();

    // Simulate clicking outside the ref element
    fireEvent.pointerDown(outsideElement);
    fireEvent.pointerUp(outsideElement);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call the callback when disabled", () => {
    const { getByTestId } = render(<TestComponent disabled />);

    const outsideElement = getByTestId("outside");

    // Simulate clicking outside the ref element
    fireEvent.pointerDown(outsideElement);
    fireEvent.pointerUp(outsideElement);
    expect(callback).not.toHaveBeenCalled();
  });
});

describe("useLongTouch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
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
