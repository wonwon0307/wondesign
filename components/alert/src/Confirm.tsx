import { useEffect, useRef, useState } from "react";
import { Button } from "@wondesign/buttons/Button";
import { usePresence } from "@wondesign/disclosure/presence";
import { Alert as HeadlessAlert } from "@wondesign/headless/Alert";
import { Description } from "@wondesign/texts/Description";
import { Heading } from "@wondesign/texts/Heading";

import { styles } from "./styles.css";
import type { ConfirmComponentProps } from "./types";

export function Confirm({
  confirm,
  deleteConfirm,
  dismissConfirm,
}: Readonly<ConfirmComponentProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const { status } = usePresence(ref, confirm.isOpen);
  const [isPending, setIsPending] = useState<boolean>(false);

  const onConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPending(true);

    try {
      await confirm.onConfirm?.();
      dismissConfirm(true);
    } catch (error) {
      confirm.onConfirmError?.(error);
    } finally {
      setIsPending(false);
    }
  };

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen && !isPending) {
      dismissConfirm(false);
    }
  };

  useEffect(() => {
    if (status === "closed") {
      deleteConfirm();
    }
  }, [status, deleteConfirm]);

  return (
    <HeadlessAlert isOpen={confirm.isOpen} onOpenChange={onOpenChange}>
      <HeadlessAlert.Backdrop className={styles.backdrop} />
      <HeadlessAlert.Content ref={ref} className={styles.alert}>
        <HeadlessAlert.Title asChild>
          <Heading level={2}>{confirm.title}</Heading>
        </HeadlessAlert.Title>
        <HeadlessAlert.Message asChild>
          <Description>{confirm.message}</Description>
        </HeadlessAlert.Message>
        <div className={styles.buttons}>
          <HeadlessAlert.Close asChild>
            <Button variant="secondary" isDisabled={isPending}>
              {confirm.cancelText}
            </Button>
          </HeadlessAlert.Close>
          <HeadlessAlert.Close asChild onClick={onConfirm}>
            <Button
              variant={confirm.isDestructive ? "destructive" : "primary"}
              isLoading={isPending}
            >
              {confirm.confirmText}
            </Button>
          </HeadlessAlert.Close>
        </div>
      </HeadlessAlert.Content>
    </HeadlessAlert>
  );
}
