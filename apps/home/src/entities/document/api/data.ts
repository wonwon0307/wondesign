import {
  getPage,
  getPageChildren,
  type DocsPageData,
} from "@wondocs/core/pages";

import type { DocsMeta, DocumentPageData } from "../models/page";

export function getPageData(
  collection: string,
  slug: string[],
): DocumentPageData | null {
  const path = `/${collection}/${slug.join("/")}`;
  let data: DocsPageData<DocsMeta>;

  try {
    data = getPage<DocsMeta>(path);
  } catch {
    return null;
  }

  if (data.meta.type === "tabs") {
    const children = getPageChildren<DocsMeta>(path);

    return {
      ...data,
      tabs: children.map((child) => ({
        slug: child.url.slice(child.url.lastIndexOf("/") + 1),
        url: child.url,
      })),
    };
  }

  if (data.meta) {
    // meta가 있으면, 그대로 반환
    return data;
  }

  // meta가 없으면, implicitly tabs라는것을 의미
  // 부모로부터 meta를 가져온다
  const parentPath = `/${collection}/${slug.slice(0, -1).join("/")}`;
  let parentMeta: DocsMeta;

  try {
    const { meta } = getPage<DocsMeta>(parentPath);
    parentMeta = meta;
  } catch {
    return data;
  }

  if (parentMeta.type !== "tabs") {
    return data;
  }

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
