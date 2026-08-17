import { redirect, RedirectType } from "next/navigation";
import { getSidebar, type DocsLink } from "@wondocs/core/sidebar";

interface Props {
  params: Promise<{ collection: string }>;
}

export async function CollectionRedirect({ params }: Props) {
  // collection의 index에 접근했을 때, 첫번째 페이지로 리디렉트 시켜줄 로직
  const { collection } = await params;

  const sidebarItems = getSidebar(collection);

  // Ensure First Item in meta.json is always a link
  const firstItem = sidebarItems[0] as DocsLink;

  redirect(firstItem.href, RedirectType.replace);
}
