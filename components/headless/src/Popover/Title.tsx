import { useContext, useId, useLayoutEffect } from "react";

import { AsChild } from "@/AsChild/AsChild";
import { ContentContext, usePopoverInternal } from "./contexts";

export interface PopoverTitleProps extends Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  "children" | "id"
> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function PopoverTitle({
  children,
  asChild = false,
  ...rest
}: Readonly<PopoverTitleProps>) {
  const { setTitleId } = usePopoverInternal();
  const titleId = useId();
  const isInsideContent = useContext(ContentContext);

  useLayoutEffect(() => {
    setTitleId(titleId);
    return () => setTitleId(undefined);
  }, [titleId, setTitleId]);

  if (!isInsideContent) {
    throw new Error(
      "[WonDesign Headless] PopoverTitle must be used within PopoverContent.",
    );
  }

  const Component = asChild ? AsChild : "h2";

  return (
    <Component {...rest} id={titleId}>
      {children}
    </Component>
  );
}
