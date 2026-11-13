import { AsChild } from "@/AsChild/AsChild";
import { useToastInternal } from "./contexts";

export interface ToastMessageProps
  extends
    Omit<React.HTMLAttributes<HTMLHeadingElement>, "children">,
    React.RefAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function ToastMessage({
  children,
  asChild = false,
  ...rest
}: Readonly<ToastMessageProps>) {
  useToastInternal(
    "[WonDesign Headless] ToastMessage must be used within a Toast component.",
  );

  const Component = asChild ? AsChild : "h3";

  return <Component {...rest}>{children}</Component>;
}
