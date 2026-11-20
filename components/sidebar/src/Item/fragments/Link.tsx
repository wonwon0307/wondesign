import { clsx } from "clsx";

import { useSidebarInternal } from "@/contexts/sidebar";
import { SidebarAnchor, type SidebarAnchorProps } from "./Anchor";
import { styles } from "./styles.css";

export interface SidebarLinkProps extends Omit<
  SidebarAnchorProps,
  "href" | "children"
> {
  href: string; // make href required
  label: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
}

export function SidebarLink({
  label,
  icon,
  right,
  isActive = false,
  isDisabled = false,
  className,
  style,
  ref,
  ...rest
}: Readonly<SidebarLinkProps>) {
  const { state, collapse } = useSidebarInternal();

  if (collapse === "icons" && !icon && process.env.NODE_ENV !== "production") {
    console.warn(
      `[WonDesign Sidebar] SidebarItem: 'icon' prop is required ` +
        `when sidebar collapse is 'icons'.`,
    );
  }

  const iconOnly = collapse === "icons" && state === "collapsed";

  return (
    <div className={clsx(styles.link, className)} style={style}>
      {icon}
      {iconOnly ? null : <span className={styles.label}>{label}</span>}
      {iconOnly ? null : right}
      <SidebarAnchor
        {...rest}
        ref={ref}
        isActive={isActive}
        isDisabled={isDisabled}
        className={styles.overlayLink}
        aria-label={label}
      />
    </div>
  );
}
