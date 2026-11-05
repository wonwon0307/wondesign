import { useContext, useEffect } from "react";

import { Button, type ButtonProps } from "@/Button/Button";
import { ContentContext, useAlertInternal } from "./contexts";

export interface AlertCloseProps extends Omit<
  ButtonProps,
  "children" | "type" | "onClick"
> {
  children: React.ReactNode;
  onClose?: () => void | Promise<void>;
}

export function AlertClose({
  children,
  onClose,
  isDisabled = false,
  ...rest
}: Readonly<AlertCloseProps>) {
  const { closeAlert, isPending, setPending } = useAlertInternal();

  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error(
      "[WonDesign Headless] AlertClose must be used within AlertContent.",
    );
  }

  useEffect(() => {
    return () => {
      setPending(false);
    };
  }, [setPending]);

  const handleClose = async () => {
    const result = onClose?.();

    if (!(result instanceof Promise)) {
      // synchronous onClose
      closeAlert();
      return;
    }

    setPending(true);

    try {
      await result;
      closeAlert();
    } catch {
      // failed to close, do nothing
    } finally {
      setPending(false);
    }
  };

  return (
    <Button
      {...rest}
      type="button"
      isDisabled={isDisabled || isPending}
      onClick={handleClose}
    >
      {children}
    </Button>
  );
}
