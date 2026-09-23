export const dynamicParams = false;

export function generateStaticParams() {
  return [{ collection: "foundations" }, { collection: "components" }];
}

export { CollectionLayout as default } from "@/pages/collection/layout";
