import { useCallback, useId, useMemo } from "react";
import { useOpenState } from "@wondesign/interactions/disclosure";
import {
  useShortkey,
  type BindableShortkey,
} from "@wondesign/interactions/keyboard";
import { useIsMobile } from "@wondesign/interactions/mobile";

import { SidebarContext } from "@/contexts/sidebar";

export interface SidebarProps {
  children: React.ReactNode;
  collapse?: "hide" | "icons" | "disable";
  isMobile?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  side?: "left" | "right";
  shortkey?: BindableShortkey | null;
}

export function SidebarProvider({
  children,
  collapse = "hide",
  isMobile: isMobileOverride,
  isOpen: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  side = "left",
  shortkey = null,
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

  const isMobile = useIsMobile(isMobileOverride);
  const result = useShortkey(shortkey, toggleSidebar, collapse !== "disable");

  const finalState: "closed" | "collapsed" | "expanded" = useMemo(() => {
    if (isOpen || (collapse === "disable" && !isMobile)) return "expanded";
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
      shortkey,
      ariaKeyshortcuts: result?.ariaKeyshortcuts ?? undefined,
      contentId,
    }),
    [
      collapse,
      finalState,
      toggleSidebar,
      isMobile,
      side,
      shortkey,
      result,
      contentId,
    ],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}
