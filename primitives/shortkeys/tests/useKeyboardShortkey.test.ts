import { renderHook, fireEvent } from "@testing-library/react";

import { useKeyboardShortkey } from "@/useKeyboardShortkey";

describe("useKeyboardShortkey", () => {
  describe("calls callback", () => {
    it("when simple shortkey is pressed", () => {
      const callback = vi.fn();
      renderHook(() => useKeyboardShortkey("K", callback));

      fireEvent.keyDown(document, { code: "KeyK" });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger with extra modifiers
      fireEvent.keyDown(document, { code: "KeyK", ctrlKey: true });
      expect(callback).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(document, { code: "KeyK", altKey: true });
      expect(callback).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(document, { code: "KeyK", shiftKey: true });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger on other keys
      fireEvent.keyDown(document, { code: "KeyJ" });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("when shortkey with the ctrl modifier is pressed", () => {
      const callback = vi.fn();
      renderHook(() => useKeyboardShortkey("Ctrl+K", callback));

      fireEvent.keyDown(document, { code: "KeyK", ctrlKey: true });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger if ctrl is not pressed
      fireEvent.keyDown(document, { code: "KeyK" });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger with extra modifiers
      fireEvent.keyDown(document, {
        code: "KeyK",
        ctrlKey: true,
        altKey: true,
      });
      expect(callback).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(document, {
        code: "KeyK",
        ctrlKey: true,
        shiftKey: true,
      });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("when shortkey with the alt modifier is pressed", () => {
      const callback = vi.fn();
      renderHook(() => useKeyboardShortkey("Alt+K", callback));

      fireEvent.keyDown(document, { code: "KeyK", altKey: true });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger if alt is not pressed
      fireEvent.keyDown(document, { code: "KeyK" });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger with extra modifiers
      fireEvent.keyDown(document, {
        code: "KeyK",
        altKey: true,
        ctrlKey: true,
      });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("when shortkey with the shift modifier is pressed", () => {
      const callback = vi.fn();
      renderHook(() => useKeyboardShortkey("Shift+K", callback));

      fireEvent.keyDown(document, { code: "KeyK", shiftKey: true });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger if shift is not pressed
      fireEvent.keyDown(document, { code: "KeyK" });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger with extra modifiers
      fireEvent.keyDown(document, {
        code: "KeyK",
        shiftKey: true,
        ctrlKey: true,
      });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("when shortkey with the meta modifier is pressed", () => {
      const callback = vi.fn();
      renderHook(() => useKeyboardShortkey("Meta+K", callback));

      fireEvent.keyDown(document, { code: "KeyK", metaKey: true });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger with extra modifiers
      fireEvent.keyDown(document, {
        code: "KeyK",
        metaKey: true,
        ctrlKey: true,
      });
      expect(callback).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(document, {
        code: "KeyK",
        metaKey: true,
        altKey: true,
      });
      expect(callback).toHaveBeenCalledTimes(1);

      // should not trigger if meta is not pressed
      fireEvent.keyDown(document, { code: "KeyK" });
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  it("does not call callback when disabled", () => {
    const callback = vi.fn();
    renderHook(() => useKeyboardShortkey("K", callback, false));

    fireEvent.keyDown(document, { code: "KeyK" });
    expect(callback).not.toHaveBeenCalled();
  });

  it("does not call callback if when key is null", () => {
    const callback = vi.fn();
    renderHook(() => useKeyboardShortkey(null, callback));

    fireEvent.keyDown(document, { code: "KeyK" });
    expect(callback).not.toHaveBeenCalled();
  });
});
