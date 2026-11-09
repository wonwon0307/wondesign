import { clsx } from "clsx";

import { Anchor, type AnchorProps } from "@/Anchor/Anchor";
import { styles } from "./styles.css";

export interface HyperlinkProps extends Omit<AnchorProps, "children"> {
  children: React.ReactNode;
  appearance?: "default" | "primary" | "muted" | "inherit";
  underline?: "hover" | "always" | "none";
}

export function Hyperlink({
  children,
  appearance = "default",
  underline = "hover",
  className,
  ...props
}: Readonly<HyperlinkProps>) {
  const finalUnderline = appearance === "inherit" ? "always" : underline;

  return (
    <Anchor
      className={clsx(
        styles.link({ appearance, underline: finalUnderline }),
        className,
      )}
      {...props}
    >
      {children}
    </Anchor>
  );
}
