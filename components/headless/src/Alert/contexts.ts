import { createContext, useContext } from "react";
import type { PresenceStatus } from "@wondesign/disclosure/presence";

type AlertContextValue = {
  isOpen: boolean;
  isPresent: boolean;
  status: PresenceStatus;
  showAlert: () => void;
  closeAlert: () => void;
  keepMounted: boolean;
  disablePortal: boolean;

  wrapperRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  titleId: string | undefined;
  setTitleId: (titleId: string | undefined) => void;
  messageId: string | undefined;
  setMessageId: (messageId: string | undefined) => void;
  contentId: string | undefined;
  setContentId: (contentId: string | undefined) => void;
  scopeKey: string;
};

export const AlertContext = createContext<AlertContextValue | null>(null);
export const BackdropContext = createContext<string | null>(null);
export const ContentContext = createContext<string | null>(null);

export function useAlertInternal() {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error(
      "[WonDesign Headless] useAlert() must be used inside an Alert Provider.",
    );
  }

  return context;
}

export function useAlert() {
  const { isOpen, isPresent, status, showAlert, closeAlert, keepMounted } =
    useAlertInternal();

  return {
    isOpen,
    isPresent,
    status,
    showAlert,
    closeAlert,
    keepMounted,
  };
}
