import { AppIcon } from "@wondesign/icons";

import { SidebarItemWrapper } from "../fragments/Wrapper";
import { SidebarItemHeader } from "../fragments/Header";
import { SidebarItemSubitems } from "../fragments/Subitems";
import { SidebarItemToggle } from "../fragments/Toggle";
import { styles } from "./styles.css";

export interface SidebarGroupProps {
  children: React.ReactNode;
  label: string;
  right?: React.ReactNode;
  defaultOpen?: boolean;
}

export function SidebarGroup({
  children,
  label,
  right,
  defaultOpen,
}: Readonly<SidebarGroupProps>) {
  return (
    <SidebarItemWrapper
      variant="collapsible"
      collapsedBehavior="flatten"
      defaultOpen={defaultOpen}
      as="auto-detect"
      className={styles.wrapper}
    >
      <SidebarItemHeader className={styles.header}>
        <div className={styles.headerLeft}>
          <span>{label}</span>
          <AppIcon icon="chevron-right" className={styles.icon} />
        </div>
        <div className={styles.headerRight}>{right}</div>
        <SidebarItemToggle
          aria-label={`Toggle ${label} subitems`}
          stretch
          className={styles.toggle}
        />
      </SidebarItemHeader>
      <SidebarItemSubitems as="ul" className={styles.subitems}>
        {children}
      </SidebarItemSubitems>
    </SidebarItemWrapper>
  );
}
