import { createContext, useContext } from "react";

type TabsListContextValue = {
  orientation: "vertical" | "horizontal";
};

export const TabsListContext = createContext<TabsListContextValue | undefined>(
  undefined,
);

export function useTabsList() {
  const context = useContext(TabsListContext);

  if (!context) {
    throw new Error("useTabsList must be used within TabsList");
  }

  return context;
}
