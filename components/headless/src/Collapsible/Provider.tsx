import { useId, useMemo, useRef, useState } from "react";
import { useOpenState } from "@wondesign/disclosure/open-state";
import { usePresence } from "@wondesign/disclosure/presence";

import { CollapsibleContext } from "./contexts";

export interface CollapsibleProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  keepMounted?: boolean;
}

export function CollapsibleProvider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  keepMounted = false,
}: Readonly<CollapsibleProps>) {
  const { isOpen, toggle } = useOpenState({
    controlledOpen,
    setControlledOpen: onOpenChange,
    initialState: defaultOpen,
  });
  const [contentId, setContentId] = useState<string | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);
  const toggleId = useId();
  const scopeKey = useId();
  const { isPresent, status } = usePresence(contentRef, isOpen);

  const contextValue = useMemo(
    () => ({
      isOpen,
      isPresent,
      status,
      keepMounted,
      toggle,
      toggleId,
      contentId,
      setContentId,
      contentRef,
      scopeKey,
    }),
    [
      isOpen,
      isPresent,
      status,
      keepMounted,
      toggle,
      contentId,
      toggleId,
      scopeKey,
    ],
  );

  return (
    <CollapsibleContext.Provider value={contextValue}>
      {children}
    </CollapsibleContext.Provider>
  );
}
