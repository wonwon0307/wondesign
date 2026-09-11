import { Tooltip } from "@wondesign/tooltip";
import clsx from "clsx";

import { useSidebar } from "@/contexts/sidebar";
import { SidebarItemHeader } from "../fragments/Header";
import { SidebarLink } from "../fragments/Link";
import { styles } from "./styles.css";

export interface SidebarItemLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
  ref?: React.Ref<HTMLAnchorElement>;
  as?: React.ElementType;
  isActive?: boolean;
  isDisabled?: boolean;
  openInNewTab?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function SidebarItemLink({
  label,
  icon,
  right,
  isActive = false,
  isDisabled = false,
  className,
  style,
  ...rest
}: Readonly<SidebarItemLinkProps>) {
  const { state, collapse, side } = useSidebar();

  if (collapse === "icons" && !icon && process.env.NODE_ENV !== "production") {
    console.warn(
      `[WonDesign Sidebar] SidebarItem: 'icon' prop is required ` +
        `when sidebar collapse is 'icons'.`,
    );
  }

  const isExpanded = state === "expanded";
  const showTooltip = collapse === "icons" && state === "collapsed";

  if (showTooltip) {
    return (
      <SidebarItemHeader
        className={clsx(styles.linkWrapper, className)}
        style={style}
      >
        <Tooltip
          placement={side === "left" ? "right" : "left"}
          showDelay={200}
          text={label}
          asChild
        >
          <SidebarLink
            {...rest}
            isActive={isActive}
            isDisabled={isDisabled}
            aria-label={label}
            stretch
          >
            {icon}
          </SidebarLink>
        </Tooltip>
      </SidebarItemHeader>
    );
  }

  return (
    <SidebarItemHeader
      className={clsx(styles.linkWrapper, className)}
      style={style}
    >
      {icon}
      {isExpanded && <span className={styles.label}>{label}</span>}
      {isExpanded && right}
      {isActive && <div className={styles.indicator} aria-hidden="true" />}
      <SidebarLink
        {...rest}
        isActive={isActive}
        isDisabled={isDisabled}
        aria-label={label}
        stretch
      />
    </SidebarItemHeader>
  );
}
