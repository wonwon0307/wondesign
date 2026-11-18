import { useId, useLayoutEffect } from "react";

import { AsChild } from "@/AsChild/AsChild";
import { ContentContext, useCollapsibleInternal } from "./contexts";

export interface CollapsibleContentProps extends Omit<
  React.ComponentProps<"div">,
  "children" | "id" | "hidden" | "aria-hidden" | "role" | "aria-labelledby"
> {
  children: React.ReactNode; // 필수로 만든다
  asChild?: boolean;
  role?: "region" | "group";
}

export function CollapsibleContent({
  children,
  asChild = false,
  role = asChild ? undefined : "group",
  ...rest
}: Readonly<CollapsibleContentProps>) {
  const { isOpen, keepMounted, toggleId, setContentId, scopeKey } =
    useCollapsibleInternal();
  const contentId = useId();

  useLayoutEffect(() => {
    setContentId(contentId);

    return () => setContentId(undefined);
  }, [contentId, setContentId]);

  if (!keepMounted && !isOpen) {
    return null;
  }

  const Component = asChild ? AsChild : "div";

  return (
    <ContentContext.Provider value={scopeKey}>
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
    </ContentContext.Provider>
  );
}
