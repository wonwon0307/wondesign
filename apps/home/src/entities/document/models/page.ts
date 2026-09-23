import type {
  DocsFrontmatter,
  DocsMdxModule,
  DocsTocEntry,
} from "@wondocs/core/pages";

export interface DocsMeta extends DocsFrontmatter {
  metaTitle?: string;
  type?: string;
}

export interface TabEntry {
  slug: string;
  url: string;
}

export interface DocumentPageData {
  component: () => Promise<DocsMdxModule>;
  meta: DocsMeta;
  toc: DocsTocEntry[];
  tabs?: TabEntry[];
}

export const TAB_LABELS: Record<string, string> = {
  overview: "Overview",
  examples: "Examples",
  api: "API",
  changelog: "Changelog",
};

export const TAB_ORDER = Object.keys(TAB_LABELS);
