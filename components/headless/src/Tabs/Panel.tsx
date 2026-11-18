import { AsChild } from "@/AsChild/AsChild";
import { useTabsInternal } from "./contexts";

export interface TabPanelProps extends Omit<
  React.ComponentProps<"div">,
  "role" | "id" | "hidden" | "aria-labelledby" | "tabIndex"
> {
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
      aria-labelledby={tabId(tabName)}
      data-state={isActive ? "active" : "inactive"}
    >
      {children}
    </Component>
  );
}
