import { Description } from "@wondesign/texts/Description";
import clsx from "clsx";

import {
  TooltipProvider,
  type HeadlessTooltipProps,
} from "@/headless/Provider";
import { TooltipTrigger } from "@/headless/Trigger";
import { TooltipContent } from "@/headless/Content";
import { TooltipArrow } from "@/headless/Arrow";
import { styles } from "./styles.css";

export interface TooltipProps extends HeadlessTooltipProps {
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
  if (content) {
    return (
      <TooltipProvider {...rest}>
        <TooltipTrigger
          asChild={asChild}
          className={clsx(styles.trigger, className)}
          style={style}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent className={styles.content} asChild>
          {content}
        </TooltipContent>
      </TooltipProvider>
    );
  }

  // content도 없고 text도 없으면 경고 메시지 출력
  if (!text) {
    console.warn(
      "[WonDesign] Tooltip: You must provide either `content` or `text` prop to render the tooltip content.",
    );
  }

  const isString = typeof text === "string";

  return (
    <TooltipProvider {...rest}>
      <TooltipTrigger
        asChild={asChild}
        className={clsx(styles.trigger, className)}
        style={style}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent className={styles.content}>
        {left}
        {isString ? <Description size="small">{text}</Description> : text}
        {right}
        {!hideArrow && (
          <TooltipArrow>
            <svg viewBox="0 0 8 8" className={styles.arrow} aria-hidden="true">
              <polygon points="4,0 8,4 4,8 0,4" />
            </svg>
          </TooltipArrow>
        )}
      </TooltipContent>
    </TooltipProvider>
  );
}
