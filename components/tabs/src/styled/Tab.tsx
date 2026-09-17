import { AppIcon, type IconName } from "@wondesign/icons";
import clsx from "clsx";

import { Tab as Headless, type TabProps as Props } from "@/headless/Tab";
import { styles } from "./styles.css";

export interface TabProps extends Omit<Props, "children" | "asChild"> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconSide?: "left" | "right";
}

export function Tab({
  children,
  tabName,
  icon,
  iconSide = "left",
  isDisabled,
  className,
  ...rest
}: Readonly<TabProps>) {
  return (
    <Headless
      {...rest}
      tabName={tabName}
      isDisabled={isDisabled}
      className={clsx(styles.tab({ iconSide }), className)}
    >
      {children || (
        <>
          {typeof icon === "string" ? (
            <AppIcon icon={icon as IconName} />
          ) : (
            icon
          )}
          {tabName}
        </>
      )}
    </Headless>
  );
}
