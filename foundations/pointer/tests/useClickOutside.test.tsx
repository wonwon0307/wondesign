import { useRef } from "react";
import { fireEvent, render } from "@testing-library/react";

import { useClickOutside } from "@/click-outside/useClickOutside";

const callback = vi.fn();

function TestComponent({ disabled = false }: { disabled?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const exceptionRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, callback, !disabled, exceptionRef);

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
});
