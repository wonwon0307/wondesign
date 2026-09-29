import { Fragment } from "react";
import { AppIcon } from "@wondesign/icons";

import { styles } from "./styles.css";

export function DefaultToggleIcon() {
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
