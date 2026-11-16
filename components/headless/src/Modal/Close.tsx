import { useContext } from "react";

import { Button, type ButtonProps } from "@/Button/Button";
import { ContentContext, useModalInternal } from "./contexts";

export interface ModalCloseProps extends Omit<ButtonProps, "children"> {
  children: React.ReactNode;
}

export function ModalClose({
  children,
  onClick,
  ...rest
}: Readonly<ModalCloseProps>) {
  const { closeModal } = useModalInternal();
  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error(
      "[WonDesign Headless] ModalClose must be used inside a ModalContent.",
    );
  }

  const finalOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) closeModal();
  };

  return (
    <Button {...rest} onClick={finalOnClick}>
      {children}
    </Button>
  );
}
