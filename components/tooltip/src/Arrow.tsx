import {
  TooltipArrow as Arrow,
  useTooltip,
  type TooltipArrowProps as Props,
} from "@wondesign/headless/Tooltip";
import { clsx } from "clsx";

import { styles } from "./styles.css";

export interface TooltipArrowProps extends Omit<Props, "children"> {
  children?: React.ReactNode;
}

export function TooltipArrow({
  children = <DefaultArrow />,
  className,
  style,
  ...rest
}: Readonly<TooltipArrowProps>) {
  const { arrow: arrowPosition } = useTooltip();

  return (
    <Arrow
      {...rest}
      className={clsx(styles.baseArrow, className)}
      style={{
        ...style,
        transform: `translate3d(${arrowPosition.x}px, ${arrowPosition.y}px, 0)`,
      }}
    >
      {children}
    </Arrow>
  );
}

function DefaultArrow() {
  return (
    <svg viewBox="0 0 8 8" className={styles.arrowIcon} aria-hidden="true">
      <polygon points="4,0 8,4 4,8 0,4" />
    </svg>
  );
}
