import { useContext, useMemo } from "react";

import { mergeRef } from "@/utils";
import { ContentContext, usePopoverInternal } from "./contexts";

export interface PopoverArrowProps extends Omit<
  React.ComponentProps<"div">,
  "children" | "aria-hidden"
> {
  children?: React.ReactNode;
}

export function PopoverArrow({
  children,
  ref,
  ...rest
}: Readonly<PopoverArrowProps>) {
  const { placement, arrowRef, scopeKey } = usePopoverInternal();
  const isInsideContent = useContext(ContentContext) === scopeKey;
  const mergedRef = useMemo(() => mergeRef(arrowRef, ref), [arrowRef, ref]);

  if (!isInsideContent) {
    throw new Error(
      "[WonDesign Headless] PopoverArrow must be used inside a PopoverContent.",
    );
  }

  return (
    <div
      {...rest}
      ref={mergedRef}
      aria-hidden="true"
      data-placement={placement}
    >
      {children}
    </div>
  );
}
