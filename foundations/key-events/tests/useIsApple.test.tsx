import { renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { useIsApple } from "@/shortkey/isApple";

function TestComponent() {
  const apple = useIsApple();

  return <span>{String(apple)}</span>;
}

describe("useIsApple", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("returns false for non-apple platforms", () => {
    const { result } = renderHook(() => useIsApple());

    expect(result.current).toBe(false);
  });

  it("returns true for an apple platform", () => {
    vi.spyOn(navigator, "platform", "get").mockReturnValue("MacIntel");
    const { result } = renderHook(() => useIsApple());

    expect(result.current).toBe(true);
  });

  it("returns undefined before hydration", () => {
    vi.spyOn(navigator, "platform", "get").mockReturnValue("MacIntel");

    expect(renderToString(<TestComponent />)).toBe("<span>undefined</span>");
  });

  it("returns false when navigator is unavailable", () => {
    vi.stubGlobal("navigator", undefined);
    const { result } = renderHook(() => useIsApple());

    expect(result.current).toBe(false);
  });
});
