import { createContext, useContext } from "react";
import type { PresenceStatus } from "@wondesign/disclosure/presence";
import type { FloatingPlacement, Position } from "@wondesign/position";

type PopoverContextValue = {
  isOpen: boolean;
  isPresent: boolean;
  status: PresenceStatus;
  togglePopover: () => void;
  showPopover: () => void;
  hidePopover: () => void;
  keepMounted: boolean;

  titleId: string | undefined;
  setTitleId: (id: string | undefined) => void;
  contentId: string | undefined;
  setContentId: (id: string | undefined) => void;
  // refs
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  floatingRef: React.RefObject<HTMLDialogElement | null>;
  arrowRef: React.RefObject<HTMLDivElement | null>;
  // positioning
  placement: FloatingPlacement;
  isPositioned: boolean;
  updatePosition: () => void;
  content: Position;
  arrow: Position;
  scopeKey: string;
};

export const PopoverContext = createContext<PopoverContextValue | null>(null);
export const ContentContext = createContext<string | null>(null);

export function usePopoverInternal() {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error(
      "[WonDesign Headless] usePopover() must be used inside a Popover Provider.",
    );
  }
  return context;
}

export function usePopover() {
  const {
    isOpen,
    isPresent,
    status,
    togglePopover,
    showPopover,
    hidePopover,
    keepMounted,
    placement,
    content,
    arrow,
    isPositioned,
    updatePosition,
  } = usePopoverInternal();

  return {
    isOpen,
    isPresent,
    status,
    togglePopover,
    showPopover,
    hidePopover,
    keepMounted,
    placement,
    content,
    arrow,
    isPositioned,
    updatePosition,
  };
}
