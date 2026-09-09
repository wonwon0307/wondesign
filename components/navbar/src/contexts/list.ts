import { createContext, useContext } from "react";

type ListContextType = {
  orientation: "vertical" | "horizontal";
};

export const NavbarListContext = createContext<ListContextType | null>(null);

export function useNavbarList() {
  const context = useContext(NavbarListContext);

  if (!context) {
    throw new Error(
      `[WonDesign Navbar] useNavbarList() must be used inside a Navbar.List component.`,
    );
  }

  return context;
}

export const NavbarContext = createContext<boolean>(false);
