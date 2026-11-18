import { useContext } from "react";

import { Button, type ButtonProps } from "@/Button/Button";
import { ContentContext, usePopoverInternal } from "./contexts";

export interface PopoverCloseProps extends Omit<ButtonProps, "children"> {
  children: React.ReactNode;
}

export function PopoverClose({
  children,
  onClick,
  ...rest
}: Readonly<PopoverCloseProps>) {
  const { hidePopover, scopeKey } = usePopoverInternal();
  const isInsideContent = useContext(ContentContext) === scopeKey;

  if (!isInsideContent) {
    throw new Error(
      "[WonDesign Headless] PopoverClose must be used inside a PopoverContent.",
    );
  }

  const finalOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) hidePopover();
  };

  return (
    <Button {...rest} onClick={finalOnClick}>
      {children}
    </Button>
  );
}
