import { clsx } from "clsx";

import { Anchor, type AnchorProps } from "@/Anchor/Anchor";
import { styles } from "./styles.css";

export interface FormLinkProps extends Omit<AnchorProps, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "destructive";
  size?: "small" | "medium" | "large";
  outlined?: boolean;
  stretch?: boolean;
}

export function FormLink({
  children,
  variant = "primary",
  size = "medium",
  outlined = false,
  stretch = false,
  className,
  ...rest
}: Readonly<FormLinkProps>) {
  const finalVariant =
    `${variant}-${outlined ? "outlined" : "filled"}` as const;

  return (
    <Anchor
      {...rest}
      className={clsx(
        styles.formLink({
          variant: finalVariant,
          size,
          stretch,
        }),
        className,
      )}
    >
      {children}
    </Anchor>
  );
}
