import {
  HeadlessButton,
  type HeadlessButtonProps,
} from "@wondesign/buttons/Headless";

import { useTabsList } from "@/contexts/list";
import { useTabsInternal } from "@/contexts/tabs";

export interface TabProps extends Omit<
  HeadlessButtonProps,
  | "onClick"
  | "onFocus"
  | "role"
  | "aria-selected"
  | "aria-controls"
  | "id"
  | "isLoading"
> {
  children: React.ReactNode;
  tabName: string;
}

export function Tab({
  children,
  tabName,
  isDisabled: isButtonDisabled = false,
  ...rest
}: Readonly<TabProps>) {
  const {
    activeTab,
    updateActiveTab,
    isDisabled,
    switchOnFocus,
    tabId,
    panelId,
  } = useTabsInternal();
  const { orientation } = useTabsList();

  const isActive = activeTab === tabName;
  const isTabDisabled = isButtonDisabled || isDisabled;

  const handleClick = () => updateActiveTab(tabName);
  const handleFocus = () => {
    if (switchOnFocus && !isTabDisabled) {
      updateActiveTab(tabName);
    }
  };

  return (
    <HeadlessButton
      {...rest}
      id={tabId(tabName)}
      role="tab"
      isDisabled={isTabDisabled}
      onClick={handleClick}
      onFocus={handleFocus}
      aria-selected={isActive ? "true" : "false"}
      aria-controls={panelId(tabName)}
      tabIndex={isActive ? 0 : -1}
      data-orientation={orientation}
      data-state={isActive ? "active" : "inactive"}
      data-value={tabName}
    >
      {children}
    </HeadlessButton>
  );
}
