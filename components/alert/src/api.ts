import { enqueue } from "./store";
import type { AlertOptions, ConfirmOptions } from "./types";

let counter = 0;

export function showAlert(
  title: string,
  message: string,
  { closeText, tone = "secondary" }: AlertOptions = {},
): Promise<void> {
  return new Promise((resolve) => {
    enqueue(
      {
        type: "alert",
        id: counter++,
        title,
        message,
        closeText,
        tone,
      },
      () => resolve(),
    );
  });
}

export function showConfirm(
  title: string,
  message: string,
  {
    confirmText,
    cancelText,
    onConfirm,
    onConfirmError,
    isDestructive = false,
  }: ConfirmOptions = {},
): Promise<boolean> {
  return new Promise((resolve) => {
    enqueue(
      {
        type: "confirm",
        id: counter++,
        title,
        message,
        confirmText,
        onConfirm,
        onConfirmError,
        cancelText,
        isDestructive,
      },
      resolve,
    );
  });
}
