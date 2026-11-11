import { AsChild } from "@/AsChild/AsChild";
import { useToastInternal } from "./contexts";

export interface ToastTitleProps
  extends
    Omit<React.HTMLAttributes<HTMLHeadingElement>, "children">,
    React.RefAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function ToastTitle({
  children,
  asChild = false,
  ...rest
}: Readonly<ToastTitleProps>) {
  useToastInternal(
    "[WonDesign Headless] ToastTitle must be used within a Toast component.",
  );

  const Component = asChild ? AsChild : "h3";

  return <Component {...rest}>{children}</Component>;
}
