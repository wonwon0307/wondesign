import { act, renderHook } from "@testing-library/react";

import { useFloating } from "@/core/floating";

describe("useFloating", () => {
  const triggerRef = { current: document.createElement("button") };
  const floatingRef = { current: document.createElement("div") };
  const arrowRef = { current: document.createElement("div") };
  const options = {};

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return default values", () => {
    const { result } = renderHook(() =>
      useFloating(triggerRef, floatingRef, arrowRef, {}, false),
    );

    expect(result.current.floating).toEqual({
      x: 0,
      y: 0,
      placement: "bottom",
    });
    expect(result.current.arrow).toEqual({
      x: 0,
      y: 0,
    });
  });

  it("should respect the preferred placement when forcePlacement is true", () => {
    const forcePlacementOptions = {
      placement: "top",
      forcePlacement: true,
    } as const;

    const { result } = renderHook(() =>
      useFloating(
        triggerRef,
        floatingRef,
        arrowRef,
        forcePlacementOptions,
        true,
      ),
    );

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.floating.placement).toBe("top");
  });

  it("should not update position if trigger or floating ref becomes null before a resize fires", () => {
    const dynamicTriggerRef: { current: HTMLElement | null } = {
      current: document.createElement("button"),
    };
    const { result } = renderHook(() =>
      useFloating(dynamicTriggerRef, floatingRef, arrowRef, options, true),
    );

    dynamicTriggerRef.current = null;

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.floating).toEqual({
      x: 0,
      y: 0,
      placement: "bottom",
    });
    expect(result.current.arrow).toEqual({
      x: 0,
      y: 0,
    });
  });

  it("should flip the placement when the preferred placement overflows", () => {
    // Preferred placement defaults to "bottom", so pin the trigger near the
    // bottom of the viewport - not enough room below, plenty above - to
    // force a flip to "top".
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(600);
    vi.spyOn(triggerRef.current, "getBoundingClientRect").mockReturnValue({
      top: 550,
      bottom: 580,
      left: 100,
      right: 200,
      width: 100,
      height: 30,
      x: 100,
      y: 550,
      toJSON: () => {},
    });
    vi.spyOn(floatingRef.current, "getBoundingClientRect").mockReturnValue({
      top: 0,
      bottom: 100,
      left: 0,
      right: 150,
      width: 150,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    const { result } = renderHook(() =>
      useFloating(triggerRef, floatingRef, arrowRef, options, true),
    );

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.floating.placement).toBe("top");
  });

  it("should clamp to the viewport edge when the content is wider than the viewport", () => {
    // Content is wider than the viewport itself, so center-aligning can never
    // fit no matter how it's clamped - it should pin to the padding edge (0)
    // rather than letting the normal min/max clamp produce a bogus range.
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(50);
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(600);
    vi.spyOn(triggerRef.current, "getBoundingClientRect").mockReturnValue({
      top: 100,
      bottom: 120,
      left: 10,
      right: 30,
      width: 20,
      height: 20,
      x: 10,
      y: 100,
      toJSON: () => {},
    });
    vi.spyOn(floatingRef.current, "getBoundingClientRect").mockReturnValue({
      top: 0,
      bottom: 50,
      left: 0,
      right: 100,
      width: 100,
      height: 50,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    const { result } = renderHook(() =>
      useFloating(triggerRef, floatingRef, arrowRef, options, true),
    );

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.floating).toEqual({
      x: 0,
      y: 120,
      placement: "bottom",
    });
  });

  it("should stay with the preferred placement if no space in either side", () => {
    // Both above and below overflow (content is taller than either gap), but
    // below is still less cramped than above, so it should not flip into the
    // even worse side.
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(600);
    vi.spyOn(triggerRef.current, "getBoundingClientRect").mockReturnValue({
      top: 100,
      bottom: 120,
      left: 100,
      right: 200,
      width: 100,
      height: 20,
      x: 100,
      y: 100,
      toJSON: () => {},
    });
    vi.spyOn(floatingRef.current, "getBoundingClientRect").mockReturnValue({
      top: 0,
      bottom: 500,
      left: 0,
      right: 150,
      width: 150,
      height: 500,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    const { result } = renderHook(() =>
      useFloating(triggerRef, floatingRef, arrowRef, options, true),
    );

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.floating.placement).toBe("bottom");
  });

  describe("preferred placements", () => {
    const topPlacementOptions = { placement: "top" } as const;

    it("handles preferred top placement", () => {
      const { result } = renderHook(() =>
        useFloating(
          triggerRef,
          floatingRef,
          arrowRef,
          topPlacementOptions,
          true,
        ),
      );

      act(() => {
        window.dispatchEvent(new Event("resize"));
      });

      expect(result.current.floating.placement).toBe("top");
    });

    it("handles preferred left placement", () => {
      const leftPlacementOptions = { placement: "left" } as const;

      const { result } = renderHook(() =>
        useFloating(
          triggerRef,
          floatingRef,
          arrowRef,
          leftPlacementOptions,
          true,
        ),
      );

      act(() => {
        window.dispatchEvent(new Event("resize"));
      });

      expect(result.current.floating.placement).toBe("left");
    });

    it("handles preferred right placement", () => {
      const rightPlacementOptions = { placement: "right" } as const;

      const { result } = renderHook(() =>
        useFloating(
          triggerRef,
          floatingRef,
          arrowRef,
          rightPlacementOptions,
          true,
        ),
      );

      act(() => {
        window.dispatchEvent(new Event("resize"));
      });

      expect(result.current.floating.placement).toBe("right");
    });
  });

  describe("alignments", () => {
    it("handles start alignment", () => {
      const startAlignOptions = { align: "start" } as const;

      const { result } = renderHook(() =>
        useFloating(triggerRef, floatingRef, arrowRef, startAlignOptions, true),
      );

      act(() => {
        window.dispatchEvent(new Event("resize"));
      });

      expect(result.current.floating.placement).toBe("bottom");
    });

    it("handles end alignment", () => {
      const endAlignOptions = { align: "end" } as const;

      const { result } = renderHook(() =>
        useFloating(triggerRef, floatingRef, arrowRef, endAlignOptions, true),
      );

      act(() => {
        window.dispatchEvent(new Event("resize"));
      });

      expect(result.current.floating.placement).toBe("bottom");
    });
  });
});
