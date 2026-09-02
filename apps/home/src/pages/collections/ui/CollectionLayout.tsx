import { SidebarProvider, Sidebar, SidebarNav } from "@wondesign/ui/Sidebar";
import { getSidebar } from "@wondocs/core/sidebar";

import { DocsSidebarItem } from "@/entities/sidebar";
import { styles } from "./styles.css";

interface Props {
  params: Promise<{ collection: string }>;
  children: React.ReactNode;
}

export async function CollectionLayout({ params, children }: Readonly<Props>) {
  const { collection } = await params;

  const sidebarItems = getSidebar(collection);

  return (
    <SidebarProvider keyboardShortkey="Mod+B" defaultOpen>
      <div className={styles.container}>
        <Sidebar className={styles.sidebar}>
          <SidebarNav>
            {sidebarItems.map((item, idx) => (
              <DocsSidebarItem key={`${item.type}-${idx}`} item={item} />
            ))}
          </SidebarNav>
        </Sidebar>
        <div className={styles.contents}>{children}</div>
      </div>
    </SidebarProvider>
  );
}
