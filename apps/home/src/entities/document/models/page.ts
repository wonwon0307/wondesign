import type { DocsFrontmatter, DocsPageData } from "@wondocs/core/pages";

export interface DocsMeta extends DocsFrontmatter {
  metaTitle?: string;
  type?: string;
}

export interface TabEntry {
  slug: string;
  url: string;
}

export interface DocumentPageData extends DocsPageData<DocsMeta> {
  tabs?: TabEntry[];
}
