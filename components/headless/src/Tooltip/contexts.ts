import { createContext, useContext } from "react";
import type { PresenceStatus } from "@wondesign/disclosure/presence";
import type { FloatingPlacement, Position } from "@wondesign/position";

type TooltipContextValue = {
  // state
  isOpen: boolean;
  isPresent: boolean;
  status: PresenceStatus;
  keepMounted: boolean;
  // controls
  showImmediate: () => void;
  showWithDelay: () => void;
  hideImmediate: () => void;
  hideWithDelay: () => void;
  clearTimer: () => void;
  // id for aria
  tooltipId: string | undefined;
  setTooltipId: (id: string | undefined) => void;
  // refs
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  floatingRef: React.RefObject<HTMLDivElement | null>;
  arrowRef: React.RefObject<HTMLDivElement | null>;
  // positioning
  placement: FloatingPlacement;
  isPositioned: boolean;
  updatePosition: () => void;
  content: Position;
  arrow: Position;
  scopeKey: string;
};

export const TooltipContext = createContext<TooltipContextValue | null>(null);
export const ContentContext = createContext<string | null>(null);

export function useTooltipInternal() {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error(
      `[WonDesign Headless] useTooltip() must be used inside a Tooltip Provider.`,
    );
  }

  return context;
}

export function useTooltip() {
  const {
    isOpen,
    isPresent,
    status,
    showImmediate,
    showWithDelay,
    hideImmediate,
    hideWithDelay,
    keepMounted,
    placement,
    isPositioned,
    updatePosition,
    content,
    arrow,
  } = useTooltipInternal();

  return {
    isOpen,
    isPresent,
    status,
    showImmediate,
    showWithDelay,
    hideImmediate,
    hideWithDelay,
    keepMounted,
    placement,
    isPositioned,
    updatePosition,
    content,
    arrow,
  };
}
