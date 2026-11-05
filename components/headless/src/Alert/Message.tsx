import { useContext, useId, useLayoutEffect } from "react";

import { AsChild } from "@/AsChild/AsChild";
import { ContentContext, useAlertInternal } from "./contexts";

export interface AlertMessageProps
  extends
    Omit<React.HTMLAttributes<HTMLParagraphElement>, "children" | "id">,
    React.RefAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function AlertMessage({
  children,
  asChild = false,
  ...rest
}: Readonly<AlertMessageProps>) {
  const { setMessageId } = useAlertInternal();
  const messageId = useId();
  const isInsideContent = useContext(ContentContext);

  useLayoutEffect(() => {
    setMessageId(messageId);

    return () => setMessageId(undefined);
  }, [messageId, setMessageId]);

  if (!isInsideContent) {
    throw new Error(
      "[WonDesign Headless] AlertMessage must be used within AlertContent.",
    );
  }

  const Component = asChild ? AsChild : "p";

  return (
    <Component {...rest} id={messageId}>
      {children}
    </Component>
  );
}
