export const dynamicParams = false;

export function generateStaticParams() {
  return [{ collection: "primitives" }, { collection: "components" }];
}

export { CollectionLayout as default } from "@/pages/collections";
