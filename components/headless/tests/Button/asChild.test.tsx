import { fireEvent, render } from "@testing-library/react";

import { Button } from "@/Button/Button";

describe("Button - asChild", () => {
  it("handles asChild prop correctly", () => {
    const parentClick = vi.fn();
    const childClick = vi.fn();
    const parentKeyDown = vi.fn();
    const childKeyDown = vi.fn();

    const { getByTestId } = render(
      <Button
        data-testid="button"
        asChild
        type="submit"
        className="parent-class"
        onClick={parentClick}
        onKeyDown={parentKeyDown}
        style={{ color: "red" }}
      >
        <button
          className="child-class"
          onClick={childClick}
          onKeyDown={childKeyDown}
          style={{ textDecoration: "underline" }}
        >
          Click me
        </button>
      </Button>,
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();

    // props가 제대로 전달되는지 확인
    expect(button.getAttribute("type")).toBe("submit");
    expect(button.className).toBe("parent-class child-class");
    expect(button.style.color).toBe("red");
    expect(button.style.textDecoration).toBe("underline");

    // 이벤트 핸들러가 제대로 체이닝되는지 확인
    fireEvent.click(button);
    expect(childClick).toHaveBeenCalledTimes(1);
    expect(parentClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(button, { key: "Enter" });
    expect(childKeyDown).toHaveBeenCalledTimes(1);
    expect(parentKeyDown).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(button, { key: " " });
    expect(childKeyDown).toHaveBeenCalledTimes(2);
    expect(parentKeyDown).toHaveBeenCalledTimes(2);
  });

  it("handles disabled and loading states with asChild prop correctly", () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn();

    const { getByTestId } = render(
      <Button
        asChild
        isDisabled
        isLoading
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <button data-testid="button">Click me</button>
      </Button>,
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();
    expect(button.textContent).toBe("Click me");

    // aria-disabled, aria-busy, data-disabled, data-loading 속성 확인
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(button.getAttribute("aria-busy")).toBe("true");
    expect(button.dataset.disabled).toBe("true");
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
});
