import { act, fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./test-component";

describe("Tooltip - hover interactions", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("shows the tooltip on mouse enter and hides it on mouse leave", () => {
    const { getByTestId, queryByTestId } = render(
      <TestComponent>Tooltip Message</TestComponent>,
    );

    const trigger = getByTestId("tooltip-trigger");

    // 초기에는 Tooltip.Content가 렌더링되지 않아야 한다.
    expect(queryByTestId("tooltip-content")).toBeNull();

    // Tooltip.Trigger에 마우스를 올려 툴팁을 연다. (기본값 300ms)
    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(300));
    const content = getByTestId("tooltip-content");
    expect(content.dataset.state).toBe("open");

    // Tooltip.Trigger에서 마우스를 내리면 툴팁이 닫혀야 한다.
    fireEvent.mouseLeave(trigger);
    act(() => vi.advanceTimersByTime(0));
    expect(queryByTestId("tooltip-content")).toBeNull();
  });

  it("does not hide the tooltip if mouse enters the tooltip content while it's open", () => {
    const { getByTestId, queryByTestId } = render(
      <TestComponent>Tooltip Message</TestComponent>,
    );

    const trigger = getByTestId("tooltip-trigger");

    // Tooltip.Trigger에 마우스를 올려 툴팁을 연다. (300ms delay)
    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(300));
    const content = getByTestId("tooltip-content");
    expect(content.dataset.state).toBe("open");

    // Tooltip.Content에 마우스를 올려도 툴팁이 닫히지 않아야 한다.
    fireEvent.mouseLeave(trigger);
    fireEvent.mouseEnter(content);
    act(() => vi.advanceTimersByTime(1000)); // 충분한 시간을 보낸다.
    expect(content.dataset.state).toBe("open");

    // Tooltip.Content에서도 마우스를 내리면 툴팁이 닫혀야 한다.
    fireEvent.mouseLeave(content);
    act(() => vi.advanceTimersByTime(0));
    expect(queryByTestId("tooltip-content")).toBeNull();
  });

  it("should reset timer when mouse re-enters before hide delay", () => {
    const { getByTestId, queryByTestId } = render(
      <TestComponent hideDelay={300}>Tooltip Message</TestComponent>,
    );

    const trigger = getByTestId("tooltip-trigger");

    // 초기에는 보이지 않는다.
    expect(queryByTestId("tooltip-content")).toBeNull();

    // 트리거에 마우스를 올려, 일단 타이머를 시작한다.
    fireEvent.mouseEnter(trigger);
    // 충분한 시간이 지나지 않고, 마우스를 내린다. (기본값 open 300ms, hide 700ms)
    act(() => vi.advanceTimersByTime(250));
    fireEvent.mouseLeave(trigger);
    // 타이머가 리셋되었기 때문에 700 - 250 = 450ms 후에도 보이지 않아야 한다.
    act(() => vi.advanceTimersByTime(450));
    expect(queryByTestId("tooltip-content")).toBeNull();

    // 마찬가지로, 내리는 과정에서도 확인한다.
    // 일단 툴팁을 연다.
    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(300)); // set hide delay
    const content = getByTestId("tooltip-content");
    expect(content.dataset.state).toBe("open");

    // 트리거에서 마우스를 내려 일단 타이머를 시작한다.
    fireEvent.mouseLeave(trigger);
    // 충분한 시간이 지나지 않고, 마우스를 올린다. (기본값 open 300ms, hide 700ms)
    act(() => vi.advanceTimersByTime(250));
    fireEvent.mouseEnter(trigger);
    // 타이머가 리셋되었기 때문에 700 - 250 = 450ms 후에도 보여야 한다.
    act(() => vi.advanceTimersByTime(450));
    expect(content.dataset.state).toBe("open");
  });
});
