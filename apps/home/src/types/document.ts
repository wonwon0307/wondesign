import { type DocsFrontmatter } from "@wondocs/core/pages";

export interface DocsMeta extends DocsFrontmatter {
  redirect?: string;
  type?: string;
}
