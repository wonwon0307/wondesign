import { useCallback, useId, useMemo, useRef, useState } from "react";

import { useOpenState } from "@/core/disclosure";
import { useFloating, type FloatingOptions } from "@/core/floating";
import { useAutoFocus, useEscapeClose, useFocusTrap } from "@/core/keyboard";
import { useClickOutside } from "@/core/pointer";
import { PopoverContext } from "./_internals/contexts";

export interface PopoverProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  inline?: boolean;
  floatingOptions?: FloatingOptions;
  unmountOnHide?: boolean;
}

export function PopoverProvider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  inline = false,
  floatingOptions: userOptions,
  unmountOnHide = false,
}: Readonly<PopoverProps>) {
  const {
    isOpen,
    show: showPopover,
    hide: hidePopover,
  } = useOpenState(controlledOpen, onOpenChange, false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const floatingRef = useRef<HTMLDialogElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const [isPending, setPending] = useState<boolean>(false);
  const [titleId, setTitleId] = useState<string | undefined>(undefined);
  const contentId = useId();

  const floatingOptions: FloatingOptions = useMemo(
    () => ({
      placement: "bottom",
      forcePlacement: false,
      align: "center",
      offset: 8,
      padding: 8,
      ...userOptions,
    }),
    [userOptions],
  );

  const { floating, arrow } = useFloating(
    triggerRef,
    floatingRef,
    arrowRef,
    floatingOptions,
    isOpen,
  );

  useClickOutside(floatingRef, hidePopover, isOpen, triggerRef);
  useEscapeClose(hidePopover, isOpen);
  useAutoFocus(floatingRef, isOpen, triggerRef);
  useFocusTrap(floatingRef, isOpen);

  const togglePopover = useCallback(() => {
    if (isOpen) {
      hidePopover();
    } else {
      showPopover();
    }
  }, [isOpen, showPopover, hidePopover]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      togglePopover,
      hidePopover,
      isPending,
      setPending,
      isPortalMode: !inline,
      unmountOnHide,
      titleId,
      setTitleId,
      contentId,
      triggerRef,
      floatingRef,
      arrowRef,
      floatingPosition: floating,
      arrowPosition: arrow,
    }),
    [
      isOpen,
      togglePopover,
      hidePopover,
      isPending,
      setPending,
      inline,
      unmountOnHide,
      titleId,
      setTitleId,
      contentId,
      floating,
      arrow,
    ],
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
}
