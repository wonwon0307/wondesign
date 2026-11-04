import { render, renderHook } from "@testing-library/react";

import { useScrollLock } from "@/scroll-lock/useScrollLock";

function TestComponent({ enabled = false }: { enabled?: boolean }) {
  useScrollLock({ enabled });

  return <div />;
}

describe("useScrollLock", () => {
  it("locks the page scroll and restores it when turned off", () => {
    const html = document.documentElement;
    html.style.overflowX = "auto";
    html.style.overflowY = "visible";

    const { rerender } = render(<TestComponent enabled={true} />);
    expect(html.style.overflowX).toBe("hidden");
    expect(html.style.overflowY).toBe("hidden");
    expect(html.hasAttribute("data-wondesign-scroll-lock")).toBe(true);

    // should restore when it is turned off
    rerender(<TestComponent enabled={false} />);
    expect(html.style.overflowX).toBe("auto");
    expect(html.style.overflowY).toBe("visible");
    expect(html.hasAttribute("data-wondesign-scroll-lock")).toBe(false);
  });

  it("handles multiple locks correctly", () => {
    const html = document.documentElement;
    html.style.overflowX = "";
    html.style.overflowY = "";

    const { rerender } = render(
      <div>
        <TestComponent enabled={true} />
        <TestComponent enabled={true} />
      </div>,
    );

    expect(html.style.overflowX).toBe("hidden");
    expect(html.style.overflowY).toBe("hidden");
    expect(html.hasAttribute("data-wondesign-scroll-lock")).toBe(true);

    // should unlock when one of the locks is turned off
    rerender(
      <div>
        <TestComponent enabled={true} />
        <TestComponent enabled={false} />
      </div>,
    );
    expect(html.style.overflowX).toBe("hidden");
    expect(html.style.overflowY).toBe("hidden");
    expect(html.hasAttribute("data-wondesign-scroll-lock")).toBe(true);

    // should unlock when all locks are turned off
    rerender(
      <div>
        <TestComponent enabled={false} />
        <TestComponent enabled={false} />
      </div>,
    );
    expect(html.style.overflowX).toBe("");
    expect(html.style.overflowY).toBe("");
    expect(html.hasAttribute("data-wondesign-scroll-lock")).toBe(false);
  });

  it("handles null targetRef correctly", () => {
    renderHook(() =>
      useScrollLock({ enabled: true, targetRef: { current: null } }),
    );

    const html = document.documentElement;
    expect(html.style.overflowX).toBe("");
    expect(html.style.overflowY).toBe("");
    expect(html.hasAttribute("data-wondesign-scroll-lock")).toBe(false);
  });

  it("still unlocks when its attributes were removed", () => {
    const html = document.documentElement;

    const { rerender } = render(<TestComponent enabled={true} />);

    html.removeAttribute("data-wondesign-scroll-lock");
    html.removeAttribute("data-wondesign-scroll-lock-overflow-x");
    html.removeAttribute("data-wondesign-scroll-lock-overflow-y");

    rerender(<TestComponent enabled={false} />);
    expect(html.style.overflowX).toBe("");
    expect(html.style.overflowY).toBe("");
    expect(html.hasAttribute("data-wondesign-scroll-lock")).toBe(false);
  });
});
