export { Toaster, toast, deleteToasts } from "@wondesign/toast";

export type {
  ToastType,
  ToastPosition,
  ToastAction,
  ToastOptions,
  ToastItem,
  ToastItemProps,
  ToasterProps,
} from "@wondesign/toast";

// re-export the base module as well
// deleteToasts are the same thing between the two modules
export { showToast, useToasts } from "@wondesign/toast/base";

export type { UseToastsResult } from "@wondesign/toast/base";
export type { BaseToastOptions, BaseToastItem } from "@wondesign/toast/base";
