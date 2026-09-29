import { SidebarToggle } from "./Toggle";
import { styles } from "./styles.css";

export interface SwappableToggleProps {
  children: React.ReactNode;
  toggle?: React.ReactNode;
}

export function SwappableToggle({
  children,
  toggle,
}: Readonly<SwappableToggleProps>) {
  return (
    <div className={styles.swapContainer}>
      <span className={styles.collapsedIcon}>{children}</span>
      <SidebarToggle className={styles.swapToggle}>{toggle}</SidebarToggle>
    </div>
  );
}
