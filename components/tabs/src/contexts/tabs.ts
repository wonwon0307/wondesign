import { createContext, useContext } from "react";

type TabsContextValue = {
  activeTab: string;
  updateActiveTab: (tabName: string) => void;
  isDisabled: boolean;
  switchOnFocus: boolean;
  keepPanelsMounted: boolean;
  tabId: (tabName: string) => string;
  panelId: (tabName: string) => string;
};

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsInternal() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }

  return context;
}

export function useTabs() {
  const { activeTab, updateActiveTab } = useTabsInternal();

  return { activeTab, updateActiveTab };
}
