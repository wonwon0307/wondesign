import { TooltipProvider } from "./Provider";
import { TooltipArrow } from "./Arrow";
import { TooltipContent } from "./Content";
import { TooltipTrigger } from "./Trigger";

export const HeadlessTooltip = Object.assign(TooltipProvider, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Arrow: TooltipArrow,
});

export { TooltipProvider } from "./Provider";
export { TooltipTrigger } from "./Trigger";
export { TooltipContent } from "./Content";
export { TooltipArrow } from "./Arrow";

export type { HeadlessTooltipProps } from "./Provider";
export type { TooltipTriggerProps } from "./Trigger";
export type { TooltipContentProps } from "./Content";
export type { TooltipArrowProps } from "./Arrow";
