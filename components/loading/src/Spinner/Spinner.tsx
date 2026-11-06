import { AppIcon, type IconName, type IconProps } from "@wondesign/icons";
import { clsx } from "clsx";

import { styles } from "./styles.css";

type SpinnerVariant = "default" | "tail" | "line" | "bubble";

export interface SpinnerProps extends Omit<IconProps, "icon"> {
  variant?: SpinnerVariant;
  speed?: "slow" | "normal" | "fast";
}

const map: Record<SpinnerVariant, IconName> = {
  default: "loading",
  tail: "loading-tail",
  line: "loading-line",
  bubble: "loading-bubble",
};

export function Spinner({
  variant = "default",
  size = "1.25em",
  speed = "normal",
  className,
  ...rest
}: Readonly<SpinnerProps>) {
  return (
    <AppIcon
      {...rest}
      size={size}
      icon={map[variant]}
      aria-hidden="true"
      className={clsx(styles.spinner({ speed }), className)}
    />
  );
}
