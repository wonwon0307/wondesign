import clsx from "clsx";

import { HeadlessButton, type HeadlessButtonProps } from "@/Headless";
import { styles } from "./styles.css";

export type PressableProps = HeadlessButtonProps;

export function Pressable({
  children,
  className,
  ...rest
}: Readonly<PressableProps>) {
  return (
    <HeadlessButton {...rest} className={clsx(styles.pressable, className)}>
      {children}
    </HeadlessButton>
  );
}
