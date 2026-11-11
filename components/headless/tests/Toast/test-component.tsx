import { ToastArea } from "@/Toast/Area";
import { Toast, type ToastProps } from "@/Toast/Toast";
import { ToastTitle } from "@/Toast/Title";
import { ToastMessage } from "@/Toast/Message";
import { ToastClose } from "@/Toast/Close";

export function TestComponent({
  onClick,
  disablePortal,
  ...rest
}: Omit<ToastProps, "children" | "onClick"> & {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disablePortal?: boolean;
}) {
  return (
    <ToastArea disablePortal={disablePortal} data-testid="toast-area">
      <Toast {...rest} data-testid="toast">
        <ToastTitle data-testid="toast-title">Test Toast</ToastTitle>
        <ToastMessage data-testid="toast-message">Test Message</ToastMessage>
        <ToastClose onClick={onClick} data-testid="toast-close">
          Close
        </ToastClose>
      </Toast>
    </ToastArea>
  );
}
