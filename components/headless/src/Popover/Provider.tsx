import { useMemo, useState } from "react";
import { useOpenState } from "@wondesign/disclosure/open-state";
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
  disablePortal?: boolean;
  keepMounted?: boolean;
}

export function PopoverProvider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  disablePortal = false,
  keepMounted = false,
  placement: userPlacement = "bottom",
  forcePlacement = false,
  align = "center",
  offset = 4,
  padding = 8,
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

  useClickOutside(floatingRef, hidePopover, {
    enabled: isOpen,
    excludeRef: triggerRef,
  });
  useEscapeKey(hidePopover, { enabled: isOpen, scopeRef: floatingRef });
  useAutoFocus(floatingRef, { enabled: isOpen, returnRef: triggerRef });

  const contextValue = useMemo(
    () => ({
      isOpen,
      togglePopover,
      showPopover,
      hidePopover,
      disablePortal,
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
    }),
    [
      isOpen,
      togglePopover,
      showPopover,
      hidePopover,
      disablePortal,
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
    ],
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
}
