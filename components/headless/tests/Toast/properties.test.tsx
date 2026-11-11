import { act, fireEvent, render } from "@testing-library/react";

import { ToastArea } from "@/Toast/Area";
import { Toast } from "@/Toast/Toast";
import { ToastTitle } from "@/Toast/Title";
import { ToastMessage } from "@/Toast/Message";
import { ToastClose } from "@/Toast/Close";
import { TestComponent } from "./test-component";

describe("Toast - properties", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("handles the default props correctly", () => {
    const { getByTestId, queryByTestId } = render(<TestComponent />);

    act(() => vi.advanceTimersToNextFrame());

    // defaultOpen의 기본값이 false이기 때문에 toast는 document에 없다
    expect(queryByTestId("toast")).toBeNull();

    // disablePortal도 false이기 때문에, toast-area는 document의 직접 자식이다
    expect(getByTestId("toast-area").parentElement).toBe(document.body);
  });

  it("respects the defaultOpen prop", () => {
    const { getByTestId } = render(<TestComponent defaultOpen />);

    act(() => vi.advanceTimersToNextFrame());

    expect(getByTestId("toast")).toBeTruthy();
  });

  it("respects the disablePortal prop", () => {
    const { getByTestId } = render(
      <div>
        <TestComponent disablePortal />
      </div>,
    );

    act(() => vi.advanceTimersToNextFrame());

    expect(getByTestId("toast-area").parentElement).not.toBe(document.body);
  });

  it("supports controlled mode", () => {
    const controlledOpen = vi.fn();

    const { getByTestId } = render(
      <TestComponent isOpen onOpenChange={controlledOpen} />,
    );

    act(() => vi.advanceTimersToNextFrame());

    fireEvent.click(getByTestId("toast-close"));
    expect(controlledOpen).toHaveBeenCalled();
  });

  it("supports the asChild prop", () => {
    const { getByTestId } = render(
      <ToastArea asChild data-testid="toast-area">
        <span>
          <Toast defaultOpen asChild data-testid="toast">
            <section>
              <ToastTitle asChild data-testid="toast-title">
                <h5>Test Toast</h5>
              </ToastTitle>
              <ToastMessage asChild data-testid="toast-message">
                <span>This is a test message</span>
              </ToastMessage>
              <ToastClose asChild data-testid="toast-close">
                <a>Close</a>
              </ToastClose>
            </section>
          </Toast>
        </span>
      </ToastArea>,
    );

    act(() => vi.advanceTimersToNextFrame());

    const toastArea = getByTestId("toast-area");
    expect(toastArea).toBeTruthy();
    expect(toastArea.tagName).toBe("SPAN");

    const toast = getByTestId("toast");
    expect(toast).toBeTruthy();
    expect(toast.tagName).toBe("SECTION");

    const toastTitle = getByTestId("toast-title");
    expect(toastTitle).toBeTruthy();
    expect(toastTitle.tagName).toBe("H5");

    const toastMessage = getByTestId("toast-message");
    expect(toastMessage).toBeTruthy();
    expect(toastMessage.tagName).toBe("SPAN");

    const toastClose = getByTestId("toast-close");
    expect(toastClose).toBeTruthy();
    expect(toastClose.tagName).toBe("A");
  });
});
