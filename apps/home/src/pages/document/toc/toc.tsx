import { Link } from "@wondesign/ui/Buttons";
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
            <Link
              href={`#${item.href}`}
              aria-current={
                /*item.href === activeId ? "location" : */ undefined
              }
            >
              {item.value}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
