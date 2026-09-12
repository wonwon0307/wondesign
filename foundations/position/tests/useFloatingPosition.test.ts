import { act, renderHook } from "@testing-library/react";

import { useFloatingPosition } from "@/useFloatingPosition";

vi.stubGlobal(
  "ResizeObserver",
  class ResizeObserver {
    observe() {
      // No-op for testing environment
    }
    unobserve() {
      // No-op for testing environment
    }
    disconnect() {
      // No-op for testing environment
    }
  },
);

describe("useFloatingPosition", () => {
  const triggerRef = { current: document.createElement("button") };
  const floatingRef = { current: document.createElement("div") };
  const arrowRef = { current: document.createElement("div") };
  const nullArrowRef = { current: null };
  const options = {};

  it("should return default values correctly", () => {
    const { result } = renderHook(() =>
      useFloatingPosition(triggerRef, floatingRef, arrowRef, options, false),
    );

    expect(result.current.placement).toBe("bottom");
    expect(result.current.content).toEqual({
      x: 0,
      y: 0,
    });
    expect(result.current.arrow).toEqual({
      x: 0,
      y: 0,
    });
  });

  it("should update positions when the window is resized", () => {
    const { result } = renderHook(() =>
      useFloatingPosition(triggerRef, floatingRef, arrowRef, options, true),
    );

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.placement).toBe("bottom");
    expect(result.current.content).toEqual({
      x: 0,
      y: 0,
    });
    expect(result.current.arrow).toEqual({
      x: 0,
      y: 0,
    });
  });

  it("should return values correctly without arrowRef", () => {
    const { result } = renderHook(() =>
      useFloatingPosition(triggerRef, floatingRef, nullArrowRef, options, true),
    );

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.placement).toBe("bottom");
    expect(result.current.content).toEqual({
      x: 0,
      y: 0,
    });
    expect(result.current.arrow).toEqual({
      x: 0,
      y: 0,
    });
  });

  it("should not update position if trigger ref (or floating ref) is null before a resize fires", () => {
    const dynamicTriggerRef: { current: HTMLElement | null } = {
      current: document.createElement("button"),
    };
    const { result } = renderHook(() =>
      useFloatingPosition(
        dynamicTriggerRef,
        floatingRef,
        arrowRef,
        options,
        true,
      ),
    );

    dynamicTriggerRef.current = null;

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.placement).toBe("bottom");
    expect(result.current.content).toEqual({
      x: 0,
      y: 0,
    });
    expect(result.current.arrow).toEqual({
      x: 0,
      y: 0,
    });
  });
});
