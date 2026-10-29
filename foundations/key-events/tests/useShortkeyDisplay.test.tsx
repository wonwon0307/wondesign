import { renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { useShortkeyDisplay } from "@/shortkey/useShortkeyDisplay";
import type { Shortkey } from "@/shortkey/types/shortkey";

function TestComponent({ shortkey }: { shortkey: Shortkey }) {
  const display = useShortkeyDisplay(shortkey);

  return <kbd aria-label={display?.label}>{display?.keys.join(" ")}</kbd>;
}

describe("useShortkeyDisplay", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns keys and label for non-apple platforms", () => {
    const { result } = renderHook(() => useShortkeyDisplay("Mod+Shift+K"));

    expect(result.current).toEqual({
      keys: ["Ctrl", "Shift", "K"],
      label: "Control Shift K",
      keyShortcuts: "Control+Shift+K",
    });
  });

  it("returns keys and label for an apple platform", () => {
    vi.spyOn(navigator, "platform", "get").mockReturnValue("MacIntel");
    const { result } = renderHook(() => useShortkeyDisplay("Mod+Shift+K"));

    expect(result.current).toEqual({
      keys: ["⇧", "⌘", "K"],
      label: "Shift Command K",
      keyShortcuts: "Shift+Meta+K",
    });
  });

  it("returns keys and label for a key it can't bind", () => {
    const { result } = renderHook(() => useShortkeyDisplay("Enter"));

    expect(result.current).toEqual({
      keys: ["Enter"],
      label: "Enter",
      keyShortcuts: "Enter",
    });
  });

  it("uses ARIA key names in keyShortcuts", () => {
    vi.spyOn(navigator, "platform", "get").mockReturnValue("MacIntel");
    const { result } = renderHook(() => useShortkeyDisplay("Opt+↑"));

    expect(result.current).toEqual({
      keys: ["⌥", "↑"],
      label: "Option ↑",
      keyShortcuts: "Alt+ArrowUp",
    });
  });

  it("returns undefined for a null shortkey", () => {
    const { result } = renderHook(() => useShortkeyDisplay(null));

    expect(result.current).toBeUndefined();
  });

  it("renders nothing for a shortkey with modifiers before hydration", () => {
    vi.spyOn(navigator, "platform", "get").mockReturnValue("MacIntel");

    expect(renderToString(<TestComponent shortkey="Mod+K" />)).toBe(
      "<kbd></kbd>",
    );
  });

  it("renders a bare key before hydration", () => {
    expect(renderToString(<TestComponent shortkey="K" />)).toBe(
      '<kbd aria-label="K">K</kbd>',
    );
  });
});
