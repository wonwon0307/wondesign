import { SidebarProvider } from "@wondesign/sidebar";
import { SidebarBody } from "@wondesign/sidebar/Body";
import { SidebarNav } from "@wondesign/sidebar/Nav";
import { getSidebar } from "@wondocs/core/sidebar";

import { SidebarItem } from "@/widgets/sidebar";
import { styles } from "./styles.css";

interface Props {
  params: Promise<{ collection: string }>;
  children: React.ReactNode;
}

export async function CollectionLayout({ params, children }: Readonly<Props>) {
  const { collection } = await params;

  const sidebarItems = getSidebar(collection);

  return (
    <SidebarProvider shortkey="Mod+B" defaultOpen>
      <div className={styles.container}>
        <SidebarBody keepMounted className={styles.sidebar}>
          <SidebarNav>
            {sidebarItems.map((item, idx) => (
              <SidebarItem key={`${item.type}-${idx}`} item={item} />
            ))}
          </SidebarNav>
        </SidebarBody>
        <div className={styles.contents}>{children}</div>
      </div>
    </SidebarProvider>
  );
}
