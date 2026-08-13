import type { Shortkey } from "@/types/shortkeys";
import { getKeyShortcuts, getShortkeyLabel } from "@/utils/aria";
import { parseShortkey } from "@/utils/parse";

describe("parseShortkey", () => {
  it("parses a simple shortkey correctly", () => {
    const shortkey: Shortkey = "A";
    const result = parseShortkey(shortkey, "windows");

    expect(result).toEqual({
      targetKey: "A",
      targetKeyCode: "KeyA",
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
    });
  });

  it("parses a shortkey with modifiers correctly", () => {
    const shortkey: Shortkey = "Ctrl+Shift+A";
    const result = parseShortkey(shortkey, "windows");

    expect(result).toEqual({
      targetKey: "A",
      targetKeyCode: "KeyA",
      ctrlKey: true,
      altKey: false,
      shiftKey: true,
      metaKey: false,
    });
  });

  it("parses a shortkey with 'Mod' modifier correctly for mac", () => {
    const shortkey: Shortkey = "Mod+K";
    const result = parseShortkey(shortkey, "mac");

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
    const result = parseShortkey(shortkey, "windows");

    expect(result).toEqual({
      targetKey: "K",
      targetKeyCode: "KeyK",
      ctrlKey: true,
      altKey: false,
      shiftKey: false,
      metaKey: false,
    });
  });

  it("throws for an unsupported modifier", () => {
    expect(() => parseShortkey("Foo+A" as Shortkey)).toThrowError(
      'Invalid shortkey: "Foo" is not a supported modifier.',
    );
  });

  it("throws for an unsupported key", () => {
    expect(() => parseShortkey("Ctrl+Foo" as Shortkey)).toThrowError(
      'Invalid shortkey: "Foo" is not a supported key.',
    );
  });
});

describe("getKeyShortcuts", () => {
  it("builds aria keyshortcuts string correctly", () => {
    const shortkey: Shortkey = "Ctrl+Shift+A";
    const result = getKeyShortcuts(shortkey);

    expect(result).toBe("Control+Shift+A");
  });

  it("includes the meta and alt modifiers", () => {
    const shortkey: Shortkey = "Meta+Alt+A";
    const result = getKeyShortcuts(shortkey);

    expect(result).toBe("Meta+Alt+A");
  });
});

describe("getShortkeyLabel", () => {
  it("formats a shortkey for mac platform correctly 1", () => {
    const shortkey: Shortkey = "Ctrl+Shift+A";
    const result = getShortkeyLabel(shortkey, "mac");

    expect(result).toBe("Control Shift A");
  });

  it("formats a shortkey for mac platform correctly 2", () => {
    const shortkey: Shortkey = "Meta+Alt+A";
    const result = getShortkeyLabel(shortkey, "mac");

    expect(result).toBe("Option Command A");
  });

  it("formats a shortkey for windows platform correctly", () => {
    const shortkey: Shortkey = "Meta+Alt+A";
    const result = getShortkeyLabel(shortkey, "windows");

    expect(result).toBe("Alt Windows A");
  });
});
