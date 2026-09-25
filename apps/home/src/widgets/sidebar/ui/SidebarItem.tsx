import { SidebarGroup } from "@wondesign/sidebar/Item";
import { type DocsItem } from "@wondocs/core/sidebar";

import { DocumentLink } from "@/entities/document";

interface Props {
  item: DocsItem;
}

export function SidebarItem({ item }: Readonly<Props>) {
  if (item.type === "group") {
    return (
      <SidebarGroup label={item.label}>
        {item.items?.map((item, idx) => (
          <SidebarItem key={`${item.type}-${idx}`} item={item} />
        ))}
      </SidebarGroup>
    );
  }

  if (item.type === "link") {
    return (
      <DocumentLink link={item}>
        {item.items?.map((item, idx) => (
          <SidebarItem key={`${item.type}-${idx}`} item={item} />
        ))}
      </DocumentLink>
    );
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn(`Unknown sidebar item type: ${item.type}`, item);
  }

  return null;
}
