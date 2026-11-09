import { AppIcon, type IconName } from "@wondesign/icons";
import { clsx } from "clsx";

import { Anchor, type AnchorProps } from "@/Anchor/Anchor";
import { styles } from "./styles.css";

export type IconLinkProps = Omit<AnchorProps, "children"> & {
  appearance?: "filled" | "outlined" | "ghost";
  size?: string | number;
  rounded?: boolean;
  spacious?: boolean;
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
  appearance = "outlined",
  rounded = false,
  spacious = false,
  size = "1em",
  className,
  ...rest
}: Readonly<IconLinkProps>) {
  return (
    <Anchor
      {...rest}
      className={clsx(
        styles.iconlink({ appearance, rounded, spacious }),
        className,
      )}
    >
      {icon ? <AppIcon icon={icon} size={size} /> : children}
    </Anchor>
  );
}
