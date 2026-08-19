import { type DocsItem } from "@wondocs/core/sidebar";

import { SidebarGroup } from "./SidebarGroup";
import { SidebarLink } from "./SidebarLink";

interface Props {
  item: DocsItem;
}

export function DocsSidebarItem({ item }: Readonly<Props>) {
  if (item.type === "group") {
    return (
      <SidebarGroup group={item}>
        {item.items?.map((item, idx) => (
          <DocsSidebarItem key={`${item.type}-${idx}`} item={item} />
        ))}
      </SidebarGroup>
    );
  }
  if (item.type === "link") {
    return (
      <SidebarLink link={item}>
        {item.items?.map((item, idx) => (
          <DocsSidebarItem key={`${item.type}-${idx}`} item={item} />
        ))}
      </SidebarLink>
    );
  }

  return null;
}
