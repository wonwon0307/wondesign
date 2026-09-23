import type { Metadata } from "next";

import { getPageData } from "@/entities/document";

interface Props {
  params: Promise<{ collection: string; slug: string[] }>;
}

export async function generateMetadata({
  params,
}: Readonly<Props>): Promise<Metadata> {
  const { collection, slug } = await params;

  const { meta } = getPageData(collection, slug);
  const collectionName =
    collection.charAt(0).toUpperCase() + collection.slice(1);

  return {
    title: `${meta.title} | ${collectionName} | WonDesign`,
    description: meta.description,
  };
}
