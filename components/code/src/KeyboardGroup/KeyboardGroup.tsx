import {
  useShortkeyDisplay,
  type Shortkey,
} from "@wondesign/key-events/shortkey";
import { clsx } from "clsx";

import { Keyboard } from "@/Keyboard/Keyboard";
import { styles } from "./styles.css";

export interface KeyboardGroupProps extends React.HTMLAttributes<HTMLElement> {
  shortkey: Shortkey;
  size?: "small" | "medium" | "large";
}

export function KeyboardGroup({
  shortkey,
  size,
  "aria-label": ariaLabel,
  className,
  ...rest
}: Readonly<KeyboardGroupProps>) {
  const result = useShortkeyDisplay(shortkey);

  if (!result) return null;

  const { keys, label } = result;

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
