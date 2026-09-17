import { AsChild } from "@wondesign/composition/asChild";

import { useTabsInternal } from "@/contexts/tabs";

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
  ref,
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
      ref={asChild ? undefined : ref}
      id={panelId(tabName)}
      role="tabpanel"
      tabIndex={isActive ? 0 : -1}
      aria-hidden={!isActive}
      aria-labelledby={tabId(tabName)}
      data-state={isActive ? "active" : "inactive"}
    >
      {children}
    </Component>
  );
}
