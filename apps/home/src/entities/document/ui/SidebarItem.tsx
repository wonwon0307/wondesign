"use client";

import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarItem,
  SidebarItemToggle,
} from "@wondesign/ui/Sidebar";
import { Badge } from "@wondesign/ui/Texts";
import { type DocsItem } from "@wondocs/core/sidebar";

import type { DocumentGroup, DocumentPage } from "../models/sidebar";
import { styles } from "./styles.css";

interface Props {
  item: DocsItem;
}

export function DocsSidebarItem({ item }: Readonly<Props>) {
  const pathname = usePathname();

  if (item.type === "group") {
    const group = item as DocumentGroup;
    return <Group group={group} />;
  }
  if (item.type === "link") {
    const page = item as DocumentPage;
    // isActive: item 자체가 active인 경우
    const isActive = page.href === pathname;
    // isOpen: item 자체가 active이거나, 자식 중 하나라도 active인 경우
    // = pathname이 item.href로 시작하는 경우
    const defaultOpen = pathname?.startsWith(page.href);
    return (
      <PageLink page={page} isActive={isActive} defaultOpen={defaultOpen} />
    );
  }
  return null;
}

interface GroupProps {
  group: DocumentGroup;
}

function Group({ group }: Readonly<GroupProps>) {
  return (
    <SidebarGroup label={group.label}>
      {group.items?.map((item) => (
        <PageLink key={item.href} page={item} />
      ))}
    </SidebarGroup>
  );
}

interface PageProps {
  page: DocumentPage;
  isActive?: boolean;
  defaultOpen?: boolean;
}

function PageLink({ page, isActive, defaultOpen }: Readonly<PageProps>) {
  if (page.items && page.items.length > 0) {
    return (
      <SidebarItem
        defaultOpen={defaultOpen}
        isActive={isActive}
        label={page.label}
        href={page.href}
        icon={<SidebarItemToggle size={16} />}
        right={<SidebarStatus badge={page.badge} />}
        className={styles.item}
      >
        {page.items?.map((item, idx) => (
          <DocsSidebarItem key={`${item.type}-${idx}`} item={item} />
        ))}
      </SidebarItem>
    );
  }

  return (
    <SidebarItem
      isActive={isActive}
      label={page.label}
      href={page.href}
      icon={<div />}
      right={<SidebarStatus badge={page.badge} />}
      className={styles.item}
    />
  );
}

function SidebarStatus({
  badge,
}: Readonly<{
  badge: DocumentPage["badge"];
}>) {
  if (badge === "coming-soon") {
    return <Badge color="#e18115" label={badge} />;
  }
  return null;
}
