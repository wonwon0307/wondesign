import { createContext, useContext } from "react";

type AlertContextType = {
  isOpen: boolean;
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
};

export const AlertContext = createContext<AlertContextType | null>(null);
export const ContentContext = createContext<boolean>(false);

export function useAlertInternal() {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error(
      "[WonDesign Headless] useAlert() must be used within the Alert Provider.",
    );
  }

  return context;
}

export function useAlert() {
  const { isOpen, showAlert, closeAlert, keepMounted, disablePortal } =
    useAlertInternal();

  return {
    isOpen,
    showAlert,
    closeAlert,
    keepMounted,
    disablePortal,
  };
}
