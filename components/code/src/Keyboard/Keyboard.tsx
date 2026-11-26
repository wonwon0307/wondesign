import {
  useShortkeyDisplay,
  type Shortkey,
} from "@wondesign/key-events/shortkey";
import { clsx } from "clsx";

import { styles } from "./styles.css";

export type KeyboardProps = Omit<React.ComponentProps<"kbd">, "children"> & {
  size?: "small" | "medium" | "large";
} & (
    | {
        children: React.ReactNode;
        shortkey?: never;
      }
    | {
        children?: never;
        shortkey: Shortkey;
      }
  );

export function Keyboard({
  children,
  shortkey,
  size = "small",
  "aria-label": ariaLabel,
  className,
  ...rest
}: Readonly<KeyboardProps>) {
  const finalShortkey = shortkey ?? null;
  const result = useShortkeyDisplay(finalShortkey);

  if (shortkey && !result) {
    return null;
  }

  if (result) {
    const { keys, label } = result;

    const resolvedLabel = ariaLabel ?? label;

    if (keys.length === 1) {
      return (
        <kbd
          {...rest}
          aria-label={resolvedLabel}
          className={clsx(styles.keyboard({ size }), className)}
        >
          {keys[0]}
        </kbd>
      );
    }

    return (
      <kbd
        {...rest}
        aria-label={resolvedLabel}
        className={clsx(styles.group, className)}
      >
        {keys.map((token) => (
          <kbd
            key={token}
            aria-hidden="true"
            className={styles.keyboard({ size })}
          >
            {token}
          </kbd>
        ))}
      </kbd>
    );
  }

  return (
    <kbd
      {...rest}
      aria-label={ariaLabel}
      className={clsx(styles.keyboard({ size }), className)}
    >
      {children}
    </kbd>
  );
}
