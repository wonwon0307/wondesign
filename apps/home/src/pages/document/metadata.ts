import type { Metadata } from "next";

import { getPageData } from "@/entities/document";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: Readonly<Props>): Promise<Metadata> {
  const { slug } = await params;

  const path = `/${slug.join("/")}`;
  const data = getPageData(path);

  if (!data?.meta) {
    return {
      title: "WonDesign",
      description: "WonDesign documentation",
    };
  }

  const { meta } = data;

  const title = meta.metaTitle ?? meta.title;

  return {
    title: `${title} | WonDesign`,
    description: meta.description,
  };
}
