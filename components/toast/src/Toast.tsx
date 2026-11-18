import { useEffect, useRef } from "react";
import { Button } from "@wondesign/buttons/Button";
import { usePresence } from "@wondesign/disclosure/presence";
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
  deleteToast,
  dismissToast,
}: Readonly<ToastItemProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const slideDirection = toast.position?.includes("bottom") ? "up" : "down";
  const { status } = usePresence(ref, toast.isOpen);

  useEffect(() => {
    if (status === "closed") {
      deleteToast();
    }
  }, [status, deleteToast]);

  return (
    <Toast
      duration={toast.duration}
      isOpen={toast.isOpen}
      onOpenChange={dismissToast}
      ref={ref}
      className={styles.toast({ type: toast.type, slideDirection })}
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
      return "error-circle";
    case "info":
      return "info";
    default:
      return "bell";
  }
}
