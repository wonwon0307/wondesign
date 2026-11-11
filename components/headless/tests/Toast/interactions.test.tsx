import { act, fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./test-component";

describe("Toast - interactions", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should close the toast after `duration`", () => {
    const { getByText, queryByText } = render(
      <TestComponent defaultOpen duration={1000} />,
    );

    // toast area가 준비되지 않으면, toast는 렌더링되지 않는다
    expect(queryByText("Test Toast")).toBeNull();

    act(() => vi.advanceTimersToNextFrame());

    expect(getByText("Test Toast")).toBeTruthy();
    act(() => vi.advanceTimersByTime(1000));
    expect(queryByText("Test Toast")).not.toBeTruthy();
  });

  it("should close the toast on close button click", () => {
    const { getByText, queryByText } = render(
      <TestComponent defaultOpen duration={1000} />,
    );

    act(() => vi.advanceTimersToNextFrame());

    expect(getByText("Test Toast")).toBeTruthy();
    fireEvent.click(getByText("Close"));
    expect(queryByText("Test Toast")).not.toBeTruthy();
  });

  it("should close the toast on Escape key", () => {
    const { getByTestId, getByText, queryByText } = render(
      <TestComponent defaultOpen duration={1000} />,
    );

    act(() => vi.advanceTimersToNextFrame());

    const toast = getByTestId("toast");
    expect(toast).toBeTruthy();

    // 포커스가 없을 땐 Escape 키로 toast가 닫히지 않는다
    fireEvent.keyDown(document.body, {
      key: "Escape",
      code: "Escape",
    });
    expect(toast).toBeTruthy();

    // 포커스를 주면 Escape 키로 toast가 닫힌다 (focus를 document.activeElement로 mock)
    vi.spyOn(document, "activeElement", "get").mockReturnValue(
      getByText("Close"),
    );
    fireEvent.keyDown(toast, {
      key: "Escape",
      code: "Escape",
    });
    expect(queryByText("Test Toast")).toBeNull();
  });

  it("should call onClick when close button is clicked", () => {
    const onClick = vi.fn();

    const { getByText, queryByText } = render(
      <TestComponent defaultOpen duration={1000} onClick={onClick} />,
    );

    act(() => vi.advanceTimersToNextFrame());

    expect(getByText("Test Toast")).toBeTruthy();
    fireEvent.click(getByText("Close"));
    expect(onClick).toHaveBeenCalled();
    expect(queryByText("Test Toast")).not.toBeTruthy();
  });

  it("should not dismiss toast if preventDefault is called on the onClick callback", () => {
    const onClick = vi.fn((event) => event.preventDefault());

    const { getByText, queryByText } = render(
      <TestComponent defaultOpen duration={1000} onClick={onClick} />,
    );

    act(() => vi.advanceTimersToNextFrame());

    expect(getByText("Test Toast")).toBeTruthy();
    fireEvent.click(getByText("Close"));
    expect(onClick).toHaveBeenCalled();
    expect(queryByText("Test Toast")).toBeTruthy(); // Should still be visible
  });

  it("should pause timer when hovered, and resume when unhovered", () => {
    const { getByTestId, getByText, queryByText } = render(
      <TestComponent defaultOpen duration={1000} />,
    );

    act(() => vi.advanceTimersToNextFrame());

    expect(getByText("Test Toast")).toBeTruthy();

    // 타이머 절반 진행
    act(() => vi.advanceTimersByTime(500));
    expect(getByTestId("toast").dataset.paused).toBeUndefined();

    // 마우스를 올리고 타이머의 100%가 흘러도 그대로 보여야 한다
    fireEvent.mouseEnter(getByText("Test Toast"));
    act(() => vi.advanceTimersByTime(1000));
    expect(queryByText("Test Toast")).toBeTruthy();
    expect(getByTestId("toast").dataset.paused).toBe("true");

    // 마우스를 내리면, 나머지 절반만 지나도 toast가 닫힌다
    fireEvent.mouseLeave(getByText("Test Toast"));
    expect(getByTestId("toast").dataset.paused).toBeUndefined();
    act(() => vi.advanceTimersByTime(500));
    expect(queryByText("Test Toast")).not.toBeTruthy();
  });

  it("should pause timer when focused, and resume when blurred", () => {
    const { getByTestId, getByText, queryByText } = render(
      <TestComponent defaultOpen duration={1000} />,
    );

    act(() => vi.advanceTimersToNextFrame());

    expect(getByText("Test Toast")).toBeTruthy();

    act(() => vi.advanceTimersByTime(500));
    expect(getByTestId("toast").dataset.paused).toBeUndefined();

    fireEvent.focus(getByText("Test Toast"));
    act(() => vi.advanceTimersByTime(1000));
    expect(queryByText("Test Toast")).toBeTruthy();
    expect(getByTestId("toast").dataset.paused).toBe("true");

    fireEvent.blur(getByText("Test Toast"));
    expect(getByTestId("toast").dataset.paused).toBeUndefined();
    act(() => vi.advanceTimersByTime(500));
    expect(queryByText("Test Toast")).not.toBeTruthy();
  });
});
