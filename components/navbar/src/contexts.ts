import { createContext, useContext } from "react";

type NavbarContextType = {
  orientation: "vertical" | "horizontal";
  asChild: boolean;
};

export const NavbarContext = createContext<NavbarContextType | null>(null);

export function useNavbarInternal() {
  const context = useContext(NavbarContext);

  if (!context) {
    throw new Error(
      `[WonDesign Navbar] useNavbar() must be used within a Navbar component.`,
    );
  }

  return context;
}

export function useNavbar() {
  const { orientation } = useNavbarInternal();

  return { orientation };
}
