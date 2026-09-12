import { parseShortkey } from "@/parse";
import type { Shortkey } from "@/types/shortkey";

describe("parseShortkey", () => {
  it("parses a simple shortkey correctly", () => {
    const shortkey: Shortkey = "A";
    const result = parseShortkey(shortkey);

    expect(result).toEqual({
      targetKey: "A",
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
    });
  });

  it("parses a shortkey with modifiers correctly", () => {
    const shortkey: Shortkey = "Ctrl+Shift+A";
    const result = parseShortkey(shortkey);

    expect(result).toEqual({
      targetKey: "A",
      ctrlKey: true,
      altKey: false,
      shiftKey: true,
      metaKey: false,
    });
  });

  it("parses a shortkey with 'Mod' modifier correctly for non-apple platforms", () => {
    const shortkey: Shortkey = "Mod+K";
    const result = parseShortkey(shortkey);

    expect(result).toEqual({
      targetKey: "K",
      ctrlKey: true,
      altKey: false,
      shiftKey: false,
      metaKey: false,
    });
  });

  it("parses a shortkey with 'Mod' modifier correctly for an apple platform", () => {
    Object.defineProperty(navigator, "platform", {
      value: "MacIntel",
      configurable: true,
    });
    const shortkey: Shortkey = "Mod+K";
    const result = parseShortkey(shortkey);

    expect(result).toEqual({
      targetKey: "K",
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: true,
    });
  });

  it("gracefully handles SSR environment", () => {
    const originalNavigator = globalThis.navigator;

    vi.stubGlobal("navigator", undefined);

    const shortkey: Shortkey = "Mod+K";
    const result = parseShortkey(shortkey);

    expect(result).toEqual({
      targetKey: "K",
      ctrlKey: true,
      altKey: false,
      shiftKey: false,
      metaKey: false,
    });

    globalThis.navigator = originalNavigator;
  });
});
