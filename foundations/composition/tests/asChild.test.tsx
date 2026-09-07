import { fireEvent, render } from "@testing-library/react";

import { AsChild } from "@/asChild";

describe("asChild", () => {
  const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  beforeEach(() => {
    consoleWarnSpy.mockClear();
  });

  it("merges props with the child element correctly", () => {
    const parentCB = vi.fn();
    const childCB = vi.fn();

    const { getByText } = render(
      <AsChild
        className="parent-class"
        style={{ backgroundColor: "blue" }}
        onClick={parentCB}
      >
        <button
          className="child-class"
          style={{ color: "red" }}
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

    fireEvent.click(button);
    expect(parentCB).toHaveBeenCalled();
    expect(childCB).toHaveBeenCalled();
  });

  it("warns on console if no valid child is provided", () => {
    const { container } = render(<AsChild>Not a valid child</AsChild>);

    expect(container.firstChild).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[AsChild] asChild requires a single valid React element as child.",
    );
  });

  it("doesn't warn even if no valid child is provided in production", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    const { container } = render(<AsChild>Not a valid child</AsChild>);

    expect(container.firstChild).toBeNull();
    expect(consoleWarnSpy).not.toHaveBeenCalled();

    process.env.NODE_ENV = originalEnv;
  });
});
