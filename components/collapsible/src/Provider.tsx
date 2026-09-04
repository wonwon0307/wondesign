import { useCallback, useId, useMemo } from "react";
import { useOpenState } from "@wondesign/components-core/useOpenState";

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
  const { isOpen, show, hide } = useOpenState(
    controlledOpen,
    onOpenChange,
    defaultOpen,
  );
  const contentId = useId();
  const toggleId = useId();

  const toggle = useCallback(() => {
    if (isOpen) {
      hide();
    } else {
      show();
    }
  }, [isOpen, show, hide]);

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
