import { fireEvent, renderHook } from "@testing-library/react";

import { useEscapeKey } from "@/useEscapeKey";

describe("useEscapeKey", () => {
  it("calls callback when Escape key is pressed", () => {
    const callback = vi.fn();
    renderHook(() => useEscapeKey(callback));

    fireEvent.keyDown(document, { code: "Escape" });
    expect(callback).toHaveBeenCalledTimes(1);

    // should not trigger on other keys
    fireEvent.keyDown(document, { code: "Enter" });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not call callback when disabled", () => {
    const callback = vi.fn();
    renderHook(() => useEscapeKey(callback, false));

    fireEvent.keyDown(document, { code: "Escape" });
    expect(callback).not.toHaveBeenCalled();
  });
});
