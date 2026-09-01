import { notFound } from "next/navigation";
import { getPage as getData } from "@wondocs/core/pages";

export function getPage(collection: string, slug: string[]) {
  const path = `/${collection}/${slug.join("/")}`;

  try {
    return getData(path);
  } catch {
    notFound();
  }
}
