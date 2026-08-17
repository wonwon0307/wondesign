import { Collapsible } from "@wondesign/headless-ui/Collapsible";
import { SidebarLink } from "@wondesign/headless-ui/Sidebar";
import { Tooltip } from "@wondesign/tooltip";
import clsx from "clsx";

import { useSidebar } from "@/core";
import { styles } from "./styles.css";

export interface SidebarItemProps extends MainProps {
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function SidebarItem({
  defaultOpen = false,
  isOpen,
  onOpenChange,
  children,
  label,
  icon,
  right,
  isActive = false,
  ...linkProps
}: Readonly<SidebarItemProps>) {
  const { collapse, state } = useSidebar();

  if (collapse === "icons" && !icon) {
    console.warn(
      "SidebarItem: 'icon' prop is required when sidebar collapse is 'icons'.",
    );
    return null;
  }

  if (children && state !== "collapsed") {
    return (
      <Collapsible
        defaultOpen={defaultOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        unmountOnHide
      >
        <div className={styles.wrapper}>
          <ItemMain
            {...linkProps}
            icon={icon}
            label={label}
            right={right}
            isActive={isActive}
          />
          <Collapsible.Content className={styles.subitems}>
            {children}
          </Collapsible.Content>
        </div>
      </Collapsible>
    );
  }

  return (
    <ItemMain
      {...linkProps}
      icon={icon}
      label={label}
      right={right}
      isActive={isActive}
    />
  );
}

interface MainProps extends Omit<LinkProps, "children"> {
  label: React.ReactNode;
  icon?: React.ReactNode;
  right?: React.ReactNode;
}

function ItemMain({
  label,
  icon,
  right,
  isActive,
  ...linkProps
}: Readonly<MainProps>) {
  const { state, side } = useSidebar();

  if (state === "collapsed") {
    return (
      <Tooltip
        floatingOptions={{ placement: side === "left" ? "right" : "left" }}
        openDelay={200}
        text={label}
        asChild
      >
        <Link {...linkProps} isActive={isActive}>
          {icon}
        </Link>
      </Tooltip>
    );
  }

  return (
    <Link {...linkProps} isActive={isActive}>
      {icon}
      <div className={styles.labelSlot}>
        {typeof label === "string" ? <span>{label}</span> : label}
      </div>
      {right}
      {isActive && <div className={styles.indicator} aria-hidden="true" />}
    </Link>
  );
}

interface LinkProps {
  children: React.ReactNode;
  href: string;
  as?: React.ElementType;
  isActive?: boolean;
  isDisabled?: boolean;
  isExternal?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function Link({
  children,
  href,
  as,
  isActive = false,
  isDisabled = false,
  isExternal,
  className,
  style,
}: Readonly<LinkProps>) {
  return (
    <div
      className={clsx(
        styles.link({ isActive, isDisabled, collapsed: false }),
        className,
      )}
      style={style}
      data-active={isActive || undefined}
      data-disabled={isDisabled || undefined}
    >
      {children}
      <SidebarLink
        href={href}
        as={as}
        isActive={isActive}
        isDisabled={isDisabled}
        isExternal={isExternal}
        aria-current={isActive ? "page" : undefined}
        className={styles.linkOverlay}
      />
    </div>
  );
}
