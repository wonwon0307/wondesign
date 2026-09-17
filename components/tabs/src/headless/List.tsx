import { useLayoutEffect, useMemo, useRef } from "react";
import { AsChild } from "@wondesign/composition/asChild";
import { useArrowNavigation } from "@wondesign/interactions/focus";

import { TabsListContext } from "@/contexts/list";
import { useTabsInternal } from "@/contexts/tabs";

const TAB_ITEM_SELECTOR = '[role="tab"]:not([aria-disabled="true"])';

export interface TabsListProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "role" | "aria-orientation"
> {
  children: React.ReactNode;
  asChild?: boolean;
  vertical?: boolean;
  loop?: boolean;
}

export function TabsList({
  children,
  asChild = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  vertical = false,
  loop = false,
  ...rest
}: Readonly<TabsListProps>) {
  const { isDisabled, activeTab, updateActiveTab } = useTabsInternal();
  const ref = useRef<HTMLDivElement>(null);
  const orientation: "vertical" | "horizontal" = vertical
    ? "vertical"
    : "horizontal";

  useArrowNavigation(ref, {
    itemSelector: TAB_ITEM_SELECTOR,
    orientation,
    loop,
  });

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;

    const enabledTabs =
      container.querySelectorAll<HTMLElement>(TAB_ITEM_SELECTOR);
    if (enabledTabs.length === 0) {
      if (process.env.NODE_ENV !== "production" && !isDisabled) {
        console.warn(
          `[WonDesign Tabs] No enabled tabs found — ` +
            `every tab is either disabled or missing. ` +
            `The tablist is unusable until at least one tab is enabled.`,
        );
      }
      return;
    }

    // 이미 active 탭이 있으면 그대로 둔다.
    const hasActiveMatch = Array.from(enabledTabs).some(
      (item) => item.dataset.value === activeTab,
    );
    if (hasActiveMatch) return;

    // active 탭이 없으면 첫번째 탭을 활성화한다.
    const firstTab = enabledTabs[0].dataset.value;
    if (firstTab) updateActiveTab(firstTab);
  }, [activeTab, children, isDisabled, updateActiveTab]);

  if (process.env.NODE_ENV !== "production" && !ariaLabel && !ariaLabelledBy) {
    console.warn(
      "[WonDesign Tabs] It is strongly recommended to provide either an aria-label or aria-labelledby for the tablist element.",
    );
  }

  const Component = asChild ? AsChild : "div";

  const contextValue = useMemo(
    () => ({
      orientation,
    }),
    [orientation],
  );

  return (
    <TabsListContext.Provider value={contextValue}>
      <Component
        {...rest}
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        aria-label={ariaLabel}
        data-orientation={orientation}
        data-disabled={isDisabled}
      >
        {children}
      </Component>
    </TabsListContext.Provider>
  );
}
