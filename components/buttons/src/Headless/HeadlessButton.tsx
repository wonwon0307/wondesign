import { type ButtonHTMLAttributes } from "react";
import { AsChild } from "@wondesign/components-core/asChild";

export interface ButtonProps
  extends
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      "disabled" | "aria-disabled" | "aria-busy" | "role"
    >,
    React.RefAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  isLoading?: boolean;
  asChild?: boolean;
}

export function HeadlessButton({
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

  if (asChild) {
    return (
      <AsChild
        {...rest}
        ref={ref}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-disabled={isDisabled ? "true" : undefined}
        aria-busy={isLoading ? "true" : undefined}
        data-loading={isLoading}
        data-disabled={isDisabled}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <button
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
    </button>
  );
}
