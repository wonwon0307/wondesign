export interface HeadlessAnchorProps
  extends
    Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      "target" | "rel" | "aria-disabled"
    >,
    React.RefAttributes<HTMLAnchorElement> {
  as?: React.ElementType;
  isDisabled?: boolean;
  openInNewTab?: boolean;
}

export function HeadlessAnchor({
  children,
  as = "a",
  href,
  onClick,
  onKeyDown,
  isDisabled = false,
  openInNewTab,
  tabIndex,
  ...rest
}: Readonly<HeadlessAnchorProps>) {
  const Component = isDisabled ? "a" : as;
  const isExternal =
    !!href &&
    (href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("//"));
  const newTab = openInNewTab ?? isExternal;

  const doNothingOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const doNothingOnKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
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
