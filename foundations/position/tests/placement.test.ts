import { finalizePlacement } from "@/placement";
import type { FloatingOptions } from "@/types";

describe("finalizePlacement", () => {
  const triggerRect = new DOMRect(0, 0, 100, 50);
  const contentRect = new DOMRect(0, 0, 100, 50);
  const baseOptions = {
    forcePlacement: false,
    offset: 0,
    padding: 0,
    align: "center",
  };
  const bottomOptions = {
    ...baseOptions,
    placement: "bottom",
  } as Required<FloatingOptions>;
  const leftOptions = {
    ...baseOptions,
    placement: "left",
  } as Required<FloatingOptions>;

  it("should correctly return bottom when there is enough space", () => {
    const result = finalizePlacement(triggerRect, contentRect, bottomOptions);
    expect(result).toBe("bottom");
  });

  it("should correctly flip to top when there is not enough space at the bottom", () => {
    // triggerRect의 y 좌표를 740으로 설정하여 화면 하단에 위치하도록 함
    const triggerRect = new DOMRect(0, 740, 100, 50);

    const result = finalizePlacement(triggerRect, contentRect, bottomOptions);
    expect(result).toBe("top");
  });

  it("should correctly return left when there is enough space", () => {
    // triggerRect의 x 좌표를 200으로 설정하여 화면 오른쪽에 위치하도록 함
    const triggerRect = new DOMRect(200, 0, 100, 50);

    const result = finalizePlacement(triggerRect, contentRect, leftOptions);
    expect(result).toBe("left");
  });

  it("should correctly flip to right when there is not enough space at the left", () => {
    const result = finalizePlacement(triggerRect, contentRect, leftOptions);
    expect(result).toBe("right");
  });

  it("should respect forcePlacement option even if there is not enough space", () => {
    const forcePlacementOptions = {
      ...baseOptions,
      placement: "bottom",
      forcePlacement: true,
    } as Required<FloatingOptions>;

    // triggerRect의 y 좌표를 740으로 설정하여 화면 하단에 위치하도록 함
    const triggerRect = new DOMRect(0, 740, 100, 50);

    const result = finalizePlacement(
      triggerRect,
      contentRect,
      forcePlacementOptions,
    );
    expect(result).toBe("bottom");
  });

  it("should return preferred placement when there is not enough space, but more than opposite", () => {
    // content의 길이가 500, jsdom의 뷰포트가 768이므로,
    // trigger의 좌표를 300으로 설정하면, 아래쪽 공간이 468, 위쪽 공간이 300
    // triggerRect의 y 좌표를 700으로 설정하여 화면 하단에 충분한 공간이 없도록 함
    const triggerRect = new DOMRect(0, 300, 100, 50);
    const contentRect = new DOMRect(0, 0, 100, 500);

    const result = finalizePlacement(triggerRect, contentRect, bottomOptions);
    expect(result).toBe("bottom");
  });
});
