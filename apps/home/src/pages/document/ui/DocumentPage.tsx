import { Heading } from "@wondesign/ui/Texts";

import { DocumentTabs, DocumentTOC } from "@/widgets/document";
import { getPageData } from "@/entities/document";
import { mdxComponents } from "./mdx";
import { styles } from "./styles.css";

interface Props {
  params: Promise<{ collection: string; slug: string[] }>;
}

export async function DocumentPage({ params }: Readonly<Props>) {
  const { collection, slug } = await params;

  const { component, meta, toc, tabs } = getPageData(collection, slug);
  const { default: Content } = await component();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {meta.title && <Heading level={1}>{meta.title}</Heading>}
        {meta.description && (
          <Heading level={4} className={styles.description}>
            {meta.description}
          </Heading>
        )}
        {/*breadcrumbs*/}
        {tabs && <DocumentTabs tabs={tabs} />}
      </div>
      <div className={styles.body}>
        <div className={styles.contents}>
          <Content components={mdxComponents} />
        </div>
        <DocumentTOC items={toc} />
      </div>
    </div>
  );
}
