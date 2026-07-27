import { AppIcon, type IconName } from "@wondesign/icons";
import clsx from "clsx";

import { Pressable, type PressableProps } from "@/Pressable";
import { styles } from "./styles.css";

export type IconButtonProps = Omit<PressableProps, "children"> & {
  rounded?: boolean;
  ghost?: boolean;
  size?: "small" | "medium" | "large";
} & (
    | {
        children?: never;
        icon: IconName;
      }
    | {
        children: React.ReactNode;
        icon?: never;
      }
  );

export function IconButton({
  icon,
  children,
  rounded = false,
  ghost = false,
  size = "medium",
  className,
  ...rest
}: IconButtonProps) {
  return (
    <Pressable
      {...rest}
      className={clsx(styles.iconButton({ rounded, ghost, size }), className)}
    >
      {icon ? <AppIcon icon={icon} /> : children}
    </Pressable>
  );
}
