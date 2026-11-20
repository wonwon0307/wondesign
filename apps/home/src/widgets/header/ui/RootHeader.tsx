"use client";

import { usePathname } from "next/navigation";
import { AppIcon } from "@wondesign/ui/icons";
import { Anchor, IconLink } from "@wondesign/ui/links";
import { Navbar, NavLink } from "@wondesign/ui/navbar";
import { Tooltip } from "@wondesign/ui/tooltip";

import { WonDesignLogo, GithubLogo } from "@/shared/ui/Logos";
import { styles } from "./styles.css";

export function RootHeader() {
  const pathname = usePathname();
  const isDocsActive =
    pathname && pathname !== "/" && !pathname.startsWith("/colors");

  return (
    <header role="banner" className={styles.header}>
      <div className={styles.headerLeft}>
        <Anchor href="/" className={styles.homeLink}>
          <WonDesignLogo size={32} />
          <span className={styles.homeText}>WonDesign</span>
        </Anchor>
      </div>
      <div className={styles.headerRight}>
        <Navbar aria-label="Main Tab Navigation" className={styles.tabs}>
          <NavLink href="/introduction" isActive={isDocsActive || false}>
            Documentation
          </NavLink>
        </Navbar>
        <div className={styles.links}>
          <Tooltip
            text="View the source code on GitHub"
            left={<AppIcon icon="external-link" />}
            keepMounted
          >
            <IconLink
              href="https://github.com/wonwon0307/wondesign"
              appearance="ghost"
              aria-label="GitHub"
            >
              <GithubLogo />
            </IconLink>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
