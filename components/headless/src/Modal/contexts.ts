import { createContext, useContext } from "react";
import type { PresenceStatus } from "@wondesign/disclosure/presence";

type ModalContextValue = {
  isOpen: boolean;
  isPresent: boolean;
  status: PresenceStatus;
  openModal: () => void;
  closeModal: () => void;
  keepMounted: boolean;
  disablePortal: boolean;
  titleId: string | undefined;
  setTitleId: (id: string | undefined) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  floatingRef: React.RefObject<HTMLDialogElement | null>;
  scopeKey: string;
};

export const ModalContext = createContext<ModalContextValue | null>(null);
export const BackdropContext = createContext<string | null>(null);
export const ContentContext = createContext<string | null>(null);

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
  const { isOpen, isPresent, status, openModal, closeModal, keepMounted } =
    useModalInternal();

  return { isOpen, isPresent, status, openModal, closeModal, keepMounted };
}
