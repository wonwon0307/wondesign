import { AsChild } from "@/AsChild/AsChild";
import { useToastInternal } from "./contexts";

export interface ToastMessageProps extends Omit<
  React.ComponentProps<"h3">,
  "children"
> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function ToastMessage({
  children,
  asChild = false,
  ...rest
}: Readonly<ToastMessageProps>) {
  useToastInternal(
    "[WonDesign Headless] ToastMessage must be used inside a Toast component.",
  );

  const Component = asChild ? AsChild : "h3";

  return <Component {...rest}>{children}</Component>;
}
