import { fireEvent, render } from "@testing-library/react";

import { useFloatingPosition } from "@/useFloatingPosition";
import { UseFloatingPositionOptions } from "@/types";

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

function TestComponent({
  options = {},
  noArrow = false,
  noFloating = false,
}: {
  options?: UseFloatingPositionOptions;
  noArrow?: boolean;
  noFloating?: boolean;
}) {
  const {
    triggerRef,
    floatingRef,
    arrowRef,
    placement,
    content,
    arrow,
    isPositioned,
    update,
  } = useFloatingPosition(options);

  return (
    <div>
      <button ref={triggerRef} onClick={update}>
        Trigger
      </button>
      <div>isPositioned: {String(isPositioned)}</div>
      <div ref={noFloating ? undefined : floatingRef} data-floating>
        placement: {placement}, x: {content.x}, y: {content.y}
        {!noArrow && (
          <div ref={arrowRef}>
            Arrow (x: {arrow.x}, y: {arrow.y})
          </div>
        )}
      </div>
    </div>
  );
}

describe("useFloatingPosition", () => {
  // trigger는 (100, 100)에서 80x30, content는 120x40, arrow는 8x8.
  // 기본 옵션 (bottom, center, offset 0, padding 0)에서:
  // content는 x = 100 + (80 - 120) / 2 = 80, y = 100 + 30 = 130
  // arrow는 x = (100 + 80 / 2) - 80 - 8 / 2 = 56, y = 0 - 8 / 2 = -4
  let triggerRect: DOMRect;
  const floatingRect = new DOMRect(0, 0, 120, 40);

  // jsdom은 layout을 하지 않으므로, 크기와 위치를 모두 mock
  beforeEach(() => {
    triggerRect = new DOMRect(100, 100, 80, 30);

    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        if (this.tagName === "BUTTON") return triggerRect;
        if (this.hasAttribute("data-floating")) return floatingRect;
        return new DOMRect();
      },
    );
    vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(8);
    vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(8);
    vi.spyOn(document.documentElement, "clientWidth", "get").mockReturnValue(
      1024,
    );
    vi.spyOn(document.documentElement, "clientHeight", "get").mockReturnValue(
      768,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should position the content and the arrow when enabled", () => {
    const { getByText } = render(<TestComponent />);

    expect(getByText("placement: bottom, x: 80, y: 130")).toBeTruthy();
    expect(getByText("Arrow (x: 56, y: -4)")).toBeTruthy();
    expect(getByText("isPositioned: true")).toBeTruthy();
  });

  it("should update positions when the window resizes", () => {
    const { getByText } = render(<TestComponent />);

    triggerRect = new DOMRect(200, 300, 80, 30);
    fireEvent(window, new Event("resize"));

    // content는 trigger를 따라 움직이고, arrow는 content 기준이라 그대로
    expect(getByText("placement: bottom, x: 180, y: 330")).toBeTruthy();
    expect(getByText("Arrow (x: 56, y: -4)")).toBeTruthy();
  });

  it("should update positions when the page scrolls", () => {
    const { getByText } = render(<TestComponent />);

    triggerRect = new DOMRect(200, 300, 80, 30);
    fireEvent.scroll(window);

    expect(getByText("placement: bottom, x: 180, y: 330")).toBeTruthy();
  });

  it("should update positions when update is called", () => {
    const { getByText } = render(<TestComponent />);

    triggerRect = new DOMRect(200, 300, 80, 30);
    fireEvent.click(getByText("Trigger"));

    expect(getByText("placement: bottom, x: 180, y: 330")).toBeTruthy();
  });

  it("should do nothing if enabled is false", () => {
    const { getByText } = render(
      <TestComponent options={{ enabled: false }} />,
    );

    // mock된 위치가 있어도, 계산하지 않아 기본값 그대로
    expect(getByText("placement: bottom, x: 0, y: 0")).toBeTruthy();
    expect(getByText("Arrow (x: 0, y: 0)")).toBeTruthy();
    expect(getByText("isPositioned: false")).toBeTruthy();
  });

  it("should reset isPositioned when disabled", () => {
    const { getByText, rerender } = render(<TestComponent />);
    expect(getByText("isPositioned: true")).toBeTruthy();

    rerender(<TestComponent options={{ enabled: false }} />);

    expect(getByText("isPositioned: false")).toBeTruthy();
  });

  it("should handle no arrow ref gracefully", () => {
    const { getByText } = render(<TestComponent noArrow />);

    expect(getByText("placement: bottom, x: 80, y: 130")).toBeTruthy();
  });

  it("should not update position if trigger or floating ref is null", () => {
    const { getByText } = render(<TestComponent noFloating />);

    // effect의 early return뿐만 아니라, update()를 직접 호출해도 계산하지 않아야 한다
    fireEvent.click(getByText("Trigger"));

    expect(getByText("isPositioned: false")).toBeTruthy();
  });
});
