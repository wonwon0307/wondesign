import type { ComponentType } from "react";
import { Heading } from "@wondesign/ui/Texts";

import { getPage } from "@/services/page";
import { ComponentDocumentTabs } from "./tabs/tabs";
import { TableOfContents } from "./toc/toc";
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
        {meta.title && <Heading level={1}>{meta.title}</Heading>}
        {meta.description && <Heading level={3}>{meta.description}</Heading>}
        {/*breadcrumbs*/}
        {meta.type === "component" && <ComponentDocumentTabs />}
      </div>
      <div className={styles.body}>
        <div className={styles.contents}>
          <Content />
        </div>
        <TableOfContents items={toc} />
      </div>
    </div>
  );
}
