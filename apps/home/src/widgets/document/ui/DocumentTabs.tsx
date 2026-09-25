"use client";

import { usePathname } from "next/navigation";
import { Navbar, NavLink } from "@wondesign/ui/Navbar";

import type { TabEntry } from "@/entities/document";
import { capitalize } from "@/shared/lib/capitalize";

interface Props {
  tabs: TabEntry[];
}

export function DocumentTabs({ tabs }: Readonly<Props>) {
  const pathname = usePathname();

  const sortedTabs = [...tabs].sort(compareTabs);

  const toLabel = (tabName: string) => {
    if (tabName === "api") return "API";

    return capitalize(tabName);
  };

  return (
    <Navbar aria-label="Document Tabs">
      {sortedTabs.map((tab) => (
        <NavLink key={tab.url} href={tab.url} isActive={pathname === tab.url}>
          {toLabel(tab.slug)}
        </NavLink>
      ))}
    </Navbar>
  );
}

function compareTabs(a: TabEntry, b: TabEntry) {
  const order = ["overview", "examples", "api"];
  const indexA = order.indexOf(a.slug);
  const indexB = order.indexOf(b.slug);

  if (indexA !== -1 && indexB !== -1) {
    return indexA - indexB;
  }
  if (indexA !== -1) return -1;
  if (indexB !== -1) return 1;
  return a.slug.localeCompare(b.slug);
}
