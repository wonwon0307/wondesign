import { createContext, useContext } from "react";

type CollapsibleContextValue = {
  isOpen: boolean;
  keepMounted: boolean;
  toggle: () => void;
  toggleId: string;
  contentId: string | undefined;
  setContentId: (contentId: string | undefined) => void;
  scopeKey: string;
};

export const CollapsibleContext = createContext<CollapsibleContextValue | null>(
  null,
);
export const ContentContext = createContext<string | null>(null);

export function useCollapsibleInternal() {
  const context = useContext(CollapsibleContext);

  if (!context) {
    throw new Error(
      `[WonDesign Headless] useCollapsible() must be used inside a Collapsible Provider.`,
    );
  }

  return context;
}

export function useCollapsible() {
  const { isOpen, toggle, keepMounted } = useCollapsibleInternal();

  return { isOpen, toggle, keepMounted };
}
