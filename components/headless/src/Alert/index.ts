import { AlertProvider } from "./Provider";
import { AlertBackdrop } from "./Backdrop";
import { AlertClose } from "./Close";
import { AlertContent } from "./Content";
import { AlertMessage } from "./Message";
import { AlertTitle } from "./Title";
import { AlertTrigger } from "./Trigger";

export const Alert = Object.assign(AlertProvider, {
  Backdrop: AlertBackdrop,
  Close: AlertClose,
  Content: AlertContent,
  Message: AlertMessage,
  Title: AlertTitle,
  Trigger: AlertTrigger,
});

export { useAlert } from "./contexts";

export { AlertProvider } from "./Provider";
export { AlertBackdrop } from "./Backdrop";
export { AlertClose } from "./Close";
export { AlertContent } from "./Content";
export { AlertMessage } from "./Message";
export { AlertTitle } from "./Title";
export { AlertTrigger } from "./Trigger";

export type { AlertProps } from "./Provider";
export type { AlertBackdropProps } from "./Backdrop";
export type { AlertCloseProps } from "./Close";
export type { AlertContentProps } from "./Content";
export type { AlertMessageProps } from "./Message";
export type { AlertTitleProps } from "./Title";
export type { AlertTriggerProps } from "./Trigger";
