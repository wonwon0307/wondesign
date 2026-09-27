import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  useTooltip,
  type TooltipProps as Props,
} from "@wondesign/headless/Tooltip";
import { clsx } from "clsx";

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
  return (
    <TooltipProvider {...rest}>
      <TooltipTrigger
        asChild={asChild}
        className={clsx(styles.trigger, className)}
        style={style}
      >
        {children}
      </TooltipTrigger>
      <TooltipBody
        content={content}
        text={text}
        left={left}
        right={right}
        hideArrow={hideArrow}
      />
    </TooltipProvider>
  );
}

interface TooltipBodyProps {
  content?: React.ReactNode;
  text?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  hideArrow: boolean;
}

function TooltipBody({
  content,
  text,
  left,
  right,
  hideArrow,
}: Readonly<TooltipBodyProps>) {
  const { content: contentPosition, arrow: arrowPosition } = useTooltip();
  const contentStyle: React.CSSProperties = {
    transform: `translate3d(${contentPosition.x}px, ${contentPosition.y}px, 0)`,
  };

  if (content) {
    return (
      <TooltipContent className={styles.content} style={contentStyle} asChild>
        {content}
      </TooltipContent>
    );
  }

  // content도 없고 text도 없으면 경고 메시지 출력
  if (!text) {
    console.warn(
      "[WonDesign] Tooltip: You must provide either `content` or `text` prop to render the tooltip content.",
    );
  }

  return (
    <TooltipContent className={styles.content} style={contentStyle}>
      {left}
      <span>{text}</span>
      {right}
      {!hideArrow && (
        <TooltipArrow
          className={styles.arrow}
          style={{
            transform: `translate3d(${arrowPosition.x}px, ${arrowPosition.y}px, 0)`,
          }}
        >
          <svg
            viewBox="0 0 8 8"
            className={styles.arrowIcon}
            aria-hidden="true"
          >
            <polygon points="4,0 8,4 4,8 0,4" />
          </svg>
        </TooltipArrow>
      )}
    </TooltipContent>
  );
}
