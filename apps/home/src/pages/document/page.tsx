import type { ComponentType } from "react";

import { getPage } from "@/services/page";
import { styles } from "./styles.css";
import { DocumentHeader } from "./header/header";
import { TableOfContents } from "./toc/toc";

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
      <DocumentHeader meta={meta} />
      <div className={styles.body}>
        <div className={styles.contents}>
          <Content />
        </div>
        <TableOfContents items={toc} />
      </div>
    </div>
  );
}
