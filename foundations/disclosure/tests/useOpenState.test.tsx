import { fireEvent, render, renderHook } from "@testing-library/react";

import { useOpenState } from "@/useOpenState";
import type { UseOpenStateOptions } from "@/types";

function TestComponent(options: UseOpenStateOptions) {
  const { isOpen, show, hide, toggle } = useOpenState(options);

  return (
    <div>
      <p data-testid="status">{isOpen ? "Open" : "Closed"}</p>
      <button onClick={show}>Show</button>
      <button onClick={hide}>Hide</button>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

describe("useOpenState", () => {
  it("should manage open state in uncontrolled mode", () => {
    const { getByTestId, getByText } = render(
      <TestComponent initialState={false} />,
    );

    expect(getByTestId("status").textContent).toBe("Closed");

    fireEvent.click(getByText("Show"));
    expect(getByTestId("status").textContent).toBe("Open");

    fireEvent.click(getByText("Hide"));
    expect(getByTestId("status").textContent).toBe("Closed");

    fireEvent.click(getByText("Toggle"));
    expect(getByTestId("status").textContent).toBe("Open");

    fireEvent.click(getByText("Toggle"));
    expect(getByTestId("status").textContent).toBe("Closed");
  });

  it("should manage open state in controlled mode", () => {
    const setControlledOpen = vi.fn();
    const { getByTestId, getByText } = render(
      <TestComponent
        controlledOpen={false}
        setControlledOpen={setControlledOpen}
      />,
    );

    expect(getByTestId("status").textContent).toBe("Closed");

    fireEvent.click(getByText("Show"));
    expect(setControlledOpen).toHaveBeenCalledWith(true);

    fireEvent.click(getByText("Hide"));
    expect(setControlledOpen).toHaveBeenCalledWith(false);

    fireEvent.click(getByText("Toggle"));
    expect(setControlledOpen).toHaveBeenCalledWith(true);

    fireEvent.click(getByText("Toggle"));
    expect(setControlledOpen).toHaveBeenCalledWith(false);
  });

  it("should not change state in controlled mode without setControlledOpen", () => {
    const { getByTestId, getByText } = render(
      <TestComponent controlledOpen={false} />,
    );

    expect(getByTestId("status").textContent).toBe("Closed");

    fireEvent.click(getByText("Show"));
    expect(getByTestId("status").textContent).toBe("Closed");

    fireEvent.click(getByText("Hide"));
    expect(getByTestId("status").textContent).toBe("Closed");

    fireEvent.click(getByText("Toggle"));
    expect(getByTestId("status").textContent).toBe("Closed");
  });

  it("should not call setControlledOpen in uncontrolled mode", () => {
    const setControlledOpen = vi.fn();
    const { getByTestId, getByText } = render(
      <TestComponent setControlledOpen={setControlledOpen} />,
    );

    fireEvent.click(getByText("Show"));
    expect(getByTestId("status").textContent).toBe("Open");

    fireEvent.click(getByText("Hide"));
    expect(getByTestId("status").textContent).toBe("Closed");

    expect(setControlledOpen).not.toHaveBeenCalled();
  });

  it("should initialize with the correct initial state", () => {
    const { getByTestId } = render(<TestComponent initialState={true} />);
    expect(getByTestId("status").textContent).toBe("Open");
  });

  it("should respect controlledOpen, even if it doesn't match the internal state", () => {
    const { getByTestId, getByText } = render(
      <TestComponent controlledOpen={true} initialState={false} />,
    );

    expect(getByTestId("status").textContent).toBe("Open");

    fireEvent.click(getByText("Hide"));
    expect(getByTestId("status").textContent).toBe("Open");
  });

  describe("callback stability", () => {
    it("should keep show and hide stable across renders", () => {
      const setControlledOpen = vi.fn();
      const { result, rerender } = renderHook(
        (props: UseOpenStateOptions) => useOpenState(props),
        { initialProps: { controlledOpen: false, setControlledOpen } },
      );
      const { show, hide } = result.current;

      rerender({ controlledOpen: true, setControlledOpen });

      expect(result.current.show).toBe(show);
      expect(result.current.hide).toBe(hide);
    });

    it("should change show and hide when setControlledOpen changes", () => {
      const { result, rerender } = renderHook(
        (props: UseOpenStateOptions) => useOpenState(props),
        { initialProps: { controlledOpen: false, setControlledOpen: vi.fn() } },
      );
      const { show, hide } = result.current;

      rerender({ controlledOpen: false, setControlledOpen: vi.fn() });

      expect(result.current.show).not.toBe(show);
      expect(result.current.hide).not.toBe(hide);
    });
  });
});
