import { clsx } from "clsx";

import { styles } from "./styles.css";

type TagOptions = Pick<React.JSX.IntrinsicElements, "p" | "div" | "span">;

export interface ParagraphProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: keyof TagOptions;
  ref?: React.Ref<HTMLElement>;
  size?: "small" | "medium" | "large";
  tone?: "default" | "muted";
  maxNumLines?: number;
}

export function Paragraph({
  children,
  as = "p",
  ref,
  size = "medium",
  tone = "default",
  maxNumLines = 0,
  className,
  style,
  ...rest
}: Readonly<ParagraphProps>) {
  const Component = as as React.ElementType;
  const clamped = maxNumLines > 0;

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(styles.paragraph({ size, tone, clamped }), className)}
      style={clamped ? { ...style, WebkitLineClamp: maxNumLines } : style}
    >
      {children}
    </Component>
  );
}
