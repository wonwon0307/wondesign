import { createContext, useContext } from "react";
import type { BindableShortkey } from "@wondesign/interactions/keyboard";

type SidebarContextValue = {
  // states
  collapse: "hide" | "icons" | "disable";
  state: "closed" | "collapsed" | "expanded";
  toggleSidebar: () => void;
  isMobile: boolean;
  // implementation details
  side: "left" | "right";
  shortkey: BindableShortkey | null;
  ariaKeyshortcuts: string | undefined;
  contentId: string;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useInternalSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(
      `[WonDesign Sidebar] useSidebar() must be used inside the Sidebar wrapper.`,
    );
  }

  return context;
}

export function useSidebar() {
  const { collapse, state, toggleSidebar, isMobile, side, shortkey } =
    useInternalSidebar();

  return { collapse, state, toggleSidebar, isMobile, side, shortkey };
}
