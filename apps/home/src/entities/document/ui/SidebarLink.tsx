"use client";

import { usePathname } from "next/navigation";
import { SidebarItem, SidebarItemToggle } from "@wondesign/ui/Sidebar";
import { Badge } from "@wondesign/ui/Texts";
import { type DocsLink } from "@wondocs/core/sidebar";

import { styles } from "./styles.css";

interface Props {
  link: DocsLink;
  children?: React.ReactNode;
}

export function SidebarLink({ link, children }: Readonly<Props>) {
  const pathname = usePathname();

  // isActive: item 자체가 active인 경우
  const isActive = link.url === pathname;
  // isOpen: item 자체가 active이거나, 자식 중 하나라도 active인 경우
  // = pathname이 item.href로 시작하는 경우
  const defaultOpen = pathname?.startsWith(link.url);

  return (
    <SidebarItem
      defaultOpen={defaultOpen}
      isActive={isActive}
      label={link.label}
      href={link.url}
      icon={children ? <SidebarItemToggle size={16} /> : <div />}
      right={<SidebarStatus badge={link.right} />}
      className={styles.item}
    >
      {children}
    </SidebarItem>
  );
}

interface StatusProps {
  badge: DocsLink["right"];
}

function SidebarStatus({ badge }: Readonly<StatusProps>) {
  if (badge === "coming-soon") {
    return <Badge color="#e18115" label={badge} />;
  }
  return null;
}
