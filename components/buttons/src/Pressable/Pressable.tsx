import { Button, type ButtonProps } from "@wondesign/headless/Button";
import { clsx } from "clsx";

import { styles } from "./styles.css";

export type PressableProps = ButtonProps;

export function Pressable({
  children,
  className,
  ...rest
}: Readonly<PressableProps>) {
  return (
    <Button {...rest} className={clsx(styles.pressable, className)}>
      {children}
    </Button>
  );
}
