"use client";

import { usePathname } from "next/navigation";
import { NavList, NavLink } from "@wondesign/ui/Links";

export function ComponentDocumentTabs() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname?.endsWith(href) || pathname?.includes(`${href}/`);
  };

  return (
    <NavList>
      <NavLink href="./overview" isActive={isActive("/overview")}>
        Overview
      </NavLink>
      <NavLink href="./examples" isActive={isActive("/examples")}>
        Examples
      </NavLink>
      <NavLink href="./api" isActive={isActive("/api")}>
        API
      </NavLink>
    </NavList>
  );
}
