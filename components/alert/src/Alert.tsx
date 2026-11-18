import { useEffect, useRef } from "react";
import { Button } from "@wondesign/buttons/Button";
import { usePresence } from "@wondesign/disclosure/presence";
import { Alert as HeadlessAlert } from "@wondesign/headless/Alert";
import { Description } from "@wondesign/texts/Description";
import { Heading } from "@wondesign/texts/Heading";

import { styles } from "./styles.css";
import type { AlertComponentProps } from "./types";

export function Alert({
  alert,
  deleteAlert,
  dismissAlert,
}: Readonly<AlertComponentProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const { status } = usePresence(ref, alert.isOpen);

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      dismissAlert();
    }
  };

  useEffect(() => {
    if (status === "closed") {
      deleteAlert();
    }
  }, [status, deleteAlert]);

  return (
    <HeadlessAlert isOpen={alert.isOpen} onOpenChange={onOpenChange}>
      <HeadlessAlert.Backdrop className={styles.backdrop} />
      <HeadlessAlert.Content ref={ref} className={styles.alert}>
        <HeadlessAlert.Title asChild>
          <Heading level={2}>{alert.title}</Heading>
        </HeadlessAlert.Title>
        <HeadlessAlert.Message asChild>
          <Description>{alert.message}</Description>
        </HeadlessAlert.Message>
        <div className={styles.buttons}>
          <HeadlessAlert.Close asChild>
            <Button variant={alert.tone}>{alert.closeText}</Button>
          </HeadlessAlert.Close>
        </div>
      </HeadlessAlert.Content>
    </HeadlessAlert>
  );
}
