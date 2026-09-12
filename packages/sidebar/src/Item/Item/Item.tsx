import { AppIcon } from "@wondesign/icons";

import { useSidebar } from "@/contexts/sidebar";
import { SidebarItemWrapper } from "../fragments/Wrapper";
import { SidebarItemSubitems } from "../fragments/Subitems";
import { SidebarItemToggle } from "../fragments/Toggle";
import { SidebarItemLink, type SidebarItemLinkProps } from "./ItemLink";
import { styles } from "./styles.css";

export interface SidebarItemProps extends Omit<
  SidebarItemLinkProps,
  "ref" | "right" | "className" | "style"
> {
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

export function SidebarItem({
  children,
  defaultOpen,
  ...linkProps
}: Readonly<SidebarItemProps>) {
  const { state } = useSidebar();
  const { label, isActive, isDisabled } = linkProps;

  return (
    <SidebarItemWrapper
      as="auto-detect"
      collapsedBehavior="hide-children"
      defaultOpen={defaultOpen}
      className={styles.wrapper}
    >
      <SidebarItemLink
        {...linkProps}
        right={children ? <Toggle label={label} /> : undefined}
        className={styles.item({
          isActive,
          isDisabled,
          collapsed: state === "collapsed",
        })}
      />
      <SidebarItemSubitems as="ul" className={styles.subitems}>
        {children}
      </SidebarItemSubitems>
    </SidebarItemWrapper>
  );
}

function Toggle({ label }: Readonly<Pick<SidebarItemProps, "label">>) {
  return (
    <SidebarItemToggle
      className={styles.toggle}
      aria-label={`Toggle ${label} subitems`}
    >
      <AppIcon size={16} icon="chevron-right" className={styles.toggleIcon} />
    </SidebarItemToggle>
  );
}
