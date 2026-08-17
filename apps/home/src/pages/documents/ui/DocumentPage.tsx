import type { ComponentType } from "react";
import { getPage } from "@wondocs/core/page";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function DocumentPage({ params }: Readonly<Props>) {
  const { slug } = await params;

  const { component } = getPage(slug.join("/"));
  const { default: Content } = (await component()) as {
    default: ComponentType;
  };

  return <Content />;
}
