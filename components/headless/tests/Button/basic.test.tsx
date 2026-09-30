import { fireEvent, render } from "@testing-library/react";

import { Button } from "@/Button/Button";

describe("Button - basic usages", () => {
  it("renders the headless button component with default properties", () => {
    const { getByTestId } = render(
      <Button data-testid="button">Click me</Button>,
    );

    const button = getByTestId("button");

    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
    expect(button.textContent).toBe("Click me");
    expect(button.getAttribute("type")).toBe("button");
    expect(button.dataset.disabled).toBe(undefined);
    expect(button.dataset.loading).toBe(undefined);
  });

  it("handles disabled state correctly", () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn();

    const { getByTestId } = render(
      <Button
        data-testid="button"
        isDisabled
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        Click me
      </Button>,
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();

    // aria-disabled와 data-disabled 속성 확인
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(button.dataset.disabled).toBe("true");

    // 클릭 이벤트가 발생하지 않는지 확인
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();

    // 키보드 이벤트가 발생하지 않는지 확인
    fireEvent.keyDown(button, { key: "Enter" });
    expect(onKeyDown).not.toHaveBeenCalled();
    fireEvent.keyDown(button, { key: " " });
    expect(onKeyDown).not.toHaveBeenCalled();
  });

  it("handles loading state correctly", () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn();

    const { getByTestId } = render(
      <Button
        data-testid="button"
        isLoading
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        Click me
      </Button>,
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();

    // aria-busy와 data-loading 속성 확인
    expect(button.getAttribute("aria-busy")).toBe("true");
    expect(button.dataset.loading).toBe("true");

    // 클릭 이벤트가 발생하지 않는지 확인
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();

    // 키보드 이벤트가 발생하지 않는지 확인
    fireEvent.keyDown(button, { key: "Enter" });
    expect(onKeyDown).not.toHaveBeenCalled();
    fireEvent.keyDown(button, { key: " " });
    expect(onKeyDown).not.toHaveBeenCalled();
  });

  it("passes ref correctly", () => {
    const ref = vi.fn();

    const { getByTestId } = render(
      <Button data-testid="button" ref={ref}>
        Click me
      </Button>,
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();
    expect(ref).toHaveBeenCalledWith(button);
  });
});
