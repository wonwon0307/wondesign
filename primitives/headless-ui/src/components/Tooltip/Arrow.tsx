import { useContext } from "react";

import { ContentContext, TooltipContext } from "./_internals/contexts";

export interface TooltipArrowProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "aria-hidden"
> {
  children: React.ReactNode;
  // context가 없는 경우에 대한 에러 메시지
  ctxErrMsg?: string;
}

export function TooltipArrow({
  children,
  className,
  style,
  ctxErrMsg = "Tooltip.Arrow must be used inside the Tooltip wrapper.",
  ...rest
}: Readonly<TooltipArrowProps>) {
  const context = useContext(TooltipContext);
  const isInsideContent = useContext(ContentContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  if (!isInsideContent) {
    throw new Error("Tooltip.Arrow must be used inside Tooltip.Content.");
  }

  const { arrowPosition, arrowRef } = context;

  return (
    <div
      ref={arrowRef}
      style={{
        position: "absolute",
        left: arrowPosition.x,
        top: arrowPosition.y,
        ...style,
      }}
      className={className}
      {...rest}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
