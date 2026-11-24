import { AsChild } from "@/AsChild/AsChild";

export interface ButtonProps extends Omit<
  React.ComponentProps<"button">,
  "disabled" | "aria-disabled" | "aria-busy"
> {
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
      type={type}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-disabled={disableEvents || undefined}
      aria-busy={isLoading || undefined}
      data-disabled={isDisabled || undefined}
      data-loading={isLoading || undefined}
    >
      {children}
    </Component>
  );
}
