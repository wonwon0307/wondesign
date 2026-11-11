import { AsChild } from "@/AsChild/AsChild";
import { useToastInternal } from "./contexts";

export interface ToastMessageProps
  extends
    Omit<React.HTMLAttributes<HTMLParagraphElement>, "children">,
    React.RefAttributes<HTMLParagraphElement> {
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

  const Component = asChild ? AsChild : "p";

  return <Component {...rest}>{children}</Component>;
}
