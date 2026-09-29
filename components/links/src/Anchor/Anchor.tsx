import {
  Anchor as A,
  type AnchorProps as Props,
} from "@wondesign/headless/Anchor";
import { clsx } from "clsx";

import { styles } from "./styles.css";

export type AnchorProps = Props;

export function Anchor({
  children,
  className,
  ...rest
}: Readonly<AnchorProps>) {
  return (
    <A {...rest} className={clsx(styles.anchor, className)}>
      {children}
    </A>
  );
}
