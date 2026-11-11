import { act, render } from "@testing-library/react";

import { TestComponent } from "./test-component";

describe("Toast - aria attributes", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should have correct aria attributes", () => {
    const { getByTestId } = render(<TestComponent defaultOpen />);

    act(() => vi.advanceTimersToNextFrame());

    const toastArea = getByTestId("toast-area");
    expect(toastArea).toBeTruthy();
    expect(toastArea.role).toBe("status");
    expect(toastArea.getAttribute("aria-live")).toBe("polite");
    expect(toastArea.getAttribute("aria-atomic")).toBe("false");

    const toast = getByTestId("toast");
    expect(toast).toBeTruthy();
    expect(toast.role).toBeNull();
    expect(toast.getAttribute("aria-live")).toBeNull();
    expect(toast.getAttribute("aria-atomic")).toBe("true");
  });
});
