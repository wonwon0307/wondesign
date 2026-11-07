import { clsx } from "clsx";

import { styles } from "./styles.css";

type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "aria-hidden">,
    React.RefAttributes<HTMLDivElement> {
  circle?: boolean;
  animation?: SkeletonAnimation;
  lines?: number;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  circle = false,
  animation = "pulse",
  lines = 1,
  width,
  height,
  className,
  style,
  ...rest
}: Readonly<SkeletonProps>) {
  if (lines > 1) {
    return (
      <div
        {...rest}
        aria-hidden="true"
        className={clsx(styles.lines, className)}
        style={{ ...style, width }}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={styles.skeleton({ animation })}
            style={{ width: i === lines - 1 ? "60%" : "100%", height }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      {...rest}
      aria-hidden="true"
      className={clsx(styles.skeleton({ animation, circle }), className)}
      style={{ ...style, width, height: circle ? width : height }}
    />
  );
}
