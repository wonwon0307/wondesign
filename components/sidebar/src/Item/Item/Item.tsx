import { useState } from "react";
import {
  CollapsibleProvider,
  CollapsibleContent,
} from "@wondesign/headless/Collapsible";
import { Tooltip } from "@wondesign/tooltip";
import { clsx } from "clsx";

import { useSidebarInternal } from "@/contexts/sidebar";
import { SidebarItemWrapper } from "../fragments/Wrapper";
import { SidebarLink } from "../fragments/Link";
import { styles } from "./styles.css";

export interface SidebarItemProps extends HeaderProps {
  children?: React.ReactNode;
  defaultOpen?: boolean;
  collapsedBehavior?: "self-only" | "flatten";
}

export function SidebarItem({
  children,
  defaultOpen = false,
  collapsedBehavior = "self-only",
  ...linkProps
}: Readonly<SidebarItemProps>) {
  const [userOpen, setUserOpen] = useState<boolean>(defaultOpen);
  const { state } = useSidebarInternal();
  const hasChildren = Boolean(children);

  if (hasChildren) {
    const isOpen =
      state === "collapsed" ? collapsedBehavior === "flatten" : userOpen;

    return (
      <CollapsibleProvider
        isOpen={isOpen}
        onOpenChange={setUserOpen}
        keepMounted
      >
        <SidebarItemWrapper className={styles.wrapper}>
          <Header {...linkProps} />
          <CollapsibleContent className={styles.subitemsWrapper}>
            <ul className={styles.subitems}>{children}</ul>
          </CollapsibleContent>
        </SidebarItemWrapper>
      </CollapsibleProvider>
    );
  }

  return (
    <SidebarItemWrapper className={styles.wrapper}>
      <Header {...linkProps} />
    </SidebarItemWrapper>
  );
}

interface HeaderProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
  as?: React.ElementType;
  isActive?: boolean;
  isDisabled?: boolean;
  openInNewTab?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function Header({ className, ...rest }: Readonly<HeaderProps>) {
  const { state, collapse, side } = useSidebarInternal();

  const { label, isActive, isDisabled } = rest;

  if (collapse === "icons" && state === "collapsed") {
    return (
      <Tooltip
        placement={side === "left" ? "right" : "left"}
        showDelay={200}
        text={label}
        asChild
      >
        <SidebarLink
          {...rest}
          className={clsx(
            styles.item({ isActive, isDisabled, collapsed: true }),
            className,
          )}
        />
      </Tooltip>
    );
  }

  return (
    <SidebarLink
      {...rest}
      className={clsx(
        styles.item({ isActive, isDisabled, collapsed: false }),
        className,
      )}
    />
  );
}
