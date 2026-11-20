import {
  SidebarProvider,
  SidebarBody,
  SidebarNav,
} from "@wondesign/ui/sidebar";
import { getSidebar } from "@wondocs/core/sidebar";

import { SidebarItem } from "@/widgets/sidebar";
import { styles } from "./styles.css";

interface Props {
  children: React.ReactNode;
}

export function DocumentLayout({ children }: Readonly<Props>) {
  const sidebarItems = getSidebar();

  return (
    <SidebarProvider shortkey="Mod+B" defaultOpen mobileBreakpoint={1024}>
      <div className={styles.layout}>
        <SidebarBody keepMounted className={styles.sidebar}>
          <SidebarNav>
            {sidebarItems.map((item, idx) => (
              <SidebarItem key={`${item.type}-${idx}`} item={item} />
            ))}
          </SidebarNav>
        </SidebarBody>
        <div className={styles.main}>{children}</div>
      </div>
    </SidebarProvider>
  );
}
