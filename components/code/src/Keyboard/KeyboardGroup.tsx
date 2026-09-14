import { isApple, parseShortkey, type Shortkey } from "@wondesign/shortkey";
import clsx from "clsx";

import { Keyboard } from "./Keyboard";
import { styles } from "./styles.css";

export interface KeyboardGroupProps extends React.HTMLAttributes<HTMLElement> {
  shortkey: Shortkey;
  size?: "small" | "large";
}

export function KeyboardGroup({
  shortkey,
  size,
  "aria-label": ariaLabel,
  className,
  ...rest
}: Readonly<KeyboardGroupProps>) {
  const { keys, label } = getKeysAndLabel(shortkey);

  const resolvedLabel = ariaLabel ?? label;

  if (keys.length === 1) {
    return (
      <Keyboard
        {...rest}
        size={size}
        aria-label={resolvedLabel}
        className={className}
      >
        {keys[0]}
      </Keyboard>
    );
  }

  return (
    <kbd
      {...rest}
      aria-label={resolvedLabel}
      className={clsx(styles.keyboardGroup, className)}
    >
      {keys.map((token) => (
        <Keyboard key={token} size={size} aria-hidden="true">
          {token}
        </Keyboard>
      ))}
    </kbd>
  );
}

function getKeysAndLabel(shortkey: Shortkey) {
  const { targetKey, ctrlKey, shiftKey, altKey, metaKey } =
    parseShortkey(shortkey);

  const modifiers = isApple()
    ? [
        ctrlKey && { glyph: "⌃", label: "Control" },
        altKey && { glyph: "⌥", label: "Option" },
        shiftKey && { glyph: "⇧", label: "Shift" },
        metaKey && { glyph: "⌘", label: "Command" },
      ]
    : [
        metaKey && { glyph: "Win", label: "Windows" },
        ctrlKey && { glyph: "Ctrl", label: "Control" },
        altKey && { glyph: "Alt", label: "Alt" },
        shiftKey && { glyph: "Shift", label: "Shift" },
      ];

  const parts = modifiers.filter(Boolean) as { glyph: string; label: string }[];

  return {
    keys: [...parts.map((part) => part.glyph), targetKey],
    label: [...parts.map((part) => part.label), targetKey].join(" "),
  };
}
