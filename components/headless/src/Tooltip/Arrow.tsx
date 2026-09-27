import { useContext } from "react";

import { ContentContext, useTooltipInternal } from "./contexts";

export interface TooltipArrowProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "aria-hidden"
> {
  children: React.ReactNode;
}

export function TooltipArrow({
  children,
  className,
  ...rest
}: Readonly<TooltipArrowProps>) {
  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error(
      `[WonDesign Headless] Tooltip.Arrow must be used inside Tooltip.Content.`,
    );
  }

  const { arrowRef } = useTooltipInternal();

  return (
    <div ref={arrowRef} className={className} {...rest} aria-hidden="true">
      {children}
    </div>
  );
}
