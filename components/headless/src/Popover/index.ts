import { PopoverProvider } from "./Provider";
import { PopoverContent } from "./Content";
import { PopoverTitle } from "./Title";
import { PopoverClose } from "./Close";
import { PopoverArrow } from "./Arrow";
import { PopoverTrigger } from "./Trigger";

export const Popover = Object.assign(PopoverProvider, {
  Content: PopoverContent,
  Title: PopoverTitle,
  Close: PopoverClose,
  Arrow: PopoverArrow,
  Trigger: PopoverTrigger,
});

export { usePopover } from "./contexts";

export { PopoverProvider } from "./Provider";
export { PopoverContent } from "./Content";
export { PopoverTitle } from "./Title";
export { PopoverClose } from "./Close";
export { PopoverArrow } from "./Arrow";
export { PopoverTrigger } from "./Trigger";

export type { PopoverProps } from "./Provider";
export type { PopoverContentProps } from "./Content";
export type { PopoverTitleProps } from "./Title";
export type { PopoverCloseProps } from "./Close";
export type { PopoverArrowProps } from "./Arrow";
export type { PopoverTriggerProps } from "./Trigger";
