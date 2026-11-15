import { useContext } from "react";

import { ContentContext, useTooltipInternal } from "./contexts";

export interface TooltipArrowProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "aria-hidden"
> {
  children?: React.ReactNode;
}

export function TooltipArrow({
  children,
  className,
  ...rest
}: Readonly<TooltipArrowProps>) {
  const { arrowRef } = useTooltipInternal();
  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error(
      `[WonDesign Headless] TooltipArrow must be used inside a TooltipContent.`,
    );
  }

  return (
    <div ref={arrowRef} className={className} {...rest} aria-hidden="true">
      {children}
    </div>
  );
}
