import { AppIcon, type IconName } from "@wondesign/icons";
import clsx from "clsx";

import { Anchor, type AnchorProps } from "@/Anchor";
import { styles } from "./styles.css";

export type IconLinkProps = Omit<AnchorProps, "children"> & {
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

export function IconLink({
  icon,
  children,
  rounded = false,
  ghost = false,
  size = "medium",
  className,
  ...rest
}: IconLinkProps) {
  return (
    <Anchor
      {...rest}
      className={clsx(styles.iconButton({ rounded, ghost, size }), className)}
    >
      {icon ? <AppIcon icon={icon} /> : children}
    </Anchor>
  );
}
