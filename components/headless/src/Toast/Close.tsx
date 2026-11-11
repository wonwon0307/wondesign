import { Button, type ButtonProps } from "@/Button/Button";
import { useToastInternal } from "./contexts";

export interface ToastCloseProps extends Omit<
  ButtonProps,
  "children" | "type"
> {
  children: React.ReactNode;
}

export function ToastClose({
  children,
  onClick,
  ...rest
}: Readonly<ToastCloseProps>) {
  const { dismissToast } = useToastInternal(
    "[WonDesign Headless] ToastClose must be used within a Toast component.",
  );

  const finalOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) dismissToast();
  };

  return (
    <Button {...rest} onClick={finalOnClick} type="button">
      {children}
    </Button>
  );
}
