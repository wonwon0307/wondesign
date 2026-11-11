import { useMemo, useRef, useState } from "react";
import { useOpenState } from "@wondesign/disclosure/open-state";
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
}

export function AlertProvider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  keepMounted = false,
  disablePortal = false,
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

  useAutoFocus(wrapperRef, { enabled: isOpen, returnRef: triggerRef });
  useBackgroundInert(wrapperRef, { enabled: isOpen });
  useEscapeKey(closeAlert, { enabled: isOpen });
  useFocusTrap(wrapperRef, { enabled: isOpen });
  useScrollLock({ enabled: isOpen });

  const contextValue = useMemo(
    () => ({
      isOpen,
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
    }),
    [
      isOpen,
      showAlert,
      closeAlert,
      keepMounted,
      disablePortal,
      contentId,
      titleId,
      messageId,
    ],
  );

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
}
