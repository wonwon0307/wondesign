import { notFound, redirect, RedirectType } from "next/navigation";
import { Heading, Description } from "@wondesign/ui/texts";

import { DocumentTabs, DocumentTOC } from "@/widgets/document";
import { getPageData } from "@/entities/document";
import { mdxComponents } from "./mdx";
import { styles } from "./styles.css";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function DocumentPage({ params }: Readonly<Props>) {
  const { slug } = await params;

  const path = `/${slug.join("/")}`;
  const data = getPageData(path);

  if (!data) {
    notFound();
  }

  const { component, meta, toc, tabs } = data;

  if (meta.type === "tabs") {
    if (!tabs || tabs.length === 0) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`No children documents found for a tabs page "${path}".`);
      }
      notFound();
    }

    // tabs 중에 "overview가 있으면, 그것이 default, 아니면 첫 번째 탭이 default"
    const defaultTab = tabs.find((tab) => tab.slug === "overview") ?? tabs[0];

    redirect(defaultTab.url, RedirectType.replace);
  }

  const { default: Content } = await component();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        {meta.title && <Heading level={1}>{meta.title}</Heading>}
        {meta.description && (
          <Description className={styles.description}>
            {meta.description}
          </Description>
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
