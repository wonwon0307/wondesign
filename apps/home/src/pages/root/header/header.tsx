"use client";

import { usePathname } from "next/navigation";
import { AppIcon } from "@wondesign/ui/Icons";
import { Anchor, IconLink } from "@wondesign/ui/Links";
import { Navbar, NavLink } from "@wondesign/ui/Navbar";
import { Tooltip } from "@wondesign/ui/Tooltip";

import { WonDesignLogo, GithubLogo } from "@/shared/ui/Logos";
import { styles } from "./styles.css";

export function Header() {
  const pages = [
    { label: "Primitives", href: "/primitives" },
    { label: "Components", href: "/components" },
  ];
  const pathname = usePathname();

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
          {pages.map((page) => (
            <NavLink
              key={page.href}
              href={page.href}
              isActive={pathname?.startsWith(page.href)}
            >
              {page.label}
            </NavLink>
          ))}
        </Navbar>
        <div className={styles.links}>
          <Tooltip
            text="View the source code on GitHub"
            left={<AppIcon icon="external-link" />}
            keepMounted
          >
            <IconLink
              href="https://github.com/wonwon0307/wondesign"
              openInNewTab
            >
              <GithubLogo />
            </IconLink>
          </Tooltip>
          <Tooltip text="Read my blog" left={<AppIcon icon="external-link" />}>
            <IconLink href="https://justwon.dev" openInNewTab>
              BlogLink
            </IconLink>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
