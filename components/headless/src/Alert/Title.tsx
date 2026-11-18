import { useContext, useId, useLayoutEffect } from "react";

import { AsChild } from "@/AsChild/AsChild";
import { ContentContext, useAlertInternal } from "./contexts";

export interface AlertTitleProps extends Omit<
  React.ComponentProps<"h2">,
  "children" | "id"
> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function AlertTitle({
  children,
  asChild = false,
  ...rest
}: Readonly<AlertTitleProps>) {
  const { setTitleId } = useAlertInternal();
  const titleId = useId();
  const isInsideContent = useContext(ContentContext);

  useLayoutEffect(() => {
    setTitleId(titleId);

    return () => setTitleId(undefined);
  }, [titleId, setTitleId]);

  if (!isInsideContent) {
    throw new Error(
      "[WonDesign Headless] AlertTitle must be used inside an AlertContent.",
    );
  }

  const Component = asChild ? AsChild : "h2";

  return (
    <Component {...rest} id={titleId}>
      {children}
    </Component>
  );
}
