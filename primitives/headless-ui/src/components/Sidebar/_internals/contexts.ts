import { createContext, useContext } from "react";
import type { Shortkey } from "@wondesign/shortkeys";

type SidebarContextValue = {
  // states
  collapse: "hide" | "icons" | "disable";
  state: "closed" | "collapsed" | "expanded";
  toggleSidebar: () => void;
  isMobile: boolean;
  // implementation details
  side: "left" | "right";
  keyboardShortkey: Shortkey | null;
  contentId: string;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}

export const SidebarBodyContext = createContext<boolean>(false);
