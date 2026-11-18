import { useId, useLayoutEffect, useMemo, useRef } from "react";
import { usePresence } from "@wondesign/disclosure/presence";

import { AsChild } from "@/AsChild/AsChild";
import { mergeRef } from "@/utils";
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
  inert,
  ref,
  ...rest
}: Readonly<CollapsibleContentProps>) {
  const { isOpen, keepMounted, toggleId, setContentId, scopeKey } =
    useCollapsibleInternal();
  const contentId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const { isPresent, status } = usePresence(contentRef, isOpen);
  const mergedRef = useMemo(() => mergeRef(contentRef, ref), [contentRef, ref]);

  useLayoutEffect(() => {
    setContentId(contentId);

    return () => setContentId(undefined);
  }, [contentId, setContentId]);

  if (!keepMounted && !isPresent) {
    return null;
  }

  const Component = asChild ? AsChild : "div";

  return (
    <ContentContext.Provider value={scopeKey}>
      <Component
        {...rest}
        ref={mergedRef}
        id={contentId}
        role={role}
        hidden={!isPresent}
        inert={status === "closing" || inert}
        aria-labelledby={role === "region" ? toggleId : undefined}
        data-state={isOpen ? "open" : "closed"}
      >
        {children}
      </Component>
    </ContentContext.Provider>
  );
}
