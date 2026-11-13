import { Button } from "@wondesign/buttons/Button";
import {
  Toast,
  ToastClose,
  ToastMessage,
  ToastDescription,
} from "@wondesign/headless/Toast";
import { AppIcon, type IconName } from "@wondesign/icons";
import { Description } from "@wondesign/texts/Description";
import { Heading } from "@wondesign/texts/Heading";

import { styles } from "./styles.css";
import type { ToastItemProps, ToastType } from "./types";

export function DefaultToast({
  toast,
  dismissToast,
}: Readonly<ToastItemProps>) {
  return (
    <Toast
      duration={toast.duration}
      isOpen
      onOpenChange={dismissToast}
      className={styles.toast({ type: toast.type })}
    >
      <div className={styles.textArea}>
        <div className={styles.messageArea}>
          <AppIcon icon={getIconName(toast.type)} size={24} />
          <ToastMessage asChild>
            <Heading level={3} maxNumLines={0} className={styles.message}>
              {toast.message}
            </Heading>
          </ToastMessage>
        </div>
        {toast.description && (
          <div className={styles.messageArea}>
            <div className={styles.emptySpace} />
            <ToastDescription asChild>
              <Description size="small">{toast.description}</Description>
            </ToastDescription>
          </div>
        )}
      </div>
      {toast.action && (
        <ToastClose asChild>
          <Button
            variant={toast.action.variant}
            onClick={toast.action.onClick}
            size="small"
            outlined
          >
            {toast.action.label}
          </Button>
        </ToastClose>
      )}
    </Toast>
  );
}

function getIconName(type: ToastType): IconName {
  switch (type) {
    case "success":
      return "check-circle";
    case "warning":
      return "warning";
    case "error":
      return "error";
    case "info":
      return "info";
    default:
      return "bell";
  }
}
