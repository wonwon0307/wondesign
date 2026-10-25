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
    const setOpenState = vi.fn();
    const { getByTestId, getByText } = render(
      <TestComponent controlledOpen={false} setOpenState={setOpenState} />,
    );

    expect(getByTestId("status").textContent).toBe("Closed");

    fireEvent.click(getByText("Show"));
    expect(setOpenState).toHaveBeenCalledWith(true);

    fireEvent.click(getByText("Hide"));
    expect(setOpenState).toHaveBeenCalledWith(false);

    fireEvent.click(getByText("Toggle"));
    expect(setOpenState).toHaveBeenCalledWith(true);

    fireEvent.click(getByText("Toggle"));
    expect(setOpenState).toHaveBeenCalledWith(false);
  });

  it("should not change state in controlled mode without setOpenState", () => {
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

  it("should not call setOpenState in uncontrolled mode", () => {
    const setOpenState = vi.fn();
    const { getByTestId, getByText } = render(
      <TestComponent setOpenState={setOpenState} />,
    );

    fireEvent.click(getByText("Show"));
    expect(getByTestId("status").textContent).toBe("Open");

    fireEvent.click(getByText("Hide"));
    expect(getByTestId("status").textContent).toBe("Closed");

    expect(setOpenState).not.toHaveBeenCalled();
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
      const setOpenState = vi.fn();
      const { result, rerender } = renderHook(
        (props: UseOpenStateOptions) => useOpenState(props),
        { initialProps: { controlledOpen: false, setOpenState } },
      );
      const { show, hide } = result.current;

      rerender({ controlledOpen: true, setOpenState });

      expect(result.current.show).toBe(show);
      expect(result.current.hide).toBe(hide);
    });

    it("should change show and hide when setOpenState changes", () => {
      const { result, rerender } = renderHook(
        (props: UseOpenStateOptions) => useOpenState(props),
        { initialProps: { controlledOpen: false, setOpenState: vi.fn() } },
      );
      const { show, hide } = result.current;

      rerender({ controlledOpen: false, setOpenState: vi.fn() });

      expect(result.current.show).not.toBe(show);
      expect(result.current.hide).not.toBe(hide);
    });
  });
});
