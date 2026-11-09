import { AppIcon, type IconName, type IconProps } from "@wondesign/icons";
import { clsx } from "clsx";

import { styles } from "./styles.css";

type SpinnerAppearance = "default" | "tail" | "line" | "bubble";

export interface SpinnerProps extends Omit<IconProps, "icon" | "aria-hidden"> {
  appearance?: SpinnerAppearance;
  speed?: "slow" | "normal" | "fast";
}

const map: Record<SpinnerAppearance, IconName> = {
  default: "loading",
  tail: "loading-tail",
  line: "loading-line",
  bubble: "loading-bubble",
};

export function Spinner({
  appearance = "default",
  size = "1.25em",
  speed = "normal",
  className,
  ...rest
}: Readonly<SpinnerProps>) {
  return (
    <AppIcon
      {...rest}
      size={size}
      icon={map[appearance]}
      aria-hidden="true"
      className={clsx(styles.spinner({ speed }), className)}
    />
  );
}
