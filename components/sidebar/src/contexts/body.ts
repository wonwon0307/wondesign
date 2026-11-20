import { createContext, useContext } from "react";

export const SidebarBodyContext = createContext<boolean>(false);

export function useSidebarBody() {
  const context = useContext(SidebarBodyContext);

  if (!context) {
    throw new Error(
      `[WonDesign Sidebar] useSidebarBody() must be used inside SidebarBody.`,
    );
  }

  return context;
}

export const SidebarNavContext = createContext<boolean>(false);

export function useSidebarNav() {
  const context = useContext(SidebarNavContext);

  if (!context) {
    throw new Error(
      `[WonDesign Sidebar] SidebarItem components must be used inside SidebarNav.`,
    );
  }

  return context;
}
