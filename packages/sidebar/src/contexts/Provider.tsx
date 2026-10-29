import { useEffect, useId, useMemo, useRef } from "react";
import { useOpenState } from "@wondesign/disclosure";
import {
  useShortkey,
  type BindableShortkey,
} from "@wondesign/key-events/shortkey";

import { SidebarContext } from "./sidebar";
import { useIsMobile } from "./useIsMobile";

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
  defaultOpen = false,
  side = "left",
  shortkey = null,
}: Readonly<SidebarProps>) {
  const isMobile = useIsMobile(isMobileOverride, mobileBreakpoint);
  const { isOpen, show, hide, toggle } = useOpenState({
    controlledOpen,
    setControlledOpen: onOpenChange,
    initialState: defaultOpen,
  });
  const contentId = useId();

  useShortkey(shortkey, toggle, {
    enabled: collapse !== "disable",
  });

  const finalState: "closed" | "collapsed" | "expanded" = useMemo(() => {
    if (isMobile) {
      if (isOpen) return "expanded";
      return "closed";
    }

    if (isOpen || collapse === "disable") return "expanded";
    if (collapse === "icons") return "collapsed";
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
      toggle,
      isMobile,
      side,
      shortkey,
      contentId,
    }),
    [collapse, finalState, toggle, isMobile, side, shortkey, contentId],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}
