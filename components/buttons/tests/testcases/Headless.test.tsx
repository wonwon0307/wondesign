import { fireEvent, render } from "@testing-library/react";

import { HeadlessButton } from "@/Headless";

describe("HeadlessButton", () => {
  it("renders a button element by default", () => {
    const { getByTestId } = render(
      <HeadlessButton data-testid="button">Click me</HeadlessButton>,
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();
    expect(button.getAttribute("type")).toBe("button");
  });

  it("handles disabled state correctly", () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn();

    const { getByTestId } = render(
      <HeadlessButton
        data-testid="button"
        isDisabled
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        Click me
      </HeadlessButton>,
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
      <HeadlessButton
        data-testid="button"
        isLoading
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        Click me
      </HeadlessButton>,
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

  it("handles asChild prop correctly", () => {
    const buttonClick = vi.fn();
    const linkClick = vi.fn((e) => e.preventDefault());
    const buttonKeyDown = vi.fn();
    const linkKeyDown = vi.fn();

    const { getByTestId } = render(
      <HeadlessButton
        data-testid="button"
        asChild
        className="button-class"
        onClick={buttonClick}
        onKeyDown={buttonKeyDown}
        style={{ color: "red" }}
      >
        <a
          href="./test/"
          className="a-class"
          onClick={linkClick}
          onKeyDown={linkKeyDown}
          style={{ textDecoration: "underline" }}
        >
          Click me
        </a>
      </HeadlessButton>,
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("A");

    // props가 제대로 전달되는지 확인
    expect(button.getAttribute("href")).toBe("./test/");
    expect(button.className).toBe("button-class a-class");
    expect(button.style.color).toBe("red");
    expect(button.style.textDecoration).toBe("underline");

    // 이벤트 핸들러가 제대로 체이닝되는지 확인
    fireEvent.click(button);
    expect(linkClick).toHaveBeenCalledTimes(1);
    expect(buttonClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(button, { key: "Enter" });
    expect(linkKeyDown).toHaveBeenCalledTimes(1);
    expect(buttonKeyDown).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(button, { key: " " });
    expect(linkKeyDown).toHaveBeenCalledTimes(2);
    expect(buttonKeyDown).toHaveBeenCalledTimes(2);
  });

  it("handles disabled and loading states with asChild prop correctly", () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn();

    const { getByTestId } = render(
      <HeadlessButton
        data-testid="button"
        asChild
        isDisabled
        isLoading
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <a href="./test/">Click me</a>
      </HeadlessButton>,
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("A");

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
