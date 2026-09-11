import { SidebarToggle } from "./Toggle";
import { styles } from "./styles.css";

export interface SidebarSwappableToggleProps {
  children: React.ReactNode;
  toggle?: React.ReactNode;
}

export function SidebarSwappableToggle({
  children,
  toggle,
}: Readonly<SidebarSwappableToggleProps>) {
  return (
    <div className={styles.swapContainer}>
      <span className={styles.collapsedIcon}>{children}</span>
      <SidebarToggle className={styles.swapToggle}>{toggle}</SidebarToggle>
    </div>
  );
}
