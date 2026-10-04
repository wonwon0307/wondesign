import { AppIcon, type IconName } from "@wondesign/icons";
import { clsx } from "clsx";

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
  const iconSize = () => {
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 32;
      default:
        return 24;
    }
  };

  return (
    <Anchor
      {...rest}
      className={clsx(styles.iconlink({ rounded, ghost, size }), className)}
    >
      {icon ? <AppIcon icon={icon} size={iconSize()} /> : children}
    </Anchor>
  );
}
