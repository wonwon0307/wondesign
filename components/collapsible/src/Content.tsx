import { AsChild } from "@wondesign/composition/asChild";

import { useCollapsible } from "./contexts";

export interface CollapsibleContentProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "id" | "hidden" | "aria-hidden" | "role" | "aria-labelledby"
> {
  children: React.ReactNode; // 필수로 만든다
  asChild?: boolean;
  role?: "region" | "group";
}

export function CollapsibleContent({
  children,
  asChild,
  role = asChild ? undefined : "group",
  ...rest
}: Readonly<CollapsibleContentProps>) {
  const { isOpen, keepMounted, contentId, toggleId } =
    useCollapsible("Content");

  if (!keepMounted && !isOpen) {
    return null;
  }

  const Component = asChild ? AsChild : "div";

  return (
    <Component
      {...rest}
      id={contentId}
      role={role}
      hidden={!isOpen}
      aria-labelledby={role === "region" ? toggleId : undefined}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </Component>
  );
}
