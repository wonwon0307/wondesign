import { TooltipProvider } from "./Provider";
import { TooltipArrow } from "./Arrow";
import { TooltipContent } from "./Content";
import { TooltipTrigger } from "./Trigger";

export const Tooltip = Object.assign(TooltipProvider, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Arrow: TooltipArrow,
});

export { useTooltip } from "./contexts";

export { TooltipProvider } from "./Provider";
export { TooltipTrigger } from "./Trigger";
export { TooltipContent } from "./Content";
export { TooltipArrow } from "./Arrow";

export type { TooltipProps } from "./Provider";
export type { TooltipTriggerProps } from "./Trigger";
export type { TooltipContentProps } from "./Content";
export type { TooltipArrowProps } from "./Arrow";
