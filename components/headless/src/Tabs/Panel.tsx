import { AsChild } from "@/AsChild/AsChild";
import { useTabsInternal } from "./contexts";

export interface TabPanelProps
  extends
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "role" | "id" | "hidden" | "aria-labelledby" | "tabIndex"
    >,
    React.RefAttributes<HTMLDivElement> {
  children: React.ReactNode;
  tabName: string;
  asChild?: boolean;
}

export function TabPanel({
  children,
  tabName,
  asChild = false,
  ...rest
}: Readonly<TabPanelProps>) {
  const { activeTab, tabId, panelId, keepPanelsMounted } = useTabsInternal();
  const Component = asChild ? AsChild : "div";

  const isActive = activeTab === tabName;

  if (!keepPanelsMounted && !isActive) {
    return null;
  }

  return (
    <Component
      {...rest}
      id={panelId(tabName)}
      role="tabpanel"
      hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
      aria-hidden={!isActive}
      aria-labelledby={tabId(tabName)}
      data-state={isActive ? "active" : "inactive"}
    >
      {children}
    </Component>
  );
}
