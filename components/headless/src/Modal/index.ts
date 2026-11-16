import { ModalProvider } from "./Provider";
import { ModalBackdrop } from "./Backdrop";
import { ModalContent } from "./Content";
import { ModalTitle } from "./Title";
import { ModalClose } from "./Close";
import { ModalTrigger } from "./Trigger";

export const Modal = Object.assign(ModalProvider, {
  Backdrop: ModalBackdrop,
  Content: ModalContent,
  Title: ModalTitle,
  Close: ModalClose,
  Trigger: ModalTrigger,
});

export { useModal } from "./contexts";

export { ModalProvider } from "./Provider";
export { ModalBackdrop } from "./Backdrop";
export { ModalContent } from "./Content";
export { ModalTitle } from "./Title";
export { ModalClose } from "./Close";
export { ModalTrigger } from "./Trigger";

export type { ModalProps } from "./Provider";
export type { ModalBackdropProps } from "./Backdrop";
export type { ModalContentProps } from "./Content";
export type { ModalTitleProps } from "./Title";
export type { ModalCloseProps } from "./Close";
export type { ModalTriggerProps } from "./Trigger";
