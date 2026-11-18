import { useContext } from "react";

import { Button, type ButtonProps } from "@/Button/Button";
import { ContentContext, useAlertInternal } from "./contexts";

export interface AlertCloseProps extends Omit<
  ButtonProps,
  "children" | "type"
> {
  children: React.ReactNode;
}

export function AlertClose({
  children,
  onClick,
  ...rest
}: Readonly<AlertCloseProps>) {
  const { closeAlert, scopeKey } = useAlertInternal();

  const isInsideContent = useContext(ContentContext) === scopeKey;

  const finalOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) closeAlert();
  };

  if (!isInsideContent) {
    throw new Error(
      "[WonDesign Headless] AlertClose must be used inside an AlertContent.",
    );
  }

  return (
    <Button {...rest} type="button" onClick={finalOnClick}>
      {children}
    </Button>
  );
}
