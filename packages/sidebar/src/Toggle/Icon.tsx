import { Fragment } from "react";
import { AppIcon } from "@wondesign/icons";

import { styles } from "./styles.css";

/**
 * The default icon for `SidebarToggle`. Renders a sidebar icon at rest and
 * crossfades to an arrow icon on hover, indicating the direction of collapse.
 *
 * Use this when you need the same hover-swap icon in a custom trigger wired
 * to your own button or click handler, rather than using `SidebarToggle` directly.
 *
 * @example
 * <button onClick={toggleSidebar}>
 *   <SidebarToggleIcon />
 * </button>
 */
export function SidebarToggleIcon() {
  return (
    <Fragment>
      <span className={styles.sidebarIcon}>
        <AppIcon icon="sidebar" />
      </span>
      <span className={styles.arrowIcon}>
        <AppIcon icon="sidebar-arrow" />
      </span>
    </Fragment>
  );
}
