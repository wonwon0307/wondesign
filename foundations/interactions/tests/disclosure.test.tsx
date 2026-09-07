import { fireEvent, render } from "@testing-library/react";

import { useOpenState } from "@/disclosure/useOpenState";

function TestComponent({
  controlledOpen,
  setOpenState,
  initialState,
}: {
  controlledOpen?: boolean;
  setOpenState?: (open: boolean) => void;
  initialState?: boolean;
}) {
  const { isOpen, show, hide } = useOpenState(
    controlledOpen,
    setOpenState,
    initialState,
  );

  return (
    <div>
      <p data-testid="status">{isOpen ? "Open" : "Closed"}</p>
      <button onClick={show}>Show</button>
      <button onClick={hide}>Hide</button>
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
});
