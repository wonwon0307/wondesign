import { useContext, useId, useLayoutEffect } from "react";

import { AsChild } from "@/AsChild/AsChild";
import { ContentContext, useModalInternal } from "./contexts";

export interface ModalTitleProps
  extends
    Omit<React.HTMLAttributes<HTMLHeadingElement>, "children" | "id">,
    React.RefAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function ModalTitle({
  children,
  asChild = false,
  ...rest
}: Readonly<ModalTitleProps>) {
  const { setTitleId } = useModalInternal();
  const titleId = useId();
  const isInsideContent = useContext(ContentContext);

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
