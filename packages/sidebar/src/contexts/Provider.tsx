import { useCallback, useEffect, useId, useMemo, useRef } from "react";
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
  mobileBreakpoint?: number;
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
  mobileBreakpoint = 768,
  isOpen: controlledOpen,
  onOpenChange,
  defaultOpen,
  side = "left",
  shortkey = null,
}: Readonly<SidebarProps>) {
  const isMobile = useIsMobile(isMobileOverride, mobileBreakpoint);
  const { isOpen, show, hide } = useOpenState(
    controlledOpen,
    onOpenChange,
    defaultOpen ?? !isMobile,
  );
  const contentId = useId();

  const toggleSidebar = useCallback(() => {
    if (isOpen) {
      hide();
    } else {
      show();
    }
  }, [isOpen, show, hide]);

  const result = useShortkey(shortkey, toggleSidebar, collapse !== "disable");

  const finalState: "closed" | "collapsed" | "expanded" = useMemo(() => {
    if (isOpen || (collapse === "disable" && !isMobile)) return "expanded";
    if (collapse === "icons" && !isMobile) return "collapsed";
    return "closed";
  }, [isOpen, collapse, isMobile]);

  const previousIsMobile = useRef(isMobile);

  useEffect(() => {
    if (previousIsMobile.current === isMobile) return;
    previousIsMobile.current = isMobile;

    if (isMobile) {
      hide();
    } else {
      show();
    }
  }, [isMobile, hide, show]);

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
