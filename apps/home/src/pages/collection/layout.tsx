import { SidebarProvider, Sidebar, SidebarNav } from "@wondesign/ui/Sidebar";
import { getSidebar, type DocsItem } from "@wondocs/core/sidebar";

import { SidebarGroup } from "./sidebar/group";
import { SidebarLink } from "./sidebar/link";
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
              <SidebarItem key={`${item.type}-${idx}`} item={item} />
            ))}
          </SidebarNav>
        </Sidebar>
        <div className={styles.contents}>{children}</div>
      </div>
    </SidebarProvider>
  );
}

interface ItemProps {
  item: DocsItem;
}

function SidebarItem({ item }: Readonly<ItemProps>) {
  if (item.type === "group") {
    return (
      <SidebarGroup group={item}>
        {item.items?.map((item, idx) => (
          <SidebarItem key={`${item.type}-${idx}`} item={item} />
        ))}
      </SidebarGroup>
    );
  }
  if (item.type === "link") {
    return (
      <SidebarLink link={item}>
        {item.items?.map((item, idx) => (
          <SidebarItem key={`${item.type}-${idx}`} item={item} />
        ))}
      </SidebarLink>
    );
  }

  return null;
}
