import { AsChild } from "@/AsChild/AsChild";
import { useToastInternal } from "./contexts";

export interface ToastDescriptionProps extends Omit<
  React.ComponentProps<"p">,
  "children"
> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function ToastDescription({
  children,
  asChild = false,
  ...rest
}: Readonly<ToastDescriptionProps>) {
  useToastInternal(
    "[WonDesign Headless] ToastDescription must be used inside a Toast component.",
  );

  const Component = asChild ? AsChild : "p";

  return <Component {...rest}>{children}</Component>;
}
