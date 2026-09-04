import { createContext, useContext } from "react";

type CollapsibleContextValue = {
  isOpen: boolean;
  keepMounted: boolean;
  toggle: () => void;
  contentId: string;
  toggleId: string;
};

export const CollapsibleContext = createContext<CollapsibleContextValue | null>(
  null,
);

export function useCollapsible(componentName: string) {
  const context = useContext(CollapsibleContext);

  if (!context) {
    throw new Error(
      `Collapsible.${componentName} must be used inside the Collapsible wrapper.`,
    );
  }

  return context;
}
