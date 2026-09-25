import {
  getPage,
  getPageChildren,
  type DocsPageData,
} from "@wondocs/core/pages";

import type { DocsMeta, DocumentPageData, TabEntry } from "../models/page";

export function getPageData(path: string): DocumentPageData | null {
  let data: DocsPageData<DocsMeta>;

  try {
    data = getPage<DocsMeta>(path);
  } catch {
    return null;
  }

  if (data.meta) {
    let tabs: TabEntry[] = [];
    if (data.meta.type === "tabs") {
      const children = getPageChildren<DocsMeta>(path);

      tabs = children.map((child) => ({
        slug: child.url.slice(child.url.lastIndexOf("/") + 1),
        url: child.url,
      }));
    }

    // meta가 있으면, 그대로 반환
    return {
      ...data,
      meta: data.meta,
      tabs,
    };
  }

  // meta가 없으면, implicitly tabs라는것을 의미
  // 부모로부터 meta를 가져온다
  const parentPath = path.slice(0, path.lastIndexOf("/"));
  let parentMeta: DocsMeta | null;

  try {
    const { meta } = getPage<DocsMeta>(parentPath);
    parentMeta = meta;
  } catch {
    parentMeta = null;
  }

  if (parentMeta?.type === "tabs") {
    const siblings = getPageChildren<DocsMeta>(parentPath);

    return {
      component: data.component,
      meta: {
        title: parentMeta.title,
        description: parentMeta.description,
        metaTitle: parentMeta.metaTitle,
        // drop type
      },
      toc: data.toc,
      tabs: siblings.map((child) => ({
        slug: child.url.slice(child.url.lastIndexOf("/") + 1),
        url: child.url,
      })),
    };
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `No meta found for "${path}". Pages without frontmatter are treated as an implicit tab, ` +
        `but its parent "${parentPath}" does not exist or is not configured as a tabs page.`,
    );
  }
  return null;
}
