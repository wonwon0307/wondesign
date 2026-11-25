export interface AnchorProps extends Omit<
  React.ComponentProps<"a">,
  "target" | "rel" | "aria-disabled"
> {
  as?: React.ElementType;
  isDisabled?: boolean;
  openInNewTab?: boolean;
}

export function Anchor({
  children,
  as = "a",
  role,
  href,
  onClick,
  onKeyDown,
  isDisabled = false,
  openInNewTab,
  tabIndex,
  ...rest
}: Readonly<AnchorProps>) {
  const Component = isDisabled ? "a" : as;
  const isExternal =
    !!href &&
    (href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("//"));
  const newTab = openInNewTab ?? isExternal;

  const doNothingOnClick = (e: React.MouseEvent) => {
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

  const finalRole = role ?? (isDisabled ? "link" : undefined);
  const finalTabIndex = isDisabled ? (tabIndex ?? 0) : tabIndex;

  return (
    <Component
      {...rest}
      role={finalRole}
      href={isDisabled ? undefined : href}
      onClick={isDisabled ? doNothingOnClick : onClick}
      onKeyDown={isDisabled ? doNothingOnKeyDown : onKeyDown}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      tabIndex={finalTabIndex}
      aria-disabled={isDisabled || undefined}
      data-disabled={isDisabled || undefined}
      data-external={isExternal || undefined}
      data-new-tab={newTab || undefined}
    >
      {children}
    </Component>
  );
}
