import type { Metadata } from "next";

import { getPageData } from "@/entities/document";
import { capitalize } from "@/shared/lib/capitalize";

interface Props {
  params: Promise<{ collection: string; slug: string[] }>;
}

export async function generateMetadata({
  params,
}: Readonly<Props>): Promise<Metadata> {
  const { collection, slug } = await params;

  const data = getPageData(collection, slug);

  if (!data?.meta) {
    return {
      title: "WonDesign",
      description: "WonDesign documentation",
    };
  }

  const { meta } = data;

  const title = meta.metaTitle ?? meta.title;

  return {
    title: `${title} | ${capitalize(collection)} | WonDesign`,
    description: meta.description,
  };
}
