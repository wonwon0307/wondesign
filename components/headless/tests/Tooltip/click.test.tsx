import { act, fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./test-component";

describe("Tooltip - click interactions", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should not open the tooltip on clicks", () => {
    const { getByTestId, queryByTestId } = render(
      <TestComponent>Tooltip Message</TestComponent>,
    );

    const trigger = getByTestId("tooltip-trigger");

    // 초기에는 보이지 않는다.
    expect(queryByTestId("tooltip-content")).toBeNull();

    // 클릭 시에도 보이지 않아야 한다.
    fireEvent.click(trigger);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(queryByTestId("tooltip-content")).toBeNull();

    // pointer down에도 보이지 않아야 한다.
    fireEvent.pointerDown(trigger);
    fireEvent.pointerUp(trigger);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(queryByTestId("tooltip-content")).toBeNull();
  });

  it("should close the tooltip on outside clicks when it's open", () => {
    const onOpenChangeMock = vi.fn();
    render(
      <TestComponent isOpen onOpenChange={onOpenChangeMock}>
        Tooltip Message
      </TestComponent>,
    );

    // 외부 클릭 시 onOpenChange가 호출되어야 한다.
    fireEvent.pointerDown(document);
    fireEvent.pointerUp(document);
    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
  });

  it("should not close the tooltip on trigger click even though it's outside the content", () => {
    const onOpenChangeMock = vi.fn();
    const { getByTestId } = render(
      <TestComponent isOpen onOpenChange={onOpenChangeMock}>
        Tooltip Message
      </TestComponent>,
    );

    const trigger = getByTestId("tooltip-trigger");
    const content = getByTestId("tooltip-content");

    expect(content.dataset.state).toBe("open");

    // 트리거 클릭 시 onOpenChange가 호출되지 않아야 한다.
    fireEvent.pointerDown(trigger);
    fireEvent.pointerUp(trigger);
    expect(onOpenChangeMock).not.toHaveBeenCalled();
  });
});
