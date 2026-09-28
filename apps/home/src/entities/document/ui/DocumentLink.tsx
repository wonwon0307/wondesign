"use client";

import { usePathname } from "next/navigation";
import { SidebarItem, SidebarItemToggle } from "@wondesign/sidebar/Item";
import { Badge } from "@wondesign/ui/Texts";
import { type DocsLink } from "@wondocs/core/sidebar";

import { styles } from "./styles.css";

interface Props {
  link: DocsLink;
  children?: React.ReactNode;
}

export function DocumentLink({ link, children }: Readonly<Props>) {
  const pathname = usePathname();
  const isExactMatch = pathname === link.url;
  const startsWithUrl = isExactMatch || pathname?.startsWith(link.url + "/");

  // isActive: children이 있으면 정확히 일치해야 active, 없으면 startsWith만 해도 active
  const isActive = link.items ? isExactMatch : startsWithUrl;

  return (
    <SidebarItem
      defaultOpen={startsWithUrl}
      isActive={isActive}
      isDisabled={link.disabled}
      label={link.label}
      href={link.url}
      icon={
        children ? (
          <SidebarItemToggle
            className={styles.toggle}
            aria-label={`Toggle ${link.label} subitems`}
          />
        ) : (
          <div />
        )
      }
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
  if (badge === "Coming Soon") {
    return <Badge color="#e18115" label={badge} />;
  }
  if (badge === "Internal") {
    return <Badge color="#6c757d" label={badge} />;
  }
  return null;
}
