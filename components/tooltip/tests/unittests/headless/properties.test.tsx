import { act, fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./test-component";

describe("HeadlessTooltip - properties", () => {
  it("should have appropriate aria attributes", () => {
    const { getByTestId } = render(
      <TestComponent isOpen>Tooltip Message</TestComponent>,
    );

    const trigger = getByTestId("tooltip-trigger");
    const content = getByTestId("tooltip-content");

    // 1. content's ID matches trigger's aria-describedby
    expect(trigger.getAttribute("aria-describedby")).toBe(content.id);

    // 2. content has role=tooltip
    expect(content.getAttribute("role")).toBe("tooltip");

    // 3. trigger does not have aria-haspopup=tooltip
    expect(getByTestId("tooltip-trigger").getAttribute("aria-haspopup")).toBe(
      null,
    );

    // 4. arrow has aria-hidden=true
    expect(getByTestId("tooltip-arrow").getAttribute("aria-hidden")).toBe(
      "true",
    );
  });

  it("should handle the disabled state correctly", () => {
    const { getByTestId, queryByTestId } = render(
      <TestComponent isDisabled>Tooltip Message</TestComponent>,
    );

    const trigger = getByTestId("tooltip-trigger");

    // 초기에는 보이지 않는다.
    expect(queryByTestId("tooltip-content")).toBeNull();

    // 트리거에 마우스를 올려도 툴팁이 열리지 않아야 한다.
    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(1000));
    expect(queryByTestId("tooltip-content")).toBeNull();
  });

  it("respects custom show and hide delays", () => {
    const { getByTestId, queryByTestId } = render(
      <TestComponent showDelay={500} hideDelay={300}>
        Tooltip Message
      </TestComponent>,
    );

    const trigger = getByTestId("tooltip-trigger");

    // 초기에는 보이지 않는다.
    expect(queryByTestId("tooltip-content")).toBeNull();

    // 트리거에 마우스를 올리면, openDelay 후에 툴팁이 열려야 한다.
    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(499));
    expect(queryByTestId("tooltip-content")).toBeNull();
    act(() => vi.advanceTimersByTime(1));
    const content = getByTestId("tooltip-content");
    expect(content.dataset.state).toBe("open");

    // 트리거에서 마우스를 내리면, closeDelay 후에 툴팁이 닫혀야 한다.
    fireEvent.mouseLeave(trigger);
    act(() => vi.advanceTimersByTime(299));
    expect(content.dataset.state).toBe("open");
    act(() => vi.advanceTimersByTime(1));
    expect(queryByTestId("tooltip-content")).toBeNull();
  });

  it("supports non-portal mode", () => {
    const { getByTestId } = render(
      <div data-testid="container">
        <TestComponent isOpen disablePortal>
          Tooltip Message
        </TestComponent>
      </div>,
    );

    const content = getByTestId("tooltip-content");
    const trigger = getByTestId("tooltip-trigger");

    expect(content.parentElement).not.toBe(document.body);
    expect(content.parentElement).toBe(getByTestId("container"));
    expect(trigger.parentElement).toBe(getByTestId("container"));
  });

  it("supports the keepMounted property", () => {
    const { getByTestId } = render(
      <TestComponent isOpen={false} keepMounted>
        Tooltip Message
      </TestComponent>,
    );

    // isOpen이 false이더라도, content가 DOM에 존재해야 한다.
    expect(getByTestId("tooltip-content")).toBeTruthy();
    expect(getByTestId("tooltip-content").dataset.state).toBe("closed");
  });
});
