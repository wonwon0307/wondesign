import { SidebarProvider, Sidebar, SidebarNav } from "@wondesign/ui/Sidebar";
import { getSidebar } from "@wondocs/core/sidebar";

import { DocsSidebarItem } from "@/entities/document";
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
        <Sidebar>
          <SidebarNav>
            {sidebarItems.map((item, idx) => (
              <DocsSidebarItem key={`${item.type}-${idx}`} item={item} />
            ))}
          </SidebarNav>
        </Sidebar>
        {children}
      </div>
    </SidebarProvider>
  );
}
