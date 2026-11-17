import { fireEvent, render } from "@testing-library/react";

import { AsChild } from "@/AsChild/AsChild";

describe("AsChild", () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});

  afterAll(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("merges props with the child element correctly", () => {
    const parentCB = vi.fn();
    const childCB = vi.fn();

    const { getByText } = render(
      <AsChild
        className="parent-class"
        style={{ backgroundColor: "blue" }}
        type="submit"
        onClick={parentCB}
      >
        <button
          className="child-class"
          style={{ color: "red" }}
          type="button"
          onClick={childCB}
        >
          Click me
        </button>
      </AsChild>,
    );

    const button = getByText("Click me");

    expect(button).toBeTruthy();
    expect(button.className).toContain("child-class");
    expect(button.className).toContain("parent-class");
    expect(button.style.backgroundColor).toBe("blue");
    expect(button.style.color).toBe("red");
    expect(button.getAttribute("type")).toBe("submit"); // parent's should win

    fireEvent.click(button);
    expect(parentCB).toHaveBeenCalled();
    expect(childCB).toHaveBeenCalled();
  });

  it("merges refs correctly", () => {
    const parentRef = vi.fn();
    const childRef = vi.fn();

    const { getByText } = render(
      <AsChild ref={parentRef}>
        <button ref={childRef}>Click me</button>
      </AsChild>,
    );

    const button = getByText("Click me");
    expect(button).toBeTruthy();
    expect(parentRef).toHaveBeenCalled();
    expect(childRef).toHaveBeenCalled();
  });

  it("gracefully handles non-function event handlers", () => {
    const childCB = vi.fn();

    const { getByText } = render(
      <AsChild onClick={undefined}>
        <button onClick={childCB}>Click me</button>
      </AsChild>,
    );

    const button = getByText("Click me");
    expect(button).toBeTruthy();
    fireEvent.click(button);
    expect(childCB).toHaveBeenCalled();
  });

  it("warns on console if no valid child is provided", () => {
    vi.stubEnv("NODE_ENV", "development");

    const { container } = render(<AsChild>Not a valid child</AsChild>);

    expect(container.firstChild).toBeNull();
    expect(console.warn).toHaveBeenCalledWith(
      "[WonDesign Headless] asChild requires a single valid React element as child.",
    );
  });

  it("doesn't warn even if no valid child is provided in production", () => {
    vi.stubEnv("NODE_ENV", "production");

    const { container } = render(<AsChild>Not a valid child</AsChild>);

    expect(container.firstChild).toBeNull();
    expect(console.warn).not.toHaveBeenCalled();
  });
});
