import { HeadlessAnchor, type HeadlessAnchorProps } from "@/Headless";
import clsx from "clsx";

import { styles } from "./styles.css";

export type AnchorProps = HeadlessAnchorProps;

export function Anchor({
  children,
  className,
  ...rest
}: Readonly<AnchorProps>) {
  return (
    <HeadlessAnchor {...rest} className={clsx(styles.anchor, className)}>
      {children}
    </HeadlessAnchor>
  );
}
