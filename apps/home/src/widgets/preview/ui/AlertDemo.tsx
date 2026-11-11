"use client";

import { showAlert, showConfirm } from "@wondesign/ui/Alert";
import { Button } from "@wondesign/ui/Buttons";

interface Props {
  type: "alert" | "confirm";
  label: string;
  title: string;
  description: string;
  variant?: "primary" | "secondary" | "destructive";
  closeText?: string;
  confirmText?: string;
  tone?: "primary" | "secondary" | "destructive";
  // runs as `onConfirm` for a second, then succeeds or fails
  action?: "success" | "failure";
  // shown as an alert a second after the confirm is confirmed
  followUp?: { title: string; description: string };
}

const DELAY = 1000;

function wait(result: "success" | "failure") {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (result === "success") resolve();
      else reject(new Error("Failed"));
    }, DELAY);
  });
}

export function AlertDemo({
  type,
  label,
  title,
  description,
  variant = "primary",
  tone = "secondary",
  closeText = type === "alert" ? "Close" : "Cancel",
  confirmText = "OK",
  action,
  followUp,
}: Readonly<Props>) {
  const alert = async () => {
    await showAlert(title, description, {
      closeText,
      tone,
    });
  };

  const confirm = async () => {
    const confirmed = await showConfirm(title, description, {
      isDestructive: variant === "destructive",
      cancelText: closeText,
      confirmText,
      onConfirm: action && (() => wait(action)),
    });

    if (confirmed && followUp) {
      await wait("success");
      await showAlert(followUp.title, followUp.description);
    }
  };

  return (
    <Button variant={variant} onClick={type === "alert" ? alert : confirm}>
      {label}
    </Button>
  );
}
