import type { ComponentType } from "react";
import { Link } from "@wondesign/ui/Buttons";

import { getPage } from "../api/page";
import { styles } from "./styles.css";

interface Props {
  params: Promise<{ collection: string; slug: string[] }>;
}

export async function DocumentPage({ params }: Readonly<Props>) {
  const { collection, slug } = await params;

  const { component, meta, toc } = getPage(collection, slug);
  const { default: Content } = (await component()) as {
    default: ComponentType;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{meta.title}</h1>
        <h3>{meta.description}</h3>
        {/*breadcrumbs*/}
      </div>
      <div className={styles.body}>
        <div className={styles.contents}>
          <Content />
        </div>
        <nav className={styles.toc} aria-label="Table of contents">
          <h2>On this page</h2>
          <ul>
            {toc.map((item) => (
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
      </div>
    </div>
  );
}
