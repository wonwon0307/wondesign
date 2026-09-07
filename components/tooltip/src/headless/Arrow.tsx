import { useContext } from "react";

import { ContentContext, useTooltip } from "./contexts";

export interface TooltipArrowProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "aria-hidden"
> {
  children: React.ReactNode;
}

export function TooltipArrow({
  children,
  className,
  style,
  ...rest
}: Readonly<TooltipArrowProps>) {
  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error(`Tooltip.Arrow must be used inside Tooltip.Content.`);
  }

  const { arrow, arrowRef } = useTooltip("Arrow");

  return (
    <div
      ref={arrowRef}
      style={
        {
          ...style,
          "--wds-tooltip-arrow-x": `${arrow.x}px`,
          "--wds-tooltip-arrow-y": `${arrow.y}px`,
        } as React.CSSProperties
      }
      className={className}
      {...rest}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
