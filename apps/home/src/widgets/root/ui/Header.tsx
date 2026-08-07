"use client";

import { usePathname } from "next/navigation";
import { Anchor, IconLink, TabLink } from "@wondesign/ui/Buttons";
import { AppIcon } from "@wondesign/ui/Icons";
import { Text } from "@wondesign/ui/Texts";
import { Tooltip } from "@wondesign/ui/Tooltip";

import { WonDesignLogo, GithubLogo } from "@/shared/ui/Logos";
import { styles } from "./styles.css";

export function Header() {
  const pages = [
    { label: "Primitives", href: "/design-primitives" },
    { label: "Design System", href: "/design-system" },
    { label: "Colors", href: "/colors" },
  ];
  const pathname = usePathname();

  return (
    <header role="banner" className={styles.header}>
      <div className={styles.headerLeft}>
        <Anchor href="/" className={styles.homeLink}>
          <WonDesignLogo />
          <Text variant="hero" className={styles.homeText}>
            WonDesign
          </Text>
        </Anchor>
      </div>
      <nav
        className={styles.tabs}
        role="navigation"
        aria-label="Main Tab Navigation"
      >
        {pages.map((page) => (
          <TabLink
            key={page.href}
            href={page.href}
            isActive={pathname?.startsWith(page.href)}
          >
            {page.label}
          </TabLink>
        ))}
      </nav>
      <div className={styles.headerRight}>
        <Tooltip
          text="View the source code on GitHub"
          left={<AppIcon icon="external-link" />}
        >
          <IconLink href="https://github.com/wonwon0307/wondesign" isExternal>
            <GithubLogo />
          </IconLink>
        </Tooltip>
        <Tooltip text="Read my blog" left={<AppIcon icon="external-link" />}>
          <IconLink href="https://justwon.dev" isExternal>
            BlogLink
          </IconLink>
        </Tooltip>
      </div>
    </header>
  );
}
