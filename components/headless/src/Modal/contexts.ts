import { createContext, useContext } from "react";

type ModalContextValue = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  keepMounted: boolean;
  disablePortal: boolean;
  titleId: string | undefined;
  setTitleId: (id: string | undefined) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  floatingRef: React.RefObject<HTMLDialogElement | null>;
};

export const ModalContext = createContext<ModalContextValue | null>(null);
export const ContentContext = createContext<boolean>(false);

export function useModalInternal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "[WonDesign Headless] useModal() must be used inside a Modal Provider.",
    );
  }
  return context;
}

export function useModal() {
  const { isOpen, openModal, closeModal, keepMounted, disablePortal } =
    useModalInternal();

  return { isOpen, openModal, closeModal, keepMounted, disablePortal };
}
