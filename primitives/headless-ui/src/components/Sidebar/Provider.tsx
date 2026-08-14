import { useCallback, useId, useMemo } from "react";
import { useKeyboardShortkey, type Shortkey } from "@wondesign/shortkeys";

import { SidebarContext } from "./_internals/contexts";
import { useMobile } from "./_internals/useMobile";
import { useOpenState } from "@/core/disclosure";

export interface SidebarProps {
  children: React.ReactNode;
  collapse?: "hide" | "icons" | "disable";
  side?: "left" | "right";
  isMobile?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  keyboardShortkey?: Shortkey | null;
}

export function SidebarProvider({
  children,
  collapse = "hide",
  side = "left",
  isMobile: isMobileOverride,
  isOpen: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  keyboardShortkey = null,
}: Readonly<SidebarProps>) {
  const { isOpen, show, hide } = useOpenState(
    controlledOpen,
    onOpenChange,
    defaultOpen,
  );
  const contentId = useId();

  const toggleSidebar = useCallback(() => {
    if (isOpen) {
      hide();
    } else {
      show();
    }
  }, [isOpen, show, hide]);

  const isMobile = useMobile(isMobileOverride);
  useKeyboardShortkey(keyboardShortkey, toggleSidebar, collapse !== "disable");

  const finalState: "closed" | "collapsed" | "expanded" = useMemo(() => {
    if (isOpen || collapse === "disable") return "expanded";
    if (collapse === "icons" && !isMobile) return "collapsed";
    return "closed";
  }, [isOpen, collapse, isMobile]);

  const contextValue = useMemo(
    () => ({
      collapse,
      state: finalState,
      toggleSidebar,
      isMobile,
      side,
      keyboardShortkey,
      contentId,
    }),
    [
      collapse,
      finalState,
      toggleSidebar,
      isMobile,
      side,
      keyboardShortkey,
      contentId,
    ],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}
