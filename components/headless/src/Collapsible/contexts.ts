import { createContext, useContext } from "react";
import type { PresenceStatus } from "@wondesign/disclosure/presence";

type CollapsibleContextValue = {
  isOpen: boolean;
  isPresent: boolean;
  status: PresenceStatus;
  keepMounted: boolean;
  toggle: () => void;
  toggleId: string;
  contentId: string | undefined;
  setContentId: (contentId: string | undefined) => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
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
  const { isOpen, isPresent, status, toggle, keepMounted } =
    useCollapsibleInternal();

  return { isOpen, isPresent, status, toggle, keepMounted };
}
