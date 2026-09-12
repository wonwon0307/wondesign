"use client";

import { usePathname } from "next/navigation";
import { Navbar, NavLink } from "@wondesign/ui/Navbar";

export function ComponentDocumentTabs() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname?.endsWith(href) || pathname?.includes(`${href}/`);
  };

  return (
    <Navbar aria-label="Document Tabs">
      <NavLink href="./overview" isActive={isActive("/overview")}>
        Overview
      </NavLink>
      <NavLink href="./examples" isActive={isActive("/examples")}>
        Examples
      </NavLink>
      <NavLink href="./api" isActive={isActive("/api")}>
        API
      </NavLink>
    </Navbar>
  );
}
