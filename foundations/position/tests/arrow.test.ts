import { getArrowPosition } from "@/arrow/position";

describe("getArrowPosition", () => {
  const triggerRect = new DOMRect(0, 0, 100, 50);
  const contentRect = new DOMRect(0, 0, 200, 100);
  const contentPosition = { x: 0, y: 0 };
  const arrowEl = document.createElement("div");

  it("should return default values when arrowEl is null", () => {
    const result = getArrowPosition(
      "bottom",
      triggerRect,
      contentRect,
      contentPosition,
      null,
    );

    expect(result).toEqual({ x: 0, y: 0 });
  });

  it("should calculate arrow position correctly for bottom placement", () => {
    const result = getArrowPosition(
      "bottom",
      triggerRect,
      contentRect,
      contentPosition,
      arrowEl,
    );

    expect(result).toEqual({
      x: 50,
      y: 0,
    });
  });

  it("should calculate arrow position correctly for top placement", () => {
    const result = getArrowPosition(
      "top",
      triggerRect,
      contentRect,
      contentPosition,
      arrowEl,
    );

    expect(result).toEqual({
      x: 50,
      y: 100,
    });
  });

  it("should calculate arrow position correctly for left placement", () => {
    const result = getArrowPosition(
      "left",
      triggerRect,
      contentRect,
      contentPosition,
      arrowEl,
    );

    expect(result).toEqual({
      x: 200,
      y: 25,
    });
  });

  it("should calculate arrow position correctly for right placement", () => {
    const result = getArrowPosition(
      "right",
      triggerRect,
      contentRect,
      contentPosition,
      arrowEl,
    );

    expect(result).toEqual({
      x: 0,
      y: 25,
    });
  });
});
