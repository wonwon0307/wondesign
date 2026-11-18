import { useContext, useMemo } from "react";

import { mergeRef } from "@/utils";
import { ContentContext, useTooltipInternal } from "./contexts";

export interface TooltipArrowProps extends Omit<
  React.ComponentProps<"div">,
  "children" | "aria-hidden"
> {
  children?: React.ReactNode;
}

export function TooltipArrow({
  children,
  ref,
  ...rest
}: Readonly<TooltipArrowProps>) {
  const { placement, arrowRef, scopeKey } = useTooltipInternal();
  const isInsideContent = useContext(ContentContext) === scopeKey;
  const mergedRef = useMemo(() => mergeRef(arrowRef, ref), [arrowRef, ref]);

  if (!isInsideContent) {
    throw new Error(
      `[WonDesign Headless] TooltipArrow must be used inside a TooltipContent.`,
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
