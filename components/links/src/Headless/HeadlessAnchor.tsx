export interface HeadlessAnchorProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel" | "aria-disabled" | "aria-current"
> {
  as?: React.ElementType;
  isDisabled?: boolean;
  isNewTab?: boolean;
}

export function HeadlessAnchor({
  children,
  href,
  onClick,
  onKeyDown,
  isDisabled = false,
  isNewTab,
  as: Component = "a",
  ...rest
}: Readonly<HeadlessAnchorProps>) {
  const isExternal = !!href && (href.includes("://") || href.startsWith("//"));
  const newTab = isNewTab ?? isExternal;

  const doNothingOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => e.preventDefault();

  const doNothingOnKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
    } else {
      onKeyDown?.(e);
    }
  };

  return (
    <Component
      {...rest}
      href={isDisabled ? undefined : href}
      onClick={isDisabled ? doNothingOnClick : onClick}
      onKeyDown={isDisabled ? doNothingOnKeyDown : onKeyDown}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? -1 : undefined}
    >
      {children}
    </Component>
  );
}
