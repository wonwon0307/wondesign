import { clsx } from "clsx";

import { styles } from "./styles.css";

export interface SeparatorProps extends React.HTMLAttributes<HTMLElement> {
  // appearance?: "line" | "dashed" | "dotted";
  variant?: "decorative" | "theme-break";
  vertical?: boolean;
  bold?: boolean;
}

export function Separator({
  variant = "decorative",
  bold = false,
  vertical = false,
  className,
  ...rest
}: Readonly<SeparatorProps>) {
  const isDecorative = variant === "decorative";
  const orientation = vertical ? "vertical" : "horizontal";
  // theme-break이면 hr 사용을 고려해보기
  // 단, hr을 사용하려면 reset-css에서 hr을 초기화해야 함.

  return (
    <div
      {...rest}
      role={isDecorative ? undefined : "separator"}
      aria-hidden={isDecorative ? true : undefined}
      aria-orientation={isDecorative ? undefined : orientation}
      className={clsx(styles[orientation]({ bold }), className)}
    />
  );
}
