import type { Shortkey } from "@/types/shortkeys";
import { getKeyShortcuts, getShortkeyLabel } from "@/utils/aria";

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
