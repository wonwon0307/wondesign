import { useEffect, useMemo } from "react";
import { ToastArea, type ToastAreaProps } from "@wondesign/headless/Toast";

import { useToasts } from "./base/hook";
import { DefaultToast } from "./Toast";
import { styles } from "./styles.css";
import type { ToastItem, ToastItemProps, ToastPosition } from "./types";

export interface ToasterProps extends Omit<
  ToastAreaProps,
  "children" | "asChild"
> {
  ToastComponent?: React.ComponentType<ToastItemProps>;
  defaultPosition?: ToastPosition;
  maxToasts?: number;
}

const positions = [
  "top",
  "top-right",
  "bottom",
  "bottom-right",
] as ToastPosition[];

export function Toaster({
  ToastComponent = DefaultToast,
  defaultPosition = "top-right",
  maxToasts = 5,
  ...rest
}: Readonly<ToasterProps>) {
  const { toasts, dismissToast, dismissToasts } = useToasts<ToastItem>();

  const toastsByPosition = useMemo(() => {
    const grouped: Record<string, typeof toasts> = {};
    for (const toast of toasts) {
      const position = toast.position ?? defaultPosition;
      if (!grouped[position]) {
        grouped[position] = [];
      }
      grouped[position].push(toast);
    }
    return grouped;
  }, [toasts, defaultPosition]);

  useEffect(() => {
    return () => {
      dismissToasts();
    };
  }, [dismissToasts]);

  if (maxToasts <= 0) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Toast] maxToasts must be greater than 0. No toasts will be shown.",
      );
    }

    return null;
  }

  return (
    <ToastArea {...rest}>
      {positions.map((position) => (
        <div key={position} className={styles.group({ position })}>
          {(toastsByPosition[position] ?? [])
            .slice(0, maxToasts)
            .map((toast) => (
              <ToastComponent
                key={toast.id}
                toast={toast}
                dismissToast={() => dismissToast(toast.id)}
              />
            ))}
        </div>
      ))}
    </ToastArea>
  );
}
