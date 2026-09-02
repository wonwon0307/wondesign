import { type DocsFrontmatter } from "@wondocs/core/pages";

export interface DocsMeta extends DocsFrontmatter {
  component?: boolean;
}
