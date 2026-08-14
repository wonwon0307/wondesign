import type { FullShortkey, Shortkey } from "@/types/shortkeys";
import { parseShortkey, parseShortkeyInternal } from "@/utils/parse";

describe("parseShortkey", () => {
  it("parses a simple shortkey correctly", () => {
    const shortkey: Shortkey = "A";
    const result = parseShortkey(shortkey, "windows");

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
    const result = parseShortkeyInternal(shortkey, "windows");

    expect(result).toEqual({
      targetKey: "A",
      targetKeyCode: "KeyA",
      ctrlKey: true,
      altKey: false,
      shiftKey: true,
      metaKey: false,
    });
  });

  it("parses a shortkey that's not supported by the useKeyboardShortkey hook", () => {
    const shortkey: FullShortkey = "Enter";
    const result = parseShortkey(shortkey, "windows");

    expect(result).toEqual({
      targetKey: "Enter",
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
    });
  });

  it("parses a shortkey with 'Mod' modifier correctly for mac", () => {
    const shortkey: Shortkey = "Mod+K";
    const result = parseShortkeyInternal(shortkey, "mac");

    expect(result).toEqual({
      targetKey: "K",
      targetKeyCode: "KeyK",
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: true,
    });
  });

  it("parses a shortkey with 'Mod' modifier correctly for windows", () => {
    const shortkey: Shortkey = "Mod+K";
    const result = parseShortkeyInternal(shortkey, "windows");

    expect(result).toEqual({
      targetKey: "K",
      targetKeyCode: "KeyK",
      ctrlKey: true,
      altKey: false,
      shiftKey: false,
      metaKey: false,
    });
  });
});

describe("parseShortkeyInternal", () => {
  it("throws for an unsupported modifier", () => {
    expect(() => parseShortkeyInternal("Foo+A" as Shortkey)).toThrowError(
      'Invalid shortkey: "Foo" is not a supported modifier.',
    );
  });

  it("throws for an unsupported key", () => {
    expect(() => parseShortkeyInternal("Ctrl+Foo" as Shortkey)).toThrowError(
      'Invalid shortkey: "Foo" is not a supported key.',
    );
  });
});
