import { useMemo, useRef } from "react";
import { usePresence } from "@wondesign/disclosure/presence";

import { AsChild } from "@/AsChild/AsChild";
import { mergeRef } from "@/utils";
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
  inert,
  ref,
  ...rest
}: Readonly<TabPanelProps>) {
  const { activeTab, tabId, panelId, keepMounted } = useTabsInternal();
  const Component = asChild ? AsChild : "div";
  const panelRef = useRef<HTMLDivElement>(null);
  const isActive = activeTab === tabName;
  const { isPresent, status } = usePresence(panelRef, isActive);
  const mergedRef = useMemo(() => mergeRef(ref, panelRef), [ref, panelRef]);

  if (!keepMounted && !isPresent) {
    return null;
  }

  return (
    <Component
      {...rest}
      ref={mergedRef}
      id={panelId(tabName)}
      role="tabpanel"
      hidden={!isPresent}
      inert={status === "closing" || inert}
      tabIndex={isActive ? 0 : -1}
      aria-labelledby={tabId(tabName)}
      data-state={isActive ? "active" : "inactive"}
    >
      {children}
    </Component>
  );
}
