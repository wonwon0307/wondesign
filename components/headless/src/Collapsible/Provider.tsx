import { useId, useMemo } from "react";
import { useOpenState } from "@wondesign/disclosure";

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
    setOpenState: onOpenChange,
    initialState: defaultOpen,
  });
  const contentId = useId();
  const toggleId = useId();

  const contextValue = useMemo(
    () => ({
      isOpen,
      keepMounted,
      toggle,
      contentId,
      toggleId,
    }),
    [isOpen, keepMounted, toggle, contentId, toggleId],
  );

  return (
    <CollapsibleContext.Provider value={contextValue}>
      {children}
    </CollapsibleContext.Provider>
  );
}
