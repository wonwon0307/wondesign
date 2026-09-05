import { getContentPosition } from "@/content/position";
import type {
  FloatingAlign,
  FloatingOptions,
  FloatingPlacement,
} from "@/types";

describe("getContentPosition", () => {
  const triggerRect = new DOMRect(300, 300, 100, 50);
  // Content is deliberately a different size than the trigger so that
  // start / center / end resolve to distinct coordinates on the cross axis.
  const contentRect = new DOMRect(0, 0, 40, 20);
  const baseOptions = { offset: 5, padding: 10 } as FloatingOptions;

  const testCases = [
    { placement: "top", align: "start", expectedX: 300, expectedY: 275 },
    { placement: "top", align: "center", expectedX: 330, expectedY: 275 },
    { placement: "top", align: "end", expectedX: 360, expectedY: 275 },
    { placement: "bottom", align: "start", expectedX: 300, expectedY: 355 },
    { placement: "bottom", align: "center", expectedX: 330, expectedY: 355 },
    { placement: "bottom", align: "end", expectedX: 360, expectedY: 355 },
    { placement: "left", align: "start", expectedX: 255, expectedY: 300 },
    { placement: "left", align: "center", expectedX: 255, expectedY: 315 },
    { placement: "left", align: "end", expectedX: 255, expectedY: 330 },
    { placement: "right", align: "start", expectedX: 405, expectedY: 300 },
    { placement: "right", align: "center", expectedX: 405, expectedY: 315 },
    { placement: "right", align: "end", expectedX: 405, expectedY: 330 },
  ] as Array<{
    placement: FloatingPlacement;
    align: FloatingAlign;
    expectedX: number;
    expectedY: number;
  }>;

  function testResult(
    placement: FloatingPlacement,
    align: FloatingAlign,
    expectedX: number,
    expectedY: number,
  ) {
    const result = getContentPosition(placement, triggerRect, contentRect, {
      ...baseOptions,
      align,
    });

    expect(result).toEqual({
      x: expectedX,
      y: expectedY,
    });
  }

  testCases.forEach(({ placement, align, expectedX, expectedY }) => {
    it(`should position content correctly for placement=${placement} and align=${align}`, () => {
      testResult(placement, align, expectedX, expectedY);
    });
  });

  it("should pin content to padding when it is larger than the viewport", () => {
    // jsdom viewport is 1024x768; a 1200x900 content cannot fit within
    // [padding, viewport - contentSize - padding], so clampToViewport
    // falls back to `padding` on both axes.
    const oversizedContentRect = new DOMRect(0, 0, 1200, 900);

    const result = getContentPosition(
      "bottom",
      triggerRect,
      oversizedContentRect,
      { ...baseOptions, align: "center" },
    );

    expect(result).toEqual({ x: 10, y: 10 });
  });
});
