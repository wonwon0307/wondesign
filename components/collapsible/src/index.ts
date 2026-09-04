import { CollapsibleProvider } from "./Provider";
import { CollapsibleContent } from "./Content";
import { CollapsibleToggle } from "./Toggle";

export const Collapsible = Object.assign(CollapsibleProvider, {
  Toggle: CollapsibleToggle,
  Content: CollapsibleContent,
});

export { CollapsibleContent } from "./Content";
export { CollapsibleToggle } from "./Toggle";
export { CollapsibleProvider } from "./Provider";

// types
export type { CollapsibleProps } from "./Provider";
export type { CollapsibleToggleProps } from "./Toggle";
export type { CollapsibleContentProps } from "./Content";
