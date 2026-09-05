import { useTooltip } from "./contexts";

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
  const { arrowPosition, arrowRef } = useTooltip("Arrow");

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
