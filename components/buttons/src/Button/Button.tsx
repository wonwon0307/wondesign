import { clsx } from "clsx";

import { Pressable, type PressableProps } from "@/Pressable";
import { styles } from "./styles.css";

export interface ButtonProps extends Omit<PressableProps, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "destructive";
  size?: "small" | "large" | "fill";
  outlined?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "large",
  outlined = false,
  isDisabled = false,
  isLoading = false,
  className,
  ...rest
}: Readonly<ButtonProps>) {
  return (
    <Pressable
      {...rest}
      isDisabled={isDisabled}
      isLoading={isLoading}
      className={clsx(
        styles.formButton({
          variant,
          size,
          outlined,
        }),
        className,
      )}
    >
      {children}
    </Pressable>
  );
}
