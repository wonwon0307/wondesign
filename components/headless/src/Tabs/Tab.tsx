import { Button, type ButtonProps } from "@/Button/Button";
import { useTabsInternal, useTabsList } from "./contexts";

export interface TabProps extends Omit<
  ButtonProps,
  | "onFocus"
  | "role"
  | "aria-selected"
  | "aria-controls"
  | "id"
  | "isLoading"
  | "tabIndex"
> {
  children: React.ReactNode;
  tabName: string;
}

export function Tab({
  children,
  tabName,
  isDisabled: isButtonDisabled = false,
  onClick,
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

  const finalOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) updateActiveTab(tabName);
  };
  const handleFocus = () => {
    if (switchOnFocus && !isTabDisabled) {
      updateActiveTab(tabName);
    }
  };

  return (
    <Button
      {...rest}
      id={tabId(tabName)}
      role="tab"
      isDisabled={isTabDisabled}
      onClick={finalOnClick}
      onFocus={handleFocus}
      aria-selected={isActive ? "true" : "false"}
      aria-controls={panelId(tabName)}
      tabIndex={isActive ? 0 : -1}
      data-orientation={orientation}
      data-state={isActive ? "active" : "inactive"}
      data-value={tabName}
    >
      {children}
    </Button>
  );
}
