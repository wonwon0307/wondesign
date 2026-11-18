import { ModalProvider, type ModalProps } from "@/Modal/Provider";
import { ModalBackdrop } from "@/Modal/Backdrop";
import { ModalContent } from "@/Modal/Content";
import { ModalTitle } from "@/Modal/Title";
import { ModalClose } from "@/Modal/Close";
import { ModalTrigger } from "@/Modal/Trigger";

export function TestComponent({
  children,
  onClose,
  onTrigger,
  ...rest
}: Omit<ModalProps, "children"> & {
  children?: React.ReactNode;
  onClose?: (e: React.MouseEvent) => void;
  onTrigger?: (e: React.MouseEvent) => void;
}) {
  return (
    <ModalProvider {...rest}>
      <ModalTrigger onClick={onTrigger} data-testid="modal-trigger">
        Open Modal
      </ModalTrigger>
      <ModalBackdrop data-testid="modal-backdrop" />
      <ModalContent data-testid="modal-content">
        <ModalTitle data-testid="modal-title">Modal Title</ModalTitle>
        {children}
        <ModalClose onClick={onClose} data-testid="modal-close">
          Close
        </ModalClose>
      </ModalContent>
    </ModalProvider>
  );
}
