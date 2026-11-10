import { useContext } from "react";

import { Button, type ButtonProps } from "@/Button/Button";
import { ContentContext, useAlertInternal } from "./contexts";

export interface AlertCloseProps extends Omit<
  ButtonProps,
  "children" | "type" | "onClick"
> {
  children: React.ReactNode;
}

export function AlertClose({ children, ...rest }: Readonly<AlertCloseProps>) {
  const { closeAlert } = useAlertInternal();

  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error(
      "[WonDesign Headless] AlertClose must be used within AlertContent.",
    );
  }

  return (
    <Button {...rest} type="button" onClick={closeAlert}>
      {children}
    </Button>
  );
}
