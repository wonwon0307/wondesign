import { useContext } from "react";

import { ContentContext, usePopoverInternal } from "./contexts";

export interface PopoverArrowProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "aria-hidden"
> {
  children?: React.ReactNode;
}

export function PopoverArrow({
  children,
  ...rest
}: Readonly<PopoverArrowProps>) {
  const { placement, arrowRef } = usePopoverInternal();
  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error(
      "[WonDesign Headless] PopoverArrow must be used within PopoverContent.",
    );
  }

  return (
    <div {...rest} ref={arrowRef} aria-hidden="true" data-placement={placement}>
      {children}
    </div>
  );
}
