import type { Metadata } from "next";

import { getPage } from "../api/page";

interface Props {
  params: Promise<{ collection: string; slug: string[] }>;
}

export async function generateMetadata({
  params,
}: Readonly<Props>): Promise<Metadata> {
  const { collection, slug } = await params;

  const { meta } = getPage(collection, slug);

  return {
    title: meta.title,
    description: meta.description,
  };
}
