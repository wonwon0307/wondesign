import { Hyperlink } from "@wondesign/ui/Links";
import type { DocsTocEntry } from "@wondocs/core/pages";

import { styles } from "./styles.css";

interface Props {
  items: DocsTocEntry[];
}

export function TableOfContents({ items }: Readonly<Props>) {
  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <h2>On this page</h2>
      <ul>
        {items.map((item) => (
          <li key={item.href} data-depth={item.depth}>
            <Hyperlink
              href={`#${item.href}`}
              aria-current={
                /*item.href === activeId ? "location" : */ undefined
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
