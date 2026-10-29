import { fireEvent, renderHook } from "@testing-library/react";

import { useEscapeKey } from "@/escape-key/useEscapeKey";

describe("useEscapeKey", () => {
  it("calls callback when Escape key is pressed", () => {
    const callback = vi.fn();
    renderHook(() => useEscapeKey(callback));

    fireEvent.keyDown(document, { key: "Escape" });
    expect(callback).toHaveBeenCalledTimes(1);

    // should not trigger on other keys
    fireEvent.keyDown(document, { key: "Enter" });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("calls callback when the key reports no code, like from a virtual keyboard", () => {
    const callback = vi.fn();
    renderHook(() => useEscapeKey(callback));

    fireEvent.keyDown(document, { key: "Escape", code: "" });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("doesn't call callback again while Escape is held down", () => {
    const callback = vi.fn();
    renderHook(() => useEscapeKey(callback));

    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.keyDown(document, { key: "Escape", repeat: true });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not call callback while an IME composition is in progress", () => {
    const callback = vi.fn();
    renderHook(() => useEscapeKey(callback));

    fireEvent.keyDown(document, { key: "Escape", isComposing: true });
    expect(callback).not.toHaveBeenCalled();
  });

  it("does not call callback when disabled", () => {
    const callback = vi.fn();
    renderHook(() => useEscapeKey(callback, { enabled: false }));

    fireEvent.keyDown(document, { key: "Escape" });
    expect(callback).not.toHaveBeenCalled();
  });
});
