import { useContext, useId, useLayoutEffect } from "react";

import { AsChild } from "@/AsChild/AsChild";
import { ContentContext, useModalInternal } from "./contexts";

export interface ModalTitleProps extends Omit<
  React.ComponentProps<"h2">,
  "children" | "id"
> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function ModalTitle({
  children,
  asChild = false,
  ...rest
}: Readonly<ModalTitleProps>) {
  const { setTitleId, scopeKey } = useModalInternal();
  const titleId = useId();
  const isInsideContent = useContext(ContentContext) === scopeKey;

  useLayoutEffect(() => {
    setTitleId(titleId);
    return () => setTitleId(undefined);
  }, [titleId, setTitleId]);

  if (!isInsideContent) {
    throw new Error(
      "[WonDesign Headless] ModalTitle must be used inside a ModalContent.",
    );
  }

  const Component = asChild ? AsChild : "h2";

  return (
    <Component {...rest} id={titleId}>
      {children}
    </Component>
  );
}
