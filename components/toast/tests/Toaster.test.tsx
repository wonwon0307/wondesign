import { act, fireEvent, render } from "@testing-library/react";

import { toast } from "@/api";
import { Toaster } from "@/Toaster";

describe("Toast - Toaster", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls toast with the correct message", () => {
    const { getByText, queryByText } = render(
      <div>
        <Toaster />
        <button onClick={() => toast("Test Message")}>Show Toast</button>
        <button onClick={() => toast.info("Test Info Message")}>
          Show Info
        </button>
        <button onClick={() => toast.success("Test Success Message")}>
          Show Success
        </button>
        <button onClick={() => toast.warning("Test Warning Message")}>
          Show Warning
        </button>
        <button onClick={() => toast.error("Test Error Message")}>
          Show Error
        </button>
      </div>,
    );

    expect(queryByText("Test Message")).toBeNull();
    expect(queryByText("Test Info Message")).toBeNull();
    expect(queryByText("Test Success Message")).toBeNull();
    expect(queryByText("Test Warning Message")).toBeNull();
    expect(queryByText("Test Error Message")).toBeNull();

    fireEvent.click(getByText("Show Toast"));
    fireEvent.click(getByText("Show Info"));
    fireEvent.click(getByText("Show Success"));
    fireEvent.click(getByText("Show Warning"));
    fireEvent.click(getByText("Show Error"));

    act(() => vi.advanceTimersToNextFrame());

    expect(getByText("Test Message")).toBeTruthy();
    expect(getByText("Test Info Message")).toBeTruthy();
    expect(getByText("Test Success Message")).toBeTruthy();
    expect(getByText("Test Warning Message")).toBeTruthy();
    expect(getByText("Test Error Message")).toBeTruthy();

    act(() => vi.advanceTimersByTime(5000));

    expect(queryByText("Test Message")).toBeNull();
    expect(queryByText("Test Info Message")).toBeNull();
    expect(queryByText("Test Success Message")).toBeNull();
    expect(queryByText("Test Warning Message")).toBeNull();
    expect(queryByText("Test Error Message")).toBeNull();
  });

  it("calls toasts with options correctly", () => {
    const { getByText, queryByText } = render(
      <div>
        <Toaster />
        <button
          onClick={() =>
            toast("Test Message", {
              duration: 1000,
              description: "Test Description",
            })
          }
        >
          Show Toast
        </button>
      </div>,
    );

    expect(queryByText("Test Message")).toBeNull();

    fireEvent.click(getByText("Show Toast"));

    act(() => vi.advanceTimersToNextFrame());

    expect(getByText("Test Message")).toBeTruthy();
    expect(getByText("Test Description")).toBeTruthy();

    act(() => vi.advanceTimersByTime(1000));

    expect(queryByText("Test Message")).toBeNull();
    expect(queryByText("Test Description")).toBeNull();
  });

  it("closes toasts on action click", () => {
    const { getByText, queryByText } = render(
      <div>
        <Toaster />
        <button
          onClick={() =>
            toast("Test Message", {
              action: {
                variant: "secondary",
                label: "Close",
                onClick: vi.fn(),
              },
            })
          }
        >
          Show Toast
        </button>
      </div>,
    );

    fireEvent.click(getByText("Show Toast"));

    act(() => vi.advanceTimersToNextFrame());

    expect(getByText("Test Message")).toBeTruthy();

    fireEvent.click(getByText("Close"));
    expect(queryByText("Test Message")).toBeNull();
  });
});
