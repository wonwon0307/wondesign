import { act, fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./test-component";

describe("Tooltip - other interactions", () => {
  it("should open the tooltip on long press", () => {
    const { getByTestId, queryByTestId } = render(
      <TestComponent>Tooltip Message</TestComponent>,
    );

    const trigger = getByTestId("tooltip-trigger");

    // 초기에는 보이지 않는다.
    expect(queryByTestId("tooltip-content")).toBeNull();

    // 트리거를 길게 누르면 툴팁이 열려야 한다. (기본값 500ms)
    fireEvent.touchStart(trigger);
    act(() => vi.advanceTimersByTime(500));
    const content = getByTestId("tooltip-content");
    expect(content.dataset.state).toBe("open");

    // 한번 열리면, 터치를 끝내도 바로 닫히지 않아야 한다.
    fireEvent.touchEnd(trigger);
    act(() => vi.advanceTimersByTime(1000));
    expect(content.dataset.state).toBe("open");
  });

  it("shows the tooltip on focus and hides it on blur", () => {
    const { getByTestId, queryByTestId } = render(
      <TestComponent>Tooltip Message</TestComponent>,
    );

    const trigger = getByTestId("tooltip-trigger");

    // 초기에는 Tooltip.Content가 렌더링되지 않아야 한다.
    expect(queryByTestId("tooltip-content")).toBeNull();

    // Tooltip.Trigger에 포커스하여 툴팁을 연다.
    act(() => trigger.focus());
    const content = getByTestId("tooltip-content");
    expect(content.dataset.state).toBe("open");
    expect(document.activeElement).toBe(trigger); // 포커스가 트리거에 남아 있어야 한다.
    expect(document.activeElement).not.toBe(content); // 포커스가 툴팁 콘텐츠로 이동하면 안 된다.

    // Tooltip.Trigger에서 포커스가 해제되면 툴팁이 닫혀야 한다.
    act(() => trigger.blur());
    expect(queryByTestId("tooltip-content")).toBeNull();
  });

  it("closes the tooltip on Escape key press", () => {
    const onOpenChangeMock = vi.fn();
    const { getByTestId } = render(
      <TestComponent isOpen onOpenChange={onOpenChangeMock}>
        Tooltip Message
      </TestComponent>,
    );

    const content = getByTestId("tooltip-content");

    // 초기에는 보인다.
    expect(content.dataset.state).toBe("open");

    // 다른 키를 누르면 onOpenChange가 호출되지 않아야 한다.
    fireEvent.keyDown(document, { key: "Enter" });
    expect(onOpenChangeMock).not.toHaveBeenCalled();

    // Escape 키를 누르면 onOpenChange가 호출되어야 한다.
    fireEvent.keyDown(document, { code: "Escape" });
    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
  });
});
