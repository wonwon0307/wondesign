import { clsx } from "clsx";

import { styles } from "./styles.css";

type TagOptions = Pick<
  React.JSX.IntrinsicElements,
  "p" | "span" | "div" | "figcaption" | "dd"
>;

export interface DescriptionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: keyof TagOptions;
  ref?: React.Ref<HTMLElement>;
  size?: "small" | "medium" | "large";
  tone?: "default" | "muted" | "danger" | "success";
  wrap?: "balance" | "pretty";
  maxNumLines?: number;
  lineLength?: number | "full";
}

export function Description({
  children,
  as = "p",
  ref,
  size = "medium",
  tone = "default",
  wrap = "pretty",
  maxNumLines = 0,
  lineLength = 60,
  className,
  style,
  ...rest
}: Readonly<DescriptionProps>) {
  const Component = as as React.ElementType;
  const clamped = maxNumLines > 0;

  // lineLength 0 or smaller falls back to full
  const finalLineLength =
    lineLength === "full" || lineLength <= 0 ? "full" : lineLength;
  const maxWidth = finalLineLength === "full" ? "100%" : `${finalLineLength}ch`;

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(
        styles.description({ size, tone, wrap, clamped }),
        className,
      )}
      style={{
        maxWidth,
        ...style,
        ...(clamped && { WebkitLineClamp: maxNumLines }),
      }}
    >
      {children}
    </Component>
  );
}
