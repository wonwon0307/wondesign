import { clsx } from "clsx";

import { Pressable, type PressableProps } from "@/Pressable";
import { styles } from "./styles.css";

export interface LinkButtonProps extends Omit<PressableProps, "children"> {
  children: React.ReactNode;
}

export function LinkButton({
  children,
  className,
  ...rest
}: Readonly<LinkButtonProps>) {
  return (
    <Pressable {...rest} className={clsx(styles.link, className)}>
      {children}
    </Pressable>
  );
}
