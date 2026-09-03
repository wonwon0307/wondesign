import clsx from "clsx";

import { Anchor, type AnchorProps } from "@/Anchor";
import { styles } from "./styles.css";

export interface HyperlinkProps extends Omit<AnchorProps, "children"> {
  children: React.ReactNode;
  appearance?: "default" | "primary" | "muted" | "inverted";
  //visited?: boolean;
}

export function Hyperlink({
  children,
  appearance = "default",
  //visited = false,
  className,
  ...props
}: Readonly<HyperlinkProps>) {
  return (
    <Anchor className={clsx(styles.link({ appearance }), className)} {...props}>
      {children}
    </Anchor>
  );
}
