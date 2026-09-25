"use client";

import { Hyperlink } from "@wondesign/ui/Links";
import { Heading } from "@wondesign/ui/Texts";
import type { DocsTocEntry } from "@wondocs/core/pages";

import { useActiveHeading } from "../lib/useActiveHeading";
import { styles } from "./styles.css";

interface Props {
  items: DocsTocEntry[];
}

export function DocumentTOC({ items }: Readonly<Props>) {
  const activeId = useActiveHeading(items.map((item) => item.href));

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <Heading level={4} className={styles.heading}>
        On this page
      </Heading>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.href} data-depth={item.depth}>
            <Hyperlink
              href={item.href}
              appearance="muted"
              className={styles.link({ depth: item.depth })}
              aria-current={
                item.href.slice(1) === activeId ? "location" : undefined
              }
            >
              {item.value}
            </Hyperlink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
