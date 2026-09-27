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

export function useCollapsibleInternal() {
  const context = useContext(CollapsibleContext);

  if (!context) {
    throw new Error(
      `[WonDesign Collapsible] useCollapsible() must be used inside the Collapsible wrapper.`,
    );
  }

  return context;
}

export function useCollapsible() {
  const { isOpen, toggle } = useCollapsibleInternal();

  return { isOpen, toggle };
}
