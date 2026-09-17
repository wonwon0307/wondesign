import { useCallback, useId, useMemo, useState } from "react";

import { TabsContext } from "@/contexts/tabs";

export interface TabsProps {
  children: React.ReactNode;
  defaultTab?: string;
  selectedTab?: string;
  onTabChange?: (tab: string) => void;
  isDisabled?: boolean;
  switchOnFocus?: boolean;
  keepPanelsMounted?: boolean;
}

export function TabsProvider({
  children,
  defaultTab = "",
  selectedTab,
  onTabChange,
  isDisabled = false,
  switchOnFocus = false,
  keepPanelsMounted = false,
}: Readonly<TabsProps>) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const baseId = useId();

  const isControlled = selectedTab !== undefined;
  const finalActiveTab = isControlled ? selectedTab : activeTab;

  const updateActiveTab = useCallback(
    (tab: string) => {
      if (!isControlled) {
        setActiveTab(tab);
      }
      onTabChange?.(tab);
    },
    [isControlled, onTabChange],
  );
  const tabId = useCallback(
    (tabName: string) => `${baseId}-tab-${tabName}`,
    [baseId],
  );
  const panelId = useCallback(
    (tabName: string) => `${baseId}-panel-${tabName}`,
    [baseId],
  );

  const contextValue = useMemo(
    () => ({
      activeTab: finalActiveTab,
      updateActiveTab,
      isDisabled,
      switchOnFocus,
      tabId,
      panelId,
      keepPanelsMounted,
    }),
    [
      finalActiveTab,
      updateActiveTab,
      isDisabled,
      switchOnFocus,
      tabId,
      panelId,
      keepPanelsMounted,
    ],
  );

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  );
}
