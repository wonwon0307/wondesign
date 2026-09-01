import type { ComponentType } from "react";

import { getPage } from "../api/page";

interface Props {
  params: Promise<{ collection: string; slug: string[] }>;
}

export async function DocumentPage({ params }: Readonly<Props>) {
  const { collection, slug } = await params;

  const { component } = getPage(collection, slug);
  const { default: Content } = (await component()) as {
    default: ComponentType;
  };

  return <Content />;
}
