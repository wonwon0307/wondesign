import {
  CollapsibleToggle,
  type CollapsibleToggleProps,
} from "@wondesign/headless/Collapsible";
import { AppIcon } from "@wondesign/icons";
import { clsx } from "clsx";

import { useSidebarInternal } from "@/contexts/sidebar";
import { styles } from "./styles.css";

export function SidebarItemToggle({
  children = <DefaultToggle />,
  className,
  ...rest
}: Readonly<CollapsibleToggleProps>) {
  const { state } = useSidebarInternal();

  if (state !== "expanded") {
    return null;
  }

  return (
    <CollapsibleToggle {...rest} className={clsx(styles.toggle, className)}>
      {children}
    </CollapsibleToggle>
  );
}

function DefaultToggle() {
  return (
    <AppIcon size={16} icon="chevron-right" className={styles.defaultIcon} />
  );
}
