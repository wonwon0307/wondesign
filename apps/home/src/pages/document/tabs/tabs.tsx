"use client";

import { usePathname } from "next/navigation";
import { Anchor } from "@wondesign/ui/Links";

import { styles } from "./styles.css";

export function ComponentDocumentTabs() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname?.endsWith(href) || pathname?.includes(`${href}/`);
  };

  return (
    <div className={styles.tabs}>
      <Anchor href="./overview" isDisabled={isActive("/overview")}>
        Overview
      </Anchor>
      <Anchor href="./examples" isDisabled={isActive("/examples")}>
        Examples
      </Anchor>
      <Anchor href="./api" isDisabled={isActive("/api")}>
        API
      </Anchor>
    </div>
  );
}
