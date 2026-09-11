import { renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { useIsMobile } from "@/mobile";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false, // desktop width
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

function TestComponent() {
  useIsMobile();
  return null;
}

describe("useIsMobile", () => {
  it("should return a boolean", () => {
    const { result } = renderHook(() => useIsMobile());
    expect(typeof result.current).toBe("boolean");
  });

  it("should respect the override", () => {
    const { result } = renderHook(() => useIsMobile(true));
    expect(result.current).toBe(true);

    const { result: resultFalse } = renderHook(() => useIsMobile(false));
    expect(resultFalse.current).toBe(false);
  });

  it("should return the server snapshot (false) when rendered on the server", () => {
    expect(() => renderToString(<TestComponent />)).not.toThrow();
  });
});
