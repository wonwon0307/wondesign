export interface UseArrowNavigationOptions {
  /** Selector used to collect navigable items within the container, e.g. `'[role="tab"]:not([aria-disabled="true"])'`. */
  itemSelector: string;
  enabled?: boolean;
  /** Arrow key axis. `"horizontal"` uses Left/Right, `"vertical"` uses Up/Down. Home/End always jump to the first/last item. Defaults to `"horizontal"`. */
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
}

export type Direction = "next" | "prev" | "first" | "last";
