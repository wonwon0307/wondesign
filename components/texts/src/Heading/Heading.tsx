import { clsx } from "clsx";

import { styles } from "./styles.css";

type TagOptions = Pick<
  React.JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;

type HeadingVariants = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingVariants;
  children: React.ReactNode;
  size?: "smaller" | "normal" | "larger";
  maxNumLines?: number;
  ref?: React.Ref<HTMLHeadingElement>;
}

const tagMap: Record<HeadingVariants, keyof TagOptions> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

export function Heading({
  level,
  children,
  size = "normal",
  maxNumLines = 1,
  className,
  style,
  ref,
  ...rest
}: Readonly<HeadingProps>) {
  const Component = tagMap[level];
  const clamped = maxNumLines > 0;

  const finalLevel = () => {
    if (size === "smaller") return Math.min(level + 1, 6) as HeadingVariants;
    if (size === "larger") return Math.max(level - 1, 1) as HeadingVariants;
    return level;
  };

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(
        styles.heading({ level: finalLevel(), clamped }),
        className,
      )}
      style={clamped ? { ...style, WebkitLineClamp: maxNumLines } : style}
    >
      {children}
    </Component>
  );
}
