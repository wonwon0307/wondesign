import { useRef } from "react";
import { fireEvent, render } from "@testing-library/react";

import { useClickOutside } from "@/click-outside/useClickOutside";

const callback = vi.fn();

function TestComponent({
  disabled = false,
  onClickOutside = callback,
}: {
  disabled?: boolean;
  onClickOutside?: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const exceptionRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, onClickOutside, {
    enabled: !disabled,
    excludeRef: exceptionRef,
  });

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

  it("should handle pressing and releasing on different elements", () => {
    const { getByTestId } = render(<TestComponent />);

    // none should trigger the callback
    fireEvent.pointerDown(getByTestId("inner"));
    fireEvent.pointerUp(getByTestId("outside"));
    expect(callback).not.toHaveBeenCalled();

    fireEvent.pointerDown(getByTestId("outside"));
    fireEvent.pointerUp(getByTestId("inner"));
    expect(callback).not.toHaveBeenCalled();

    fireEvent.pointerDown(getByTestId("outside"));
    fireEvent.pointerUp(getByTestId("exception"));
    expect(callback).not.toHaveBeenCalled();
  });

  it("should stop listening after unmount", () => {
    const { unmount } = render(<TestComponent />);

    unmount();

    fireEvent.pointerDown(document.body);
    fireEvent.pointerUp(document.body);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should call the latest callback", () => {
    const first = vi.fn();
    const second = vi.fn();
    const { getByTestId, rerender } = render(
      <TestComponent onClickOutside={first} />,
    );

    rerender(<TestComponent onClickOutside={second} />);

    fireEvent.pointerDown(getByTestId("outside"));
    fireEvent.pointerUp(getByTestId("outside"));
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});
