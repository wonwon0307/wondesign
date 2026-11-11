import { act, fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./test-component";
import { useState } from "react";

describe("Toast - corner cases", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should not run timers when duration is infinite (0)", () => {
    const { getByTestId, queryByTestId } = render(
      <TestComponent defaultOpen duration={0} />,
    );

    act(() => vi.advanceTimersToNextFrame());

    expect(getByTestId("toast")).toBeTruthy();
    act(() => vi.advanceTimersByTime(5000));
    expect(queryByTestId("toast")).toBeTruthy();

    // focus then blur still should not start timer
    fireEvent.focus(getByTestId("toast"));
    fireEvent.blur(getByTestId("toast"));
    act(() => vi.advanceTimersByTime(5000));
    expect(queryByTestId("toast")).toBeTruthy();

    // hover in then out still should not start timer
    fireEvent.mouseEnter(getByTestId("toast"));
    act(() => vi.advanceTimersByTime(5000));
    expect(queryByTestId("toast")).toBeTruthy();
    fireEvent.mouseLeave(getByTestId("toast"));
    act(() => vi.advanceTimersByTime(5000));
    expect(queryByTestId("toast")).toBeTruthy();
  });

  it("should not resume timer when it is already counting down", () => {
    // COVERAGE PURPOSE
    const { getByTestId, queryByTestId } = render(
      <TestComponent defaultOpen />,
    );

    act(() => vi.advanceTimersToNextFrame());

    // 타이머는 이미 시작해서, 절반만큼 지난 상태
    act(() => vi.advanceTimersByTime(2500));
    // 타이머가 절반밖에 안흘렀으니, toast는 여전히 보여야 한다
    expect(getByTestId("toast")).toBeTruthy();

    // 이후 hover가 떠난다고 해도, 이미 타이머는 진행중이니
    // 나머지 절반만 지나도 toast가 사라진다
    fireEvent.mouseLeave(getByTestId("toast"));
    act(() => vi.advanceTimersByTime(2500));
    expect(queryByTestId("toast")).toBeNull();
  });

  it("should not start the timer when focus moves within the toast", () => {
    const { getByTestId, queryByTestId } = render(
      <TestComponent defaultOpen />,
    );

    act(() => vi.advanceTimersToNextFrame());

    fireEvent.focus(getByTestId("toast"));
    fireEvent.blur(getByTestId("toast"), {
      relatedTarget: getByTestId("toast-close"),
    });
    act(() => vi.advanceTimersByTime(5000));
    expect(getByTestId("toast")).toBeTruthy();

    fireEvent.blur(getByTestId("toast"));
    act(() => vi.advanceTimersByTime(5000));
    expect(queryByTestId("toast")).toBeNull();
  });

  it("should not start timer when either one of hover or focus is active", () => {
    const { getByTestId, queryByTestId } = render(
      <TestComponent defaultOpen />,
    );

    act(() => vi.advanceTimersToNextFrame());

    // 일단 hover와 focus를 모두 활성화
    fireEvent.mouseEnter(getByTestId("toast"));
    fireEvent.focus(getByTestId("toast"));

    // hover가 떠나도 focus가 남아있으므로 타이머는 시작되지 않아야 한다
    fireEvent.mouseLeave(getByTestId("toast"));
    act(() => vi.advanceTimersByTime(5000));
    expect(queryByTestId("toast")).toBeTruthy();

    // hover를 다시 활성화하고, 이번엔 focus를 비활성화해도
    // 마찬가지로 타이머가 시작되지 않아야 한다
    fireEvent.mouseEnter(getByTestId("toast"));
    fireEvent.blur(getByTestId("toast"));
    act(() => vi.advanceTimersByTime(5000));
    expect(queryByTestId("toast")).toBeTruthy();

    // 둘다 비활성화 되어야 타이머가 시작된다
    fireEvent.mouseLeave(getByTestId("toast"));
    act(() => vi.advanceTimersByTime(5000));
    expect(queryByTestId("toast")).toBeNull();
  });

  it("should reset the timer when toast is reopened", () => {
    const Component = () => {
      const [isOpen, setIsOpen] = useState<boolean>(true);

      return (
        <>
          <TestComponent isOpen={isOpen} onOpenChange={setIsOpen} />
          <button data-testid="reopen" onClick={() => setIsOpen(true)}>
            Reopen
          </button>
        </>
      );
    };

    const { getByTestId, queryByTestId } = render(<Component />);

    act(() => vi.advanceTimersToNextFrame());
    expect(getByTestId("toast")).toBeTruthy();

    // 실제 브라우저처럼: hover + focus 상태에서 닫기 버튼으로 닫는다
    fireEvent.mouseEnter(getByTestId("toast"));
    fireEvent.focus(getByTestId("toast-close"));
    fireEvent.click(getByTestId("toast-close"));
    expect(queryByTestId("toast")).toBeNull();

    // Reopen the toast
    fireEvent.click(getByTestId("reopen"));

    fireEvent.mouseEnter(getByTestId("toast"));
    fireEvent.mouseLeave(getByTestId("toast"));
    act(() => vi.advanceTimersByTime(4999));
    expect(getByTestId("toast")).toBeTruthy();
    act(() => vi.advanceTimersByTime(1));
    expect(queryByTestId("toast")).toBeNull();
  });
});
