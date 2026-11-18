import { useId, useMemo, useRef, useState } from "react";
import { useOpenState } from "@wondesign/disclosure/open-state";
import { useScrollLock } from "@wondesign/disclosure/scroll-lock";
import { useAutoFocus } from "@wondesign/focus/auto-focus";
import { useBackgroundInert } from "@wondesign/focus/background-inert";
import { useFocusTrap } from "@wondesign/focus/trap";
import { useEscapeKey } from "@wondesign/key-events/escape-key";
import { useClickOutside } from "@wondesign/pointer/click-outside";

import { ModalContext } from "./contexts";

export interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  keepMounted?: boolean;
  disablePortal?: boolean;
  disableOutsideClick?: boolean;
  disableEscapeKey?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

export function ModalProvider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  keepMounted = false,
  disablePortal = false,
  disableOutsideClick = false,
  disableEscapeKey = false,
  initialFocusRef,
  returnFocusRef,
}: Readonly<ModalProps>) {
  const {
    isOpen,
    show: openModal,
    hide: closeModal,
  } = useOpenState({
    controlledOpen,
    setControlledOpen: onOpenChange,
    initialState: defaultOpen,
  });
  const [titleId, setTitleId] = useState<string | undefined>(undefined);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDialogElement>(null);
  const scopeKey = useId();

  useClickOutside(floatingRef, closeModal, {
    enabled: isOpen && !disableOutsideClick,
    excludeRef: triggerRef,
  });
  useBackgroundInert(floatingRef, { enabled: isOpen }); // focus를 제대로 trigger로 return 시키려면, 반드시 useAutoFocus보다 먼저 호출되어야 함
  useAutoFocus(floatingRef, {
    enabled: isOpen,
    returnRef: returnFocusRef ?? triggerRef,
    initialRef: initialFocusRef,
  });
  useEscapeKey(closeModal, {
    enabled: isOpen && !disableEscapeKey,
    scopeRef: floatingRef,
  });
  useFocusTrap(floatingRef, { enabled: isOpen });
  useScrollLock({ enabled: isOpen });

  const contextValue = useMemo(
    () => ({
      isOpen,
      openModal,
      closeModal,
      keepMounted,
      disablePortal,
      triggerRef,
      floatingRef,
      titleId,
      setTitleId,
      scopeKey,
    }),
    [
      isOpen,
      openModal,
      closeModal,
      keepMounted,
      disablePortal,
      triggerRef,
      floatingRef,
      titleId,
      setTitleId,
      scopeKey,
    ],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}
