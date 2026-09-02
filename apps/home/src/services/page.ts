import { notFound, redirect, RedirectType } from "next/navigation";
import { type DocsPageData, getPage as getData } from "@wondocs/core/pages";

import type { DocsMeta } from "@/types/document";

export function getPage(collection: string, slug: string[]) {
  const path = `/${collection}/${slug.join("/")}`;

  let data: DocsPageData<DocsMeta>;

  try {
    data = getData(path);
  } catch {
    notFound();
  }

  if (data.meta.component === true) {
    redirect(`/${collection}/${slug.join("/")}/overview`, RedirectType.replace);
  }

  return data;
}
