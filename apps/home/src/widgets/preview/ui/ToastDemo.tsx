"use client";

import { Button } from "@wondesign/ui/Buttons";
import {
  dismissToasts,
  toast,
  type ToastOptions,
  type ToastPosition,
  type ToastType,
} from "@wondesign/ui/Toast";

interface Props {
  label: string;
  message: string;
  type?: ToastType;
  description?: string;
  duration?: number;
  position?: ToastPosition;
  // shown as a "secondary" action button
  action?: {
    label: string;
    // shown as a toast when the action is pressed
    followUp?: { message: string; type?: ToastType };
    // shown as an error toast on the first press, which keeps the toast open
    failFirst?: string;
  };
  // shows this many toasts at once, numbered
  count?: number;
}

function showToast(type: ToastType, message: string, options?: ToastOptions) {
  if (type === "default") toast(message, options);
  else toast[type](message, options);
}

export function DismissToastsDemo() {
  return (
    <Button variant="secondary" size="small" onClick={() => dismissToasts()}>
      Dismiss all
    </Button>
  );
}

export function ToastDemo({
  label,
  message,
  type = "default",
  description,
  duration,
  position,
  action,
  count = 1,
}: Readonly<Props>) {
  const show = (text: string) => {
    let hasFailed = false;

    const onActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (action?.failFirst && !hasFailed) {
        hasFailed = true;
        event.preventDefault(); // keeps the toast open
        toast.error(action.failFirst);
        return;
      }

      if (action?.followUp) {
        showToast(action.followUp.type ?? "default", action.followUp.message);
      }
    };

    showToast(type, text, {
      description,
      duration,
      position,
      action: action && {
        label: action.label,
        variant: "secondary",
        onClick: onActionClick,
      },
    });
  };

  const onClick = () => {
    if (count === 1) {
      show(message);
      return;
    }

    for (let i = 1; i <= count; i++) {
      show(`${message} ${i}`);
    }
  };

  return (
    <Button size="small" onClick={onClick}>
      {label}
    </Button>
  );
}
