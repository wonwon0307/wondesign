import { useState } from "react";
import { Button } from "@wondesign/buttons/Button";
import { Alert as HeadlessAlert } from "@wondesign/headless/Alert";
import { Description } from "@wondesign/texts/Description";
import { Heading } from "@wondesign/texts/Heading";

import { styles } from "./styles.css";
import type { ConfirmComponentProps } from "./types";

export function Confirm({
  confirm,
  closeConfirm,
  confirmText,
  cancelText,
}: Readonly<ConfirmComponentProps>) {
  const [isPending, setIsPending] = useState<boolean>(false);

  const onConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPending(true);

    try {
      await confirm.onConfirm?.();
      closeConfirm(true);
    } catch (error) {
      await confirm.onConfirmError?.(error);
    } finally {
      setIsPending(false);
    }
  };

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen && !isPending) {
      closeConfirm(false);
    }
  };

  return (
    <HeadlessAlert isOpen onOpenChange={onOpenChange}>
      <HeadlessAlert.Backdrop className={styles.backdrop} />
      <HeadlessAlert.Content className={styles.alert}>
        <HeadlessAlert.Title asChild>
          <Heading level={2}>{confirm.title}</Heading>
        </HeadlessAlert.Title>
        <HeadlessAlert.Message asChild>
          <Description>{confirm.message}</Description>
        </HeadlessAlert.Message>
        <div className={styles.buttons}>
          <HeadlessAlert.Close asChild>
            <Button variant="secondary" isDisabled={isPending}>
              {confirm.cancelText ?? cancelText}
            </Button>
          </HeadlessAlert.Close>
          <HeadlessAlert.Close asChild onClick={onConfirm}>
            <Button
              variant={confirm.isDestructive ? "destructive" : "primary"}
              isLoading={isPending}
            >
              {confirm.confirmText ?? confirmText}
            </Button>
          </HeadlessAlert.Close>
        </div>
      </HeadlessAlert.Content>
    </HeadlessAlert>
  );
}
