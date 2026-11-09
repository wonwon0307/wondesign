import { Spinner } from "@wondesign/loading/Spinner";
import { clsx } from "clsx";

import { Pressable, type PressableProps } from "@/Pressable/Pressable";
import { styles } from "./styles.css";

export interface ButtonProps extends Omit<PressableProps, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "destructive";
  size?: "small" | "medium" | "large";
  outlined?: boolean;
  fill?: boolean;
  fallback?: React.ReactNode;
  fallbackPosition?: "left" | "replace";
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "medium",
  outlined = false,
  fill = false,
  isDisabled = false,
  isLoading = false,
  fallback = <Spinner />,
  fallbackPosition = "replace",
  left,
  right,
  className,
  ...rest
}: Readonly<ButtonProps>) {
  const finalVariant =
    `${variant}-${outlined ? "outlined" : "filled"}` as const;

  const isReplacing = fallbackPosition === "replace" && isLoading;

  return (
    <Pressable
      {...rest}
      isDisabled={isDisabled}
      isLoading={isLoading}
      className={clsx(
        styles.formButton({
          variant: finalVariant,
          size,
          fill,
        }),
        className,
      )}
    >
      {fallbackPosition === "left" && isLoading ? (
        fallback
      ) : (
        <Slot isReplacing={isReplacing}>{left}</Slot>
      )}
      <Slot isReplacing={isReplacing}>{children}</Slot>
      {right && <Slot isReplacing={isReplacing}>{right}</Slot>}
      {isReplacing && <span className={styles.overlay}>{fallback}</span>}
    </Pressable>
  );
}

function Slot({
  children,
  isReplacing,
}: Readonly<{ children: React.ReactNode; isReplacing: boolean }>) {
  if (!children) return null;

  if (isReplacing) return <span className={styles.hide}>{children}</span>;

  return children;
}
