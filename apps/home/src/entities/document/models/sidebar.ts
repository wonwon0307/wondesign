import type { DocsGroup, DocsLink } from "@wondocs/core/sidebar";

// Only use a few properties in this app and re-define items property (no groups as items)
export interface DocumentGroup extends Pick<DocsGroup, "type" | "label"> {
  items?: DocumentPage[];
}

// Drop the unused properties in this app, and re-define items property (no groups as items)
export interface DocumentPage extends Omit<DocsLink, "icon" | "defaultOpen"> {
  items?: DocumentPage[];
}
