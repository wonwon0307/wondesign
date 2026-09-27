import {
  TooltipContent as Content,
  useTooltip,
  type TooltipContentProps,
} from "@wondesign/headless/Tooltip";
import { clsx } from "clsx";

import { styles } from "./styles.css";

export function TooltipContent({
  children,
  className,
  style,
  ...rest
}: Readonly<TooltipContentProps>) {
  const { content: contentPosition } = useTooltip();

  return (
    <Content
      {...rest}
      className={clsx(styles.baseContent, className)}
      style={{
        ...style,
        transform: `translate3d(${contentPosition.x}px, ${contentPosition.y}px, 0)`,
      }}
    >
      {children}
    </Content>
  );
}
