import {
  Tooltip as Headless,
  type TooltipProps as HeadlessProps,
} from "@wondesign/headless-ui/Tooltip";
import { Text } from "@wondesign/texts/Text";
import clsx from "clsx";

import { TooltipArrow } from "./Arrow/Arrow";
import { TooltipMessage } from "./Message/Message";
import { styles } from "./styles.css";

export interface TooltipProps extends HeadlessProps {
  content?: React.ReactNode;
  text?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  hideArrow?: boolean;
  /**
   * If true, the children itself will be used as the trigger for the tooltip.
   * Use it if the children is a button, link or any other interactive element
   */
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
      <Headless {...rest}>
        <Headless.Trigger
          asChild={asChild}
          className={clsx(styles.trigger, className)}
          style={style}
        >
          {children}
        </Headless.Trigger>
        <Headless.Content className={styles.content} asChild>
          {content}
        </Headless.Content>
      </Headless>
    );
  }

  if (!text) {
    console.warn(
      "[WonDesign] Tooltip: You must provide either `content` or `text` prop to render the tooltip content.",
    );
  }

  return (
    <Headless {...rest}>
      <Headless.Trigger
        asChild={asChild}
        className={clsx(styles.trigger, className)}
        style={style}
      >
        {children}
      </Headless.Trigger>
      <Headless.Content className={styles.content}>
        {left}
        {text && (
          <TooltipMessage asChild>
            <Text variant="bodySmall">{text}</Text>
          </TooltipMessage>
        )}
        {right}
        {!hideArrow && (
          <TooltipArrow>
            <svg viewBox="0 0 8 8" className={styles.arrow} aria-hidden="true">
              <polygon points="4,0 8,4 4,8 0,4" />
            </svg>
          </TooltipArrow>
        )}
      </Headless.Content>
    </Headless>
  );
}
