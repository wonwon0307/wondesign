export interface HeadlessAnchorProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel" | "aria-disabled"
> {
  ref?: React.Ref<HTMLAnchorElement>;
  as?: React.ElementType;
  isDisabled?: boolean;
  openInNewTab?: boolean;
}

export function HeadlessAnchor({
  children,
  href,
  onClick,
  onKeyDown,
  isDisabled = false,
  openInNewTab,
  as: Component = "a",
  tabIndex,
  ...rest
}: Readonly<HeadlessAnchorProps>) {
  const isExternal = !!href && (href.includes("://") || href.startsWith("//"));
  const newTab = openInNewTab ?? isExternal;

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
      tabIndex={isDisabled ? -1 : tabIndex}
      aria-disabled={isDisabled || undefined}
      data-disabled={isDisabled || undefined}
      data-external={isExternal || undefined}
      data-new-tab={newTab || undefined}
    >
      {children}
    </Component>
  );
}
