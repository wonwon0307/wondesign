import { createContext, useContext } from "react";

type SidebarItemContextType = {
  variant: "collapsible" | "flat";
  collapsedBehavior: "hide" | "hide-children" | "flatten";
  hasSubitems: boolean;
};

export const SidebarItemContext = createContext<
  SidebarItemContextType | undefined
>(undefined);

export function useSidebarItem() {
  const context = useContext(SidebarItemContext);

  if (!context) {
    throw new Error(
      `[WonDesign Sidebar] useSidebarItem() must be used inside a SidebarItemWrapper.`,
    );
  }

  return context;
}
