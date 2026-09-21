import { notFound, redirect, RedirectType } from "next/navigation";
import {
  getPage,
  getPageChildren,
  type DocsPageData,
} from "@wondocs/core/pages";

import {
  type DocsMeta,
  type DocumentPageData,
  TAB_ORDER,
} from "../models/page";

export function getPageData(
  collection: string,
  slug: string[],
): DocumentPageData {
  const path = `/${collection}/${slug.join("/")}`;

  let data: DocsPageData<DocsMeta>;

  try {
    data = getPage(path);
  } catch {
    notFound();
  }

  // tabs 유형이라면, 기본 탭으로 리디렉트한다
  // 만약, 기본 탭이 없다면 404 페이지로 이동
  if (data.meta.type === "tabs") {
    const children = getPageChildren<DocsMeta>(path);
    const defaultTab = TAB_ORDER.map((tabSlug) =>
      children.find((child) => child.url.endsWith(`/${tabSlug}`)),
    ).find((child) => child !== undefined);

    if (!defaultTab) notFound();

    redirect(defaultTab.url, RedirectType.replace);
  }

  if (slug.length >= 2) {
    const parentPath = `/${collection}/${slug.slice(0, -1).join("/")}`;

    try {
      const parentData = getPage<DocsMeta>(parentPath);
      if (parentData.meta.type === "tabs") {
        const children = getPageChildren<DocsMeta>(parentPath);
        return {
          component: data.component,
          meta: parentData.meta,
          toc: data.toc,
          tabs: children.map((child) => ({
            slug: child.url.slice(child.url.lastIndexOf("/") + 1),
            url: child.url,
          })),
        };
      }
    } catch {
      // parent 페이지가 없으면
      // 그냥 무시하고 넘어간다
    }
  }

  return data;
}
