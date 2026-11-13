import { AsChild } from "@/AsChild/AsChild";
import { useToastInternal } from "./contexts";

export interface ToastDescriptionProps
  extends
    Omit<React.HTMLAttributes<HTMLParagraphElement>, "children">,
    React.RefAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function ToastDescription({
  children,
  asChild = false,
  ...rest
}: Readonly<ToastDescriptionProps>) {
  useToastInternal(
    "[WonDesign Headless] ToastDescription must be used within a Toast component.",
  );

  const Component = asChild ? AsChild : "p";

  return <Component {...rest}>{children}</Component>;
}
