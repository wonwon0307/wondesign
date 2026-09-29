import { fireEvent, render } from "@testing-library/react";

import { Anchor } from "@/Anchor/Anchor";

describe("Anchor - basic usages", () => {
  beforeAll(() => {
    // Not Implemented: navigation to another Document 경고 무시
    globalThis.window.addEventListener("click", (e) => e.preventDefault());
  });

  it("renders an anchor element with the correct href", () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn();
    const { getByText } = render(
      <Anchor href="/test" onClick={onClick} onKeyDown={onKeyDown}>
        Test Anchor
      </Anchor>,
    );

    const anchor = getByText("Test Anchor");
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute("href")).toBe("/test");

    // 클릭 이벤트가 발생해야 한다.
    fireEvent.click(anchor);
    expect(onClick).toHaveBeenCalled();

    // 키다운 이벤트가 발생해야 한다.
    fireEvent.keyDown(anchor, { key: "Enter" });
    expect(onKeyDown).toHaveBeenCalled();
  });

  it("handles disabled state correctly", () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn();
    const { getByText } = render(
      <Anchor href="/test" isDisabled onClick={onClick} onKeyDown={onKeyDown}>
        Disabled Anchor
      </Anchor>,
    );

    const anchor = getByText("Disabled Anchor");
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute("aria-disabled")).toBe("true");

    // 클릭 이벤트가 발생하지 않아야 한다.
    fireEvent.click(anchor);
    expect(onClick).not.toHaveBeenCalled();

    // Enter/Space 키다운 이벤트가 발생하지 않아야 한다.
    fireEvent.keyDown(anchor, { key: "Enter" });
    fireEvent.keyDown(anchor, { key: " " });
    expect(onKeyDown).not.toHaveBeenCalled();

    // 다른 키는 전달되어야 한다.
    fireEvent.keyDown(anchor, { key: "Tab" });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it("handles as prop correctly", () => {
    const { getByText } = render(
      <Anchor
        href="/test"
        as="button"
        className="anchor-class"
        style={{ color: "blue" }}
      >
        Button Anchor
      </Anchor>,
    );

    const button = getByText("Button Anchor");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("href")).toBe("/test");
  });

  it("handles as prop with openInNewTab and disabled correctly", () => {
    const { getByText } = render(
      <Anchor href="/test" as="button" openInNewTab isDisabled>
        Button Anchor
      </Anchor>,
    );

    const button = getByText("Button Anchor");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("A"); // disabled인 경우 "a"로 resolve
    expect(button.getAttribute("href")).toBe(null); // disabled 상태에서는 href가 제거되어야 한다.
    expect(button.getAttribute("target")).toBe("_blank");
    expect(button.getAttribute("rel")).toBe("noopener noreferrer");
    expect(button.getAttribute("aria-disabled")).toBe("true");
  });

  it("passes ref correctly", () => {
    const ref = vi.fn();
    const { getByText } = render(
      <Anchor href="/test" ref={ref}>
        Test Anchor
      </Anchor>,
    );

    const anchor = getByText("Test Anchor");
    expect(anchor).toBeTruthy();
    expect(ref).toHaveBeenCalledWith(anchor);
  });
});
