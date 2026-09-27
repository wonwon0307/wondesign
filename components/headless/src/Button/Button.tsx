import { AsChild } from "@/AsChild/AsChild";

export interface ButtonProps
  extends
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "disabled" | "aria-disabled" | "aria-busy"
    >,
    React.RefAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  isLoading?: boolean;
  asChild?: boolean;
}

export function Button({
  children,
  isDisabled = false,
  isLoading = false,
  asChild = false,
  onClick,
  onKeyDown,
  type = "button",
  ref,
  ...rest
}: Readonly<ButtonProps>) {
  const disableEvents = isDisabled || isLoading;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disableEvents) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disableEvents && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onKeyDown?.(event);
  };

  const Component = asChild ? AsChild : "button";

  return (
    <Component
      {...rest}
      ref={ref}
      type={type}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-disabled={isDisabled ? "true" : undefined}
      aria-busy={isLoading ? "true" : undefined}
      data-loading={isLoading}
      data-disabled={isDisabled}
    >
      {children}
    </Component>
  );
}
