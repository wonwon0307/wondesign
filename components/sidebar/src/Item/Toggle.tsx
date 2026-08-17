import {
  CollapsibleToggle,
  type CollapsibleToggleProps,
} from "@wondesign/headless-ui/Collapsible";
import { AppIcon } from "@wondesign/icons";
import clsx from "clsx";

import { styles } from "./styles.css";

export interface SidebarItemToggleProps extends CollapsibleToggleProps {
  size?: number;
}

export function SidebarItemToggle({
  size = 16,
  className,
  ...rest
}: Readonly<SidebarItemToggleProps>) {
  return (
    <CollapsibleToggle {...rest} className={clsx(styles.toggle, className)}>
      <AppIcon size={size} icon="chevron-right" className={styles.toggleIcon} />
    </CollapsibleToggle>
  );
}
