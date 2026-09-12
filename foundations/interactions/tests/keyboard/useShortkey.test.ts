import { fireEvent, renderHook } from "@testing-library/react";

import { useShortkey } from "@/keyboard/useShortkey";

describe("useShortkey", () => {
  it("calls callback when shortkey with ctrl modifier is pressed", () => {
    const callback = vi.fn();
    renderHook(() => useShortkey("Ctrl+K", callback));

    fireEvent.keyDown(document, { code: "KeyK", ctrlKey: true });
    expect(callback).toHaveBeenCalled();
  });

  it("calls callback when shortkey with ctrl+shift modifier is pressed", () => {
    const callback = vi.fn();
    renderHook(() => useShortkey("Ctrl+Shift+K", callback));

    fireEvent.keyDown(document, {
      code: "KeyK",
      ctrlKey: true,
      shiftKey: true,
    });
    expect(callback).toHaveBeenCalled();
  });

  it("calls callback when shortkey with alt modifier is pressed", () => {
    const callback = vi.fn();
    renderHook(() => useShortkey("Alt+K", callback));

    fireEvent.keyDown(document, {
      code: "KeyK",
      altKey: true,
    });
    expect(callback).toHaveBeenCalled();
  });

  it("calls callback when shortkey with meta modifier is pressed", () => {
    const callback = vi.fn();
    renderHook(() => useShortkey("Meta+K", callback));

    fireEvent.keyDown(document, {
      code: "KeyK",
      metaKey: true,
    });
    expect(callback).toHaveBeenCalled();
  });

  it("should not call callback when shortkey does not match", () => {
    const callback = vi.fn();
    renderHook(() => useShortkey("Ctrl+K", callback));

    // wrong basekey
    fireEvent.keyDown(document, { code: "KeyO", ctrlKey: true });
    expect(callback).not.toHaveBeenCalled();

    // no modifier key
    fireEvent.keyDown(document, { code: "KeyK", ctrlKey: false });
    expect(callback).not.toHaveBeenCalled();

    // other modifier keys are also pressed
    fireEvent.keyDown(document, {
      code: "KeyK",
      ctrlKey: true,
      shiftKey: true,
    });
    expect(callback).not.toHaveBeenCalled();

    fireEvent.keyDown(document, { code: "KeyK", ctrlKey: true, altKey: true });
    expect(callback).not.toHaveBeenCalled();

    fireEvent.keyDown(document, { code: "KeyK", ctrlKey: true, metaKey: true });
    expect(callback).not.toHaveBeenCalled();
  });

  it("doesn't call callback if the enabled flag is false", () => {
    const callback = vi.fn();
    renderHook(() => useShortkey("Ctrl+K", callback, false));

    fireEvent.keyDown(document, { code: "KeyK", ctrlKey: true });
    expect(callback).not.toHaveBeenCalled();
  });

  it("should handle null key gracefully", () => {
    const callback = vi.fn();
    renderHook(() => useShortkey(null, callback, false));

    fireEvent.keyDown(document, { code: "KeyK", ctrlKey: true });
    expect(callback).not.toHaveBeenCalled();
  });
});
