import { useId, useMemo, useRef, useState } from "react";
import { useOpenState } from "@wondesign/disclosure/open-state";
import { usePresence } from "@wondesign/disclosure/presence";
import { useScrollLock } from "@wondesign/disclosure/scroll-lock";
import { useAutoFocus } from "@wondesign/focus/auto-focus";
import { useBackgroundInert } from "@wondesign/focus/background-inert";
import { useFocusTrap } from "@wondesign/focus/trap";
import { useEscapeKey } from "@wondesign/key-events/escape-key";

import { AlertContext } from "./contexts";

export interface AlertProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  keepMounted?: boolean;
  disablePortal?: boolean;
  disableEscapeKey?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

export function AlertProvider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  keepMounted = false,
  disablePortal = false,
  disableEscapeKey = false,
  initialFocusRef,
  returnFocusRef,
}: Readonly<AlertProps>) {
  const {
    isOpen,
    show: showAlert,
    hide: closeAlert,
  } = useOpenState({
    controlledOpen,
    setControlledOpen: onOpenChange,
    initialState: defaultOpen,
  });
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [titleId, setTitleId] = useState<string | undefined>(undefined);
  const [messageId, setMessageId] = useState<string | undefined>(undefined);
  const [contentId, setContentId] = useState<string | undefined>(undefined);
  const { isPresent, status } = usePresence(wrapperRef, isOpen);
  const scopeKey = useId();

  useBackgroundInert(wrapperRef, { enabled: isOpen });
  useAutoFocus(wrapperRef, {
    enabled: isOpen,
    returnRef: returnFocusRef ?? triggerRef,
    initialRef: initialFocusRef,
  });
  useEscapeKey(closeAlert, { enabled: isOpen && !disableEscapeKey });
  useFocusTrap(wrapperRef, { enabled: isOpen });
  useScrollLock({ enabled: isOpen });

  const contextValue = useMemo(
    () => ({
      isOpen,
      isPresent,
      status,
      showAlert,
      closeAlert,
      keepMounted,
      disablePortal,
      wrapperRef,
      triggerRef,
      titleId,
      setTitleId,
      messageId,
      setMessageId,
      contentId,
      setContentId,
      scopeKey,
    }),
    [
      isOpen,
      isPresent,
      status,
      showAlert,
      closeAlert,
      keepMounted,
      disablePortal,
      contentId,
      titleId,
      messageId,
      scopeKey,
    ],
  );

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
}
