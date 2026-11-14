import { createContext, useContext } from "react";
import type { FloatingPlacement, Position } from "@wondesign/position";

type PopoverContextValue = {
  isOpen: boolean;
  togglePopover: () => void;
  showPopover: () => void;
  hidePopover: () => void;
  disablePortal: boolean;
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
};

export const PopoverContext = createContext<PopoverContextValue | null>(null);
export const ContentContext = createContext<boolean>(false);

export function usePopoverInternal() {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error(
      "[WonDesign Headless] usePopover() must be used within the Popover Provider.",
    );
  }
  return context;
}

export function usePopover() {
  const {
    isOpen,
    togglePopover,
    showPopover,
    hidePopover,
    disablePortal,
    keepMounted,
    placement,
    content,
    arrow,
    isPositioned,
    updatePosition,
  } = usePopoverInternal();

  return {
    isOpen,
    togglePopover,
    showPopover,
    hidePopover,
    disablePortal,
    keepMounted,
    placement,
    content,
    arrow,
    isPositioned,
    updatePosition,
  };
}
