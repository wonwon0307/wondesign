import { useId, useMemo, useState } from "react";
import { useOpenState } from "@wondesign/disclosure/open-state";
import { usePresence } from "@wondesign/disclosure/presence";
import { useAutoFocus } from "@wondesign/focus/auto-focus";
import { useEscapeKey } from "@wondesign/key-events/escape-key";
import { useClickOutside } from "@wondesign/pointer/click-outside";
import { useFloatingPosition, type FloatingOptions } from "@wondesign/position";

import { PopoverContext } from "./contexts";

export interface PopoverProps extends FloatingOptions {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  keepMounted?: boolean;
  disableOutsideClick?: boolean;
  disableEscapeKey?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

export function PopoverProvider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  keepMounted = false,
  placement: userPlacement = "bottom",
  forcePlacement = false,
  align = "center",
  offset = 4,
  padding = 8,
  disableOutsideClick = false,
  disableEscapeKey = false,
  initialFocusRef,
  returnFocusRef,
}: Readonly<PopoverProps>) {
  const {
    isOpen,
    toggle: togglePopover,
    show: showPopover,
    hide: hidePopover,
  } = useOpenState({
    controlledOpen,
    setControlledOpen: onOpenChange,
    initialState: defaultOpen,
  });
  const [titleId, setTitleId] = useState<string | undefined>(undefined);
  const [contentId, setContentId] = useState<string | undefined>(undefined);
  const scopeKey = useId();

  const {
    triggerRef,
    floatingRef,
    arrowRef,
    placement,
    content,
    arrow,
    isPositioned,
    update: updatePosition,
  } = useFloatingPosition<HTMLButtonElement, HTMLDialogElement, HTMLDivElement>(
    {
      enabled: isOpen,
      placement: userPlacement,
      forcePlacement,
      align,
      offset,
      padding,
    },
  );
  const { isPresent, status } = usePresence(floatingRef, isOpen);

  useClickOutside(floatingRef, hidePopover, {
    enabled: isOpen && !disableOutsideClick,
    excludeRef: triggerRef,
  });
  useEscapeKey(hidePopover, {
    enabled: isOpen && !disableEscapeKey,
    scopeRef: floatingRef,
  });
  useAutoFocus(floatingRef, {
    enabled: isOpen,
    returnRef: returnFocusRef ?? triggerRef,
    initialRef: initialFocusRef,
  });

  const contextValue = useMemo(
    () => ({
      isOpen,
      isPresent,
      status,
      togglePopover,
      showPopover,
      hidePopover,
      keepMounted,
      titleId,
      setTitleId,
      contentId,
      setContentId,
      triggerRef,
      floatingRef,
      arrowRef,
      placement,
      content,
      arrow,
      isPositioned,
      updatePosition,
      scopeKey,
    }),
    [
      isOpen,
      isPresent,
      status,
      togglePopover,
      showPopover,
      hidePopover,
      keepMounted,
      titleId,
      contentId,
      triggerRef,
      floatingRef,
      arrowRef,
      placement,
      content,
      arrow,
      isPositioned,
      updatePosition,
      scopeKey,
    ],
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
}
