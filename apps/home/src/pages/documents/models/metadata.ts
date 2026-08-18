import type { Metadata } from "next";
import { getPage } from "@wondocs/core/page";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: Readonly<Props>): Promise<Metadata> {
  const { slug } = await params;

  const { meta } = getPage(slug.join("/"));

  return {
    title: meta.title,
    description: meta.description,
  };
}
