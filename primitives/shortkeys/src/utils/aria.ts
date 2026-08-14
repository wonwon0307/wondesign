import { parseShortkey } from "./parse";
import type { FullShortkey } from "@/types/shortkeys";

export function getShortkeyLabel(
  key: FullShortkey,
  platform: "mac" | "windows" = "windows",
): string {
  const { targetKey, ctrlKey, altKey, shiftKey, metaKey } = parseShortkey(
    key,
    platform,
  );
  const isMac = platform === "mac";

  const parts: string[] = [];

  if (ctrlKey) parts.push("Control");
  if (shiftKey) parts.push("Shift");
  if (altKey) parts.push(isMac ? "Option" : "Alt");
  if (metaKey) parts.push(isMac ? "Command" : "Windows");
  parts.push(targetKey);

  return parts.join(" ");
}

export function getKeyShortcuts(key: FullShortkey): string {
  const { targetKey, ctrlKey, altKey, shiftKey, metaKey } = parseShortkey(key);
  const parts: string[] = [];

  if (metaKey) parts.push("Meta");
  if (ctrlKey) parts.push("Control");
  if (altKey) parts.push("Alt");
  if (shiftKey) parts.push("Shift");
  parts.push(targetKey);

  return parts.join("+");
}
