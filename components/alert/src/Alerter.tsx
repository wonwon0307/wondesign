import { useEffect, useMemo, useSyncExternalStore } from "react";

import { Alert } from "./Alert";
import { Confirm } from "./Confirm";
import { dismissAll, getSnapshot, respond, subscribe } from "./store";
import type { AlerterProps } from "./types";

export function Alerter({
  AlertComponent = Alert,
  ConfirmComponent = Confirm,
  confirmText = "OK",
  cancelText = "Cancel",
  closeText = "Close",
}: Readonly<AlerterProps>) {
  const item = useSyncExternalStore(subscribe, getSnapshot, () => null);

  const stableItem = useMemo(() => {
    if (!item) return null;

    if (item.type === "alert") {
      return { ...item, closeText: item.closeText ?? closeText };
    }

    return {
      ...item,
      confirmText: item.confirmText ?? confirmText,
      cancelText: item.cancelText ?? cancelText,
    };
  }, [item, closeText, confirmText, cancelText]);

  useEffect(() => {
    return () => {
      dismissAll();
    };
  }, []);

  if (!stableItem) {
    return null;
  }

  if (stableItem.type === "alert") {
    return (
      <AlertComponent
        key={stableItem.id}
        alert={stableItem}
        closeAlert={() => respond(stableItem.id, true)}
      />
    );
  }

  return (
    <ConfirmComponent
      key={stableItem.id}
      confirm={stableItem}
      closeConfirm={(v) => respond(stableItem.id, v)}
    />
  );
}
