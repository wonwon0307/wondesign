import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { renderHook } from "@testing-library/react";

import { usePlatform } from "@/usePlatform";

describe("usePlatform", () => {
  it("uses the server snapshot while hydrating", () => {
    function TestComponent() {
      return <>{usePlatform()}</>;
    }

    const container = document.createElement("div");
    container.innerHTML = renderToStaticMarkup(<TestComponent />);

    act(() => {
      hydrateRoot(container, <TestComponent />);
    });

    expect(container.textContent).toBe("windows");
  });

  it("returns 'windows' when userAgent is unavailable", () => {
    vi.stubGlobal("navigator", {});

    const { result } = renderHook(() => usePlatform());
    expect(result.current).toBe("windows");

    vi.unstubAllGlobals();
  });

  it("returns 'mac' in a macOS user agent environment", () => {
    Object.defineProperty(globalThis.navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      writable: true,
    });
    const { result } = renderHook(() => usePlatform());
    expect(result.current).toBe("mac");
  });

  it("returns 'windows' in a non-macOS user agent environment", () => {
    Object.defineProperty(globalThis.navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      writable: true,
    });
    const { result } = renderHook(() => usePlatform());
    expect(result.current).toBe("windows");
  });
});
