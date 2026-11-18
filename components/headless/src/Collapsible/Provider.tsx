import { useId, useMemo, useState } from "react";
import { useOpenState } from "@wondesign/disclosure/open-state";

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
  const toggleId = useId();
  const scopeKey = useId();

  const contextValue = useMemo(
    () => ({
      isOpen,
      keepMounted,
      toggle,
      toggleId,
      contentId,
      setContentId,
      scopeKey,
    }),
    [isOpen, keepMounted, toggle, contentId, toggleId, scopeKey],
  );

  return (
    <CollapsibleContext.Provider value={contextValue}>
      {children}
    </CollapsibleContext.Provider>
  );
}
