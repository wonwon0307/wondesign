import {
  TooltipProvider,
  type TooltipProps as Props,
} from "@wondesign/headless/Tooltip";

import { TooltipContent } from "./Content";
import { TooltipArrow } from "./Arrow";
import { TooltipTrigger } from "./Trigger";
import { styles } from "./styles.css";

export interface TooltipProps extends Props {
  content?: React.ReactNode;
  text?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  hideArrow?: boolean;
  asChild?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Tooltip({
  children,
  content,
  text,
  left,
  right,
  hideArrow = false,
  asChild,
  className,
  style,
  ...rest
}: Readonly<TooltipProps>) {
  if (!content && !text) {
    console.warn(
      "[WonDesign Tooltip] You must provide either `content` or `text` prop to render the tooltip content.",
    );
  }

  return (
    <TooltipProvider {...rest}>
      <TooltipTrigger asChild={asChild} className={className} style={style}>
        {children}
      </TooltipTrigger>
      <TooltipContent asChild={!!content} className={styles.content}>
        {content ?? (
          <>
            {left}
            <span>{text}</span>
            {right}
            {!hideArrow && <TooltipArrow className={styles.arrow} />}
          </>
        )}
      </TooltipContent>
    </TooltipProvider>
  );
}
