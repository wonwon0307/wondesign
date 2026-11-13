import { ToastArea } from "@/Toast/Area";
import { Toast, type ToastProps } from "@/Toast/Toast";
import { ToastMessage } from "@/Toast/Message";
import { ToastDescription } from "@/Toast/Description";
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
        <ToastMessage data-testid="toast-message">Test Toast</ToastMessage>
        <ToastDescription data-testid="toast-description">
          Test Description
        </ToastDescription>
        <ToastClose onClick={onClick} data-testid="toast-close">
          Close
        </ToastClose>
      </Toast>
    </ToastArea>
  );
}
