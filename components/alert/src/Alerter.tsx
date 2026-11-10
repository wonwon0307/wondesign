import { useEffect, useSyncExternalStore } from "react";

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

  useEffect(() => {
    return () => {
      dismissAll();
    };
  }, []);

  if (!item) {
    return null;
  }

  if (item.type === "alert") {
    return (
      <AlertComponent
        key={item.id}
        alert={item}
        closeAlert={() => respond(item.id, true)}
        closeText={closeText}
      />
    );
  }

  return (
    <ConfirmComponent
      key={item.id}
      confirm={item}
      closeConfirm={(v) => respond(item.id, v)}
      confirmText={confirmText}
      cancelText={cancelText}
    />
  );
}
