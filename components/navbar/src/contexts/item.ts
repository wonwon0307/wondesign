import { createContext, useContext } from "react";

type ItemContextType = {
  isDisabled: boolean;
};

export const ItemContext = createContext<ItemContextType | undefined>(
  undefined,
);

export function useNavbarItem() {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error(
      `[WonDesign Navbar] useNavbarItem() must be used inside a Navbar.Item component.`,
    );
  }

  return context;
}
