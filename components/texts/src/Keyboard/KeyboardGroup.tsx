import { usePlatform } from "@wondesign/platform";
import {
  getShortkeyLabel,
  parseShortkey,
  type Shortkey,
} from "@wondesign/shortkeys";

import clsx from "clsx";

import { Keyboard } from "./Keyboard";
import { styles } from "./styles.css";

export interface KeyboardGroupProps extends React.HTMLAttributes<HTMLElement> {
  keys: Shortkey;
  size?: "small" | "large";
  platform?: "mac" | "windows";
}

export function KeyboardGroup({
  keys,
  size,
  platform,
  "aria-label": ariaLabel,
  className,
  ...rest
}: Readonly<KeyboardGroupProps>) {
  const detectedPlatform = usePlatform();
  platform ??= detectedPlatform;
  const { targetKey, ctrlKey, shiftKey, altKey, metaKey } = parseShortkey(
    keys,
    platform,
  );

  const keysToRender: string[] = [];

  const isMac = platform === "mac";

  if (ctrlKey) keysToRender.push(isMac ? "^" : "Ctrl");
  if (shiftKey) keysToRender.push(isMac ? "⇧" : "Shift");
  if (altKey) keysToRender.push(isMac ? "⌥" : "Alt");
  if (metaKey) keysToRender.push(isMac ? "⌘" : "Win");

  keysToRender.push(targetKey);

  const resolvedLabel = ariaLabel ?? getShortkeyLabel(keys, platform);

  if (keysToRender.length === 1) {
    return (
      <Keyboard
        {...rest}
        size={size}
        aria-label={resolvedLabel}
        className={className}
      >
        {keysToRender[0]}
      </Keyboard>
    );
  }

  return (
    <kbd
      {...rest}
      aria-label={resolvedLabel}
      className={clsx(styles.keyboardGroup, className)}
    >
      {keysToRender.map((key) => (
        <Keyboard key={key} size={size} aria-hidden="true">
          {key}
        </Keyboard>
      ))}
    </kbd>
  );
}
