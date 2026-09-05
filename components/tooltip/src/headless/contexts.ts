import { createContext, useContext } from "react";

import type {
  FloatingPosition,
  ArrowPosition,
} from "@wondesign/components-core/positioning";

type TooltipContextType = {
  // state
  isOpen: boolean;
  keepMounted: boolean;
  // controls
  showImmediate: () => void;
  showWithDelay: () => void;
  hideImmediate: () => void;
  hideWithDelay: () => void;
  clearTimer: () => void;
  // id for aria
  tooltipId: string;
  // refs
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  floatingRef: React.RefObject<HTMLDivElement | null>;
  arrowRef: React.RefObject<HTMLDivElement | null>;
  // positioning
  floatingPosition: FloatingPosition;
  arrowPosition: ArrowPosition;
};

export const TooltipContext = createContext<TooltipContextType | undefined>(
  undefined,
);

export function useTooltip(componentName: string) {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error(
      `Tooltip.${componentName} must be used inside the Tooltip wrapper.`,
    );
  }

  return context;
}
