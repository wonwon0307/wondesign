"use client";

import { usePathname } from "next/navigation";
import { Navbar, NavLink } from "@wondesign/ui/Navbar";

import { TAB_LABELS, TAB_ORDER, type TabEntry } from "@/entities/document";

interface Props {
  tabs: TabEntry[];
}

export function DocumentTabs({ tabs }: Readonly<Props>) {
  const pathname = usePathname();

  const sortedTabs = [...tabs].sort(
    (a, b) => TAB_ORDER.indexOf(a.slug) - TAB_ORDER.indexOf(b.slug),
  );

  return (
    <Navbar aria-label="Document Tabs">
      {sortedTabs.map((tab) => (
        <NavLink key={tab.url} href={tab.url} isActive={pathname === tab.url}>
          {TAB_LABELS[tab.slug] ?? tab.slug}
        </NavLink>
      ))}
    </Navbar>
  );
}
